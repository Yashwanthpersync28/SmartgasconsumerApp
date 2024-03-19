// import React, { Component } from 'react';
// import { Text, View, Platform, TouchableOpacity, StatusBar, AppState, Modal, Alert, Image, BackHandler, Dimensions, Linking, ImageBackground } from 'react-native';
// import { connect } from "react-redux";
// // Styles, Colors, Components and Constants
// // import { styles } from 'SmartgasConsumerApp/js/styles'
// import Colors from "SmartgasConsumerApp/js/styles/Colors";
// // Constants
// import {SPLASH} from 'SmartgasConsumerApp/js/constants/lottie';
// import {images} from './constants/imageConstants';
// // Custom Components
// import ConnectivityComponent from 'SmartgasConsumerApp/js/components/common/connectivity/Connectivity'
// import {
//     ButtonText,
// } from "SmartgasConsumerApp/js/components/common";
// // Libraries
// import Animated from 'react-native-reanimated';
// import DrawerComponent from './navigation/Drawer';
// import NetInfo from "@react-native-community/netinfo";
// // Back End
// import { showLogout } from "SmartgasConsumerApp/js/actions/commonActions";
// import { userDetailActions } from "SmartgasConsumerApp/js/actions";
// import { apiDispatcher, logout } from "SmartgasConsumerApp/js/actions";
// import { commonSelectors } from "SmartgasConsumerApp/js/selectors";
// import {drawerApi} from "./api/drawer/drawerApi";
// import * as dashboard from "./api/dashboard";
// import {LoginScreen} from './screens/login/Login'
// import { strings } from "SmartgasConsumerApp/js/strings";
// // import messaging from '@react-native-firebase/messaging';
// import { ServerMaintenanceScreen } from './screens/ServerMaintenance';
// import { styles } from './styles';
// // import crashlytics from '@react-native-firebase/crashlytics'; not in use
// import { isValidToken } from './helpers/common/expireTokenValidation';

// //import { requestUserPermission } from './actions/fcmActions';


// var pkg = require('../package.json');
// console.log(pkg.version);

// var pkg = require('../package.json');
// console.log(pkg.version);

// let oldRender = Text.render;
// Text.render = function (...args) {
//     let origin = oldRender.call(this, ...args);
//     return React.cloneElement(origin, {
//         style: [ origin.props.style]
//     });
// };

// class App extends Component {
//     constructor(props) {
//         super(props);
//         this.done = false;
//         this.state={
//             appState: AppState.currentState,
//             progress: new Animated.Value(0),
//             serverOn:true
//             // updateWarning: 
//             // action: "Warning"
//         };
//         this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
//     }
//     async componentDidMount(): void {
//         // crashlytics().log('User signed in.', );
//         // if(this.props.userDetails){
//         //     await Promise.all([
//         //         crashlytics().setUserId(this.props.userDetails.CANumber.toString()),
//         //         crashlytics().setAttributes({
//         //             roleid: this.props.userDetails.roleid.toString(),
//         //             mobilenumber: this.props.userDetails.mobilenumber.toString(),
//         //             Name: this.props.userDetails.Name,
//         //         }),
//         //     ]);
//         // }
        
//     //    const fcmPermissions = await requestUserPermission()
//     //    console.log("Firebase Permission", fcmPermissions);
//     //     const fcmToken = await messaging().getToken();
//     // if (fcmToken) {
//     //     console.log("Fcmtoken is",fcmToken);
//     // }
//         // this.showAlert()
//         await NetInfo.fetch().then(state => {
//             console.log("Connection type", state.type);
//             console.log("Is connected?", state.isConnected);
//             this.setState({showPopUp: !state.isConnected})
//         });
//         const unsubscribe = NetInfo.addEventListener(state => {
//             console.log("Connection type", state.type);
//             console.log("Is connected?", state.isConnected);
//             this.setState({showPopUp: !state.isConnected})
//         });
//         AppState.addEventListener("change", this._handleAppStateChange);
//         //  setTimeout(async()=>{
//         //     let resp =await this.props.apiDispatcher(dashboard.appVersionApi(pkg.version), false);
//         //     if(resp.data ) {
//         //         this.setState({action: resp.data.apkStatus});
//         //     }
//         //     console.log(resp)
//         // }, 5000);
//     }

//     onLink = async () => {
// //         const link = 'itms-apps://apps.apple.com/id/app/halojasa/id1617265809?l=id';
// // Linking.canOpenURL(link).then(supported => {
// //   supported && Linking.openURL(link);
// // }, (err) => console.log(err));
//         // return Linking.openURL(Platform.OS === "ios" ? "itms-apps://itunes.apple.com/us/app/apple-store/1617265809?mt=8" : "https://play.google.com/store/apps/details?id=com.sbpdcl.consumerapp&hl=en_IN&gl=US");
//     };

//     showAlert = () => {
//         Alert.alert(
//             "Critical Update Required",
//             "Please update the application from store",
//             [
//                 { text: "Update", onPress: () => {
//                         this.onLink();
//                         Alert.alert(
//                             "Critical Update Required",
//                             "Please update the application from store",
//                             [
//                                 { text: "Update", onPress: () => {
//                                         this.onLink();
//                                         this.showAlert();
//                                     } }
//                             ],
//                             { cancelable: false }
//                         ) 
//                     }}
//             ],
//             { cancelable: false }
//         );
//     };

//     componentWillMount() {
//         BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
//         // this.showAlert()
        
//     }
//     componentWillUnmount() {
//         AppState.removeEventListener("change", this._handleAppStateChange);
//         BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
//     }

//     componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
//         if (this.props.token && !this.state.is_loaded) {
//             this.getMenu();
//         }
        

//         let cancelPopup = "no";
//         if (this.state.action && this.state.action == "Warning" ? !prevState.action : true) {
//             switch (this.state.action) {
//                 case "Up-To-Date":
//                     break;
//                 case "Warning":
//                     Alert.alert(
//                         "New Version Available",
//                         "Please update the application from store.",
//                         [

//                             { text: "Update", onPress: this.onLink },
//                             { text: "Remind me later", onPress: () => console.log("OK Pressed") },
//                         ],
//                         { cancelable: false }
//                     );
//                     break;
//                 case "Redirect":
//                     this.showAlert()
//                     break;
//             }
//         }
//     }

//     _handleAppStateChange = nextAppState => {
//         if (
//             this.state.appState.match(/inactive|background/) &&
//             nextAppState === "active"
//         ) {
//             this.props.setActiveCount(this.props.activeCount+ 1)
//         }
//         this.setState({ appState: nextAppState });
//     };

//     handleBackButtonClick() {
//         // const {index, routes} = this.props.navigation.dangerouslyGetState();
//         // const currentRoute = routes[index].name;
//         // console.log('current screen', currentRoute, this.props.navigation.getState());
//         // // this.props.navigation.goBack(null);
//         // // currentRoute == "/dashboard" && 
//         // if(currentRoute == "/dashboard"){ 
//         //     this.backAction()
//         //     return true;
//         // }
//     }

//     getMenu = async () => {
//         // let data = await this.props.apiDispatcher(drawerApi(this.props.userDetails.roleid),false);
//         // this.props.setMenu(data.data);

//         this.setState({ is_loaded: true })
//         // let data1 = await this.props.apiDispatcher(dashboard.notificationsApi())
//         // let data = {
//         //     "count": 8,
//         //     "notification": [
//         //         {
//         //             "id": 1,
//         //             "title": "Offers",
//         //             "description": "Your balance is low ! Running low on balance? Recharge now to stay connected. ",
//         //             "time": "2024-02-09T09:11:29.35"
//         //         },
//         //         {
//         //             "id": 2,
//         //             "title": "Recharge Successfull",
//         //             "description": "Your balance is low ! Running low on balance? Recharge now to stay connected. ",
//         //             "time": "2023-12-09T08:04:42.953"
//         //         },
//         //         {
//         //             "id": 3,
//         //             "title": "Low Balance",
//         //             "description": "Your balance is low ! Running low on balance? Recharge now to stay connected. ",
//         //             "time": "2023-10-09T08:28:01.937"
//         //         },
//         //         {
//         //             "id": 4,
//         //             "title": "Rewards unlocked",
//         //             "description": "Your balance is low ! Running low on balance? Recharge now to stay connected. ",
//         //             "time": "2024-02-09T09:11:29.35"
//         //         },
//         //         {
//         //             "id": 5,
//         //             "title": "Rewards",
//         //             "description": "Your balance is low ! Running low on balance? Recharge now to stay connected. ",
//         //             "time": "2023-12-09T08:04:42.953"
//         //         },
//         //         {
//         //             "id": 6,
//         //             "title": "Low Balance",
//         //             "description": "Your balance is low ! Running low on balance? Recharge now to stay connected. ",
//         //             "time": "2023-10-09T08:28:01.937"
//         //         },
//         //     ]
//         // }


//         try {
//             const baseRechargeDetailsUrl = 'https://cportalgasapi.esyasoft.com/api/Notification/Mobile/NotificationHistory';
        
//             const token = await this.props.token;
//             const  consumerNo = this.props?.userDetails?.consumerId;


//             const headers = new Headers({
//                 Accept: 'application/json, text/plain, */*',
//                 Authorization: `Bearer ${token}`,
//                 'Content-Type': 'application/json',
//                 'X-Requested-With': 'XMLHttpRequest',
//             });
            
//             const requestBody = JSON.stringify({
//                 consumerNo:consumerNo,
//                 limit:100,
//                 offset:0
//             });

//             console.log("requestBodyHistory", requestBody);
//             console.log("NoBodyHistory");

//             const response = await fetch(baseRechargeDetailsUrl, {
//                 method: 'POST',
//                 headers: headers,
//                 body: requestBody,
//             });

//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }

//             let data;
//             const contentType = response.headers.get('content-type');
//             if (contentType && contentType.includes('application/json')) {
//                 data = await response.json();
//             } else {
//                 data = await response.text(); // If not JSON, get response as text
//             }

//             console.log('History-App.Js:', response.status, data);
//             this.props.setNotifications(data);

//         } catch (error) {
//             console.error('History-APPJS-Error:', error);
//         }
       
       

//     }

//     render() {
//         const { language, darkMode } = this.props;
//         // const roleid = this.props.userDetails.roleid != "Undefined" && this.props.userDetails.roleid
//         // alert(this.props.token)
//         return (
//             this.props.rehydrated ? !this.state.serverOn? <ServerMaintenanceScreen darkMode={this.props.darkMode}/> : <View style={[styles.container,this.props.darkMode ? styles.bgBlack : styles.bgIdk]}>
//                 <View style={[styles.container, styles.width, styles.height,  this.props.darkMode ? styles.bgDarkGrey : styles.bgIdk]}>
//                     { this.props.darkMode ?  <StatusBar backgroundColor={Colors.darkGray} barStyle='light-content'  />:
//                         <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
//                     {(Platform.OS === 'ios' && this.props.token) ? <View style={[styles.appBar, this.props.darkMode ? styles.bgDarkGrey : styles.bgIdk ]}/>: null}
//                     {
//                         //Login flow
//                         // this.props.token ?

//                         <>
//                             {
//                                 <DrawerComponent
//                                     darkMode={this.props.darkMode}
//                                     language={this.props.language}
//                                     showLogin={!this.props.token}
//                                     menu={this.props.menu}
//                                     showOnboarding={!!!this.props.infoShown}
//                                     token={this.props.token}
//                                     logout={this.props.logout}
//                                     showLogout={this.props.showLogout}
//                                     currentRoute={this.props.currentRoute}
//                                     userDetails={this.props.profile}
//                                     accountDetails={this.props.accountDetails}
//                                     // roleid={roleid}
//                                     notifications={this.props.notifications}
//                                     setHeaderLeftDimensions={this.props.setHeaderLeftDimensions}
//                                     setHeaderRightDimensions={this.props.setHeaderRightDimensions}
//                                 />
//                             }
//                             {   this.state.showPopUp?
//                                 <ConnectivityComponent language={language} darkMode= {darkMode}/>   : null
//                             }
//                             {this.props.showLogoutOption ?  <View style={[styles.absolute, styles.paleGrey5Overlay, styles.allCenter, styles.heightFixed, styles.width, {zIndex: 9999, alignSelf: 'flex-start'}]}>
//                                 <Modal
//                                     animationType="slide"
//                                     // presentationStyle={'pageSheet'}
//                                     visible={true}
//                                     style={[styles.bgMidBlueDisabled]}
//                                     transparent={true}
//                                     onRequestClose={()=>{}}
//                                 >
//                                     <View style={[{bottom: 0}, styles.width, styles.absolute]}>
//                                         <View style={[{ height: 180, flex:1, padding:15, justifyContent:"space-between", borderRadius:10 }, styles.bgWhite1, styles.width, styles.flexTwo]}>
//                                             <View style={[styles.paddingVertical, styles.paddingHorizontal4, { flex: 2 }]}>
//                                                 <View style={{flex:1, justifyContent:"flex-start"}}>
//                                                     <Text style={[styles.medium, styles.darkGray]}>
//                                                         {strings[language].logout.alert}
//                                                     </Text>
//                                                 </View>
//                                                 <View style={{flex:1, justifyContent:"center"}}>
//                                                     <Text style={[styles.regular, styles.darkGray]}>
//                                                         {strings[language].logout.message}
//                                                     </Text>
//                                                 </View>
//                                             </View>
//                                             <View style={[styles.row, styles.width, styles.flexTwo, { alignItems:"center", justifyContent:"space-between" }]}>
//                                                 <TouchableOpacity onPress={()=>this.props.showLogout(false)} style={[{ height: 50,  borderRadius: 8, borderWidth:1, borderColor: Colors.black }, styles.flexOne ,styles.allCenter, styles.bgTint5DeepGreyBlue, styles.marginHorizontal]}>
//                                                     <ButtonText style={[styles.darkGray]}>
//                                                         {strings[language].logout.no}
//                                                     </ButtonText>
//                                                 </TouchableOpacity>
//                                                 <TouchableOpacity
//                                                     onPress={ ()=> {
//                                                         // this.props.apiDispatcher(logoutApi());
//                                                         this.props.logout();
//                                                         // setTimeout(()=> this.props.navigation.replace("Login"), 2000)
//                                                         this.props.showLogout(false);
//                                                     }}
//                                                     style={[{ height: 50, backgroundColor:Colors.darkGreen, borderRadius: 8 }, styles.flexOne, styles.allCenter, styles.marginHorizontal]}
//                                                 >
//                                                     <ButtonText style={{color:'#fff'}}>
//                                                         {strings[language].logout.yes}
//                                                     </ButtonText>
//                                                 </TouchableOpacity>
//                                             </View>
//                                         </View>
//                                     </View>
//                                 </Modal>
//                             </View> : null }
//                         </>

//                             //Login flow
//                             // :       console.log(this.props.navigation.replace("Login"))
//                     }
//                 </View>
//             </View> :
//             <View style={[styles.flexOne, styles.bgBlack, styles.allCenter, ]}>
//                 <StatusBar backgroundColor={Colors.black} barStyle='dark-content'  />
//                 {/* <View style={[{width: 300}, styles.flexOne, styles.selfCenter]}>
//                     <LottieView source={SPLASH.noInternet} autoPlay loop />
//                 </View> */}
//                 {/* <ImageBackground  source={images.img4} resizeMode="cover" style={[styles.flexOne,styles.allCenter]}  imageStyle={[styles.opacity65perc,styles.bgBlack]}  > */}
//                 <Image imageSumit source={images.splashSbpdcl}
//                         style={[styles.bgImage, styles.height30Points, {width: Dimensions.get('window').width/1.2}]} resizeMode={'contain'}
//                 />
//                 {/* </ImageBackground> */}
//             </View>
//         );
//     }
// }

// function mapStateToProps (state) {
//     return {
//         token: commonSelectors.getToken(state),
//         rehydrated: state.rehydrated,
//         infoShown:  commonSelectors.infoShown(state),
//         showLogoutOption: state.showLogout,
//         activeCount: commonSelectors.activeCount(state),
//         language: commonSelectors.language(state),
//         darkMode: commonSelectors.darkMode(state),
//         menu: commonSelectors.menu(state),
//         currentRoute: commonSelectors.currentRoute(state),
//         profile: commonSelectors.profile(state),
//         userDetails: commonSelectors.userDetails(state),
//         notifications: commonSelectors.notifications(state),
//         accountDetails: commonSelectors.accountDetails(state),
//     }
// }

// function mapDispatchToProps (dispatch) {
//     return {
//         logout: (state=true) => dispatch(logout(state)),
//         showLogout: (state=true) => dispatch(showLogout(state)),
//         setActiveCount: (state) => dispatch(userDetailActions.setActiveCount(state)),
//         apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
//         setMenu: (data={}) => dispatch(userDetailActions.setMenu(data)),
//         setNotifications: (data={}) => dispatch(userDetailActions.setNotifications(data)),
//         setHeaderLeftDimensions: (data={}) => dispatch(userDetailActions.setHeaderLeftDimensions(data)),
//         setHeaderRightDimensions: (data={}) => dispatch(userDetailActions.setHeaderRightDimensions(data)),
//     }
// }

// const AppContainer= connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(App);
// export {AppContainer}
import React, { Component } from 'react';
import { Text, View, Platform, TouchableOpacity, StatusBar, AppState, Modal, Alert, Image, BackHandler, Dimensions, Linking, ImageBackground,PermissionsAndroid } from 'react-native';
import { connect } from "react-redux";
// Styles, Colors, Components and Constants
// import { styles } from 'SmartgasConsumerApp/js/styles'
import Colors from "SmartgasConsumerApp/js/styles/Colors";
// Constants
import { SPLASH } from 'SmartgasConsumerApp/js/constants/lottie';
import { images } from './constants/imageConstants';
// Custom Components
import ConnectivityComponent from 'SmartgasConsumerApp/js/components/common/connectivity/Connectivity'
import {
    ButtonText,
    HeadingText1,
    BodyText1,
    HeadingText3, CustomText,
} from "SmartgasConsumerApp/js/components/common";
// Libraries
import Animated from 'react-native-reanimated';
// import LottieView from 'lottie-react-native';
// import { Client } from 'bugsnag-react-native';
import DrawerComponent from './navigation/Drawer';
import NetInfo from "@react-native-community/netinfo";
// Back End
import { showLogout } from "SmartgasConsumerApp/js/actions/commonActions";
import { userDetailActions } from "SmartgasConsumerApp/js/actions";
import { apiDispatcher, logout } from "SmartgasConsumerApp/js/actions";
import { commonSelectors } from "SmartgasConsumerApp/js/selectors";
import { drawerApi } from "./api/drawer/drawerApi";
import * as dashboard from "./api/dashboard";
import { LoginScreen } from './screens/login/Login'
import { strings } from "SmartgasConsumerApp/js/strings";

import { ServerMaintenanceScreen } from './screens/ServerMaintenance';
import { styles } from './styles';
// import crashlytics from '@react-native-firebase/crashlytics';
import messaging from '@react-native-firebase/messaging';
import DeviceInfo from 'react-native-device-info';

// import {persistor} from './reducers/store'


// import { isValidToken } from './helpers/common/expireTokenValidation';

// import { requestUserPermission } from './actions/fcmActions';


// const bugsnag = new Client("6882f93d266827eb3044ca5de9d8bba2");


let oldRender = Text.render;
Text.render = function (...args) {
    let origin = oldRender.call(this, ...args);
    return React.cloneElement(origin, {
        style: [origin.props.style]
    });
};

class App extends Component {
    constructor(props) {
        super(props);
        this.done = false;
        this.state = {
            appState: AppState.currentState,
            progress: new Animated.Value(0),
            serverOn: true,
            notificationTitle: '',
            notificationBody: '',
            permissionGranted: false,

            // updateWarning: 
            // action: "Warning"
        };
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
    }
    async componentDidMount(): void {

        console.log("fcmmmmmm");

        const authStatus = await messaging().requestPermission();
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
        if (enabled) {
          console.log('Authorization status:', authStatus);
        }


        
        try {
            fcmToken = await messaging().getToken();
            if (fcmToken) {
                console.log("Fcmtoken is", fcmToken);
                this.props.setFcmToken(fcmToken);
            }
          } catch (err) {
            console.log("Unable to get messaging token.", err);
          }



        this.unsubscribeForeground = messaging().onNotificationOpenedApp(async remoteMessage => {
            console.log('Notification opened by device user:', remoteMessage);
            const { title, body } = remoteMessage.notification;
            await this.setState({
                notificationTitle: title,
                notificationBody: body,
            });
            // Show alert when notification is opened
            this.showNotificationAlert();
        });


        messaging().getInitialNotification().then(async remoteMessage => {
            console.log('Notification-came', remoteMessage);

            if (remoteMessage) {
                const { title, body } = remoteMessage.notification;
                await this.setState({
                    notificationTitle: title,
                    notificationBody: body,
                });
                // Show alert when notification is opened
                this.showNotificationAlert();
            }
        });

        this.messageListener = messaging().onMessage(async remoteMessage => {

            const { title, body } = remoteMessage.notification;
            console.log(remoteMessage,"-----fore")
            this.showNFAlert(title, body);
        });


        // this.showAlert()
        await NetInfo.fetch().then(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            this.setState({ showPopUp: !state.isConnected })
        });
        const unsubscribe = NetInfo.addEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            this.setState({ showPopUp: !state.isConnected })
        });
        AppState.addEventListener("change", this._handleAppStateChange);


        
    }

   



    onLink = async () => {
        //         const link = 'itms-apps://apps.apple.com/id/app/halojasa/id1617265809?l=id';
        // Linking.canOpenURL(link).then(supported => {
        //   supported && Linking.openURL(link);
        // }, (err) => console.log(err));
        // return Linking.openURL(Platform.OS === "ios" ? "itms-apps://itunes.apple.com/us/app/apple-store/1617265809?mt=8" : "https://play.google.com/store/apps/details?id=com.sbpdcl.consumerapp&hl=en_IN&gl=US");
    };

    showNotificationAlert = () => {
        const { notificationTitle, notificationBody } = this.state;
        Alert.alert(
            notificationTitle,
            notificationBody,
            [
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                }
            ],
            { cancelable: false }
        );
    }

    showNFAlert = (title, body) => {
        Alert.alert(
            title,
            body,
            [
                {
                    text: 'OK',
                    onPress: () => console.log('OK Pressed')
                }
            ],
            { cancelable: false }
        );
    }
    showAlert = () => {
        Alert.alert(
            "Critical Update Required",
            "Please update the application from store",
            [
                {
                    text: "Update", onPress: () => {
                        this.onLink();
                        Alert.alert(
                            "Critical Update Required",
                            "Please update the application from store",
                            [
                                {
                                    text: "Update", onPress: () => {
                                        this.onLink();
                                        this.showAlert();
                                    }
                                }
                            ],
                            { cancelable: false }
                        )
                    }
                }
            ],
            { cancelable: false }
        );
    };

    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        // this.showAlert()

    }
    componentWillUnmount() {
        AppState.removeEventListener("change", this._handleAppStateChange);
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
        if (this.unsubscribeForeground) {
            this.unsubscribeForeground();
        }
        if (this.messageListener) {
            this.messageListener();
        }
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.token && !this.state.is_loaded) {
            this.getMenu();
        }


        let cancelPopup = "no";
        if (this.state.action && this.state.action == "Warning" ? !prevState.action : true) {
            switch (this.state.action) {
                case "Up-To-Date":
                    break;
                case "Warning":
                    Alert.alert(
                        "New Version Available",
                        "Please update the application from store.",
                        [

                            { text: "Update", onPress: this.onLink },
                            { text: "Remind me later", onPress: () => console.log("OK Pressed") },
                        ],
                        { cancelable: false }
                    );
                    break;
                case "Redirect":
                    this.showAlert()
                    break;
            }
        }
    }

    _handleAppStateChange = nextAppState => {
        if (
            this.state.appState.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            this.props.setActiveCount(this.props.activeCount + 1)
        }
        this.setState({ appState: nextAppState });
    };

    handleBackButtonClick() {
        // const {index, routes} = this.props.navigation.dangerouslyGetState();
        // const currentRoute = routes[index].name;
        // console.log('current screen', currentRoute, this.props.navigation.getState());
        // // this.props.navigation.goBack(null);
        // // currentRoute == "/dashboard" && 
        // if(currentRoute == "/dashboard"){ 
        //     this.backAction()
        //     return true;
        // }
    }

    getMenu = async () => {
        // let data = await this.props.apiDispatcher(drawerApi(this.props.userDetails.roleid),false);
        // this.props.setMenu(data.data);

        this.setState({ is_loaded: true })
     


        try {
            const baseRechargeDetailsUrl = 'https://cportalgasapi.esyasoft.com/api/Notification/Mobile/NotificationHistory';
        
            const token = await this.props.token;
            const  consumerNo = this.props?.userDetails?.consumerId;


            const headers = new Headers({
                Accept: 'application/json, text/plain, */*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            });
            
            const requestBody = JSON.stringify({
                consumerNo:consumerNo,
                limit:100,
                offset:0
            });

            console.log("requestBodyHistory", requestBody);
            console.log("NoBodyHistory");

            const response = await fetch(baseRechargeDetailsUrl, {
                method: 'POST',
                headers: headers,
                body: requestBody,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text(); // If not JSON, get response as text
            }

            console.log('History-App.Js:', response.status, data);
            this.props.setNotifications(data);

        } catch (error) {
            console.error('History-APPJS-Error:', error);
        }
       
       

    }

    // handleLogout = () => {
    //     persistor.purge(); // Clear persisted state
    //     console.log('Persisted state has been cleared.');
    //   }



    deviceIdsendOnLogout = async () => {
    

        try {
            const baseRechargeDetailsUrl = 'https://cportalgasapi.esyasoft.com/api/Notification/Mobile/ClearUserToken';

            const token = this.props.token;
            const deviceId = DeviceInfo.getUniqueId();


         console.log(token,"token")

            const headers = new Headers({
                Accept: 'application/json, text/plain, */*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            });
             const requestBody =JSON.stringify({
                deviceId:deviceId._z,
            });

            console.log("LogOutDeviceIdbody", requestBody);
            console.log("LogOutDeviceIdbody");

            const response = await fetch(baseRechargeDetailsUrl, {
                method: 'DELETE',
                headers: headers,
                body: requestBody,
            });

            console.log("response---->", response)


            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text(); // If not JSON, get response as text
            }
            console.log('LogOutDeviceId-api :', response.status, data);

        } catch (error) {
            console.error('LogOutDeviceId-api-error:', error);
        }

    } 



    render() {
        const { language, darkMode } = this.props;
        // const roleid = this.props.userDetails.roleid != "Undefined" && this.props.userDetails.roleid
        // alert(this.props.token)
        return (
            this.props.rehydrated ? !this.state.serverOn ? <ServerMaintenanceScreen darkMode={this.props.darkMode} /> : <View style={[styles.container, this.props.darkMode ? styles.bgBlack : styles.bgIdk]}>
                <View style={[styles.container, styles.width, styles.height, this.props.darkMode ? styles.bgDarkGrey : styles.bgIdk]}>
                    {this.props.darkMode ? <StatusBar backgroundColor={Colors.darkGray} barStyle='light-content' /> :
                        <StatusBar backgroundColor={Colors.idk} barStyle='dark-content' />}
                    {(Platform.OS === 'ios' && this.props.token) ? <View style={[styles.appBar, this.props.darkMode ? styles.bgDarkGrey : styles.bgIdk]} /> : null}
                    {
                        //Login flow
                        // this.props.token ?

                        <>
                            {
                                <DrawerComponent
                                    darkMode={this.props.darkMode}
                                    language={this.props.language}
                                    showLogin={!this.props.token}
                                    menu={this.props.menu}
                                    showOnboarding={!!!this.props.infoShown}
                                    token={this.props.token}
                                    logout={this.props.logout}
                                    showLogout={this.props.showLogout}
                                    currentRoute={this.props.currentRoute}
                                    userDetails={this.props.profile}
                                    accountDetails={this.props.accountDetails}
                                    // roleid={roleid}
                                    notifications={this.props.notifications}
                                    setHeaderLeftDimensions={this.props.setHeaderLeftDimensions}
                                    setHeaderRightDimensions={this.props.setHeaderRightDimensions}
                                />
                            }
                            {this.state.showPopUp ?
                                <ConnectivityComponent language={language} darkMode={darkMode} /> : null
                            }
                            {this.props.showLogoutOption ? <View style={[styles.absolute, styles.paleGrey5Overlay, styles.allCenter, styles.heightFixed, styles.width, { zIndex: 9999, alignSelf: 'flex-start' }]}>
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
                                                        {strings[language].logout.message}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={[styles.row, styles.width, styles.flexTwo, { alignItems: "center", justifyContent: "space-between" }]}>
                                                <TouchableOpacity onPress={() => this.props.showLogout(false)} style={[{ height: 50, borderRadius: 8, borderWidth: 1, borderColor: Colors.black }, styles.flexOne, styles.allCenter, styles.bgTint5DeepGreyBlue, styles.marginHorizontal]}>
                                                    <ButtonText style={[styles.darkGray]}>
                                                        {strings[language].logout.no}
                                                    </ButtonText>
                                                </TouchableOpacity>
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        // this.props.apiDispatcher(logoutApi());
                                                        this.props.logout();
                                                        // this.handleLogout();
                                                        this.deviceIdsendOnLogout();
                                                        // setTimeout(()=> this.props.navigation.replace("Login"), 2000)
                                                        this.props.showLogout(false);
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
                        </>

                        //Login flow
                        // :       console.log(this.props.navigation.replace("Login"))
                    }
                </View>
            </View> :
                <View style={[styles.flexOne, styles.bgBlack, styles.allCenter,]}>
                    <StatusBar backgroundColor={Colors.black} barStyle='dark-content' />
                    {/* <View style={[{width: 300}, styles.flexOne, styles.selfCenter]}>
                    <LottieView source={SPLASH.noInternet} autoPlay loop />
                </View> */}
                    {/* <ImageBackground  source={images.img4} resizeMode="cover" style={[styles.flexOne,styles.allCenter]}  imageStyle={[styles.opacity65perc,styles.bgBlack]}  > */}
                    <Image imageSumit source={images.splashSbpdcl}
                        style={[styles.bgImage, styles.height30Points, { width: Dimensions.get('window').width / 1.2 }]} resizeMode={'contain'}
                    />
                    {/* </ImageBackground> */}
                </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        token: commonSelectors.getToken(state),
        rehydrated: state.rehydrated,
        infoShown: commonSelectors.infoShown(state),
        showLogoutOption: state.showLogout,
        activeCount: commonSelectors.activeCount(state),
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state),
        menu: commonSelectors.menu(state),
        currentRoute: commonSelectors.currentRoute(state),
        profile: commonSelectors.profile(state),
        userDetails: commonSelectors.userDetails(state),
        notifications: commonSelectors.notifications(state),
        accountDetails: commonSelectors.accountDetails(state),
        // userDetails: commonSelectors.profile(state),
    }
}

function mapDispatchToProps(dispatch) {
    return {
        logout: (state = true) => dispatch(logout(state)),
        showLogout: (state = true) => dispatch(showLogout(state)),
        setActiveCount: (state) => dispatch(userDetailActions.setActiveCount(state)),
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        setMenu: (data = {}) => dispatch(userDetailActions.setMenu(data)),
        setNotifications: (data = {}) => dispatch(userDetailActions.setNotifications(data)),
        setHeaderLeftDimensions: (data = {}) => dispatch(userDetailActions.setHeaderLeftDimensions(data)),
        setHeaderRightDimensions: (data = {}) => dispatch(userDetailActions.setHeaderRightDimensions(data)),
        setFcmToken: (data = {}) => dispatch(userDetailActions.setFcmToken(data)),
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
export { AppContainer }