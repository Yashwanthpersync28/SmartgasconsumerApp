import React from 'react';
import { connect } from "react-redux";
import { Text, View, StatusBar, FlatList, Pressable, Dimensions, PixelRatio, TextInput, TouchableWithoutFeedback, ScrollView, RefreshControl, ActivityIndicator, Alert, KeyboardAvoidingView } from 'react-native';
// Styles and Colors
// import { styles } from 'SmartgasConsumerApp/js/styles';

import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Components
import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound';
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
import ExtendedLoader from '../../components/common/loader/ExtendedLoader'
import {BodyText1} from "../../components/common";
import {Form3dBackgroundComponent} from "../../components/common/Form3dBackground";
// Icons
import MIcons from 'react-native-vector-icons/MaterialIcons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import EIcons from 'react-native-vector-icons/Entypo';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {strings} from "SmartgasConsumerApp/js/strings";
import {apiDispatcher, userDetailActions} from "../../actions";
import {chartDataWithoutDate} from "../../helpers/common/chartDataHelper";
import * as dashboard from "../../api/dashboard";
import * as loginActions from "../../actions";
import { darkMode } from '../../selectors/common';
import { styles } from '../../styles';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
// Helper
import { CANumberValidation } from '../../helpers/common/userInputValidations';


let timer;

const {height, width} = Dimensions.get('window');


class MultipleAccounts extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            add: false ,
            otpStatus: false,
            users: [],
            timer: null,
            counter: 7
           
        }
        this.FullNameInput;
        this.mobileNumberInput ? this.mobileNumberInput.blur() : null;
        this.consumerNumberInput;
        this.otpInput;
        this.passwordInput;
        this.confirmPasswordInput;
    }

    componentDidMount(){
        console.log('User Details',this.props.userDetails);
        console.log("component mount props:",this.props.route.params);
        console.log("props navigation",this.props.navigation);
        // this.props.route?.params?.comingFrom === 'drawer'? this.setState({add:true}): null;
        this.props.route?.params?.comingFrom === 'dashboardAdd'? this.setState({add:true}): null;

        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <Pressable style={[styles.row,styles.allCenter,styles.paddingHorizontal20]} onPress={() => this.props.route?.params?.comingFrom === 'drawer'?this.props.navigation.openDrawer():this.props.route?.params?.comingFrom === 'dashboard'?this.props.navigation.navigate('/dashboard'):this.props.route?.params?.comingFrom === 'dashboardAdd'?this.props.navigation.navigate('/dashboard') :this.props.navigation.navigate('/settings')}>
                <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter, styles.fontSize15, styles.paddingHorizontal6]}>
                    {strings[this.props.language].back}
                </Text>
            </Pressable>
        ), });
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'MultipleAccounts') {
                    this.props.setCurrentRoute('MultipleAccounts');
                    this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('AccountDetails');
    }

    componentWillUnmount() {
        clearInterval(this.state.timer);
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.accountDetails !== prevProps.accountDetails && this.props.accountDetails) {

                if(this.props.accountDetails.message == "Account details not found"){
                    console.log('Message',this.props.accountDetails.message);
                }
                else{
                    let data = this.props.accountDetails ? JSON.parse(JSON.stringify(this.props.accountDetails)) : [];
                    console.log('Data check',data, this.props.accountDetails)
                    data = data.map(d=>{d.selected = false; return d});
                    console.log("asasasasa",data[0]);
                    if (this.props.accountDetails) {
                        this.setState({
                            users: data,

                            refreshing: false
                        }, () => console.log(this.state))
                    }
                }

        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            console.log("Account Details",this.props.userDetails);

            let data = await this.props.apiDispatcher(dashboard.accountDetailsApi(this.props.userDetails.CANumber))
            if(data.status == 200){
                console.log("Account Details",data.data, "Current User", this.props.userDetails.CANumber);
                this.setState({  currentUserId: this.props.userDetails.CANumber, totalMembers: data.data.length ? data.data.length : 0 })
                // console.log('TOatl', this.state.totalMembers);
                this.props.setAccountDetails(data.data);
            } else if(data.status == 204){
                this.setState({ noData: true })
            }
        } catch (e) {
            this.setState({refreshing: false})
            console.log("Multiple Accounts Error", e);
        }
    }
    onRefresh = () => {
        console.log('Before Refresh');
        this.setState({refreshing: true});
        console.log('After Refresh');

        this.syncData()
        console.log('After Sync');


    };

    deleteAccount = async (CANumber) => {
        Alert.alert(
            strings[this.props.language].multipleAccounts.deleteHeader,
            `${strings[this.props.language].multipleAccounts.deleteHeader} ${CANumber}`,
            [
              {
                text: strings[this.props.language].multipleAccounts.cancel,
                    // onPress: () =>
                style: "cancel"
              },
              { text: strings[this.props.language].multipleAccounts.ok, onPress: async () => {
                let data = await this.props.apiDispatcher(dashboard.deleteAccountApi(CANumber, this.props.userDetails.mobilenumber))
                    console.log('Delete Account Response',data);
                    Alert.alert(strings[this.props.language].multipleAccounts.createHeader,`${CANumber} ${strings[this.props.language].multipleAccounts.deleteSuccess}`);
                this.syncData();
              }}
            ],
            { cancelable: false }
          );

    }

    focusOutAll = () => {
        this.FullNameInput ? this.FullNameInput.blur() : null;
        this.mobileNumberInput ? this.mobileNumberInput.blur() : null;
        this.consumerNumberInput ? this.consumerNumberInput.blur() : null;
        this.passwordInput ?  this.passwordInput.blur() : null;
        this.otpInput ?  this.otpInput.blur() : null;
        this.confirmPasswordInput ?  this.confirmPasswordInput.blur() : null;
    }

    changeActiveRadioButton(index) {
        console.log('index',index);
        if(this.state.users[index].selected == true)
            this.state.users[index].selected = false;
        else
            this.state.users[index].selected = true;
        this.setState({ users: this.state.users })
    }

    selectAll(){
        for( let i = 0 ; i < this.state.users.length ; i++ ){
            this.state.users[i].selected = true;
            this.setState({ users: this.state.users })
        }
    }

    // Send OTP
    sendOTP =  async () => {
        this.setState({loading: true})
        try{
            let data = await this.props.apiDispatcher(dashboard.saveAccoutDetailsApi(this.state.newCANumber))
            
            console.log('Multiple Accounts Send OTP',data);
            if(data.data.statusText == "OTP_GENERATED"){
                this.setState({ mobileNumber: data.data.MobileNumber, otpStatus: true, loading: false, error: '' })
            }
            
            // console.log('Data in sendOTP',data);
            // if(data.status === 201){
            //     this.setState({ mobileNumber: data.data.mobilenumber, loading: false, error: ''})
            //     // , users: this.state.users.push(this.state.newCANumber) 
            //     // otpStatus: true,
            //     console.log("Users after API in Send otp",this.state);

            //     await this.onRefresh();
            //     Alert.alert(strings[this.props.language].multipleAccounts.createHeader,
            //     `${strings[this.props.language].multipleAccounts.createMessage} ${this.state.newCANumber} ${strings[this.props.language].multipleAccounts.createSuccessfully}`,
            //     [
            //         { text: strings[this.props.language].multipleAccounts.ok}
            //       ],
            //       { cancelable: true }
            //     )
            //     this.setState({ add: false, otpStatus: false, newCANumber:this.state.newCANumber, otp: ""})
            // }
        }
        catch(e){
            console.log('Multiple Send OTP error',e);
            if(e.data.ErrorDescription == "NewCANumber is already exist"){
                this.setState({ error: "New Consumer ID already exists"})
            }
            else if(e.data.ErrorDescription == "NewCANumber_NOT_IN_SYSTEM"){
                this.setState({ error: "New Consumer ID Not In System"})
            }
            else
                this.setState({ error: e.data.ErrorDescription})
            console.log('Eror',e.data.ErrorDescription);
            
        }
    }

    verifyAccount = async () => {
        try{
            let data = await this.props.apiDispatcher(dashboard.accountOtpVerifyApi(this.state.otp, this.state.newCANumber))
            console.log('Data',data);

            // if(data.data.statusText == "OTP_GENERATED")
            await this.onRefresh();
            Alert.alert(strings[this.props.language].multipleAccounts.createHeader,
            `${strings[this.props.language].multipleAccounts.createMessage} ${this.state.newCANumber} ${strings[this.props.language].multipleAccounts.createSuccessfully}`,
            [
                { text: strings[this.props.language].multipleAccounts.ok}
              ],
              { cancelable: true }
            )
            this.setState({ add: false, otpStatus: false, newCANumber: "", otp: ""})
        }
        catch(e){
            console.log("Multiple Account verify OTP",e);
            if(e.data.ErrorDescription == "INVALID_OTP"){
                this.setState({ error: "Invalid OTP" })
            }
            if(e.data.ErrorDescription == "OTP_EXPIRED"){
                this.setState({ error: "OTP Expired" })
            }
            
        }
        // this.setState({ mobileNumber: data.data.MobileNumber, otpStatus: true })
    };

    confirmSwitch = async (index, name) => {
        this.changeActiveRadioButton(index);
        Alert.alert(
            strings[this.props.language].multipleAccounts.switchAccount,
            `${strings[this.props.language].multipleAccounts.switchAccountMessage} ${name}`,
            [
              {
                text: strings[this.props.language].multipleAccounts.cancel,
                    onPress: () => this.changeActiveRadioButton(index),
                style: "cancel"
              },
              { text: strings[this.props.language].multipleAccounts.ok, onPress: () => this.switch()}
            ],
            { cancelable: false }
          );

    }

    switch(){
        this.setState({language: strings[this.props.language].language, selectedUser: this.state.users.filter(u=>u.selected)})
        console.log('Select user', this.state.selectedUser, this.state.selectedUser[0].consumerName);
        timer = setInterval(this.tick, 1000);
        this.setState({timer});
    }

    tick =() => {
        if(this.state.counter < 1) {
            clearInterval(timer);  
            this.setState({ counter: 7 })
        }  
        else{
            this.setState({counter: this.state.counter - 1});
        }
        console.log('Counter',this.state.counter);
        if(this.state.counter == 2){
            this.switchAccount()
        }
    }

    switchAccount = async () => {
        console.log('Before',this.state.users);
        let newUser = this.state.users.filter(u=>u.selected);
        if (newUser.length > 1) {
            alert("Please select only one user")
        } else if (newUser.length < 1) {
            alert("Please select one user")
        } else  {
            try {
                let data = await this.props.apiDispatcher(dashboard.switchAccountApi(newUser[0].consumerNumber));
                console.log('Switch Account API', data);
                await this.props.performSwitchAccountActions(data);
                console.log('Perform Switch Account Actions', data);
                await this.props.setActiveCount(this.props.activeCount+ 1);
                console.log('Active Count', data);
                this.onRefresh();

                // let data = await this.props.apiDispatcher(dashboard.accountDetailsApi(this.props.userDetails.mobilenumber))
                // this.props.setAccountDetails(data.data);
                // alert('Account Switch Successfull');
            } catch (e) {
                console.log('Error or Warning.','Status:',e.status,'Message',e.data);
                Alert.alert("Error Warning",`Status: '${e.status},'Message ',${e.data}`,[{ text: "OK"}]);
            }
        }
        console.log('After',this.state.users);
    }

    renderItem = ({item, index}) => {
        console.log('Account',item);
        return (
            <View style={[styles.flexOne]}>
                <View style={[styles.row, styles.paddingHorizontal24, styles.spaceBetween, this.state.currentUserId == item.consumerNumber ?  this.props.darkMode ? styles.bgMediumGray : styles.bgOffWhite : null]}>
                    
                    {/* <View style={[styles.flexOne, styles.centerHorizontal]}>
                        <RadioButton key={item.consumerNumber} button={item} size={12} color={Colors.green} onClick={this.changeActiveRadioButton.bind(this,index)} />
                    </View> */}
                    <Pressable onPress={()=>this.state.currentUserId == item.consumerNumber ? null : this.confirmSwitch(index, item.consumerName)} style={[styles.flexFour, styles.row]}>
                        <View style={[styles.flexOne, styles.allCenter]}>
                            <Text style={[styles.small, this.props.darkMode ? styles.white: styles.black, styles.opacity80perc]}>
                                {index+1}
                            </Text>
                        </View>
                        <View style={[styles.flexThree]}>
                            <Text style={[styles.marginVertical10,  styles.extraSmall, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                                { item.consumerName }
                            </Text>
                        </View>
                        <View style={[styles.flexTwoAndHalf]}>
                            <Text style={[styles.marginVertical10,  styles.extraSmall, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                                { item.consumerNumber }
                            </Text>
                        </View>
                    </Pressable>
                    <Pressable onPress={()=> this.state.currentUserId == item.consumerNumber ? null : this.deleteAccount(item.consumerNumber)}  style={{flex:0.6}}>
                        {this.state.currentUserId != item.consumerNumber && <MIcons name="delete-outline" color={Colors.green} size={20}/>}
                    </Pressable>
              </View>
              <View style={[{ borderBottomWidth:0.7 }, styles.marginHorizontal20, styles.opacity25perc, this.props.darkMode ?{ borderColor:Colors.white } : { borderColor:Colors.black }]}/>
            </View>
        );
    }

    render(){
        console.log('User details',this.props.userDetails.CANumber, this.props.commonSelectors);
        const {language, darkMode} = this.props;
        // const {comingFrom} = this.props.route.params;
        // console.log("naviagation props ",comingFrom);
        // ()=>{
            // comingFrom === 'drawer' ? this.setState({add:true}) :null;
        // }
        //.getParams('comingFrom'),this.setState({add:true})
        return(
            <ErrorBoundaryMainComponent>
        <TouchableWithoutFeedback onPress={this.focusOutAll} >
            <KeyboardAvoidingView style={[styles.flexOne]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>               
            { this.state.counter < 7 && this.state.counter > 0 ? 
                    <ExtendedLoader
                        counter={this.state.counter < 7 && this.state.counter > 0 ? this.state.counter : false}
                        message1={strings[language].multipleAccounts.message1}
                        message2={`${strings[language].multipleAccounts.message2} ${this.state.selectedUser[0].consumerName}`}
                        message3={strings[language].multipleAccounts.message3}
                        message4={strings[language].multipleAccounts.message4}
                    />
                    : 
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                    style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader]}
                >
                    {this.state.noData ?
                        <View style={[ styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
                            <DataNotFound darkMode={darkMode}/> 
                        </View>
                    :
                    <>
                    { darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
                        {!this.state.otpStatus || !this.state.add ?
                        <View>
                            <View style={[styles.marginVertical, styles.row, styles.paddingHorizontal24]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                    {`${strings[language].multipleAccounts.manage} `}
                                </Text>
                                <Text style={[styles.darkGreen, styles.medium]}>
                                    {strings[language].multipleAccounts.multipleAccounts}
                                </Text>
                            </View>
                            { !this.state.add && <View style={[styles.paddingHorizontal24]} >
                                <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                    {strings[language].multipleAccounts.headerContext}
                                </Text>
                            </View> }
                        </View> : null }
                        { !this.state.add ?
                        <>
                            <View style={[styles.paddingHorizontal24, styles.padding16]}>
                                <Pressable disabled={this.state.totalMembers < 20 ? false : true} onPress={()=> this.setState({ add: true })}  style={[styles.absolute, styles.zIndex, {right: 0, top: 0}, styles.icon50, this.state.totalMembers < 20 ? styles.bgGreen : styles.bgMediumGray , styles.allCenter, styles.elevate]}>
                                    <EIcons name={'plus'} size={25} color={Colors.white}/>
                                </Pressable>
                                <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.marginVertical10, styles.paddingTop, styles.elevate3]}>
                                    <View style={[styles.row, styles.paddingVertical12, styles.paddingHorizontal24]}>
                                        <Text style={[darkMode ? styles.white : styles.black, styles.regular]}>
                                            {`${strings[language].multipleAccounts.listOf}  `}
                                        </Text>
                                        <Text style={[styles.regular, styles.darkGreen]}>
                                            {strings[language].multipleAccounts.accountsHandled}
                                        </Text>
                                    </View>
                                    <View style={[]}>
                                        <View style={[styles.row, styles.spaceBetween, styles.paddingVertical4, styles.paddingHorizontal24]}>
                                            <View style={[styles.flexOne]}>
                                                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.small]}>
                                                    {strings[language].multipleAccounts.slNo}
                                                </Text>
                                            </View>
                                            <View style={[styles.flexThree]}>
                                                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.small]}>
                                                    {strings[language].multipleAccounts.name}
                                                </Text>
                                            </View>
                                            <View style={[styles.flexTwo]}>
                                                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.small]}>
                                                    {strings[language].multipleAccounts.caNo}
                                                </Text>
                                            </View>
                                            <View style={[styles.flexOneAndHalf, styles.centerHorizontal]}>
                                                <Text style={[this.props.darkMode ? styles.white : styles.black, styles.normal]}>
                                                    {strings[language].multipleAccounts.action}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={[{ borderBottomWidth:0.7 }, styles.marginHorizontal20, styles.opacity25perc, this.props.darkMode ? { borderColor: Colors.white } : { borderColor:Colors.black }]}/>
                                        {this.state.users ? <FlatList
                                            // refreshing={this.state.refreshList}
                                            showsVerticalScrollIndicator={false}
                                            style={{height: Dimensions.get("window").height * 90 / Dimensions.get("window").width}}
                                            data={this.state.users}
                                            renderItem={this.renderItem}
                                            numColumns={1}
                                            initialNumToRender={10}
                                            ref={ref => this.listView = ref}
                                            keyExtractor={(item, index) => item.name + index}
                                            extraData={this.state.users}
                                        /> : 
                                            <View style={[styles.allCenter, {height: Dimensions.get("window").height * 90 / Dimensions.get("window").width}]}>
                                               <LoaderComponent/>
                                            </View>
                                
                                        }
                                        <View style={[styles.allCenter, styles.paddingVertical12]}>
                                            <Text style={[styles.green, styles.small]}>
                                                {strings[language].multipleAccounts.tableFooter}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.width, styles.row, styles.allCenter]}>
                            {/* <View style={[ styles.flexStartHorizontal, styles.paddingHorizontal30]}>
                                <Pressable onPress={() => this.switchAccount() } style={[styles.bgDarkGreen, styles.padding, styles.paddingHorizontal24, styles.radius16, styles.elevate2]}>
                                    <Text style={[styles.white]}>
                                        {strings[language].multipleAccounts.switch}
                                    </Text>
                                </Pressable>
                            </View> */}
                            {/* <View style={[styles.flexEndHorizontal, styles.paddingHorizontal30]}>
                                <Pressable onPress={() => this.selectAll() } style={[styles.bgDarkGreen, styles.padding, styles.paddingHorizontal24, styles.radius16, styles.elevate2]}>
                                    <Text style={[styles.white]}>
                                        {strings[language].multipleAccounts.selectAll}
                                    </Text>
                                </Pressable>
                            </View> */}
                                </View>
                        </>
                    :
                        <>
                        {this.state.otpStatus ?
                        <View style={[styles.allCenter, {paddingTop: height/10}]}>
                            <Pressable onPress={()=>this.setState({ otpStatus: false, error: '', newCANumber: '', otp: '' })} style={[styles.bgDarkGreen, styles.mediumImage, styles.allCenter]}>
                                <Text>
                                    <FIcon name="remove" size={35} color="#fff" />
                                </Text>
                            </Pressable>
                        </View> : null }
                        <View style={[!this.state.otpStatus ? {paddingTop: height/20} : {paddingTop: 10}, styles.paddingHorizontal30]}>
                            <Form3dBackgroundComponent/>
                            <View style={[!this.state.otpStatus ?  {height: width/1.6} : {height: width/1.3}, styles.extraRadius, styles.bgDarkGray]}>
                                <View style={[styles.flexOne, styles.row, styles.marginLeft32, styles.centerHorizontal]}>
                                    <Text style={[styles.fontSize25, styles.palanquinRegular, styles.white]}>
                                        {!this.state.otpStatus ? strings[language].multipleAccounts.consumer : strings[language].multipleAccounts.enter}
                                    </Text>
                                    <Text style={[styles.fontSize25, styles.palanquinRegular, styles.darkGreen]}>
                                        {!this.state.otpStatus ? ` ${strings[language].multipleAccounts.number}` : ` ${strings[language].multipleAccounts.otp}`}
                                    </Text>
                                </View>
                                {!this.state.otpStatus ?
                                    <View style={[styles.paddingHorizontal20, styles.flexOne]}>
                                        <View style={[{ backgroundColor: this.state.lableCNo ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding24, styles.radius16, styles.centerVertical]}>
                                            <Text style={[{color: '#b8b1b0'}, this.state.lableCNo || this.state.consumerNumber ? styles.small : styles.normal]}>
                                                {strings[language].multipleAccounts.consumerNumber}
                                            </Text>
                                            <TextInput
                                                value={this.state.newCANumber}
                                                style={[styles.medium, { justifyContent:"flex-start", paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: this.state.consumerNumber && !this.state.lableCNo ? null : 0.7},styles.white,styles.paddingRegular]}
                                                ref={(input) => { this.consumerNumberInput = input; }}
                                                onFocus={ () => this.setState({lableCNo: true})}
                                                // onBlur={ () => { this.state.newCANumber?.length < 12 && this.setState({ error: "Consumer Id should contain only 12 digits"});  this.setState({lableCNo: false})}}
                                                // keyboardType={'number-pad'}
                                                maxLength={13}
                                                onChangeText={text=>{
                                                    const data = CANumberValidation(text);
                                                    this.setState({ error: data.error, newCANumber: data.CANumber }) 
                                                    text.length === 13 && this.consumerNumberInput.blur();
                                                }}
                                            />
                                        </View>
                                    </View> :
                                    <>
                                        {/* <View style={[styles.flexOne, styles.paddingHorizontal24]}>
                                            <View style={[ styles.flexOne, { backgroundColor: this.state.lablePassword ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding24, styles.radius16, styles.centerVertical]}>
                                                <Text style={[{ color: '#b8b1b0'}, this.state.lablePassword || this.state.password ? styles.small : styles.normal]}>
                                                    Password
                                                </Text>
                                                <TextInput
                                                    value={this.state.password}
                                                    style={[styles.medium, { paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: this.state.password && !this.state.lablePassword ? null : 0.7 },styles.white, styles.paddingRegular]}
                                                    ref={(input) => { this.passwordInput = input; }}
                                                    onFocus={ () => this.setState({lablePassword: true})}
                                                    onBlur={ () => this.setState({lablePassword: false})}
                                                    onChangeText={password=>{
                                                        this.setState({password: password}, this.checkPassword)
                                                    }}
                                                    secureTextEntry={true}
                                                />
                                            </View>
                                        </View>
                                        <View style={[styles.flexOne, styles.paddingHorizontal24]}>
                                            <View style={[styles.flexOne, { backgroundColor: this.state.lableCPass ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding24, styles.radius16, styles.centerVertical]}>
                                                <Text style={[{ color: '#b8b1b0', flexBasis: 18 }, this.state.lableCPass || this.state.confirmPassword ? styles.small : styles.normal]}>
                                                    Confirm Password
                                                </Text>
                                                <TextInput
                                                    value={this.state.confirmPassword}
                                                    style={[styles.medium, { paddingHorizontal: 0, borderColor: Colors.green, flexBasis: PixelRatio.get() < 2.5 ? 28 : 28, borderBottomWidth: this.state.confirmPassword && !this.state.lableCPass ? null : 0.7 }, styles.white, styles.paddingRegular]}
                                                    ref={(input) => { this.otpInput = input; }}
                                                    onFocus={ () => this.setState({lableCPass: true})}
                                                    onBlur={ () => this.setState({lableCPass: false, error:this.state.confirmPassword !== this.state.password ? "Passwords dont match": ""})}
                                                    onChangeText={password=>{
                                                        this.setState({confirmPassword: password})
                                                    }}
                                                />
                                            </View>
                                        </View> */}

                                            {/* <View style={[styles.flexQuarterToOne, styles.row, styles.paddingHorizontal30, styles.padding, styles.flexEndHorizontal]}>
                                                <Text style={[styles.fontSize25, styles.white]}>
                                                    Enter
                                                </Text>
                                                <Text style={[styles.fontSize25, styles.darkGreen]}>
                                                    {' OTP'}
                                                </Text>
                                            </View> */}
                                            <View style={[]}>

                                            <View style={[styles.paddingHorizontal24, styles.centerVertical]}>
                                                <View style={[{ backgroundColor: this.state.lableCNo ? Colors.lightGray : 'transparent'}, styles.spaceBetweenVertical, styles.padding24, styles.paddingVertical, styles.radius16, styles.centerVertical]}>
                                                    <Text style={[styles.white, styles.opacity65perc, styles.fontSize13]}>
                                                        {strings[language].multipleAccounts.mobileNumber}
                                                    </Text>
                                                    <Text style={[styles.medium, styles.white]}>
                                                        {/* 9872382939 */}
                                                        {this.state.mobileNumber ? ( "XXXXXX" + this.state.mobileNumber.substr(this.state.mobileNumber.length - 4)) : ""}
                                                    </Text>
                                                    <View style={[styles.marginVertical ,{borderTopWidth: 0.8, borderColor: Colors.green}]}/>
                                                </View>
                                            </View>

                                            <View style={[, styles.paddingHorizontal24, styles.centerVertical, styles.paddingBottom20]}>
                                                <View style={[ { backgroundColor: this.state.lablePass ? Colors.bluewhite : 'transparent'}, styles.spaceBetweenVertical, styles.padding24, styles.paddingVertical, styles.radius16, styles.centerVertical]}>
                                                    <Text style={[styles.white, styles.opacity65perc, this.state.lablePass || this.state.password ? styles.small : styles.normal]}>
                                                        {strings[language].multipleAccounts.otp}
                                                    </Text>
                                                    <TextInput
                                                        value={this.state.otp}
                                                        style={[styles.medium, { paddingHorizontal: 0,paddingBottom:6, borderColor: Colors.green, borderBottomWidth: this.state.password && !this.state.lablePass  ? null : 0.7}, styles.white, styles.paddingRegular]}
                                                        ref={(input) => { this.otpInput = input; }}
                                                        onFocus={ () => this.setState({lablePass: true})}
                                                        onBlur={ () => this.setState({lablePass: false})}
                                                        onChangeText={text => {
                                                            var validationRegex = RegExp(/[0-9]+/, "g");
                                                            if ( text === "" || validationRegex.test(text)) {
                                                                this.setState({otp: text})
                                                            } else {

                                                            }
                                                            if (text.length === 4) {
                                                                this.setState({otpValidation: true})
                                                                this.otpInput.blur();
                                                            }
                                                            else {
                                                                this.setState({otpValidation: false})
                
                                                            }
                                                        }}
                                                        keyboardType={'numeric'}
                                                        underlineColorAndroid={"transparent"}
                                                        maxLength={4}
                                                    />
                                                </View>
                                            </View>
                                        </View>

                                    </>
                                }
                                <View style={[styles.paddingHorizontal20,]}>
                                    <BodyText1 style={[styles.paddingBottom20, styles.paleRed, styles.textCenter]}>
                                        {this.state.error}
                                    </BodyText1>
                                </View>
                            </View> 
                            <Pressable
                                onPress={()=> !this.state.otpStatus ? this.sendOTP() : this.verifyAccount()}
                                // onPress={() => this.sendOTP()}
                                disabled={!this.state.otpStatus ? this.state.newCANumber && !this.state.error ? false : true : this.state.otpValidation ? false : true}
                                style={[styles.paddingRegular, !this.state.otpStatus ? styles.paddingHorizontal20 : styles.paddingHorizontal30, styles.radius20,!this.state.otpStatus ? (this.state.newCANumber && !this.state.error) ? styles.bgDarkGreen : styles.bgDarkGray : this.state.otpValidation ? styles.bgDarkGreen : styles.bgDarkGray , styles.selfCenter, {marginTop:height/20}]}>
                                <Text style={[styles.white, styles.regularPlus, styles.paddingVertical6]}>
                                    {!this.state.otpStatus ? strings[language].multipleAccounts.generateOtp : strings[language].multipleAccounts.submit}
                                    {/* {strings[language].multipleAccounts.submit} */}
                                </Text>
                            </Pressable>
                        </View>
                        </>
                    }
                    </>}
                </ScrollView>
                }
                 </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        language: commonSelectors.language(state),
        userDetails: commonSelectors.userDetails(state),
        accountDetails: commonSelectors.accountDetails(state),
        currentRoute: commonSelectors.currentRoute(state),
        commonSelectors: commonSelectors,


    }

}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setActiveCount: (state) => dispatch(userDetailActions.setActiveCount(state)),
        setAccountDetails: (data={}) => dispatch(userDetailActions.setAccountDetails(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
        performSwitchAccountActions: (data) => dispatch(loginActions.performSwicthAccount(data)),

    }
}
const MultipleAccountsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(MultipleAccounts);
export {MultipleAccountsScreen}
