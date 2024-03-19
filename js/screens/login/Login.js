// import React from 'react';
// import { connect } from "react-redux";
// import { View, Text, TextInput, TouchableWithoutFeedback, Alert, Image, Linking, Platform, Pressable, ActivityIndicator, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
// // Styles and Colors
// // import { styles } from 'SmartgasConsumerApp/js/styles';
// import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// // Icons
// import FIcons from 'react-native-vector-icons/Feather';
// // Components
// import { Form3dBackgroundComponent } from "../../components/common/Form3dBackground";
// import { BodyText1 } from "../../components/common";
// // Backend
// import { apiDispatcher, userDetailActions } from "../../actions";
// import * as login from "../../api/login";
// import * as loginActions from "../../actions";
// import * as commonSelectors from "../../selectors/common";
// import { ScrollView } from 'react-native-gesture-handler';
// import { getSystemAvailableFeatures } from 'react-native-device-info';
// import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
// import { images } from '../../constants/imageConstants';
// import { styles } from '../../styles';
// import { CANumberValidation } from '../../helpers/common/userInputValidations';
// const { height, width } = Dimensions.get('window');

// class Login extends React.Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             // customerNumber: __DEV__ ? "51000057735" : "", // 
//             // password:  __DEV__ ? "Password1@" : "",
//             // 100001133824
//             customerNumber: this.props.username, // 
//             password: this.props.password,
//             // customerNumber: __DEV__ ? "100001552431" : "", // 
//             // customerNumber: __DEV__ ? "100001062487" : "", //  Net Meter
//             // customerNumber: __DEV__ ? "100001488816" : "", //  Multiple Accounts
//             // customerNumber: __DEV__ ? "100001477566" : "", //  Net Meter
//             // 100001477566
//             // customerNumber: __DEV__ ? "100006002006" : "", // 
//             // customerNumber: __DEV__ ? "GNS8000261" : "", // 
//             // customerNumber: __DEV__ ? "233206271602" : this.props.username,// 
//             // customerNumber: __DEV__ ? "239102416834" : this.props.username,// 
//             // https://smbgp-sbpdcl.co.in:8014/api/
//             // customerNumber: __DEV__ ? "017719900000000" : this.props.username,// Active 19-05-2023 - Prod
//             // password:  __DEV__ ? "Esya@888" : this.props.password, // Active 19-05-2023 - Prod

//             // http://103.216.94.178:8014/api/
//             // customerNumber: __DEV__ ? "239102416834" : this.props.username, // Active 19-05-2023 - Dev
//             // password: __DEV__ ? "Test@123" : this.props.password, // Active 19-05-2023 - Dev

//             loading: false
//         }
//         this.customerNumberInput;
//         this.passwordInput;
//     }

//     componentDidMount() {
//         this.props.navigation.setOptions({ header: () => null, gestureEnabled: false });
//         this.props.setCurrentRoute('Login');
//     }

//     focusOutAll = () => {
//         this.customerNumberInput ? this.customerNumberInput.blur() : null;
//         this.passwordInput ? this.passwordInput.blur() : null;
//     };

//     rememberPassword = async () => {
//         await Alert.alert('Remember Password', 'Do you want to remember your password', [{
//             text: 'No Thanks',
//             onPress: () => this.props.clearPassword(),
//             style: 'cancel',
//         },
//         { text: 'Yes', onPress: () => console.log('OK Pressed') },
//         ]);
//     }

//     sendOtp = () => {
//         if (!this.props.showAlert) {
//             this.setState({ loading: true }, async () => {
//                 let resp;
//                 try {

//                     // if(this.state.customerNumber.charAt(0) == 0) {
//                     //     alert("INvalid")
//                     // } else {
//                     resp = await this.props.performLoginActions(this.state.customerNumber, this.state.password, "");
//                     // resp = await this.props.apiDispatcher(login.loginApi(this.state.customerNumber, this.state.password));
                   
//                    console.log("g---------------->"); 
//                     console.log("loginlogin", resp, this.props);

//                     this.setState({ loading: false, password: "", username: "" })
//                     await this.rememberPassword()
//                     // alert("Remember your password")
//                     this.props.navigation.navigate('/dashboard')
//                     // }


//                     // this.props.navigation.navigate('Otp',{screen: 'login', mobileNumber: resp.data.MobileNumber, LoginID: this.state.customerNumber })
//                 } catch (e) {
//                     console.log("login screen", e);
//                     if (e && e.ErrorDescription == 'INVALID_PASSWORD')
//                         this.setState({ error: 'Invalid Password', loading: false })
//                     else if (e && e.ErrorDescription == 'INVALID_LOGINID')
//                         this.setState({ error: 'Invalid LoginId', loading: false })
//                     else this.setState({ error: 'Invalid Login Id Or Password ', loading: false })
//                     // this.setState({error: 'Invalid Login Id Or Password' , loading: false})
//                 }
//             })
//         } else {
//             alert("No internet connectivity detected. Please check your Network Settings and try again.")
//         }
//     };
//     checkPassword = () => {
//         //-----------------------------------------
//         if (this.state.password !== "") {
//             //If password contains both lower and uppercase characters, increase strength value.
//             //if (this.state.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
//             let strength = 0;
//             if (this.state.password && this.state.password.match(/([a-z])/)) {
//                 strength++;

//             } else {
//                 // this.setState({error: 'Password must contain a lowercase character'})
//                 this.setState({ passwordCondition: false })
//             }
//             //if (this.state.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
//             if (this.state.password && this.state.password.match(/([A-Z])/)) {
//                 strength++;

//             } else {
//                 // this.setState({error: 'Password must contain an uppercase character'})
//                 this.setState({ passwordCondition: false })
//             }
//             //If it has numbers and characters, increase strength value.
//             // if (this.state.password.match(/([a-zA-Z])/) && this.state.password.match(/([0-9])/)) {
//             if (this.state.password && this.state.password.match(/([0-9])/)) {
//                 strength++;

//             } else {
//                 // this.setState({error: 'Password must contain a number'})
//                 this.setState({ passwordCondition: false })
//             }
//             //If it has one special character, increase strength value.
//             if (this.state.password && this.state.password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
//                 strength++;

//             } else {
//                 // this.setState({error: 'Password must contain a special character'})
//                 this.setState({ passwordCondition: false })
//             }
//             if (this.state.password && this.state.password.length >= 1) {
//                 strength++;

//             } else {
//                 // this.setState({error: 'Password must contain at least 8 letter'})

//             }
//             if (strength === 5) {
//                 this.setState({ error: '', passwordCondition: true })
//             } else {
//                 this.setState({ error: "Password not matching minimum requirement" })
//             }

//         } else {

//         }
//     };

//     render() {
//         const { darkMode } = this.props;

//         console.log("PRopsf", this.props);
//         return (
//             <ErrorBoundaryMainComponent>
//                 {/* <ImageBackground source={images.splashSbpdcl} resizeMode="center" style={[styles.flexOne,styles.allCenter, { position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }]} imageStyle={[styles.bgBlack]}> */}
//                 <TouchableWithoutFeedback onPress={this.focusOutAll}>
//                     <ScrollView style={[{ height: height }, darkMode ? styles.bgBlack : styles.bgIdk]}>
//                         <View style={[styles.paddingHorizontal40, styles.paddingTop6Percent,]}>
//                             <View style={[styles.allCenter]}>
//                                 {/* {this.props.userDetails.image?.img ?
//                                     <Image style={[styles.extraLargeImage, styles.border2, { borderColor:'#fff' }]} source={{uri: this.props.userDetails.image.img}}/>                   :
//                                     <Image style={[styles.extraLargeImage, styles.border2, { borderColor:'#fff' }]} source={require('SmartgasConsumerApp/assets/images/Nazim.jpg')}/>
//                                 } */}
//                                 <Image style={[styles.extraLargeImage, styles.border2, { borderColor: '#fff' }
//                                 ]}
//                                     source={images.splashImage}
//                                 />

//                             </View>
//                             <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', textAlign :'center' }}>
//                                 Esyasoft
//                             </Text>

//                             <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined} >

//                                 <Form3dBackgroundComponent />
//                                 <View style={[{ height: width / 1.5 }, styles.extraRadius, styles.bgDarkGray]}>
//                                     <View style={[styles.flexOne, styles.row, styles.paddingHorizontal30, styles.centerHorizontal]}>
//                                         <Text style={[styles.fontSize25, styles.white]}>
//                                             Log
//                                         </Text>
//                                         <Text style={[styles.fontSize25, styles.darkGreen]}>
//                                             {' In'}
//                                         </Text>
//                                     </View>
//                                     <View style={[styles.paddingHorizontal24, styles.flexOne, styles.centerVertical]}>
//                                         <View style={[{ backgroundColor: this.state.lableCNo ? Colors.bluewhite : 'transparent' }, styles.flexOne, styles.spaceBetweenVertical, styles.padding16, styles.radius16, styles.centerVertical]}>
//                                             <Text style={[{ color: '#b8b1b0', }, , this.state.lableCNo || this.state.customerNumber ? styles.small : styles.normal]}>
//                                                 CONSUMER ID/MOBILE NUMBER
//                                             </Text>
//                                             <TextInput
//                                                 value={this.state.customerNumber}
//                                                 style={[styles.medium, { justifyContent: "flex-start", paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: 0.7 }, styles.white, styles.paddingRegular]}
//                                                 ref={(input) => { this.customerNumberInput = input; }}
//                                                 onFocus={() => this.setState({ lableCNo: true })}
//                                                 onBlur={() => {
//                                                     // this.state.customerNumber.length < 10 && this.setState({ error: "Please enter at least 10 digits"}); 
//                                                     this.setState({ lableCNo: false })
//                                                     // if(this.state.customerNumber.length == 10) {
//                                                     //     const reg = /^[0]?[6789]\d{9}$/;
//                                                     //     if (reg.test(this.state.customerNumber) === true) {
//                                                     //     // if(this.state.customerNumber.match(`^[789]\d{9}$`)){
//                                                     //         this.setState({ error: "" })
//                                                     //     }else {
//                                                     //         this.setState({ error: "Invalid Mobile Number" })
//                                                     //     }

//                                                     // }
//                                                 }}
//                                                 keyboardType={'number-pad'}
//                                                 maxLength={15}
//                                                 onChangeText={text => {
//                                                     const data = CANumberValidation(text);
//                                                     this.setState({ error: data.error, customerNumber: data.CANumber })
//                                                     text.length === 15 &&
//                                                         this.passwordInput.focus();
//                                                 }}
//                                             />
//                                         </View>
//                                     </View>
//                                     <View style={[styles.flexOne, styles.paddingHorizontal24]}>
//                                         <View style={[{ backgroundColor: this.state.lablePass ? Colors.bluewhite : 'transparent' }, styles.flexOne, styles.spaceBetweenVertical, styles.padding16, styles.radius16, styles.centerVertical]}>
//                                             <Text style={[{ color: '#b8b1b0' }, this.state.lablePass || this.state.password ? styles.small : styles.normal]}>
//                                                 PASSWORD
//                                             </Text>
//                                             <View style={[styles.row, { borderColor: Colors.green, borderBottomWidth: 0.7 }]}>
//                                                 <TextInput
//                                                     value={this.state.password}
//                                                     style={[styles.medium, styles.flexOne, { paddingHorizontal: 0, }, styles.white, styles.paddingRegular]}
//                                                     ref={(input) => { this.passwordInput = input; }}
//                                                     onFocus={() => this.setState({ lablePass: true })}
//                                                     onBlur={() => { this.checkPassword(); this.setState({ lablePass: false }) }}
//                                                     maxLength={15}
//                                                     onChangeText={text => {
//                                                         this.setState({ password: text, error: '' })
//                                                         text.length === 15 && this.passwordInput.blur();
//                                                     }}
//                                                     secureTextEntry={!this.state.passIcon}
//                                                 />
//                                                 <Pressable style={[styles.selfCenter]} onPress={() => this.setState({ passIcon: !this.state.passIcon })}>
//                                                     <Text style={[styles.opacity50perc]}>
//                                                         <FIcons name={this.state.passIcon ? 'eye' : 'eye-off'} color={Colors.white} size={height / 30} />
//                                                     </Text>
//                                                 </Pressable>
//                                             </View>
//                                         </View>
//                                     </View>
//                                     <View style={styles.flexHalf}>
//                                     </View>
//                                 </View>
//                             </KeyboardAvoidingView>

//                             <View style={[styles.flexOne]}>
//                                 <View style={[styles.flexThree, styles.allCenter]}>
//                                     <View style={[styles.flexTwo, styles.bottom]}>
//                                         <BodyText1 style={[styles.paddingVertical10, styles.paleRed, styles.normal, styles.selfCenter]}>
//                                             {this.state.error}
//                                         </BodyText1>
//                                         <View style={[styles.allCenter]}>
//                                             <Pressable
//                                                 disabled={this.state.password && this.state.customerNumber && !this.state.error ? false : true}
//                                                 onPress={this.sendOtp}
//                                                 style={[styles.padding6, this.state.password && this.state.customerNumber && !this.state.error ? styles.bgDarkGreen : styles.bgDarkGray, , styles.extraRadius]}
//                                             >
//                                                 {!this.state.loading ? <Text style={[styles.white, styles.medium, styles.paddingVertical6, styles.paddingHorizontal30]}>
//                                                     Login
//                                                 </Text> :
//                                                     <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
//                                                         <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
//                                                         <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]} />
//                                                     </View>
//                                                 }
//                                             </Pressable>
//                                         </View>
//                                     </View>
//                                     <View style={[styles.flexOne, styles.centerVertical, styles.paddingTop10]}>
//                                         <Pressable onPress={() => !this.props.user ? alert("Please login to create MPin") : this.props.navigation.navigate('MPin', { type: 'login' })}>
//                                             <Text style={[styles.green, styles.fontSize17]}>
//                                                 Login with MPin
//                                             </Text>
//                                         </Pressable>
//                                     </View>
//                                     <View style={[styles.flexOne, styles.centerVertical, styles.paddingVertical10]}>
//                                         <Pressable onPress={() => this.props.navigation.navigate('ForgotPassword', { otpMatched: false, LoginID: "" })}>
//                                             <Text style={[styles.green, styles.fontSize17]}>
//                                                 Forgot password ?
//                                             </Text>
//                                         </Pressable>

//                                     </View>

//                                 </View>
//                                 <View style={[styles.flexOne, styles.row, styles.centerVertical, styles.paddingVertical10]}>
//                                     <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
//                                         {`Don't have an account ? `}
//                                     </Text>
//                                     <Pressable onPress={() => this.props.navigation.navigate('Register', { mobileNumber: "", LoginID: "", createAccount: false })}>
//                                         <Text style={[styles.green, styles.fontSize17]}>
//                                             Sign Up
//                                         </Text>
//                                     </Pressable>
//                                 </View>

//                                 <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13,{textAlign:'center',fontWeight:'bold'}]}>
//                                         {`V 1.1`}
//                                     </Text>
//                                 {/* <Pressable style={[styles.marginVertical10, styles.selfCenter]} 
//                                 // onPress={()=> Linking.openURL("https://www.hpseb.in/webdynpro/resources/demo.sap.com/hpsebluserdtl/UserDetails")}
//                                 >
//                                     <Text style={[styles.green,styles.fontSize17]}>
//                                         Update your mobile number
//                                     </Text>
//                                 </Pressable> */}
//                                 {/* <Pressable style={[styles.marginTop4, styles.selfCenter]} onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=bsphcl.suvidha.org")}> */}
//                                 {/* <Text style={[styles.green, styles.fontSize13, styles.textCenter]}> */}
//                                 {/* Suvidha App */}
//                                 {/* You can also change Mobile number by visiting Local DISCOM Office or through Suvidha App */}
//                                 {/* </Text> */}
//                                 {/* </Pressable> */}
//                                 {/* <Pressable style={[styles.marginTop18, styles.selfCenter]} onPress={() => this.props.navigation.navigate('PaymentRecharge')}>
//                                     <Text style={[styles.green, styles.fontSize17]}>
//                                         Recharge
//                                     </Text>
//                                 </Pressable> */}
//                             </View>
//                         </View>
//                     </ScrollView>
//                 </TouchableWithoutFeedback>
//                 {/* </ImageBackground> */}
//             </ErrorBoundaryMainComponent>
//         );
//     }
// }

// function mapStateToProps(state) {
//     return {
//         showAlert: false,
//         userDetails: commonSelectors.profile(state),
//         user: commonSelectors.userDetails(state),
//         darkMode: commonSelectors.darkMode(state),
//         password: commonSelectors.getPassword(state),
//         username: commonSelectors.getUsername(state),
//         token: commonSelectors.getToken(state),
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
//         setCurrentRoute: (data = {}) => dispatch(userDetailActions.setCurrentRoute(data)),
//         clearPassword: (data = {}) => dispatch(loginActions.clearPassword(data)),
//         // await dispatch(loginActions.(param));
//         performLoginActions: (username, password, type) => dispatch(loginActions.performLoginActions(username, password, type)),
//     }
// }

// const LoginScreen = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Login);
// export { LoginScreen }

import React from 'react';
import { connect } from "react-redux";
import { View, Text, TextInput, TouchableWithoutFeedback, Alert, Image, Linking, Platform, Pressable, ActivityIndicator, Dimensions, KeyboardAvoidingView, ImageBackground } from 'react-native';
// Styles and Colors
// import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Icons
import FIcons from 'react-native-vector-icons/Feather';
// Components
import { Form3dBackgroundComponent } from "../../components/common/Form3dBackground";
import { BodyText1 } from "../../components/common";
// Backend
import { apiDispatcher, userDetailActions } from "../../actions";
import * as login from "../../api/login";
import * as loginActions from "../../actions";
import * as commonSelectors from "../../selectors/common";
import { ScrollView } from 'react-native-gesture-handler';
import { getSystemAvailableFeatures } from 'react-native-device-info';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
import { images } from '../../constants/imageConstants';
import { styles } from '../../styles';
import { CANumberValidation } from '../../helpers/common/userInputValidations';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import NetInfo from '@react-native-community/netinfo';

const { height, width } = Dimensions.get('window');

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            customerNumber: this.props.username, // 
            password: this.props.password,
            loading: false,
            databaseCreated: false

        }
        this.customerNumberInput;
        this.passwordInput;
    }



    componentDidMount() {
        this.props.navigation.setOptions({ header: () => null, gestureEnabled: false });
        this.props.setCurrentRoute('Login');
    }

    focusOutAll = () => {
        this.customerNumberInput ? this.customerNumberInput.blur() : null;
        this.passwordInput ? this.passwordInput.blur() : null;
    };

    rememberPassword = async () => {
        await Alert.alert('Remember Password', 'Do you want to remember your password', [{
            text: 'No Thanks',
            onPress: () => this.props.clearPassword(),
            style: 'cancel',
        },
        { text: 'Yes', onPress: () => console.log('OK Pressed') },
        ]);
    }

    sendOtp = () => {
        console.log("otp");
        const { fcmToken } = this.props;
       

      console.log("N----->", fcmToken);

        if (!this.props.showAlert) {
            console.log("insideif-------");

            this.setState({ loading: true }, async () => {
                let resp;
                try {

                    // if(this.state.customerNumber.charAt(0) == 0) {
                    //     alert("INvalid")
                    // } else {
                    resp = await this.props.performLoginActions(this.state.customerNumber, this.state.password, "");
                    // resp = await this.props.apiDispatcher(login.loginApi(this.state.customerNumber, this.state.password));
                  



                    console.log("resp-------->");
                    console.log("loginlogin", resp, this.props);
                    ///
                    try {
                        const baseRechargeDetailsUrl = 'https://cportalgasapi.esyasoft.com/api/Notification/Mobile/SaveToken';
                        // const msnParameter = this.props?.userDetails?.msn;
                        const token = this.props?.userDetails?.jwtToken;
                        // const consumerNo = this.props?.userDetails?.consumerId;
                        const deviceId = DeviceInfo.getUniqueId();
                        console.log("deviceId",deviceId._z);
                        const platform = Platform.OS;

                        const headers = new Headers({
                            Accept: 'application/json, text/plain, */*',
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                            'X-Requested-With': 'XMLHttpRequest',
                        });

                        const fcmdata = await messaging().getToken();
                        this.props.setFcmToken(fcmdata);
                        console.log("fcmtokenlogin", fcmdata);

                        // if (fcmdata !== fcmToken ) {
                        //     console.log("tokenchange", fcmdata ,"oldtoken",fcmToken);
                        //     this.props.setFcmToken(fcmdata);
                        // }

                        const requestBody = JSON.stringify({
                            deviceID: deviceId._z,
                            token: fcmToken,
                            loginID: await this.props.username,
                            consumerNo: await this.props?.userDetails?.consumerId,
                            platform: platform,
                        });

                        console.log("requestSaveFCM", requestBody);
                        console.log("NoBody");

                        const response = await fetch(baseRechargeDetailsUrl, {
                            method: 'POST',
                            headers: headers,
                            body: requestBody,
                        });


                        if (!response.ok) {
                            throw new Error(`HTTP error! Status: ${response.status}`);
                        }

                        let responseData;
                        const contentType = response.headers.get('content-type');
                        if (contentType && contentType.includes('application/json')) {
                            responseData = await response.json();
                        } else {
                            responseData = await response.text(); // If not JSON, get response as text
                        }

                        console.log('Token Save API:', response.status, responseData);
                    } catch (error) {
                        console.error('Token Save Error', error);
                    }

                    /////
                    this.setState({ loading: false, password: "", username: "" })
                    await this.rememberPassword()
                    // alert("Remember your password")
                    this.props.navigation.navigate('/dashboard')
                    // }


                    // this.props.navigation.navigate('Otp',{screen: 'login', mobileNumber: resp.data.MobileNumber, LoginID: this.state.customerNumber })
                } catch (e) {
                    console.log("login screen", e);
                    if (e && e.ErrorDescription == 'INVALID_PASSWORD')
                        this.setState({ error: 'Invalid Password', loading: false })
                    else if (e && e.ErrorDescription == 'INVALID_LOGINID')
                        this.setState({ error: 'Invalid LoginId', loading: false })
                    else this.setState({ error: 'Invalid Login Id Or Password ', loading: false })
                    // this.setState({error: 'Invalid Login Id Or Password' , loading: false})
                }
            })
        } else {
            alert("No internet connectivity detected. Please check your Network Settings and try again.")
        }
    };
    checkPassword = () => {
        //-----------------------------------------
        if (this.state.password !== "") {
            //If password contains both lower and uppercase characters, increase strength value.
            //if (this.state.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            let strength = 0;
            if (this.state.password && this.state.password.match(/([a-z])/)) {
                strength++;

            } else {
                // this.setState({error: 'Password must contain a lowercase character'})
                this.setState({ passwordCondition: false })
            }
            //if (this.state.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            if (this.state.password && this.state.password.match(/([A-Z])/)) {
                strength++;

            } else {
                // this.setState({error: 'Password must contain an uppercase character'})
                this.setState({ passwordCondition: false })
            }
            //If it has numbers and characters, increase strength value.
            // if (this.state.password.match(/([a-zA-Z])/) && this.state.password.match(/([0-9])/)) {
            if (this.state.password && this.state.password.match(/([0-9])/)) {
                strength++;

            } else {
                // this.setState({error: 'Password must contain a number'})
                this.setState({ passwordCondition: false })
            }
            //If it has one special character, increase strength value.
            if (this.state.password && this.state.password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                strength++;

            } else {
                // this.setState({error: 'Password must contain a special character'})
                this.setState({ passwordCondition: false })
            }
            if (this.state.password && this.state.password.length >= 1) {
                strength++;

            } else {
                // this.setState({error: 'Password must contain at least 8 letter'})

            }
            if (strength === 5) {
                this.setState({ error: '', passwordCondition: true })
            } else {
                this.setState({ error: "Password not matching minimum requirement" })
            }

        } else {

        }
    };


  

  
    
    createTable = () => {
        this.db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS UserData (id INTEGER PRIMARY KEY AUTOINCREMENT, modelName TEXT, ipAddress TEXT, msn TEXT, consumerNo TEXT, os TEXT, apkVersion TEXT)',
                [],
                () => {
                    console.log('Table created successfully');
                    this.insertUserData();
                },
                (tx, error) => {
                    console.error('Error creating table: ', error);
                }
            );
        });
    };
    


 
    
    
    
   


    render() {
        const { darkMode } = this.props;

        console.log("PRopsf", this.props);
        return (
            <ErrorBoundaryMainComponent>
                {/* <ImageBackground source={images.splashSbpdcl} resizeMode="center" style={[styles.flexOne,styles.allCenter, { position: 'absolute', left: 0, top: 0, width: Dimensions.get('window').width, height: Dimensions.get('window').height }]} imageStyle={[styles.bgBlack]}> */}
                <TouchableWithoutFeedback onPress={this.focusOutAll}>
                    <ScrollView style={[{ height: height }, darkMode ? styles.bgBlack : styles.bgIdk]}>
                        <View style={[styles.paddingHorizontal40, styles.paddingTop42,]}>
                            <View style={[styles.allCenter]}>
                                {/* {this.props.userDetails.image?.img ?
                                    <Image style={[styles.extraLargeImage, styles.border2, { borderColor:'#fff' }]} source={{uri: this.props.userDetails.image.img}}/>                   :
                                    <Image style={[styles.extraLargeImage, styles.border2, { borderColor:'#fff' }]} source={require('SmartgasConsumerApp/assets/images/Nazim.jpg')}/>
                                } */}
                                <Image style={[styles.extraLargeImage, styles.border2, { borderColor: '#fff' }
                                ]}
                                    source={images.splashImage}
                                />

                            </View>
                            <Text style={{ fontWeight: 'bold', fontSize: 25, color: 'black', textAlign: 'center' }}>
                                Esyasoft
                            </Text>

                            <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'position' : undefined} >

                                <Form3dBackgroundComponent />
                                <View style={[{ height: width / 1.5 }, styles.extraRadius, styles.bgDarkGray]}>
                                    <View style={[styles.flexOne, styles.row, styles.paddingHorizontal30, styles.centerHorizontal]}>
                                        <Text style={[styles.fontSize25, styles.white]}>
                                            Log
                                        </Text>
                                        <Text style={[styles.fontSize25, styles.darkGreen]}>
                                            {' In'}
                                        </Text>
                                    </View>
                                    <View style={[styles.paddingHorizontal24, styles.flexOne, styles.centerVertical]}>
                                        <View style={[{ backgroundColor: this.state.lableCNo ? Colors.bluewhite : 'transparent' }, styles.flexOne, styles.spaceBetweenVertical, styles.padding16, styles.radius16, styles.centerVertical]}>
                                            <Text style={[{ color: '#b8b1b0', }, , this.state.lableCNo || this.state.customerNumber ? styles.small : styles.normal]}>
                                                CONSUMER ID/MOBILE NUMBER
                                            </Text>
                                            <TextInput
                                                value={this.state.customerNumber}
                                                style={[styles.medium, { justifyContent: "flex-start", paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: 0.7 }, styles.white, styles.paddingRegular]}
                                                ref={(input) => { this.customerNumberInput = input; }}
                                                onFocus={() => this.setState({ lableCNo: true })}
                                                onBlur={() => {
                                                    // this.state.customerNumber.length < 10 && this.setState({ error: "Please enter at least 10 digits"}); 
                                                    this.setState({ lableCNo: false })
                                                    // if(this.state.customerNumber.length == 10) {
                                                    //     const reg = /^[0]?[6789]\d{9}$/;
                                                    //     if (reg.test(this.state.customerNumber) === true) {
                                                    //     // if(this.state.customerNumber.match(`^[789]\d{9}$`)){
                                                    //         this.setState({ error: "" })
                                                    //     }else {
                                                    //         this.setState({ error: "Invalid Mobile Number" })
                                                    //     }

                                                    // }
                                                }}
                                                keyboardType={'number-pad'}
                                                maxLength={15}
                                                onChangeText={text => {
                                                    const data = CANumberValidation(text);
                                                    this.setState({ error: data.error, customerNumber: data.CANumber })
                                                    text.length === 15 &&
                                                        this.passwordInput.focus();
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={[styles.flexOne, styles.paddingHorizontal24]}>
                                        <View style={[{ backgroundColor: this.state.lablePass ? Colors.bluewhite : 'transparent' }, styles.flexOne, styles.spaceBetweenVertical, styles.padding16, styles.radius16, styles.centerVertical]}>
                                            <Text style={[{ color: '#b8b1b0' }, this.state.lablePass || this.state.password ? styles.small : styles.normal]}>
                                                PASSWORD
                                            </Text>
                                            <View style={[styles.row, { borderColor: Colors.green, borderBottomWidth: 0.7 }]}>
                                                <TextInput
                                                    value={this.state.password}
                                                    style={[styles.medium, styles.flexOne, { paddingHorizontal: 0, }, styles.white, styles.paddingRegular]}
                                                    ref={(input) => { this.passwordInput = input; }}
                                                    onFocus={() => this.setState({ lablePass: true })}
                                                    onBlur={() => { this.checkPassword(); this.setState({ lablePass: false }) }}
                                                    maxLength={15}
                                                    onChangeText={text => {
                                                        this.setState({ password: text, error: '' })
                                                        text.length === 15 && this.passwordInput.blur();
                                                    }}
                                                    secureTextEntry={!this.state.passIcon}
                                                />
                                                <Pressable style={[styles.selfCenter]} onPress={() => this.setState({ passIcon: !this.state.passIcon })}>
                                                    <Text style={[styles.opacity50perc]}>
                                                        <FIcons name={this.state.passIcon ? 'eye' : 'eye-off'} color={Colors.white} size={height / 30} />
                                                    </Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.flexHalf}>

                                    </View>
                                </View>
                            </KeyboardAvoidingView>

                            <View style={[styles.flexOne]}>
                                <View style={[styles.flexThree, styles.allCenter]}>
                                    <View style={[styles.flexTwo, styles.bottom]}>
                                        <BodyText1 style={[styles.paddingVertical10, styles.paleRed, styles.normal, styles.selfCenter]}>
                                            {this.state.error}
                                        </BodyText1>
                                        <View style={[styles.allCenter]}>
                                            <Pressable
                                                disabled={this.state.password && this.state.customerNumber && !this.state.error ? false : true}
                                                onPress={this.sendOtp}
                                                style={[styles.padding6, this.state.password && this.state.customerNumber && !this.state.error ? styles.bgDarkGreen : styles.bgDarkGray, , styles.extraRadius]}
                                            >
                                                {!this.state.loading ? <Text style={[styles.white, styles.medium, styles.paddingVertical6, styles.paddingHorizontal30]}>
                                                    Login
                                                </Text> :
                                                    <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                                        <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
                                                        <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]} />
                                                    </View>
                                                }
                                            </Pressable>
                                        </View>
                                    </View>
                                    <View style={[styles.flexOne, styles.centerVertical, styles.paddingTop10]}>
                                        <Pressable onPress={() => !this.props.user ? alert("Please login to create MPin") : this.props.navigation.navigate('MPin', { type: 'login' })}>
                                            <Text style={[styles.green, styles.fontSize17]}>
                                                Login with MPin
                                            </Text>
                                        </Pressable>
                                    </View>
                                    <View style={[styles.flexOne, styles.centerVertical, styles.paddingVertical10]}>
                                        <Pressable onPress={() => this.props.navigation.navigate('ForgotPassword', { otpMatched: false, LoginID: "" })}>
                                            <Text style={[styles.green, styles.fontSize17]}>
                                                Forgot password ?
                                            </Text>
                                        </Pressable>

                                    </View>

                                </View>
                                <View style={[styles.flexOne, styles.row, styles.centerVertical, styles.paddingVertical]}>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                                        {`Don't have an account ? `}
                                    </Text>
                                    <Pressable onPress={() => this.props.navigation.navigate('Register', { mobileNumber: "", LoginID: "", createAccount: false })}>
                                        <Text style={[styles.green, styles.fontSize17]}>
                                            Sign Up
                                        </Text>
                                    </Pressable>
                                    
                                </View>
                                <Text style={[darkMode ? styles.white : styles.black, styles.fontSize13,{textAlign:'center',fontWeight:'bold'}]}>
                                        {`V 1.2`}
                                    </Text>
                                {/* <Pressable style={[styles.marginVertical10, styles.selfCenter]} 
                                // onPress={()=> Linking.openURL("https://www.hpseb.in/webdynpro/resources/demo.sap.com/hpsebluserdtl/UserDetails")}
                                >
                                    <Text style={[styles.green,styles.fontSize17]}>
                                        Update your mobile number
                                    </Text>
                                </Pressable> */}
                                {/* <Pressable style={[styles.marginTop4, styles.selfCenter]} onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=bsphcl.suvidha.org")}> */}
                                {/* <Text style={[styles.green, styles.fontSize13, styles.textCenter]}> */}
                                {/* Suvidha App */}
                                {/* You can also change Mobile number by visiting Local DISCOM Office or through Suvidha App */}
                                {/* </Text> */}
                                {/* </Pressable> */}
                                {/* <Pressable style={[styles.marginTop18, styles.selfCenter]} onPress={() => this.props.navigation.navigate('PaymentRecharge')}>
                                    <Text style={[styles.green, styles.fontSize17]}>
                                        Recharge
                                    </Text>
                                </Pressable> */}
                            </View>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
                {/* </ImageBackground> */}
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps(state) {
    return {

        showAlert: false,
        userDetails: commonSelectors.profile(state),
        user: commonSelectors.userDetails(state),
        darkMode: commonSelectors.darkMode(state),
        password: commonSelectors.getPassword(state),
        username: commonSelectors.getUsername(state),
        token: commonSelectors.getToken(state),
        fcmToken: state.fcmToken,

    }
}

function mapDispatchToProps(dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        setCurrentRoute: (data = {}) => dispatch(userDetailActions.setCurrentRoute(data)),
        clearPassword: (data = {}) => dispatch(loginActions.clearPassword(data)),
        // await dispatch(loginActions.(param));
        setFcmToken: (data = {}) => dispatch(userDetailActions.setFcmToken(data)),

        performLoginActions: (username, password, type) => dispatch(loginActions.performLoginActions(username, password, type)),
    }
}

const LoginScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);
export { LoginScreen }
