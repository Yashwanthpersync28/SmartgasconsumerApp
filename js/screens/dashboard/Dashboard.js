import React from 'react';
import { Text, View, ScrollView, Dimensions, Pressable, StatusBar, Modal, RefreshControl, BackHandler, TouchableOpacity, Alert, Image, FlatList, Button } from 'react-native';
import { connect } from "react-redux";
// Styles and Colors
// import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Actions
import { userDetailActions, apiDispatcher } from "SmartgasConsumerApp/js/actions";
import { showLogout } from "SmartgasConsumerApp/js/actions/commonActions";
// Libraries
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// Components
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
import DashboardConsumption from 'SmartgasConsumerApp/js/screens/dashboard/components/DashboardConsumption';
import Circle from 'SmartgasConsumerApp/js/screens/dashboard/components/Circle';
import {
    ButtonText,
    HeadingText1,
    BodyText1,
    HeadingText3, CustomText,
} from "SmartgasConsumerApp/js/components/common";
// Constants
import { DASHBOARD, NODATA } from 'SmartgasConsumerApp/js/constants/lottie';
import { TodayConsumption, WeekConsumption, MonthConsumption, VictoryBarFixed } from 'SmartgasConsumerApp/js/constants/dashboard/VictoryChart';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import * as dashboard from "../../api/dashboard";
import { chartData, chartDataWithoutDate, backgroundFixedBar, handleNegative } from "../../helpers/common/chartDataHelper";
import MIIcons from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
import { styles } from '../../styles';
import { logout } from "SmartgasConsumerApp/js/actions";
import { CcAvenueScreen } from '../ccavenue/CcAvenue';
import { apiClient } from "SmartgasConsumerApp/js/api";
import { VictoryBarComponent } from '../../components/common/graphs/VictoryBar';

// import crashlytics from '@react-native-firebase/crashlytics';

console.disableYellowBox = true;

const { height, width } = Dimensions.get('window');

class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.done = false;
        this.state = {
            index: 0,
            info: 1,
            backPressModalVisible: false,
            table: false,
            value: 0,
            ipData: {},
            readingDate: "",
            table0: [],
            table1: [],
            graphValues: 500,
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }

    backAction = () => {
        this.setState({ backPressModalVisible: true })
        return true;
    };

    async componentDidMount(): void {

        this.syncData()
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'Dashboard') {
                    this.props.setCurrentRoute('Dashboard');
                    this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('Dashboard');
    }

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    async componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        const { index, routes } = this.props.navigation.dangerouslyGetState();
        const currentRoute = routes[index].name;
        if (currentRoute == "/dashboard") {
            this.backAction()
            return true;
        }
    }


    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {

        console.log(this.props.overview !== prevProps.overview && !!this.state.forecast, prevProps, prevState, 'sumitDashboard1234', this.props.overview, !!this.state.forecast, this.props.overview !== prevProps.overview)
        if (this.props.overview !== prevProps.overview) {

            let data = this.props.overview ? JSON.parse(JSON.stringify(this.props.overview)) : [];



            console.log('sum123456', data, this.props, this.state)

            console.log("data----------->", data.data);
            if (this.props.overview) {
                console.log('Dashboard Response1', data, this.props)
                console.log("user-------->", this.props?.userDetails?.jwtToken);
                // try {
                //     const baseRechargeDetailsUrl = 'http://cportalgasapi.esyasoft.com/api/Dashboard/mobile/RechargeDetails';
                //     const msnParameter = this.props?.userDetails?.msn;
                //     const urlString = `${baseRechargeDetailsUrl}?msn=${msnParameter}`;
                //     console.log('Constructed URL:', urlString);
                //     let resp = await apiClient.httpGet(urlString,{},{});
                //     console.log("dashboardInfoApiSuccess---->", JSON.parse(JSON.stringify(resp)));
                // } catch (error) {
                //     console.log("dashboardInfoApiFail---->",error);
                // }
                try {
                    const baseRechargeDetailsUrl = 'https://cportalgasapi.esyasoft.com/api/Dashboard/mobile/RechargeDetails';
                    const msnParameter = this.props?.userDetails?.msn;
                    const urlString = `${baseRechargeDetailsUrl}?msn=${msnParameter}`
                    const token = this.props?.userDetails?.jwtToken;
                    const headers = new Headers({
                        Accept: 'application/json, text/plain, */*',
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json',
                        'X-Requested-With': 'XMLHttpRequest',
                    });

                    const response = await fetch(urlString, {
                        method: 'GET',
                        headers: headers,
                    });

                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }

                    const data2 = await response.json();
                    console.log('API Response:', response.status, data2);

                    this.setState({
                      
                        balanceAmount: data2?.balanceAmount,
                        lastRechargeAmount: data2?.lastRechargeAmount,
                        lastRechargeDate: data2?.lastRechargeDate,
                        connectionStatus: data2?.connectionStatus,
                        date: data2?.date,
                        refreshing: false
                    })

                } catch (error) {
                    console.error('API Error:', error);
                }


                try {
                    console.log("asoyidfjl;a',>SDf", data);
                    this.setState({
                        consumedToday: data.consumedToday,
                        forecast: data,
                        // balanceDetails: data.balanceDetails,
                        // consumedPercentToday: data.consumedToday.percentConsumed,
                        month: handleNegative((data.barGraph.month)),
                        today: handleNegative((data.barGraph.today)),
                        week: handleNegative((data.barGraph.week)),
                        name: await this.props?.userDetails?.name,
                        id: await this.props?.userDetails?.consumerId,
                        msn: await this.props?.userDetails?.msn,
                        deviceId: await this.props?.userDetails?.deviceId,
                        // balanceAmount: await this.props?.userDetails?.balanceAmount,
                        // lastRechargeAmount: await this.props?.userDetails?.lastRechargeAmount,
                        // lastRechargeDate: await this.props?.userDetails?.lastRechargeDate,
                        // connectionStatus: await this.props?.userDetails?.connectionStatus,
                        refreshing: false
                    })
                } catch (e) {
                    console.log(`${e}\nline122\ndashboard`, "hfkja")
                }
                console.log(this.state, "stateupdate")
            }
            else {
                // this.setState({ forecast: null, refreshing: false})
                this.syncData()
            }
        }
        console.log(this.state.forecast, !this.state.forecast)
        if (!this.state.forecast && !!this.props.overview) {
            console.log('in12', !this.state.forecast, this.state.forecast)
            // this.setState({
            //     consumedToday: this.props.overview.consumedToday,
            //     forecast: this.props.overview,
            //     // balanceDetails: this.props.overview.balanceDetails,
            //     // consumedPercentToday: this.props.overview.consumedToday.percentConsumed,
            //     month: handleNegative((this.props.overview.barGraph.month)),
            //     today: handleNegative((this.props.overview.barGraph.today)),
            //     week: handleNegative((this.props.overview.barGraph.week)),
            //     name: await this.props?.userDetails?.name,
            //     id: await this.props?.userDetails?.consumerId,
            //     refreshing: false
            // })
        }

        if (this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
        // alert(`${this.props.overview.connectionStatus}\n${this.props.overview.consumedToday.value}\n${boolean(this.state.forecast)}`)
    }

    syncData = async () => {
        // alert(`${this.props.overview.connectionStatus}\n${this.props.overview.consumedToday.value}\n${boolean(this.state.forecast)}`)

        try {
            // await setInterval(6000);
            let data = await this.props.apiDispatcher(dashboard.overviewApi())
            if (data.status == 204) {
                this.setState({ noData: true })
                alert('Data not foound204 dashboard');

            }
            else if (data.status == 200) {
                this.props.setOverview(data.data);
                this.setState({ noData: false })
                // alert(`${data.data}`)
            }
            console.log(data, "overviewdata",)
            this.setState({ refreshing: false })
        } catch (e) {
            console.log('Dashboard 204', e);
            alert(`${e?.data?.Message}\n\n${e}\nDashboard\n${this.props.overview}\n${this.state.forecast}`, 'Dashboard')
            this.setState({ refreshing: false })
        }


        // try {
        // await setInterval(6000);
        // let info = await this.props.apiDispatcher(dashboard.ipDataApi())
        // if(info.status == 204){
        //     this.setState({ noData: true })
        //     // alert('Data not foound')
        // }
        // else
        // {
        // this.props.setIpData(info?.data);
        // this.setState({ipData:info?.data?.table1[0],readingDate:info?.data?.table[0].readingDate})
        // this.setState({ipData:info?.data?.table1[0],readingDate:info?.data?.table[0].readingDate})
        // this.setState({table0:info.data.table,table1:info.data.table1})
        // }
        // } catch (e) {
        // console.log('Dashboard 204',e);
        // this.setState({refreshing: false})
        // }
    }
    onRefresh = () => {
        this.setState({ refreshing: true });
        this.syncData()

    };

    handleSwipeIndexChange = index => {
        this.setState({ index: index })
    };

    nextInfo = () => {
        this.setState({ info: ++this.state.info }, () => {
            if (this.state.info === 3) {
                this.props.setInfoShown(true)
            }
        })
    };

    greyButton = ({ text }) => {
        return <View style={[styles.paddingRegular, styles.paddingHorizontal20, styles.paddingVertical6, styles.radius20, styles.bgGrey, styles.elevatePlus, styles.marginVertical4, { alignSelf: "flex-start" }]}>
            <Text style={[styles.black, styles.fontSize15, styles.centerVertical, styles.textAlignVertical]}>{text}</Text>
        </View>
    }

    rememberPassword = async () => {
        await Alert.alert('Remember Password', 'Do you want to remember your password', [{
            text: 'No Thanks',
            onPress: () => this.props.clearPassword(),
            style: 'cancel',
        },
        { text: 'Yes', onPress: () => console.log('Saved Password') },
        ]);
    }


    render() {



        const { language, darkMode, navigation } = this.props;
        const StausComponent = ({ onPress, title, disabled, style, textStyle }) => {
            return (
                <TouchableOpacity disabled={disabled} onPress={onPress} style={[styles.paddingVertical6, styles.paddingHorizontal16, styles.radius20, styles.bgGreen, styles.elevate3, styles.marginVertical4, style]}>
                    <Text style={[styles.white, styles.normal, { fontWeight: "900" }, textStyle]}>
                        {title}
                    </Text>
                </TouchableOpacity>
            )
        }
        return (
            <ErrorBoundaryMainComponent>{console.log(this.state, this.props, "dashboardrender", !this.props.infoShown && this.props.headerLeft)}
                <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader]} >
                    {(!this.props?.infoShown && this.props?.headerLeft) ?
                        <TouchableOpacity onPress={this.nextInfo}
                            style={[{ height: Dimensions.get('window').height + 100, width: Dimensions.get('window').width + 2 }, styles.absolute, styles.paleGrey5Overlay, styles.zIndex]}>
                            {this.state.info === 1 ?
                                <View style={[]}><TouchableOpacity onPress={this.nextInfo} style={{
                                    height: this.props.headerLeft.height + 30,
                                    width: this.props.headerLeft.height + 30,
                                    // marginLeft: 30,
                                    borderRadius: (this.props.headerLeft.height + 60),
                                    zIndex: 1000,
                                    backgroundColor: "black",
                                    top: Platform.OS == "ios" ? this.props.headerLeft.realPY - 15 : null,
                                    left: width / 24
                                }} />
                                    <View style={{
                                        height: this.props.headerLeft.height * 5,
                                        width: this.props.headerLeft.height * 3,
                                        borderRadius: this.props.headerLeft.height,
                                        zIndex: 1000,
                                        // backgroundColor: "white",
                                        top: this.props.headerLeft.height + Platform.OS == "android" ? 15 : null,
                                        left: (this.props.headerLeft.width / 8) - 10
                                    }}>
                                        {/* < MIIcons name={'logout'} color={'#fff'} size={60}/> */}
                                        <LottieView style={[]} source={DASHBOARD.upArrow} autoPlay loop />
                                    </View>
                                    <View style={[styles.allCenter, { top: height / 5 }]}>
                                        <Text style={[styles.white, styles.medium, styles.textCenter]}>
                                            Click the above Hamburger Icon to Navigate along the screens
                                        </Text>
                                    </View>
                                </View> :
                                <View style={[]}>
                                    {/* <TouchableOpacity onPress={this.nextInfo} style={{
                                 height: this.props.headerRight.height +30,
                                 width: this.props.headerRight.height + 30 ,
                                 borderRadius: 60,
                                 zIndex: 9999,
                                 backgroundColor: "black",
                                 top: Platform.OS == "ios" ? this.props.headerLeft.realPY - 15 : null,
                                 left: this.props.headerRight.realPX + width/60
                            }}/>
                            <View style={{
                                height: this.props.headerRight.height *2.5,
                                width: this.props.headerRight.height *2.5,
                                borderRadius: 60,
                                zIndex: 9999,
                                // backgroundColor: "white",
                                top: this.props.headerRight.height * 4 - 65 ,
                                left: width/1.15 - 30,
                                // left: this.props.headerRight.x - this.props.headerRight.width / 4,

                            }}>
                                <LottieView style={[]} source={DASHBOARD.hand} autoPlay loop />
                            </View>
                            <View style={[styles.allCenter, {top:height/5 }]}>
                                <Text style={[styles.white, styles.medium, styles.textCenter]}>
                                    Click the above Bell Icon to check Notifications
                                </Text>
                            </View> */}
                                </View>
                            }
                        </TouchableOpacity> : null
                    }
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.sunglowYellow}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh}
                            />
                        }
                        style={[styles.flexOne]}
                    >{console.log({ ...this.state }, "dashboardstate")}
                        {/* {this.state.consumedToday ? */}
                        {this.state?.forecast ?
                            <View style={[]}>
                                {this.props.darkMode ? <StatusBar backgroundColor={Colors.black} barStyle='light-content' /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content' />}
                                <View style={[styles.flexOne, { marginHorizontal: 30 }, styles.marginVertical, styles.spaceEvenly]}>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17, styles.textAlignVertical, { fontWeight: '500', textAlign: 'center' }]}>
                                        {strings[language].dashboard.welcome}
                                    </Text>
                                    <View style={[styles.centerVertical, styles.marginVertical4]}>
                                        <Text style={[styles.green, styles.medium, styles.opacity80perc, styles.centerVertical, styles.textAlignVertical, { fontWeight: '500', textAlign: 'center' }]}>
                                            {this.state?.name}
                                        </Text>
                                    </View>
                                    {/* <View style={[styles.paddingRegular, styles.paddingHorizontal20, styles.paddingVertical6, styles.radius20,styles.bgGreen, styles.elevatePlus,styles.marginVertical4 ]}>
                                <Text style={[styles.white,  styles.fontSize15, styles.centerVertical, styles.textAlignVertical,{fontWeight:"600"}]}>Current Balance: {this.state.balanceDetails.currentBalance}</Text>
                            </View> */}
                                    {/* <View style={[styles.row, styles.spaceBetween]}>
                                <StausComponent title={`Current Balance : ${this.state.balanceDetails.currentBalance}`} disabled={true} 
                                    style={{
                                        borderWidth: 2, borderColor: 'white',
                                        backgroundColor: this.state.balanceDetails.currentBalance > 100 ? Colors.green : 
                                            this.state.balanceDetails.currentBalance <= 100 && this.state.balanceDetails.currentBalance >= 0 ? "#bfbf21" : "red"
                                    }}
                                    textStyle={[styles.fontSize15, {color: 'yellow'}]}
                                />
                                <StausComponent onPress={() => navigation.navigate("CcAvenue")} title={"Recharge"} />
                            </View> */}
                                    {/* <StausComponent style={styles.bgGrey} title={`Last Recharge Amount : ${this.state.balanceDetails.lastRechargeAmount}`} disabled={true}/> */}
                                    {/* <StausComponent style={styles.bgGrey} title={`Last Recharge Date : ${this.state.balanceDetails.lastRechargeDate}`} disabled={true}/> */}
                                    {/* <this.greyButton text={"Last Recharge Amount: "+this.state.balanceDetails.lastRechargeAmount}/> */}
                                    {/* <this.greyButton text={"Last Recharge Date: "+this.state.balanceDetails.lastRechargeDate}/> */}
                                    {/* <View style={[styles.row,styles.spaceBetween]}> uncomment part for small width line number 360 and 374 */}
                                    <StausComponent title={`${strings[language].dashboard.ca} ${strings[language].dashboard.number} : ${this.state?.id}`} />
                                    <StausComponent title={`Device Id : ${this.state?.deviceId}`} />

                                    <StausComponent title={`Last Recharge On : ${this.state?.lastRechargeDate}`} />
                                    <StausComponent title={`Last Recharge Amount : ${this.state?.lastRechargeAmount} Rs`} />
                                    {/* <StausComponent title={`Current Balance : ${this.state?.balanceAmount} Rs`} /> */}
                                    <StausComponent title={`Connection Status : ${this.state?.connectionStatus}`} disabled={true} style={{ backgroundColor: (this.state?.connectionStatus == "Active" || this.state?.connectionStatus == "Open") ? Colors.green : (this.state?.connectionStatus == "Disconnected" || this.state?.connectionStatus == "Close") ? "#bfbf21" : this.state?.forecast?.connectionStatus == "Permanent Disconnection" && "red" }} />

                                    <StausComponent
                                        title={`Current Balance : ${this.state?.balanceAmount} Rs`}
                                        style={{
                                            backgroundColor:
                                                this.state?.balanceAmount >= 100 ? '#64AE64' :
                                                    this.state?.balanceAmount >= 10 ? '#FFFF00' :
                                                        this.state?.balanceAmount >= 0 ? '#ffbf00' :
                                                            '#FF0000',
                                        }}
                                        textStyle={{
                                            color: this.state?.balanceAmount >= 100 ? 'white' : 'black'
                                        }}
                                    />
                                    <View style={[styles.allCenter]}>
                                        <StausComponent onPress={() => navigation.navigate("CcAvenue")} title={"Click here for recharge"} textStyle={{ textAlign: 'center' }} style={{ backgroundColor: '#000080' }} />
                                    </View>


                                    {/* <StausComponent onPress={() => navigation.navigate('MultipleAccounts',{comingFrom:"dashboard"})} title={`${strings[language].dashboard.ca} ${strings[language].dashboard.number} : ${this.state.id}`}/> */}
                                    {/* <StausComponent onPress={() => navigation.navigate('MultipleAccounts',{comingFrom:"dashboardAdd"})} title={<MIIcons name='add' size={20} color={Colors.white} />} />#3A753C #000080*/}

                                    {/* <TouchableOpacity onPress={()=>navigation.navigate('MultipleAccounts',{comingFrom:"dashboard"})} style={[styles.paddingVertical6, styles.paddingHorizontal20, styles.radius20,styles.bgGreen, styles.elevatePlus]}>
                                    <Text style={[styles.white,  styles.fontSize15, styles.centerVertical, styles.textAlignVertical]}>
                                        {`${strings[language].dashboard.ca} ${strings[language].dashboard.number}: ${this.state.id}`}
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>navigation.navigate('MultipleAccounts',{comingFrom:"dashboardAdd"})} style={[styles.paddingVertical6, styles.paddingHorizontal, styles.radius20,styles.bgGreen, styles.elevatePlus]}>
                                    <MIIcons name='add' size={15} color={Colors.white} />
                                </TouchableOpacity> */}

                                    {/* </View>{console.log(this.state,"statesjflksahf",this.state?.forecast?.connectionStatus)} */}
                                    {/* <StausComponent title={`Connection Status : ${this.state?.forecast?.connectionStatus}`} disabled={true} style={{backgroundColor: this.state?.forecast?.connectionStatus == "Active" ? Colors.green : this.state?.forecast?.connectionStatus == "Disconnected" ? "#bfbf21" : this.state?.forecast?.connectionStatus == "Permanent Disconnection" && "red"}}/> */}


                                    {/* <View style={[styles.paddingRegular, styles.paddingHorizontal20, styles.paddingVertical6, styles.radius20, {backgroundColor: this.state.balanceDetails.connection_status == "Connected" ? Colors.green : this.state.balanceDetails.connection_status == "Disconnected" ? "#bfbf21" : this.state.balanceDetails.connection_status == "Permanent Disconnection" && "red"}, styles.elevatePlus,styles.marginVertical4 ]}>
                                <Text style={[styles.white,  styles.fontSize15, styles.centerVertical, styles.textAlignVertical, {fontWeight:"600"}]}></Text>
                            </View> */}
                                    {/* <View style={[styles.bgGrey,styles.marginTop10,{height:height/10},styles.row,styles.centerHorizontal,styles.padding14,{paddingBottom:0}]}> */}
                                    {/* <View style={[styles.marginRight12]}>
                                    <TouchableOpacity style={[]} onPress={()=>{
                                        if(this.state.value > 0 && this.state.value < Object.keys(this.state.ipData).length){
                                            this.setState({value:this.state.value-1})
                                        }
                                        else{
                                            this.setState({value:Object.keys(this.state.ipData).length-1})
                                        }
                                    }}>
                                        <Icon size={30} name={"caret-up"} color={Colors.black} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={[]} onPress={()=>{
                                        if(this.state.value >= 0 && this.state.value < Object.keys(this.state.ipData).length-1){
                                            this.setState({value:this.state.value+1})
                                        }
                                        else{
                                            this.setState({value:0})
                                        }
                                        }}>
                                        <Icon size={30} name={"caret-down"} color={Colors.black} />
                                    </TouchableOpacity>
                                </View> */}
                                    {/* <View style={[styles.flexOne]}>
                                    <FlatList
                                    pagingEnabled
                                    // initialScrollIndex={1}
                                        data={Object.values(this.state.ipData)}
                                        renderItem={(item,index)=>{
                                            return(
                                                <View>
                                                        <Text style={[styles.fontSize23,styles.paddingVertical12,styles.flexOne,styles.textCenter,styles.darkGray,{fontFamily:"DSEG7Modern-Regular"}]}>{item.item.kWh}</Text>                                                        <Text style={[styles.fontSize23,styles.paddingVertical12,styles.flexOne,styles.textCenter,styles.darkGray,{fontFamily:"DSEG7Modern-Regular"}]}>{item.item.kWh}</Text>
                                                        {item.index === this.state.value && <Text style={[styles.fontSize23,styles.paddingVertical12,styles.flexOne,styles.textCenter,styles.darkGray,{fontFamily:"DSEG14Modern-Regular"}]}>{item.item}</Text>}
                                                    </View>
                                            )
                                        }
                                        }
                                    />
                                </View> */}
                                    {/* <View style={[]}>
                                    <FlatList
                                    pagingEnabled
                                        data={Object.keys(this.state.ipData)}
                                        renderItem={(item,index)=>{
                                            console.log(item.item,"itemipp")
                                            const r=23;
                                            return(
                                                <View>
                                                        <Text style={[styles.fontSize23,styles.paddingVertical12,styles.flexOne,styles.textCenter,styles.darkGray,{fontFamily:"DSEG7Modern-Regular"}]}>
                                                            {item.item}
                                                        </Text>                                                        <Text style={[styles.fontSize23,styles.paddingVertical12,styles.flexOne,styles.textCenter,styles.darkGray,{fontFamily:"DSEG7Modern-Regular"}]}>{item.item.kWh}</Text>
                                                        {item.index === this.state.value &&  
                                                        <Text style={[styles.darkGray,styles.paddingVertical16]}>
                                                            {item.item}
                                                            </Text>
                                                            }
                                                    </View>
                                            )
                                        }
                                        }
                                    />
                                </View> */}
                                    {/* </View> */}
                                    {/* <View  style={[styles.bgGrey,styles.centerHorizontal,styles.paddingBottom10,styles.marginBottom10]}>
                                        <Text style={[styles.darkGray]}>Updated On {this.state.readingDate}</Text>
                                </View> */}
                                </View>
                                <View style={[styles.flexOne]}>
                                    {this.state.forecast ?
                                        <ScrollView
                                            contentContainerStyle={[{
                                                borderWidth: 0,
                                                width: width * 3 / 1.065
                                            }, styles.paddingHorizontal20]}
                                            horizontal showsHorizontalScrollIndicator={false} decelerationRate={100}
                                            snapToInterval={width / 1.065}
                                            scrollEventThrottle={16}
                                            disableIntervalMomentum={true}
                                            snapToAlignment={"center"}
                                            snapToStart={false}
                                        >
                                            {this.state?.forecast?.consumption && Object.keys(this.state?.forecast?.consumption).map((item) => {
                                                return <DashboardConsumption
                                                    key={item}
                                                    title={`${strings[language].dashboard.dashboardConsumption[item]} :`}
                                                    value={this.state.forecast.consumption[item].value} unit={strings[language].dashboard.units}
                                                    consumptionPercent={(this.state.forecast.consumption[item].percent / 100)}
                                                    colorMode={darkMode} />
                                            })}
                                            {/* <DashboardConsumption 
                                        title={`${strings[language].dashboard.dashboardConsumption.lastMonth} :`}
                                        value={this.state.forecast.consumption.lastMonth.value} unit={strings[language].dashboard.units} 
                                        consumption={(this.state.forecast.consumption.lastMonth.percent/100)}
                                        colorMode={darkMode}/>
                                    <DashboardConsumption 
                                        title={`${strings[language].dashboard.dashboardConsumption.currentMonth} :`}
                                        value={this.state.forecast.consumption.currentMonth.value} unit={strings[language].dashboard.units}
                                        consumption={this.state.forecast.consumption.currentMonth.percent/100}
                                        colorMode={darkMode}/>
                                    <DashboardConsumption 
                                        title={`${strings[language].dashboard.dashboardConsumption.nextMonth} :`}
                                        value={this.state.forecast.consumption.nextMonth.value} unit={strings[language].dashboard.units}
                                        consumption={this.state.forecast.consumption.nextMonth.percent/100}
                                        colorMode={darkMode}/> */}
                                        </ScrollView>
                                        : null
                                    }
                                </View>
                                {this.state.forecast ?
                                    <View style={[{ height: height / 2 }, { marginHorizontal: 26 }, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.marginVertical10, styles.elevate2]}>
                                        <View style={[styles.flexHalf, styles.row, styles.spaceEvenly, styles.centerHorizontal]}>

                                            <Pressable onPress={() => this.refs.swiper.scrollTo(0)}
                                                style={[styles.paddingRegular, styles.paddingHorizontal20, this.state.index == 0 ? [styles.bgGreen, styles.elevatePlus] : null, styles.radius20]}>
                                                <Text style={[this.state.index == 0 ? darkMode ? styles.black : styles.white : darkMode ? styles.white : styles.black, this.state.index == 0 ? styles.fontSize17 : styles.fontSize15]}>
                                                    {strings[language].dashboard.week}
                                                </Text>
                                            </Pressable>
                                            <Pressable onPress={() => this.refs.swiper.scrollTo(1)}
                                                style={[styles.paddingRegular, styles.paddingHorizontal20, this.state.index == 1 ? [styles.bgGreen, styles.elevatePlus] : null, styles.radius20]}>
                                                <Text
                                                    style={[this.state.index == 1 ? darkMode ? styles.black : styles.white : darkMode ? styles.white : styles.black, this.state.index == 1 ? styles.fontSize17 : styles.fontSize15]}>
                                                    {strings[language].dashboard.month}
                                                </Text>
                                            </Pressable>
                                        </View>

                                        <View style={[styles.flexThree, styles.allCenter]}>

                                            <Swiper
                                                buttonWrapperStyle={styles.buttonWrapperStyle}
                                                dotColor={darkMode ? Colors.lightGrey : Colors.lightGray}
                                                dotStyle={[{
                                                    height: 12,
                                                    width: 12,
                                                    borderRadius: 6,
                                                    top: 10
                                                }, styles.opacity50perc]}
                                                showsPagination={false}
                                                activeDotColor={Colors.green}
                                                activeDotStyle={[{
                                                    width: 30,
                                                    height: 12,
                                                    borderRadius: 12,
                                                    margin: 10,
                                                    top: 10
                                                }]}
                                                showsButtons={false}
                                                // pagingEnabled={true}
                                                onIndexChanged={this.handleSwipeIndexChange}
                                                ref='swiper'
                                                loop={false}
                                                index={this.state.index}
                                                removeClippedSubviews={false}
                                                loadMinimal={true}
                                            >
                                                {/* {console.log(this.state.forecast.barGraph.month,"this.state.forecast.barGraph.month",this.state.forecast.barGraph.month.reverse())} */}
                                                {/* <VictoryBarComponent consumption={this.state.today} fixed={backgroundFixedBar(this.state.today)} graphValues={this.state.forecast.barGraph.graphValues}
                                                    darkMode={darkMode} current={"today"} onPress={() => this.setState({ table: !this.state.table })} table={this.state.table} /> */}
                                                {/* {this.state.forecast.barGraph?.week.length &&  */}
                                                <VictoryBarComponent consumption={this.state.week} fixed={backgroundFixedBar(this.state.week)} graphValues={this.state.forecast.barGraph.graphValues}
                                                    darkMode={darkMode} current={"week"} onPress={() => this.setState({ table: !this.state.table })} table={this.state.table} />
                                                {/* } */}
                                                <VictoryBarComponent consumption={this.state.month} fixed={backgroundFixedBar(this.state.month)} graphValues={this.state.forecast.barGraph.graphValues}
                                                    darkMode={darkMode} current={"month"} onPress={() => this.setState({ table: !this.state.table })} table={this.state.table} />
                                            </Swiper>
                                            <View style={[styles.marginBottom8, { backgroundColor: this.props.darkMode ? Colors.black : Colors.lightGrey, zIndex: 2, top: -height / 60 }, styles.radius20, styles.row, styles.allCenter, styles.selfCenter]}>
                                                <TouchableOpacity onPress={() => this.setState({ table: !this.state.table })} style={[styles.padding, { backgroundColor: this.state.table ? "#64AE64" : null }, styles.radius20]}>
                                                    <Icon name={"table"} size={15} color={this.props.darkMode ? Colors.white : Colors.black} />
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={() => this.setState({ table: !this.state.table })} style={[styles.padding, { backgroundColor: this.state.table ? null : "#64AE64" }, styles.radius20]}>
                                                    <Icon name={"bar-chart"} size={15} color={this.props.darkMode ? Colors.white : Colors.black} />
                                                </TouchableOpacity>
                                            </View>


                                            <View style={[{ bottom: 10 }, styles.allCenter,]}>
                                                <Text style={[darkMode ? styles.white : styles.black, styles.extraSmall]}>
                                                    {strings[language].dashboard.graphButton}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                    : null
                                }
                                {this.state.forecast ?
                                    <View
                                        style={[styles.flexOneAndQuarter, styles.row, styles.marginHorizontal24, styles.radius16, styles.marginBottom16, darkMode ? styles.bgLightGray : styles.bgWhite, styles.marginVertical, styles.spaceAroundVertical, styles.elevate2]}>
                                        <View
                                            style={[styles.flexTwo, styles.allCenter, styles.paddingVertical12]}>
                                            <View style={[styles.centerVertical, { flexDirection: 'row' }]}>
                                                <Text style={[darkMode ? styles.white : styles.black, styles.normal, { paddingRight: 5, fontWeight: '600' }]}>
                                                    {strings[language].dashboard.yourConsumption}
                                                </Text>
                                                <Text style={[darkMode ? styles.white : styles.black, styles.normal, { fontWeight: '500' }]}>
                                                    {this.state?.date}
                                                </Text>
                                            </View>
                                            <View style={[styles.row, styles.flexEndHorizontal]}>
                                                <Text style={[styles.green, styles.medium22]}>
                                                    {this.state.consumedToday?.value === -1 ? "0" : this.state.consumedToday?.value}
                                                    {/* {parseFloat((this.state.today.reduce((total, item) => total + item.y, 0)).toFixed(4))} */}
                                                    {/* parseFloat(sum.toFixed(4)); */}
                                                </Text>
                                                <Text style={[styles.green, styles.regular, styles.paddingVertical2]}>
                                                    {` ${strings[language].dashboard.units}`}
                                                </Text>
                                            </View>
                                            <View style={[]}>
                                                {/* <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                            {strings[language].dashboardsoFarToday}
                                            {strings[language].dashboardyourConsumption}
                                        </Text> */}
                                            </View>
                                        </View>
                                        {/* <View style={[styles.flexOne, styles.centerVertical]}>
                                    <Circle percentage={this.state.consumedPercentToday * 100} color={Colors.green}
                                            delay={100} strokeWidth={RFPercentage(2)} radius={RFPercentage(6)} max={100}
                                            textColor={darkMode ? Colors.white : Colors.black}/>
                                </View> */}
                                    </View>

                                    : null
                                }

                                {/* <View  style={[styles.flexOneAndQuarter, styles.row, styles.marginHorizontal24, styles.radius16, styles.marginBottom42, darkMode ? styles.bgLightGray : styles.bgWhite, styles.marginVertical, styles.spaceAroundVertical, styles.elevate2]}> */}
                                   
                                    <View
                                        style={[styles.flexTwo, styles.allCenter, styles.paddingVertical12]}>
                                        <View style={[styles.centerVertical, { flexDirection: 'row' }]}>
                                            <Text style={[darkMode ? styles.white : styles.black, styles.normal, { paddingRight: 5, fontWeight: '600' }]}>
                                                {"Disclaimer :"}
                                            </Text>
                                            {/* <Text style={[darkMode ? styles.white : styles.black, styles.normal, { fontWeight: '500' }]}>
                                                {this.state?.date}
                                            </Text> */}
                                        </View>
                                        <View style={[styles.row, styles.flexStartHorizontal,{paddingTop:2,paddingBottom:5,paddingLeft:20,paddingRight:20,flexWrap:'nowrap'}]}>
                                            <Text style={[styles.green,{fontSize:13,fontFamily: 'Roboto-Regular', fontStyle: 'italic'}]}>
                                                {"The displayed consumption is only for information purposes and might be estimated in some cases, so please do not infer this as the exact biliing for consumption"}
                                            </Text>
                                            <Text style={[styles.green, styles.regular, styles.paddingVertical2]}>
                                                {``}
                                            </Text>
                                        </View>

                                    </View>

                                {/* </View> */}
                            </View>
                            :
                            this.state.noData ?
                                <View style={[{ top: height / 8 }, styles.allCenter]}>
                                    <Text style={[darkMode ? styles.paleRed : styles.black, styles.medium22]}>
                                        {this.props.overview.message ? this.props.overview.message : "Data Not Found"}
                                    </Text>
                                    <LottieView style={[{ height: 300 }]} source={NODATA.APIError} autoPlay loop />
                                </View>
                                :
                                <View style={[{ marginTop: height / 3 }]}>
                                    <LoaderComponent />
                                </View>
                        }


                    </ScrollView>

                    {this.state.backPressModalVisible ? <View style={[styles.absolute, styles.paleGrey5Overlay, styles.allCenter, styles.heightFixed, styles.width, { zIndex: 9999, alignSelf: 'flex-start' }]}>
                        <Modal
                            animationType="slide"
                            // presentationStyle={'pageSheet'}
                            visible={true}
                            style={[styles.bgMidBlueDisabled]}
                            transparent={true}
                            onRequestClose={() => { }}
                        >
                            <View style={[{ bottom: 0 }, styles.width, styles.absolute]}>
                                <View style={[{ height: 180, flex: 1, padding: 15, justifyContent: "space-between", borderRadius: 10 }, styles.bgWhite1, styles.width, styles.flexTwo]}>
                                    <View style={[styles.paddingVertical, styles.paddingHorizontal4, { flex: 2 }]}>
                                        <View style={{ flex: 1, justifyContent: "flex-start" }}>
                                            <Text style={[styles.medium, styles.darkGray]}>
                                                {strings[language].logout.alert}
                                            </Text>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: "center" }}>
                                            <Text style={[styles.regular, styles.darkGray]}>
                                                {/* {strings[language].logout.message} */}
                                                Do you want to close the App ?
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.row, styles.width, styles.flexTwo, { alignItems: "center", justifyContent: "space-between" }]}>
                                        <TouchableOpacity onPress={() => this.setState({ backPressModalVisible: false })} style={[{ height: 50, borderRadius: 8, borderWidth: 1, borderColor: Colors.black }, styles.flexOne, styles.allCenter, styles.bgTint5DeepGreyBlue, styles.marginHorizontal]}>
                                            <Text style={[styles.regular, styles.darkGray]}>
                                                {strings[language].logout.no}
                                            </Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                BackHandler.exitApp()
                                                this.setState({ backPressModalVisible: false })
                                            }}
                                            style={[{ height: 50, backgroundColor: Colors.darkGreen, borderRadius: 8 }, styles.flexOne, styles.allCenter, styles.marginHorizontal]}
                                        >
                                            <ButtonText style={{ color: '#fff' }}>
                                                {strings[language].logout.yes}
                                            </ButtonText>
                                        </TouchableOpacity>

                                    </View>
                                </View>
                            </View>
                        </Modal>


                    </View> : null}
                </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeCount: commonSelectors.activeCount(state),
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),
        overview: commonSelectors.overview(state),
        currentRoute: commonSelectors.currentRoute(state),
        infoShown: commonSelectors.infoShown(state),
        headerLeft: commonSelectors.headerLeft(state),
        headerRight: commonSelectors.headerRight(state),
        ipData: commonSelectors.ipData(state),
        password: commonSelectors.getPassword(state),
    }
}
function mapDispatchToProps(dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state = false) => dispatch(logout(state)),
        showLogout: (state = true) => dispatch(showLogout(state)),
        setOverview: (data = {}) => dispatch(userDetailActions.setOverview(data)),
        setCurrentRoute: (data = {}) => dispatch(userDetailActions.setCurrentRoute(data)),
        setInfoShown: (data = {}) => dispatch(userDetailActions.setInfoShown(data)),
        setIpData: (data = {}) => dispatch(userDetailActions.setIpData(data)),
    }
}
const DashboardScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

export { DashboardScreen }
