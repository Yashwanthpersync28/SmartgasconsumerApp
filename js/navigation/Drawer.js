import React, {useRef,useEffect, useState} from 'react';
import { Image, StyleSheet, Text, View, ScrollView, Pressable, TouchableOpacity, FlatList, Alert} from 'react-native';
// Styles and Colors
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// import { styles } from "SmartgasConsumerApp/js/styles/styles"
// Icons
import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MIIcons from 'react-native-vector-icons/MaterialIcons';
import FIcons from 'react-native-vector-icons/Feather';
import IIcons from 'react-native-vector-icons/Ionicons';
import SLIcons from 'react-native-vector-icons/SimpleLineIcons'
import Entypo from 'react-native-vector-icons/Entypo';
import ADIcons from 'react-native-vector-icons/AntDesign';
// Libraries
import { DrawerItem, createDrawerNavigator, DrawerContentScrollView, useIsDrawerOpen } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import Animated from 'react-native-reanimated';
// Backend
import {strings} from "SmartgasConsumerApp/js/strings";

// Screens Before Login
import { OnboardingScreen } from 'SmartgasConsumerApp/js/screens/onboarding';
import { LoginScreen } from 'SmartgasConsumerApp/js/screens/login';
import { MPinScreen } from '../screens/login/Mpin';
import { OtpScreen } from 'SmartgasConsumerApp/js/screens/login/Otp';
import { RegisterScreen } from 'SmartgasConsumerApp/js/screens/login/Register';
import { ForgotPasswordScreen } from 'SmartgasConsumerApp/js/screens/login/ForgotPassword';
import { PaymentRechargeScreen } from 'SmartgasConsumerApp/js/screens/login/PaymentRecharge';


// Screens After Login
import { DashboardScreen } from 'SmartgasConsumerApp/js/screens/dashboard/Dashboard';
import { LiveDataScreen } from 'SmartgasConsumerApp/js/screens/liveData/LiveData';

// Consumption Logs Screen
    import { ComparisonScreen } from 'SmartgasConsumerApp/js/screens/comparison/Comparison';
    import { HistoryScreen } from 'SmartgasConsumerApp/js/screens/history/History';    
        import { HorizontalGraphScreen } from 'SmartgasConsumerApp/js/screens/history/HorizontalGraph';

// Billings Screen
    import { PayMyBillScreen } from 'SmartgasConsumerApp/js/screens/payMyBill/PayMyBill';
    import { BillingHistoryScreen } from 'SmartgasConsumerApp/js/screens/billingHistory/BillingHistory';
    import { PrepaidBillingScreen } from 'SmartgasConsumerApp/js/screens/prepaidBilling/PrepaidBilling';
    import { PostpaidBillingScreen } from 'SmartgasConsumerApp/js/screens/postpaidBilling/PostpaidBilling';
import { MaximumDemandInterfaceScreen } from 'SmartgasConsumerApp/js/screens/maximumDemand/MaximumDemandInterface';
    // MDI Screens
    import {MaximumDemandGraphScreen} from 'SmartgasConsumerApp/js/screens/maximumDemand/MaximumDemandGraph';

import { PowerQualityScreen } from 'SmartgasConsumerApp/js/screens/powerQuality/PowerQuality';
import { EventAnalysisScreen } from 'SmartgasConsumerApp/js/screens/eventAnalysis/EventAnalysis';
import { EnergyTipsScreen } from 'SmartgasConsumerApp/js/screens/energyTips/EnergyTips';
import { FAQsScreen } from 'SmartgasConsumerApp/js/screens/faqs/FAQs';
import { NotificationsScreen } from 'SmartgasConsumerApp/js/screens/notifications/Notifications';
import { EnergyCostCalculatorScreen } from 'SmartgasConsumerApp/js/screens/energyCostCalc/EnergyCostCalc';
    // ECC Screen
    import { HouseholdApplianceScreen } from 'SmartgasConsumerApp/js/screens/energyCostCalc/screen/HouseholdAppliances';
import { SupportScreen } from 'SmartgasConsumerApp/js/screens/support/Support';
import { SettingsScreen } from 'SmartgasConsumerApp/js/screens/settings/Settings';
    // PLM / DR
    import { CheckProgramsScreen } from 'SmartgasConsumerApp/js/screens/checkPrograms/CheckPrograms'
        // Programs List
        import { ProgramsListScreen } from 'SmartgasConsumerApp/js/screens/checkPrograms/screens/ProgramList'
    import { MyProgramsScreen } from 'SmartgasConsumerApp/js/screens/myPrograms/MyPrograms'
        // Program Events
        import { PastEventsScreen } from 'SmartgasConsumerApp/js/screens/myPrograms/screens/PastEvents'
        import { UpcomingEventsScreen } from 'SmartgasConsumerApp/js/screens/myPrograms/screens/UpcomingEvents'

// import HPSEBPlus from 'SmartgasConsumerApp/js/screens/HPSEBPlus/HPSEBPlus';
import { ComplaintsScreen } from 'SmartgasConsumerApp/js/screens/complaints/Complaints';
    // Prepaid Screens
    import { PrepaidRechargeHistoryScreen } from '../screens/prepaidRechargeHistory/PrepaidRechargeHistory';
    import { PrepaidBalanceScreen } from '../screens/prepaidBalance/prepaidBalance';
import { NetMeterScreen } from 'SmartgasConsumerApp/js/screens/netMeter/NetMeter';
import { SchemesScreen } from 'SmartgasConsumerApp/js/screens/schemes/Schemes';
import { ContactUsScreen } from 'SmartgasConsumerApp/js/screens/contactUs/ContactUs';


// Settings Screens
    import { ColorModeScreen } from 'SmartgasConsumerApp/js/screens/colorMode/ColorMode';
    import { LanguageScreen } from 'SmartgasConsumerApp/js/screens/changeLanguage/ChangeLanguage';
    import { ProfileScreen } from 'SmartgasConsumerApp/js/screens/profile/Profile';
    import { MultipleAccountsScreen } from 'SmartgasConsumerApp/js/screens/multipleAccounts/MultipleAccounts';
    import { ChangePasswordScreen } from 'SmartgasConsumerApp/js/screens/changePassword/ChangePassword';
    import { UserManagementScreen } from 'SmartgasConsumerApp/js/screens/userManagement/UserManagement';
    import { EnergySavingProgramScreen } from 'SmartgasConsumerApp/js/screens/energySavingProgram/EnergySavingProgram';
    import { FeedbackScreen } from 'SmartgasConsumerApp/js/screens/feedback/Feedback';
    import { TermsAndConditionsScreen } from 'SmartgasConsumerApp/js/screens/termsAndConditions/TermsAndConditions';
// Complaint Screens
    import CreateTicket from 'SmartgasConsumerApp/js/screens/complaints/CreateTicket';

import {ButtonText} from "../components/common";
import MaterialIcons from "../components/common/DrawerMenu";
import {HPSEBPlusScreen} from "../screens/HPSEBPlus/HPSEBPlus";
import { styles } from '../styles';
import { ContactUpdateScreen } from '../screens/profile/ContactUpdateHistoryScreen';
import { TariffDetailsScreen } from '../screens/tariffDetails/TariffDetails';
import { DateWiseConsumptionScreen } from '../screens/dateWiseConsumption/DateWiseConsumption';
import { MeterDetailsScreen } from '../screens/meterDetails/MeterDetails';

import { SendRequestScreen } from '../screens/request/SendRequest';
import { CcAvenueScreen } from '../screens/ccavenue/CcAvenue';
import { WebViewScreen } from '../screens/ccavenue/WebViewScreen';
import { BottomTab } from './BottomTab';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const config = {
    animation: 'spring',
    config: {
      stiffness: 1000,
      damping: 500,
      mass: 3,
      overshootClamping: true,
      restDisplacementThreshold: 0.01,
      restSpeedThreshold: 0.01,
    },
  };
const renderDrawerItems = (menu, selected, setSelected,navigation, language, logout, showLogout)=> {
    let menus = [
        {
          "order": 1,
          "pname": "Dashboard",
          "url": "/dashboard",
          "icon": "home",
          "smenu": null
        },
        {
          "order": 2,
          "pname": "Live Data",
          "url": "/livedata",
          "icon": "home",
          "smenu": null
        },
        {
          "order": 3,
          "pname": "Consumption Log",
        //   "url": "/consumptionLog",
          "icon": "bar-chart",
          "smenu": [
            {
              "order": 31,
              "sname": "Comparison",
              "icon": "percent",
              "url": "/consumptionLog/comparison"
            },
            {
              "order": 32,
              "sname": "History",
              "icon": "pie-chart",
              "url": "/consumptionLog/history"
            }
          ]
        },
        // {
        //   "order": 5,
        //   "pname": "MDI",
        //   "url": "/mdi",
        //   "icon": "alert-octagon",
        //   "smenu": null
        // },
        {
          "order": 7,
          "pname": "Energy Tips",
          "url": "/energyTips",
          "icon": "zap",
          "smenu": null
        },
        {
          "order": 11,
          "pname": "Notification",
          "url": "/notification",
          "icon": "bell",
          "smenu": null
        },
        // {
        //   "order": 12,
        //   "pname": "Date wise Consumption",
        //   "url": "/datewiseConsumption",
        //   "icon": "at-sign",
        //   "smenu": null
        // },
        // {
        //   "order": 13,
        //   "pname": "Meter Details",
        //   "url": "/meterDetails",
        //   "icon": "home",
        //   "smenu": null
        // },
        {
          "order": 14,
          "pname": "Settings",
          "url": "/settings",
          "icon": "settings",
          "smenu": null
        },
        {
          "order": 15,
          "pname": "Contact Us",
          "url": "/ContactUs",
          "icon": "at-sign",
          "smenu": null
        }
      ]
    return menus?.map(m => {
        // let path = m.pname.replace(" ", "");
        // path = path.replace(" ", "");
        // path = path.replace(",", "");
        let path = m.url;
        if (m.smenu) {
            return m.pid !== 10 ?
                <>
                    <DrawerItem
                        // label={strings[language].dashboard}
                        label={m.pname}
                        key={m.pname}
                        labelStyle={[styles.drawerLabel]}
                        style={[styles.drawerItem,]}
                        onPress={()=>setSelected(selected === m.pname ? "" :  m.pname)}
                        // options={}
                        icon={() => < FIcons name={m.icon} color={'#fff'} size={20}/>}
                    />
                    {selected === m.pname ? renderSubmenu(m.smenu, selected, m.pname, language, navigation) : null}
                </>: null;
        } else {
            return m.order !== 20 ?
                <DrawerItem
                    label={m.pname}
                    key={m.pname}
                    // label={strings[language][m.name]}
                    labelStyle={[styles.drawerLabel]}
                    style={[styles.drawerItem,]}
                    onPress={() => {
                        if(path == "/dashboard"){
                            navigation.reset({
                                index: 0,
                                routes: [{ name: 'Dashboard' }],
                            });
                        }   
                        // const {navigation}=rest[1];
                        console.log(path,{menu, selected, setSelected, language, navigation, logout, showLogout},"jslkfhas")                    
                        path && navigation.navigate(path)
                    }  
                    }
                        
                    // options={}
                    icon={() => < FIcons name={m.icon} color={'#fff'} size={20}/>}
                /> :  null
                // <TouchableOpacity
                //     key={m.pid}
                //     onPress={() => {
                //         logout()
                //         console.log(logout)
                //         // this.props.showLogout(true);
                //         navigation.toggleDrawer();
                //         setTimeout(()=> navigation.replace("Login"), 2000)
                //     }}>
                //     <View style={[{width: '100%', marginTop: 20, marginLeft:18,  height: 45}]}>
                //         <View style={[{flex: 1},styles.row, styles.centerHorizontal]}>
                //             <MCIcons name='logout' size={24} color={Colors.white}/>
                //             <View style={{marginLeft:13}}>
                //                 <ButtonText style={[{  color: selected === path ? Colors.paleRed : "white"}, styles.regular]}>{m.pname}</ButtonText>
                //             </View>
                //         </View>
                //     </View>
                // </TouchableOpacity>;
        }
    });
}

const renderSubmenu = (menus, selected, pname, language, navigation) => {
    // m.smenu, selected, m.pname, language, navigation
    return menus?.map(m => {
        // let path = m.sname.replace(" ", "");
        // path = path.replace(" ", "");
        // path = path.replace(",", "");
        // path = m.sid === 3 ? path.substr(0,16) : path;
        let path = m.url;

        return selected === pname &&
            <DrawerItem
                // label={strings[language][m.name]}
                label={m.sname}
                key={m.sname}
                labelStyle={[styles.drawerLabel]}
                style={styles.drawerSubItem}
                onPress={() => path && navigation.navigate(path)}
                icon={() => < FIcons name={m.icon} color={'#fff'} size={20}/>}
            />
    });
};


const Screens = ({ navigation, style, currentRoute ,darkMode, showOnboarding, showLogin, notifications, setHeaderLeftDimensions, setHeaderRightDimensions}) => {
    return (
        <Animated.View style={StyleSheet.flatten([styles.stack, style,{borderColor:darkMode ? Colors.darkGrey : Colors.idk }, styles.overflow])}>
            <Stack.Navigator
                screenOptions={{
                    headerTransparent: true,
                    headerTitle: null,
                    // transitionSpec: {
                    //     open: config,
                    //     close: config,
                    // },
                    headerLeft: () => (
                        <Pressable disabled={showOnboarding} style={{marginLeft: 10, paddingHorizontal: 20, paddingBottom: 0, marginBottom: 0}} onPress={() => navigation.openDrawer()} onLayout={(event) => {
                            event.target.measure(
                                (x, y, width, height, pageX, pageY) => {
                                    setHeaderLeftDimensions({
                                        realX: x,
                                        realY: y,
                                        realPX: pageX,
                                        realPY: pageY,
                                        x: x +pageX,
                                        y: y +pageY,
                                        width,
                                        height
                                    });
                                },
                            )}}>
                            <Text>
                                <MCIcons name='menu' size={30} color={darkMode? Colors.white : Colors.black}/>
                            </Text>
                        </Pressable>
                    ),
                    headerRight: () => (
                        <Pressable disabled={showOnboarding} 
                        style={{marginLeft: 10, paddingHorizontal: 20, paddingBottom: 0, marginBottom: 0}} 
                        onPress={() => navigation.navigate('/notification')}
                         onLayout={(event) => {
                            event.target.measure(
                                (x, y, width, height, pageX, pageY) => {
                                    setHeaderRightDimensions({
                                        realX: x,
                                        realY: y,
                                        realPX: pageX,
                                        realPY: pageY,
                                        x: x +pageX,
                                        y: y +pageY,
                                        width,
                                        height
                                    });
                                },
                            )}}>
                            <View style={[{height:14,width:14, borderRadius: 7}, styles.allCenter, styles.absolute, styles.bgGreen, styles.zIndex, {top: -2, marginHorizontal: 20, right:0}]}>
                                <Text style={[styles.white, styles.fontSize8]}>
                                    {notifications?.count ? notifications.count : 0}
                                </Text>
                            </View>
                            <Text>
                                <IIcons name='notifications-outline' size={30} color={darkMode? Colors.white : Colors.black}/>
                            </Text>

                        </Pressable>
                    ),
                }}>

                {/* <Stack.Screen name="Dashboard">{ props => <DashboardScreen {...props}  />}</Stack.Screen> */}

                {/* Onboarding Screens   */}
                {

                    // (showOnboarding && !showLogin) ? <Stack.Screen name="Onboarding">{props => <OnboardingScreen {...props}  />}</Stack.Screen> : null

                    // TODO 27/01/2021 Changed by Rizwan Need TO Check this Condition
                    (showOnboarding && showLogin) ? <Stack.Screen name="Onboarding">{props => <OnboardingScreen {...props}  />}</Stack.Screen> : null
                }
                {/* Login, Register and Forgot Password Screens    */}
                {
                    showLogin ?
                    <Stack.Screen name="Login"  >{props => <LoginScreen {...props}  />}</Stack.Screen>
                        : null
                }



                {
                    showLogin ?
                    <Stack.Screen name="Otp">{props => <OtpScreen {...props}  />}</Stack.Screen>
                        : null
                }
                {
                    showLogin ?
                    <Stack.Screen name="Register" >{props => <RegisterScreen {...props}  />}</Stack.Screen>
                        : null
                }
                {
                    showLogin ?
                        <Stack.Screen name="ForgotPassword"  >{props => <ForgotPasswordScreen {...props}  />}</Stack.Screen>
                        : null
                }
                {
                    showLogin ?
                        <Stack.Screen name="PaymentRecharge"  >{props => <PaymentRechargeScreen {...props}  />}</Stack.Screen>
                        : null
                }
                {/* Drawer Screens */}

                
                {/* { !showLogin && <Stack.Screen name="/dashboard">{ props => <DashboardScreen {...props}  />}</Stack.Screen>} */}

                { !showLogin && <Stack.Screen name="/dashboard">{ props => <DashboardScreen {...props}/>}</Stack.Screen>}
                {/* { !showLogin && <Stack.Screen name="/dashboard">{ props => <BottomTab {...props}/>}</Stack.Screen>} */}
                { !showLogin && <Stack.Screen name="/livedata">{ props => <LiveDataScreen {...props}  />}</Stack.Screen>}
                {/* Consumption Screens */}
                { !showLogin ? <Stack.Screen name="/consumptionLog/comparison">{props => <ComparisonScreen {...props}  />}</Stack.Screen> : null}
                { !showLogin ? <Stack.Screen name="/consumptionLog/history">{props => <HistoryScreen {...props}  />}</Stack.Screen> : null}
                    { !showLogin ? <Stack.Screen name="horizontalGraph">{props => <HorizontalGraphScreen {...props}  />}</Stack.Screen> : null}
                    {/* Billing Screens */}
                    { !showLogin && <Stack.Screen name="/billing/prepaid/payments">{props => <PayMyBillScreen {...props}  />}</Stack.Screen>}
                    {/* <Stack.Screen name="/biling/prepaid/history">{props => <BillingHistoryScreen {...props}  />}</Stack.Screen> */}

                    { !showLogin && <Stack.Screen name="/biling/history">{props => <BillingHistoryScreen {...props}  />}</Stack.Screen>}
                    { !showLogin && <Stack.Screen name="/billing/prepaidBilling">{props => <PrepaidBalanceScreen {...props}  />}</Stack.Screen>}
                    { !showLogin && <Stack.Screen name="/billing/postpaidBilling">{props => <PostpaidBillingScreen {...props}  />}</Stack.Screen>}                    
                    { !showLogin && <Stack.Screen name="/mdi">{props => <MaximumDemandInterfaceScreen {...props}  />}</Stack.Screen>}
                {/* MDI SCREEN */}
                { !showLogin && <Stack.Screen name="MDGraph">{props => <MaximumDemandGraphScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/powerQuality">{props => <PowerQualityScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/eventAnalysis">{props => <EventAnalysisScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/energyTips">{props => <EnergyTipsScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/faq">{props => <FAQsScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/notification">{props => <NotificationsScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/energyCostCalc">{props => <EnergyCostCalculatorScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="HouseholdAppliance">{props => <HouseholdApplianceScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/support">{props => <SupportScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/settings">{props => <SettingsScreen {...props} />}</Stack.Screen>}
                {/* PLM / DR */}
                { !showLogin && <Stack.Screen name="/DRProgram/CheckProgram">{props => <CheckProgramsScreen {...props} />}</Stack.Screen>}
                    {/* Program List */}
                    { !showLogin && <Stack.Screen name="/DRProgram/CheckProgram/ProgramList">{props => <ProgramsListScreen {...props} />}</Stack.Screen>}

                    { !showLogin && <Stack.Screen name="/DRProgram/MyProgram">{props => <MyProgramsScreen {...props} />}</Stack.Screen>}
                    {/* PastEvents */}
                    { !showLogin && <Stack.Screen name="/DRProgram/MyProgram/PastEvents">{props => <PastEventsScreen {...props} />}</Stack.Screen>}
                    {/* UpcomingEvents */}
                    { !showLogin && <Stack.Screen name="/DRProgram/MyProgram/UpcomingEvents">{props => <UpcomingEventsScreen {...props} />}</Stack.Screen>}
                {/* Prepaid Screens */}
                { !showLogin && <Stack.Screen name="/Prepaid/RechargeHistory">{props => <PrepaidRechargeHistoryScreen {...props}  />}</Stack.Screen>}
                {/* { !showLogin && <Stack.Screen name="/Prepaid/Balance">{props => <PrepaidBalanceScreen {...props}  />}</Stack.Screen>} */}
                { !showLogin && <Stack.Screen name="/complaints">{props => <ComplaintsScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/NetMeter">{props => <NetMeterScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/Schemes">{props => <SchemesScreen {...props}  />}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/ContactUs">{props => <ContactUsScreen {...props}/>}</Stack.Screen>}
                {/* <Stack.Screen name="/logOut">{props => <LogOut {...props}  />}</Stack.Screen> */}
                {/* Settings Screens */}
                {/* { !showLogin && <Stack.Screen name="HPBilling">{props => <HPBillingScreen {...props}/>}</Stack.Screen>} */}
                { !showLogin && <Stack.Screen name="ColorMode">{props => <ColorModeScreen {...props}/>}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="Language">{props => <LanguageScreen {...props}/>}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="Profile">{props => <ProfileScreen {...props}/>}</Stack.Screen>}
                {/*{ !showLogin && <Stack.Screen name="MultipleAccounts">{props => <MultipleAccountsScreen {...props}/>}</Stack.Screen>}*/}
                { !showLogin && <Stack.Screen name="ChangePassword">{props => <ChangePasswordScreen {...props}/>}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="EnergySavingProgram">{ props => <EnergySavingProgramScreen {...props}  />}</Stack.Screen>}
                {/*{ !showLogin && <Stack.Screen name="UserManagement">{ props => <UserManagementScreen {...props}  />}</Stack.Screen>}*/}
                { !showLogin && <Stack.Screen name="Feedback">{props => <FeedbackScreen {...props}/>}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="TermsAndConditions">{props => <TermsAndConditionsScreen {...props}/>}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="CreateTicket">{props => <CreateTicket {...props}/>}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="ContactUpdate">{props => <ContactUpdateScreen {...props}/>}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/tariffDetails">{props => <TariffDetailsScreen {...props}/>}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/datewiseConsumption">{props => <DateWiseConsumptionScreen {...props}/>}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="/meterDetails">{props => <MeterDetailsScreen {...props}/>}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="SendRequest">{props => <SendRequestScreen {...props}/>}</Stack.Screen>}
                { !showLogin && <Stack.Screen name="CcAvenue">{props => <CcAvenueScreen {...props}/>}</Stack.Screen>}
                { <Stack.Screen name="WebViewScreen">{props => <WebViewScreen {...props}/>}</Stack.Screen>}
                { (currentRoute === "Login" ? showLogin : !showLogin) && <Stack.Screen name="MPin"  >{props => <MPinScreen {...props}  />}</Stack.Screen>}


            </Stack.Navigator>
        </Animated.View>
    );
};

const DrawerContent = props => {
    console.log('Draswer',useIsDrawerOpen(), props);
    // useIsDrawerOpen()
    const isDrawerOpen = useIsDrawerOpen();
    isDrawerOpen && !props.token && props.navigation.closeDrawer();
    // isDrawerOpen && !token 
    const scrollViewRef = useRef();
    const [selected, setSelected] = React.useState("");
    const [showUser,setShowUser] = React.useState(false);
    const {language, menu, logout, showLogout, userDetails,accountDetails} = props;
    useEffect(() => {
        scrollViewRef.current.scrollTo({ animated: true })
    })
    
    return (
        <DrawerContentScrollView {...props} scrollEnabled={false}  contentContainerStyle={[styles.flexOne]}>
            <View style={[styles.profileContainer]}>
                <Pressable style={styles.marginTop48} onPress={()=>props.navigation.navigate('Profile',{comingFrom:"drawer"})}>
                    {userDetails?.image?.img ?
                        <Image style={[{width: 100, height: 100, borderRadius:50 }, styles.profileImage]} source={{uri: userDetails.image.img}}/>                   :
                        <Image style={[styles.profileImage]} source={require('SmartgasConsumerApp/assets/images/Nazim.jpg')}/>
                    }
                </Pressable>
                <View>
                    <Text style={[styles.white,styles.fontSize17,styles.paddingTop4,styles.selfCenter]}>
                        {props?.userDetails?.name}
                    </Text>
                </View>
                <View>
                    <Text style={[styles.white,styles.selfCenter,styles.opacity80perc]}>
                        {strings[language]?.drawer?.caNo} : 
                        {props?.userDetails?.consumerId}
                    </Text>
                </View>

                {/* {accountDetails[0] ? <View style={[styles.row,styles.allCenter]}> 
                    <Text style={[styles.white,styles.selfCenter,styles.opacity80perc]}>
                        Other Users:
                    </Text>
                    <TouchableOpacity onPress={()=>setShowUser(!showUser)} style={[styles.marginLeft16]}>
                    <FIcons name={!showUser?'chevron-down':'chevron-up'} size={15} color={Colors.white} />
                    </TouchableOpacity>
                </View> : null}
                {showUser && 
                <View>
                {accountDetails[0]?.consumerNumber && <TouchableOpacity>
                <Text style={[styles.white,styles.selfCenter,styles.opacity80perc]}>
                    {accountDetails[0]?.consumerNumber}
                </Text>
                </TouchableOpacity>}
                {accountDetails[1]?.consumerNumber && <TouchableOpacity>
                <Text style={[styles.white,styles.selfCenter,styles.opacity80perc]}>
                    {accountDetails[1]?.consumerNumber}
                </Text>
                </TouchableOpacity>}
                {accountDetails[2]?.consumerNumber && <TouchableOpacity>
                <Text style={[styles.white,styles.selfCenter,styles.opacity80perc]}>
                    {accountDetails[2]?.consumerNumber}
                </Text>
                </TouchableOpacity>}
                {accountDetails[3]?.consumerNumber && <TouchableOpacity>
                <Text style={[styles.white,styles.selfCenter,styles.opacity80perc]}>
                    {accountDetails[3]?.consumerNumber}
                </Text>
                </TouchableOpacity>}
                {accountDetails[4]?.consumerNumber && <TouchableOpacity>
                <Text style={[styles.white,styles.selfCenter,styles.opacity80perc]}>
                    {accountDetails[4]?.consumerNumber}
                </Text>
                </TouchableOpacity>}
                    </View>
            }
                {accountDetails !== "" && accountDetails.length > 5 && showUser && <TouchableOpacity onPress={()=>props.navigation.navigate("MultipleAccounts",{comingFrom:"drawer"})} 
                 style={[styles.paddingRegular, styles.paddingHorizontal16,styles.bgWhite, styles.radius20,styles.Margin10]}>
                    <Text style={[styles.black,styles.selfCenter,styles.fontSize17]}>See All</Text>
                </TouchableOpacity>} */}
                     {/* <FlatList data={accountDetails} renderItem={(item)=>{
                         <View style={[styles.flexOne,styles.margin,styles.allCenter]}>
                             <Text style={[styles.white,styles.selfCenter,styles.opacity80perc]}>{item.item}</Text>
                         </View>
                     }} /> */}
                <TouchableOpacity  style={[styles.paddingVertical, styles.marginVertical, styles.radius20, props.userDetails.consumerId != undefined ? styles.bgGreen : styles.bgGrey, styles.elevatePlus]} onPress={()=> {  props.userDetails.consumerId != undefined && props.navigation.navigate('CcAvenue')}} >
                    <Text style={[styles.white,  styles.fontSize15, styles.textCenter, styles.textAlignVertical]}>Recharge</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.flexFour,styles.paddingVertical20,styles.paddingBottom32,styles.marginBottom24]}>
                <ScrollView
                scrollToOverflowEnabled={true}
                ref={scrollViewRef}
                // onResponderStart
                // onMomentumScrollBegin={() => scrollViewRef.current.scrollTo({ animated: true })}
                // onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                
                  style={{flex:1}} showsVerticalScrollIndicator={false} >
                    {console.log(props,"kjdsflkahjkfh")}
                    {renderDrawerItems(menu, selected, setSelected, props.navigation, language, logout, showLogout)}


                    <DrawerItem
                        label={strings[language]?.drawer?.logout}
                        labelStyle={[styles.drawerLabel]}
                        style={styles.drawerItem}
                        onPress={() => {
                            showLogout(true)
                            props.navigation.toggleDrawer(); 
                            return Promise.resolve()
                            // setTimeout(()=> props.navigation.replace("Login"), 2000)
                        }}
                        icon={() => < MIIcons name={'logout'} color={'#fff'} size={20}/>}
                    />

                </ScrollView>
            </View>
            {/* <View style={[styles.allCenter,styles.flexHalf]}>
                <Text style={[styles.white,styles.fontSize17,styles.palanquinMedium]}>
                    HPSEBL 2020 - V 1.2.1
                </Text>
            </View> */}
        </DrawerContentScrollView>
    );
};

export default ({...rest}) => {
    console.log({rest},"sumitdrawprops")
    const {darkMode, token, language, menu, showOnboarding, showLogin, logout, showLogout, currentRoute, userDetails, notifications, setHeaderLeftDimensions, setHeaderRightDimensions,accountDetails} = rest;
    const [progress, setProgress] = React.useState();
    const scale = Animated.interpolate(progress, {
        inputRange: [0, 0.8],
        outputRange: [1, 0.9],
        useNativeDriver: false
    });
    const borderRadius = Animated.interpolate(progress, {
        inputRange: [0, 1],
        outputRange: [0,30],
    });

    const animatedStyle = { borderRadius, transform: [{ scale }]};
    return (
        <Drawer.Navigator
            drawerType={"slide"}
            overlayColor="transparent"
            drawerStyle={styles.drawerStyles}
            contentContainerStyle={{ flex: 1 }}
            drawerContentOptions={{
                activeBackgroundColor: 'transparent',
                activeTintColor: 'white',
                inactiveTintColor: 'white',
            }}
            screenOptions={{ gestureEnabled: token ? true : false, swipeEnabled: token ? true : false}}
            options={{ gestureEnabled: !(currentRoute === "Login") && showOnboarding, swipeEnabled: !(currentRoute === "Login") && showOnboarding }}
            sceneContainerStyle={{ backgroundColor: Colors.darkGray, marginLeft:-1 }}
            drawerContent={props => {
                console.log("sumit1234",props)
                setProgress(props.progress);
                return <DrawerContent {...props} token={ token ? true: false } language={language} darkMode={darkMode} menu={menu} showLogout={showLogout} logout={logout} userDetails={userDetails} accountDetails={accountDetails} />;
            }}>
            <Drawer.Screen name="Screens">
                {props => <Screens {...props} currentRoute={currentRoute}  style={animatedStyle} darkMode={darkMode} showOnboarding={showOnboarding} showLogin={showLogin} notifications={notifications} setHeaderLeftDimensions={setHeaderLeftDimensions} setHeaderRightDimensions={setHeaderRightDimensions}/>}
            </Drawer.Screen>
        </Drawer.Navigator>
    );
};
