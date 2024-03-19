// import React from 'react';
// import { connect } from "react-redux";
// import { Text, View, StatusBar, FlatList, Pressable, Dimensions, TextInput, Alert, Platform, ActivityIndicator, TouchableWithoutFeedback, ScrollView, RefreshControl, KeyboardAvoidingView} from 'react-native';
// // Styles and Colors
// import { styles } from '../../styles';
// import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// // Components
// import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
// import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound';
// import {BodyText1} from "../../components/common";
// import CircleTickComponent from '../../components/common/circleTick/CircleTick'
// import DottedBorderComponent from 'SmartgasConsumerApp/js/components/common/progressSteps/DottedBorder';
// import ProgressStepsComponent from 'SmartgasConsumerApp/js/components/common/progressSteps/ProgressSteps';
// // Icons
// import MIcons from 'react-native-vector-icons/MaterialIcons';
// import FIcons from 'react-native-vector-icons/Feather';
// import SLIcons from 'react-native-vector-icons/SimpleLineIcons';
// import EIcons from 'react-native-vector-icons/Entypo';
// // Constants
// import { REGISTER } from 'SmartgasConsumerApp/js/constants/lottie';
// // Library
// import DropDownPicker from 'react-native-dropdown-picker';
// import LottieView from 'lottie-react-native';
// import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// import Modal from 'react-native-modal';
// // Backend
// import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
// import {strings} from "SmartgasConsumerApp/js/strings";
// import * as dashboard from "../../api/dashboard";
// import {apiDispatcher, userDetailActions} from "../../actions";
// import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
// import { Form3dBackgroundComponent } from '../../components/common/Form3dBackground';
// import { login, registration } from '../../api';
// import { CANumberValidation } from '../../helpers/common/userInputValidations';

// const { width ,height } = Dimensions.get("window");

// class UserManagement extends React.Component{

//     constructor(props){
//         super(props)
//         this.state = {
//             add: false,
//             index: 0,
//             accountVeried: false,
//             newCANumber: this.props.userDetails.CANumber
//             // error:'Chekc'
//         }
//     }

//     componentDidMount(){
//         this.props.navigation.setOptions({ header : ()=> null })

//         // this.props.navigation.setOptions({ headerRight : ()=> null });
//         // this.props.navigation.setOptions({ headerLeft : () => (
//         //     <Pressable style={[styles.row,styles.allCenter,styles.paddingHorizontal24]} onPress={() => this.props.navigation.navigate('/settings')}>
//         //         <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
//         //         <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter, styles.fontSize15, styles.paddingHorizontal6]}>
//         //             {strings[this.props.language].back}
//         //         </Text>
//         //     </Pressable>
//         // ), });

//         this.syncData()

//         const didFocusSubscription = this.props.navigation.addListener(
//             'focus',
//             payload => {
//                 if (this.props.currentRoute !== 'MemberAccountDetails') {
//                     this.props.setCurrentRoute('MemberAccountDetails');
//                     this.syncData()
//                 }
//             }
//         );
//         this.props.setCurrentRoute('MemberAccountDetails');
//     }

//     componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
//         if(this.props.members !== prevProps.members) {
//             let data = this.props.members ? JSON.parse(JSON.stringify(this.props.members)) : [];
//             console.log(data, this.props.members)
//             if (this.props.members.length>0) {
//                 this.setState({
//                     members: this.props.members,
//                     refreshing: false
//                 }, () => console.log(this.state,"Update"))
//             }
//         }

//         if(this.props.activeCount !== prevProps.activeCount) {
//             this.syncData();
//         }
//     }

//     syncData = async () => {
//         try {
//             this.setState({loading: true})
//             let data = await this.props.apiDispatcher(dashboard.memberAccountDetailsApi(this.props.language == 'english' ? 1 : 2))
//             // if(data.status == 200){
//                 let relationship = await this.props.apiDispatcher(dashboard.relationshipsApi(this.props.language == 'english' ? 1 : 2 ))
//                 relationship = relationship.data.map(d=> {let data= {}; data.label=d.relationshipName; data.value = d.relationshipID; return data;})
//                 this.setState({ relationship, totalMembers: data.data.length ? data.data.length : 0, loading: false})
//                 console.log("Member Details",data.data, "State",this.state.relationship, this.state.totalMembers,);
//                 this.props.setMemberDetails(data.data);
//             if(data.status == 204){
//                 this.setState({ noData: true, loading: false })
//             }else if(data.status == 212){
//                 this.setState({memberError: data.data.message, loading: false})
//                 console.log('MEber data', data.data.message);
//             }
//         } catch (e) {
//             console.log('Error Message',e);
//             this.setState({error: e.ErrorDescription, refreshing: false, loading: false})
//         }
//     }
//     onRefresh = () => {
//         this.setState({refreshing: true});
//         this.syncData()

//     };

//     steps = () =>{
//         if (this.state.name && this.state.contactNumber && this.state.relation)
//         this.setState({index: this.state.index+1})
//     }

//     focusOutAll = () => {
//         this.inviteInput ? this.inviteInput.blur() : null;
//     };

//     renderItem = ({item, index}) => {
//         console.log('Members',item, this.state.member);
//         return (
//             <View style={[styles.flexOne]}>
//                 <View style={[styles.flexOne, styles.row, styles.spaceBetween]}>
//                     <View style={[styles.flexOne]}>
//                         <Text style={[styles.marginVertical10, styles.extraSmall, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
//                             { item.memberName }
//                         </Text>
//                     </View>
//                     <View style={[styles.flexOne, styles.justifyContentFlexStar]}>
//                         <Text style={[styles.marginVertical10, styles.extraSmall, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
//                             { item.mobileNumber }
//                         </Text>
//                     </View>
//                     <View style={[styles.flexHalf, styles.justifyContentFlexStart]}>
//                         <Text style={[styles.marginVertical10, styles.extraSmall, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
//                             { item.relationship }
//                         </Text>
//                     </View>
//                     <Pressable onPress={()=> {this.deleteUser(item.mobileNumber)}} style={[styles.flexHalf, styles.centerHorizontal]}>
//                         {item.relationship != "Master" && <MIcons name="delete-outline" color={Colors.darkGreen} size={18}/>}
//                     </Pressable>
//               </View>
//               <View style={[{ borderBottomWidth:0.7 }, styles.opacity25perc, styles.paddingTop2, this.props.darkMode ?{ borderColor:Colors.white } : { borderColor:Colors.black }]}/>
//             </View>
//         );
//     };

//     deleteUser = async (memberToDelete) => {
//         // Alert.alert('User Disabled Successfull',data.data.Description)
//         Alert.alert(
//             "Disable Member Confirmation",
//             "Do you want to disable the Member",
//             [
//               {
//                 text: "Cancel",
//                 onPress: () => console.log("Cancel Pressed"),
//                 style: "cancel"
//               },
//               { text: "OK", onPress: async () => {
//                     let data = await this.props.apiDispatcher(dashboard.deleteMemberApi(memberToDelete))
//                     console.log('User Removed Response',data);
//                     Alert.alert("Info",`Member with Contact No: ${memberToDelete} has been deleted succesfully`);

//                     // Alert.alert('User Disabled Successfull',data.data.Description)
//                     this.syncData();
//               } }
//             ],
//             { cancelable: false }
//           );
       
//     }

//     submitUser = async () => {
//         try {
//             let data = await this.props.apiDispatcher(dashboard.addMemberAccountDetailsApi(this.state.name, this.state.contactNumber, this.state.relation))
//             console.log("Member Details",data.data);
//             this.syncData();
//             this.setState({index: this.state.index+1})

//         } catch (e) {
//             console.log("Member Details Errors",e);
//             if(e.status == 430 && e.data.ErrorDescription.includes("Mobile Number")){
//                 this.setState({ error: "Member with the mobile number already exist. Please enter different mobile number" })
//             }
//             else if(e.status == 430 && e.data.ErrorDescription.includes("Cannot use the member name")){
//                 this.setState({ error: `Member name ${this.state.name} is already assigned` })
//             }
//             else 
//                 this.setState({error: "Can not add member as a Master"})
//             // Cannot use the member name: Rizwan already assigned to CANumber: 209000019822
//             Alert.alert("Warning",this.state.error);
//             this.setState({refreshing: false, accountVeried: false})
//         }
//     }

//     // Send OTP
//     sendOTP =  async () => {
//         this.setState({loading: true, })
//         try{
//             let resp = await this.props.apiDispatcher(registration.verifyConsumerID(this.state.newCANumber, 4))
//             console.log('User Mangement Acount send OTP',resp);
//             this.setState({loading: false})
//             if(resp.data.statusText == "OTP_GENERATED"){
//                 this.setState({otpStatus: true, mobileNumber: resp.data.MobileNumber})
//             }
//         }
//         catch(e){
//             console.log('User Management Send OTP error',e);
//             this.setState({notValidUser: e.data.ErrorDescription == 'CANumuber is not registered' && 'Consumer ID is not Linked with SBPDCL. The Application is only for those consumers who have installed smart meter in their premises', loading: false})
//         }
//     }

//     verifyAccount = async () => {
//         this.setState({ loading: true })
//         try{
//             const resp = await this.props.apiDispatcher(login.loginWithOtpApi(this.state.newCANumber, this.state.otp, 7));
//             console.log('User Management Verify OTP Response', resp);
//             this.setState({loading: false})
//             if(resp.data.Status == "OTP_VERIFIED"){
//                 this.setState({ accountVeried: true, add: false })
//             }
//         }
//         catch(e){
            
//             console.log('User Management Verify OTP error',e);
//             if(e.ErrorDescription == "OTP_EXPIRED") 
//             this.setState({error: 'OTP Expired', loading: false})
//         }
//     }


//     render(){
//         const {language, darkMode} = this.props;


//         return(
//             <ErrorBoundaryMainComponent>
//             <TouchableWithoutFeedback onPress={this.focusOutAll}>

//             <ScrollView
//                 showsVerticalScrollIndicator={false}
//                 refreshControl={
//                     <RefreshControl
//                         tintColor={Colors.sunglowYellow}
//                         refreshing={this.state.refreshing}
//                         onRefresh={this.onRefresh} />
//                 }
                
//                 style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeaderHalf]}
//             >
//                 {this.state.noData ?
//                     <View style={[ styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
//                         <DataNotFound darkMode={darkMode}/> 
//                     </View>
//                 :
//                 <>
//                     <KeyboardAvoidingView  keyboardVerticalOffset={-200} style={[styles.flexOne,]} behavior={Platform.OS === 'ios' ? 'position' : undefined}>               

//                         { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'/>}
//                         <Pressable style={[styles.row, styles.paddingHorizontal20]} onPress={() => this.props.navigation.navigate('/settings')}>
//                             <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
//                             <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter,styles.paddingHorizontal6]}>
//                                 {strings[this.props.language].back}
//                             </Text>
//                         </Pressable>
//                         <View style={[styles.marginVertical, styles.paddingHorizontal24, styles.row]}>
//                             <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
//                                 {strings[language].userManagement.user}
//                             </Text>
//                             <Text style={[styles.darkGreen, styles.medium]}>
//                                 {` ${strings[language].userManagement.management}`}
//                             </Text>
//                         </View>
//                         <View style={[styles.paddingBottom20, styles.paddingHorizontal24]} >
//                             <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
//                                 {strings[language].userManagement.headerContext}
//                             </Text>
//                         </View>
//                         { !this.state.add ?
//                             <View style={[styles.paddingHorizontal24]}>
//                                 <Pressable
//                                     disabled={(this.state.totalMembers < 5 || !this.state.totalMembers) && !this.state.loading ? false : true}
//                                     onPress={()=> this.setState({ add: true })} 
//                                     style={[
//                                         styles.absolute, styles.zIndex, {right: 0, top: -15}, styles.icon50, styles.allCenter, styles.elevate,
//                                         (this.state.totalMembers < 5 || !this.state.totalMembers) && !this.state.loading ? styles.bgGreen : styles.bgMediumGray 
//                                     ]}
//                                 >
//                                     <EIcons name={'plus'} size={25} color={Colors.white}/>
//                                 </Pressable>
//                                 <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.marginVertical10, styles.paddingHorizontal24, styles.paddingTop10, styles.elevate3]}>
//                                     <View style={[styles.row, styles.paddingVertical12]}>
//                                         <Text style={[darkMode ? styles.white : styles.black, styles.regular]}>
//                                             {`${strings[language].userManagement.listOf}  `}
//                                         </Text>
//                                         <Text style={[styles.regular, styles.darkGreen]}>
//                                             {strings[language].userManagement.members}
//                                         </Text>
//                                     </View>
//                                     <View style={[]}>
//                                         <View style={[styles.row, styles.paddingVertical4]}>
//                                             <View style={[styles.flexOne]}>
//                                                 <Text style={[this.props.darkMode ? styles.white : styles.black, styles.small]}>
//                                                     {strings[language].userManagement.name}
//                                                 </Text>
//                                             </View>
//                                             <View style={[styles.flexOne, styles.justifyContentFlexStart]}>
//                                                 <Text style={[this.props.darkMode ? styles.white : styles.black, styles.small]}>
//                                                     {strings[language].userManagement.contactNo}
//                                                 </Text>
//                                             </View>
//                                             <View style={[styles.flexHalf, styles.justifyContentFlexStart]}>
//                                                 <Text style={[this.props.darkMode ? styles.white : styles.black, styles.small]}>
//                                                     {strings[language].userManagement.link}
//                                                 </Text>
//                                             </View>
//                                             <View style={[styles.flexHalf, styles.centerHorizontal]}>
//                                                 <Text style={[this.props.darkMode ? styles.white : styles.black, styles.small]}>
//                                                     {strings[language].userManagement.action}
//                                                 </Text>
//                                             </View>
//                                         </View>
//                                         <View style={[{ borderBottomWidth:0.7 }, styles.opacity25perc, styles.paddingTop2, this.props.darkMode ? { borderColor: Colors.white } : { borderColor:Colors.black }]}/>
//                                         {this.state.members ?
//                                             <FlatList
//                                                 showsVerticalScrollIndicator={false}
//                                                 style={{height:Dimensions.get("window").height* 105/Dimensions.get("window").width}}
//                                                 data={this.state.members}
//                                                 renderItem={this.renderItem}
//                                                 numColumns={1}
//                                                 initialNumToRender={10}
//                                                 ref={ref => this.listView = ref}
//                                                 keyExtractor={(item, index) => item.memberName + index}
//                                             /> : 
//                                             this.state.loading ?
//                                                 <View style={[styles.allCenter, {height: Dimensions.get("window").height * 90 / Dimensions.get("window").width}]}>
//                                                     <LoaderComponent/>
//                                                 </View> : 
//                                                     <View style={[styles.allCenter, {height: Dimensions.get("window").height * 90 / Dimensions.get("window").width}]}>
//                                                         <Text style={[darkMode ? styles.white : styles.black, styles.opacity50perc, styles.small]}>
//                                                             {this.state.memberError}
//                                                         </Text>
//                                                     </View> 
//                                         }
//                                         <View style={[styles.allCenter, styles.paddingVertical12]}>
//                                             <Text style={[styles.green, styles.small]}>
//                                                 {strings[language].userManagement.tableFooter}
//                                             </Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View>
//                         :
//                             <>
//                                 {!this.state.accountVeried ? <View style={[!this.state.otpStatus ? {paddingTop: height/20} : {paddingTop: 10}, styles.paddingHorizontal30]}>
//                                     <Form3dBackgroundComponent/>
//                                     <View style={[!this.state.otpStatus ?  {height: width/1.6} : {height: width/1.3}, styles.extraRadius, styles.bgDarkGray]}>
//                                         <View style={[styles.flexOne, styles.row, styles.marginLeft32, styles.centerHorizontal]}>
//                                             <Text style={[styles.fontSize25, styles.palanquinRegular, styles.white]}>
//                                                 {!this.state.otpStatus ? strings[language].multipleAccounts.consumer : strings[language].multipleAccounts.enter}
//                                             </Text>
//                                             <Text style={[styles.fontSize25, styles.palanquinRegular, styles.darkGreen]}>
//                                                 {!this.state.otpStatus ? ` ${strings[language].multipleAccounts.number}` : ` ${strings[language].multipleAccounts.otp}`}
//                                             </Text>
//                                         </View>
//                                         {!this.state.otpStatus ?
//                                             <View style={[styles.paddingHorizontal20, styles.flexOne]}>
//                                                 <View style={[{ backgroundColor: this.state.lableCNo ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding24, styles.radius16, styles.centerVertical]}>
//                                                     <Text style={[{color: '#b8b1b0'}, this.state.lableCNo || this.state.consumerNumber ? styles.small : styles.normal]}>
//                                                         {strings[language].multipleAccounts.consumerNumber}
//                                                     </Text>
//                                                     <TextInput
//                                                         value={this.state.newCANumber}
//                                                         style={[styles.medium, { justifyContent:"flex-start", paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: this.state.consumerNumber && !this.state.lableCNo ? null : 0.7},styles.white,styles.paddingRegular]}
//                                                         ref={(input) => { this.consumerNumberInput = input; }}
//                                                         onFocus={ () => this.setState({lableCNo: true})}
//                                                         // onBlur={ () => { this.state.newCANumber?.length < 12 && this.setState({ error: "Consumer Id should contain only 12 digits"});  this.setState({lableCNo: false})}}
//                                                         // keyboardType={'number-pad'}
//                                                         maxLength={13}
//                                                         onChangeText={text=>{
//                                                             // this.setState({newCANumber: text})
//                                                             const data = CANumberValidation(text);
//                                                             this.setState({ error: data.error, newCANumber: data.CANumber }) 
//                                                             text.length === 13 && this.consumerNumberInput.blur();
//                                                         }}
//                                                     />
//                                                 </View>
//                                                 <Modal isVisible={this.state.notValidUser ? true : false} animationInTiming={1000} style={[styles.marginHorizontal24,{paddingRight:20}]}>
//                                                     <Pressable onPress={()=> this.setState({ notValidUser: '' })} style={[{top:20,right:-20},styles.zIndex, styles.icon40, styles.right, styles.bgMediumGray , styles.allCenter]}>
//                                                         <FIcons name={'x'} size={20} color={Colors.white}/>
//                                                     </Pressable>
//                                                     <View style={[{backgroundColor: '#c5cdd4'}, styles.radius20, styles.padding, styles.paddingVertical20, styles.allCenter]}>
//                                                         <LottieView style={[{height:200}]} source={REGISTER.userAccount} autoPlay loop />
//                                                         <Text style={[styles.black, styles.paddingHorizontal10, styles.textCenter, styles.opacity50perc, styles.paddingBottom12]}>
//                                                             {this.state.notValidUser}
//                                                         </Text>
//                                                     </View>
//                                                 </Modal>
//                                             </View> :
//                                             <>
//                                                 {/* <View style={[styles.flexOne, styles.paddingHorizontal24]}>
//                                                     <View style={[ styles.flexOne, { backgroundColor: this.state.lablePassword ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding24, styles.radius16, styles.centerVertical]}>
//                                                         <Text style={[{ color: '#b8b1b0'}, this.state.lablePassword || this.state.password ? styles.small : styles.normal]}>
//                                                             Password
//                                                         </Text>
//                                                         <TextInput
//                                                             value={this.state.password}
//                                                             style={[styles.medium, { paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: this.state.password && !this.state.lablePassword ? null : 0.7 },styles.white, styles.paddingRegular]}
//                                                             ref={(input) => { this.passwordInput = input; }}
//                                                             onFocus={ () => this.setState({lablePassword: true})}
//                                                             onBlur={ () => this.setState({lablePassword: false})}
//                                                             onChangeText={password=>{
//                                                                 this.setState({password: password}, this.checkPassword)
//                                                             }}
//                                                             secureTextEntry={true}
//                                                         />
//                                                     </View>
//                                                 </View>
//                                                 <View style={[styles.flexOne, styles.paddingHorizontal24]}>
//                                                     <View style={[styles.flexOne, { backgroundColor: this.state.lableCPass ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding24, styles.radius16, styles.centerVertical]}>
//                                                         <Text style={[{ color: '#b8b1b0', flexBasis: 18 }, this.state.lableCPass || this.state.confirmPassword ? styles.small : styles.normal]}>
//                                                             Confirm Password
//                                                         </Text>
//                                                         <TextInput
//                                                             value={this.state.confirmPassword}
//                                                             style={[styles.medium, { paddingHorizontal: 0, borderColor: Colors.green, flexBasis: PixelRatio.get() < 2.5 ? 28 : 28, borderBottomWidth: this.state.confirmPassword && !this.state.lableCPass ? null : 0.7 }, styles.white, styles.paddingRegular]}
//                                                             ref={(input) => { this.otpInput = input; }}
//                                                             onFocus={ () => this.setState({lableCPass: true})}
//                                                             onBlur={ () => this.setState({lableCPass: false, error:this.state.confirmPassword !== this.state.password ? "Passwords dont match": ""})}
//                                                             onChangeText={password=>{
//                                                                 this.setState({confirmPassword: password})
//                                                             }}
//                                                         />
//                                                     </View>
//                                                 </View> */}

//                                                     {/* <View style={[styles.flexQuarterToOne, styles.row, styles.paddingHorizontal30, styles.padding, styles.flexEndHorizontal]}>
//                                                         <Text style={[styles.fontSize25, styles.white]}>
//                                                             Enter
//                                                         </Text>
//                                                         <Text style={[styles.fontSize25, styles.darkGreen]}>
//                                                             {' OTP'}
//                                                         </Text>
//                                                     </View> */}
//                                                     <View style={[]}>

//                                                     <View style={[styles.paddingHorizontal24, styles.centerVertical]}>
//                                                         <View style={[{ backgroundColor: this.state.lableCNo ? Colors.lightGray : 'transparent'}, styles.spaceBetweenVertical, styles.padding24, styles.paddingVertical, styles.radius16, styles.centerVertical]}>
//                                                             <Text style={[styles.white, styles.opacity65perc, styles.fontSize13]}>
//                                                                 {strings[language].multipleAccounts.mobileNumber}
//                                                             </Text>
//                                                             <Text style={[styles.medium, styles.white]}>
//                                                                 {/* 9872382939 */}
//                                                                 {this.state.mobileNumber ? ( "XXXXXX" + this.state.mobileNumber.substr(this.state.mobileNumber.length - 4)) : ""}
//                                                             </Text>
//                                                             <View style={[styles.marginVertical ,{borderTopWidth: 0.8, borderColor: Colors.green}]}/>
//                                                         </View>
//                                                     </View>

//                                                     <View style={[, styles.paddingHorizontal24, styles.centerVertical, styles.paddingBottom20]}>
//                                                         <View style={[ { backgroundColor: this.state.lablePass ? Colors.bluewhite : 'transparent'}, styles.spaceBetweenVertical, styles.padding24, styles.paddingVertical, styles.radius16, styles.centerVertical]}>
//                                                             <Text style={[styles.white, styles.opacity65perc, this.state.lablePass || this.state.password ? styles.small : styles.normal]}>
//                                                                 {strings[language].multipleAccounts.otp}
//                                                             </Text>
//                                                             <TextInput
//                                                                 value={this.state.otp}
//                                                                 style={[styles.medium, { paddingHorizontal: 0,paddingBottom:6, borderColor: Colors.green, borderBottomWidth: this.state.password && !this.state.lablePass  ? null : 0.7}, styles.white, styles.paddingRegular]}
//                                                                 ref={(input) => { this.otpInput = input; }}
//                                                                 onFocus={ () => this.setState({lablePass: true})}
//                                                                 onBlur={ () => this.setState({lablePass: false})}
//                                                                 onChangeText={text => {
//                                                                     var validationRegex = RegExp(/[0-9]+/, "g");
//                                                                     if ( text === "" || validationRegex.test(text)) {
//                                                                         this.setState({otp: text})
//                                                                     } else {

//                                                                     }
//                                                                     if (text.length === 4) {
//                                                                         this.setState({otpValidation: true})
//                                                                         this.otpInput.blur();
//                                                                     }
//                                                                     else {
//                                                                         this.setState({otpValidation: false})
                        
//                                                                     }
//                                                                 }}
//                                                                 keyboardType={'numeric'}
//                                                                 underlineColorAndroid={"transparent"}
//                                                                 maxLength={4}
//                                                             />
//                                                         </View>
//                                                     </View>
//                                                 </View>

//                                             </>
//                                         }
//                                         <View style={[styles.paddingHorizontal20,]}>
//                                             <BodyText1 style={[styles.paddingBottom20, styles.paleRed, styles.textCenter]}>
//                                                 {this.state.error}
//                                             </BodyText1>
//                                         </View>
//                                     </View> 
//                                     <Pressable
//                                         onPress={()=> !this.state.otpStatus ? this.sendOTP() : this.verifyAccount()}
//                                         disabled={!this.state.otpStatus ? this.state.newCANumber && !this.state.error ? false : true : this.state.otpValidation ? false : true}
//                                         style={[styles.marginBottom30Percent, styles.paddingRegular, !this.state.otpStatus ? styles.paddingHorizontal20 : styles.paddingHorizontal30, styles.radius20,!this.state.otpStatus ? (this.state.newCANumber && !this.state.error) ? styles.bgDarkGreen : styles.bgDarkGray : this.state.otpValidation ? styles.bgDarkGreen : styles.bgDarkGray , styles.selfCenter, {marginTop:height/20}]}>
//                                         {!this.state.loading ? <Text style={[styles.white, styles.regularPlus, styles.paddingVertical6]}>
//                                             {/* {!this.state.otpStatus ? strings[language].multipleAccounts.generateOtp : strings[language].multipleAccounts.submit} */}
//                                             {strings[language].multipleAccounts.submit}
//                                         </Text> : 
//                                         <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
//                                             <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
//                                             <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
//                                         </View>}
//                                     </Pressable>
//                                 </View> 
//                                 :
//                                 <View style={[styles.flexOne, styles.paddingHorizontal24, styles.marginBottom5Percent]}>
//                                     <DottedBorderComponent darkMode={darkMode}/>
//                                     <View style={[styles.row, styles.spaceBetween]}>
//                                         <ProgressStepsComponent step={'01'} label={strings[language].userManagement.fillDetails} bgColor={styles.bgDarkGreen} darkMode={darkMode}/>
//                                         <ProgressStepsComponent step={'02'} label={strings[language].userManagement.analysis}  bgColor={this.state.index > 0 ? styles.bgDarkGreen : styles.bgLightGray} darkMode={darkMode}/>
//                                         <ProgressStepsComponent step={'03'} label={strings[language].userManagement.results} bgColor={this.state.index > 1 ? styles.bgDarkGreen : styles.bgLightGray} darkMode={darkMode}/>
//                                     </View>
//                                     <View style={[ styles.marginVertical10, styles.marginBottom32]}>
//                                         { this.state.index == 0 ?
//                                             <View style={[ Platform.OS === 'android' ? null : darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.flexOne, styles.padding20, styles.marginVertical14, Platform.OS === 'android' ? null : styles.zIndex]}>
//                                                 <View style={[styles.row, styles.flexHalf, styles.centerHorizontal, styles.paddingBottom10]}>
//                                                     <Text style={[styles.fontSize15, darkMode ? styles.white : styles.black]}>
//                                                         {`${strings[language].userManagement.fillThe}  `}
//                                                     </Text>
//                                                     <Text style={[styles.fontSize15, styles.darkGreen]}>
//                                                         {strings[language].userManagement.details}
//                                                     </Text>
//                                                 </View>
//                                                 <View style={[styles.flexOne, styles.paddingVertical12]}>
//                                                     <View style={[styles.flexQuarterToOne, styles.flexEndVertical]}>
//                                                         <Text style={[styles.fontSize13, darkMode ? styles.white : styles.black, styles.opacity65perc]}>
//                                                             {strings[language].userManagement.name}
//                                                         </Text>
//                                                     </View>
//                                                     <View style={[styles.flexOneAndHalf]}>
//                                                         <TextInput
//                                                             style={[styles.fontSize17, { paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: 0.7}, styles.darkGreen, styles.paddingRegular]}
//                                                             ref={(input) => { this.passwordInput = input; }}
//                                                             onChangeText={text=>{
//                                                                 this.setState({name: text})
//                                                             }}
//                                                             value={this.state.name}
//                                                         />
//                                                     </View>
//                                                 </View>
//                                                 <View style={[styles.flexOne, styles.paddingVertical12]} >
//                                                     <View style={[styles.flexQuarterToOne, styles.flexEndVertical]}>
//                                                         <Text style={[styles.fontSize13, darkMode ? styles.white : styles.black, styles.opacity65perc]}>
//                                                             {strings[language].userManagement.contactNumber}
//                                                         </Text>
//                                                     </View>
//                                                     <View style={[styles.flexOneAndHalf]}>
//                                                         <TextInput
//                                                             maxLength={10}
//                                                             keyboardType={'number-pad'}
//                                                             style={[styles.fontSize17, { paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: 0.7}, styles.darkGreen, styles.paddingRegular]}
//                                                             ref={(input) => { this.passwordInput = input; }}
//                                                             onChangeText={text=>{
//                                                                 this.setState({contactNumber: text})
//                                                                 var phoneno = /^[6-9]\d{9}$/;
//                                                                 if(text.match(phoneno) && text.length>9){
//                                                                     this.setState({ errorMobile: ""})
//                                                                 }                  
//                                                                 else{
//                                                                     this.setState({ errorMobile: strings[language].userManagement.mobileNumberError})
//                                                                 }
//                                                             }}
//                                                             value={this.state.contactNumber}
//                                                         />
//                                                     </View>
//                                                     <Text style={[styles.paleRed, styles.small, styles.textCenter, styles.paddingTop4]}>
//                                                         {this.state.errorMobile}
//                                                     </Text>
//                                                 </View>
//                                                 <View style={[styles.flexOne, styles.paddingVertical12]}>
//                                                     <View style={[styles.flexQuarterToOne, styles.flexEndVertical]}>
//                                                         <Text style={[styles.fontSize13, darkMode ? styles.white : styles.black, styles.opacity65perc]}>
//                                                             {strings[language].userManagement.relation}
//                                                         </Text>
//                                                     </View>
//                                                     <View style={[styles.flexOne]}>
//                                                     { (this.state.relationship && this.state.relationship.length>0) ? 
//                                                         <DropDownPicker
//                                                             items={this.state.relationship}
//                                                             zIndex={4000}
//                                                             placeholder={`${strings[language].userManagement.select}`}
//                                                             defaultValue={this.state.relation}
//                                                             placeholderStyle={{color: Colors.darkGreen}}
//                                                             dropDownStyle = {[darkMode ? { backgroundColor: Colors.lightGray, borderWidth:1, borderColor: '#ffffff45' } : { backgroundColor: Colors.white,borderColor: '#00000045', borderWidth:1 }]}
//                                                             containerStyle={{height: 40,  padding:0,}}
//                                                             itemStyle={[{ justifyContent: 'flex-start',padding:20, borderBottomWidth:0.5, },darkMode ? { borderColor: '#ffffff45'} : {borderColor: '#00000045'}]}
//                                                             style={{backgroundColor: 'none', borderWidth:0, borderBottomWidth:0.7, borderColor: Colors.green, zIndex:4000, marginHorizontal: -5 }}
//                                                             onChangeItem = {(item)=>{this.setState({relation:item.value, rel: item.label})}}
//                                                             activeLabelStyle={[darkMode ? {color: Colors.white}: {color: Colors.black}]}
//                                                             arrowColor={darkMode ? Colors.white : Colors.black}
//                                                             arrowSize = {20}
//                                                             labelStyle={[styles.fontSize17, darkMode ? styles.green : styles.darkGreen, { left: -10 }]}
//                                                             /> : null}
//                                                     </View>
//                                                 </View>
//                                                 <View style={[styles.flexHalf]}>
//                                                 </View>
//                                             </View> : null
//                                         }
//                                         { this.state.index == 1 ?
//                                             <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.flexOne, styles.padding20, styles.extraMarginVertical, styles.zIndex, styles.elevate2]}>
//                                                 <View style={[styles.row]}>
//                                                     <Text style={[darkMode ? styles.white : styles.black, styles.fontSize15, styles.paddingBottom4]}>
//                                                         {`${strings[language].userManagement.confirmThe} `}
//                                                     </Text>
//                                                     <Text style={[styles.fontSize15, styles.darkGreen]}>
//                                                         {strings[language].userManagement.details}
//                                                     </Text>
//                                                 </View>
//                                                 <View style={[styles.flexOne, styles.marginVertical10]}>
//                                                     <View style={[styles.flexOne, styles.paddingVertical12, {borderBottomWidth:0.7, borderColor: Colors.green}]}>
//                                                         <View style={[styles.flexOne, styles.centerVertical, styles.paddingBottom6]}>
//                                                             <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13, styles.opacity65perc]}>
//                                                                 {strings[language].userManagement.name}
//                                                             </Text>
//                                                         </View>
//                                                         <View style={[styles.flexOne, styles.row, styles.spaceBetween]}>
//                                                             <Text style={[styles.darkGreen, styles.fontSize15]}>
//                                                                 {this.state.name}
//                                                             </Text>
//                                                             <View style={[styles.iconMedium, styles.bgDarkGreen, styles.allCenter]}>
//                                                                 <MIcons name="check" color={Colors.white} size={14}/>
//                                                             </View>
//                                                         </View>
//                                                     </View>
//                                                     <View style={[styles.flexOne, styles.paddingVertical12, {borderBottomWidth:0.7, borderColor: Colors.green}]}>
//                                                         <View style={[styles.flexOne, styles.centerVertical, styles.paddingBottom6]}>
//                                                             <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13, styles.opacity65perc]}>
//                                                                 {strings[language].userManagement.contactNumber}
//                                                             </Text>
//                                                         </View>
//                                                         <View style={[styles.flexOne, styles.row, styles.spaceBetween]}>
//                                                             <Text style={[styles.darkGreen, styles.fontSize15]}>
//                                                                 {this.state.contactNumber}
//                                                             </Text>
//                                                             <View style={[styles.iconMedium, styles.bgDarkGreen, styles.allCenter]}>
//                                                                 <MIcons name="check" color={Colors.white} size={14}/>
//                                                             </View>
//                                                         </View>
//                                                     </View>
//                                                     <View style={[styles.flexOne, styles.paddingVertical12, {borderBottomWidth:0.7, borderColor: Colors.green}]}>
//                                                         <View style={[styles.flexOne, styles.centerVertical, styles.paddingBottom6]}>
//                                                             <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13, styles.opacity65perc]}>
//                                                                 {strings[language].userManagement.relation}
//                                                             </Text>
//                                                         </View>
//                                                         <View style={[styles.flexOne, styles.row, styles.spaceBetween]}>
//                                                             <Text style={[styles.darkGreen, styles.fontSize15]}>
//                                                                 {this.state.rel}
//                                                             </Text>
//                                                             <View style={[styles.iconMedium, styles.bgDarkGreen, styles.allCenter]}>
//                                                                 <MIcons name="check" color={Colors.white} size={14}/>
//                                                             </View>
//                                                         </View>
//                                                     </View>
//                                                 </View>
//                                             </View> : null
//                                         }
//                                         { this.state.index == 2 ?
//                                             <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.flexOne, styles.padding20, styles.extraMarginVertical, styles.zIndex, styles.elevate2]}>
//                                                 <View style={[styles.row, styles.marginHorizontal4, styles.flexQuarterToOne, styles.paddingBottom10]}>
//                                                     <Text style={[styles.regular, darkMode ? styles.white : styles.black]}>
//                                                         {`${strings[language].userManagement.sendThe} `}
//                                                     </Text>
//                                                     <Text style={[styles.darkGreen, styles.regular]}>
//                                                         {strings[language].userManagement.invitationLink}
//                                                     </Text>
//                                                 </View>
//                                                 <View style={[styles.marginHorizontal4,styles.opacity65perc, { borderBottomWidth:1, borderColor: Colors.green }]}/>
//                                                 <View style={[styles.flexFive,styles.marginHorizontal16]}>
//                                                     <View style={[styles.flexThree, styles.bgLightGrey, styles.marginTop18, styles.radius10, styles.padding14]}>
//                                                         <TextInput
//                                                             style={[styles.small, styles.flexOne, {textAlignVertical: "top", height: 140}]}
//                                                             underlineColorAndroid="transparent"
//                                                             placeholder={strings[language].userManagement.feedbackContext}
//                                                             placeholderTextColor={Colors.black}
//                                                             ref={(input) => { this.inviteInput = input; }}
//                                                             autoCapitalize={false}
//                                                             value={this.state.text}
//                                                             maxLength={200}
//                                                             multiline={true}
//                                                             onChangeText={(text)=>{
//                                                                 this.setState({textCount: text.length, msg:text})
//                                                             }}
//                                                         />
//                                                     </View>
//                                                     <View style={[styles.flexHalf, styles.row]}>
//                                                         <View style={[styles.flexTwo, styles.centerHorizontal]}>
//                                                             <View style={[{
//                                                                 borderRightWidth: RFPercentage(4.5),
//                                                                 borderTopWidth: RFPercentage(4.5),
//                                                                 top:-1,
//                                                                 borderRightColor: 'transparent',
//                                                                 borderTopColor: Colors.lightGrey, justifyContent:"flex-start"}]}
//                                                             />
//                                                         </View>
//                                                         <View style={[styles.flexOneAndHalf, styles.centerHorizontal, styles.paddingVertical12]}>
//                                                         </View>
//                                                     </View>
//                                                 </View>
//                                             </View> : null
//                                         }
//                                         { this.state.index == 3 ?
//                                             <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.flexOne, styles.padding20, styles.extraMarginVertical, styles.elevate2]}>
//                                                 <View style={[styles.flexOne, styles.allCenter]}>
//                                                     <Text style={[styles.darkGreen, styles.medium22, styles.paddingVertical10]}>
//                                                         {strings[language].userManagement.congratulations} !
//                                                     </Text>
//                                                 </View>
//                                                 <View style={[styles.flexOne, styles.allCenter, styles.paddingVertical10]}>
//                                                     <CircleTickComponent size={65} darkMode={darkMode}/>
//                                                 </View>
//                                                 <View style={[styles.flexOne, styles.allCenter, styles.paddingHorizontal20, styles.paddingVertical10]}>
//                                                     <Text style={[styles.textCenter, styles.lineHeight20, styles.selfCenter, darkMode ? styles.white : styles.black]}>
//                                                         {strings[language].userManagement.inviteInfo} {this.state.name}
//                                                     </Text>
//                                                 </View>
//                                                 <View style={[styles.flexHalf, styles.allCenter, styles.paddingTop10,{ borderTopWidth: 0.8, borderColor: Colors.darkGreen }]}>
//                                                     <Text style={[styles.small, styles.opacity65perc, darkMode ? styles.white : styles.black]}>
//                                                         {strings[language].userManagement.inviteFooter}
//                                                     </Text>
//                                                 </View>
//                                             </View> : null
//                                         }
//                                         <View style={[styles.flexPoint33,styles.row, styles.marginTop10, styles.marginBottom64]}>
//                                             { this.state.index != 3 ?
//                                                 <>
//                                                     {/* <BodyText1 style={[styles.paddingVertical10, styles.paleRed, styles.normal]}>
//                                                         {this.state.error}
//                                                     </BodyText1> */}
//                                                     { !this.state.index == 0 ?
//                                                         <View style={[styles.flexOne, styles.left]}>
//                                                             <Pressable onPress={()=> this.setState({index: this.state.index-1})} style={[styles.bgLightBlack, styles.allCenter, styles.row, styles.padding, styles.radius20, styles.paddingHorizontal24]}>
//                                                                 <SLIcons name={'arrow-left'} size={RFPercentage(1.8)} color={Colors.white}/>
//                                                                 <Text style={[styles.paddingHorizontal10,styles.white, styles.regularPlus]}>
//                                                                     {strings[this.props.language].userManagement.back}
//                                                                 </Text>
//                                                             </Pressable>
//                                                         </View> : null
//                                                     }
//                                                     { this.state.index < 2 ?
//                                                             <Pressable
//                                                                 onPress={()=> this.steps()} 
//                                                                 disabled={this.state.name && this.state.contactNumber && this.state.relation && !this.state.errorMobile ? false : true}
//                                                                 style={[(this.state.name && this.state.contactNumber && this.state.relation && !this.state.errorMobile) ? styles.bgDarkGreen : styles.bgDarkGray, styles.allCenter, styles.row, styles.padding, styles.radius20, styles.paddingHorizontal24, styles.right0]}>
//                                                                 <Text style={[styles.paddingHorizontal10,styles.white, styles.regularPlus]}>
//                                                                     {strings[this.props.language].userManagement.next}
//                                                                 </Text>
//                                                                     <SLIcons name={'arrow-right'} size={RFPercentage(1.8)} color={Colors.white}/>
//                                                             </Pressable>
//                                                         :
//                                                         <View style={[styles.flexOne,styles.flexEndHorizontal]}>
//                                                             <Pressable onPress={this.submitUser} style={[styles.bgDarkGreen, styles.allCenter, styles.row, styles.padding, styles.radius20, styles.paddingHorizontal16]}>
//                                                                 <Text style={[styles.paddingHorizontal20,styles.white, styles.regularPlus]}>
//                                                                     {strings[language].userManagement.send}
//                                                                 </Text>
//                                                             </Pressable>
//                                                         </View>
//                                                     }
//                                                 </> :
//                                                 <View style={[styles.flexOne,styles.centerHorizontal]}>
//                                                     <Pressable onPress={()=> this.setState({index: 0, add: false, name: '', contactNumber:'', relation:''})} style={[styles.bgDarkGreen, styles.allCenter, styles.row, styles.padding, styles.radius20, styles.paddingHorizontal16]}>
//                                                         <Text style={[styles.paddingHorizontal20,styles.white, styles.regularPlus]}>
//                                                             {strings[language].userManagement.done}
//                                                         </Text>
//                                                     </Pressable>
//                                                 </View>
//                                             }
//                                         </View>
//                                     </View>
//                                 </View>
//                                 }
//                             </>
//                         }
//                     </KeyboardAvoidingView>
//                     </>}
//                 </ScrollView>
//             </TouchableWithoutFeedback>
//             </ErrorBoundaryMainComponent>
//         );
//     }
// }

// function mapStateToProps (state) {
//     return {
//         activeCount: commonSelectors.activeCount(state),
//         darkMode: commonSelectors.darkMode(state),
//         language: commonSelectors.language(state),
//         userDetails: commonSelectors.userDetails(state),
//         members: commonSelectors.memberAccountDetails(state),
//         currentRoute: commonSelectors.currentRoute(state),
//     }
// }
// function mapDispatchToProps (dispatch) {
//     return {
//         apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
//         logout: (state=false) => dispatch(logout(state)),
//         setMemberDetails: (data={}) => dispatch(userDetailActions.setMemberAccountDetails(data)),
//         setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
//     }
// }
// const UserManagementScreen = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(UserManagement);
// export {UserManagementScreen}
