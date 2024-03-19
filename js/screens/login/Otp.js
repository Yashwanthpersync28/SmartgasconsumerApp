import React from 'react';
import { connect } from "react-redux";
import { View, Text, TextInput, TouchableWithoutFeedback, Image, PixelRatio, Pressable, ActivityIndicator, Dimensions, Alert, KeyboardAvoidingView } from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Components
import {Form3dBackgroundComponent} from "../../components/common/Form3dBackground";
// Libraries
import FIcon from 'react-native-vector-icons/FontAwesome';
import * as loginActions from "../../actions";
import * as login from "../../api/login";
import {BodyText1} from "../../components/common";
import {verifyOtpTypes} from "../../constants";
import {apiDispatcher} from "../../actions";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
import * as commonSelectors from "../../selectors/common";


const {height, width} = Dimensions.get('window');

class Otp extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            password:  __DEV__ ? "1111" : "",
            // password: "",
        }

        this.customerNumberInput;
        this.passwordInput;
    }

    componentDidMount(){
        this.props.navigation.setOptions({ header : ()=> null });
    }

    focusOutAll = () => {
        this.customerNumberInput ? this.customerNumberInput.blur() : null;
        this.passwordInput ?  this.passwordInput.blur() : null;
    };

    performLoginWithOtp = () => {
        const { screen, LoginID, mobileNumber } = this.props.route.params;

        if (!this.props.showAlert)
        {
            if (this.state.password.length > 2) {
                this.setState({loading: true}, async () => {
                    let resp;
                    let otpType = screen == "login" ? verifyOtpTypes.other : verifyOtpTypes.register;
                    console.log('Otp Type', otpType);
                    if ( screen == "forgotPassword") {
                        otpType = verifyOtpTypes.forgotPassword;
                    }
                    try {
                        resp = await this.props.apiDispatcher(login.loginWithOtpApi(LoginID, this.state.password, otpType));
                        // resp = await this.props.performLoginActions(LoginID, this.state.password, otpType);
                        console.log("login OTP Error", resp);
                        // if(resp.status === 200){
                            this.setState({loading: false, password: "", username: ""})
                            if (screen == "login") {
                                console.log("login to dashboard");
                                this.props.navigation.navigate('/dashboard')
                            }
                            else if ( screen == "forgotPassword") {
                                this.props.navigation.navigate('ForgotPassword', {otpMatched: true})}
                            else {
                                    this.props.navigation.navigate('Register', {mobileNumber, LoginID, createAccount: true})
                            }
                        // }
                        // else {
                        //     this.setState({error: resp.message, loading: false})
                        // }
                        
                    }
                    catch (e) {
                        console.log("OTP screen",e);
                        if(e.ErrorDescription == "INVALID_PASSWORD" || e.ErrorDescription == "OTP_EXPIRED"){
                            if(e.ErrorDescription == "INVALID_PASSWORD") 
                            this.setState({error: 'Invalid Password', loading: false})
                            if(e.ErrorDescription == "OTP_EXPIRED") 
                            this.setState({error: 'OTP Expired', loading: false})
                        }
                        // else
                        // Alert.alert("Error Warning",`Status: '${e.status},'Message ',${e.ErrorDescription}`,[{ text: "OK"}]);
                    }
                })
            }
        }else {
            alert("No internet connectivity detected. Please check your Network Settings and try again.")
        }
    }

    render(){
        const { screen, mobileNumber, LoginID } = this.props.route.params;
        console.log("Props in otp",this.props);
        const { darkMode } = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <TouchableWithoutFeedback  onPress={this.focusOutAll}>
                <View style={[styles.flexOne, styles.paddingVertical12, styles.paddingHorizontal40, darkMode ? styles.bgBlack : styles.bgIdk]}>
                    <View style={[styles.flexOneAndQuarter, styles.allCenter]}>
                        <Pressable onPress={()=>this.props.navigation.navigate('Login')} style={[styles.bgDarkGreen, styles.mediumImage, styles.allCenter]}>
                            <Text>
                                <FIcon name="remove" size={35} color="#fff" />
                            </Text>
                        </Pressable>
                    </View>
                    <Form3dBackgroundComponent/>
                    <KeyboardAvoidingView style={[]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>               
                        <View style={[ {height:width/1.5}, styles.extraRadius, styles.bgDarkGray]}>
                            <View style={[{flex: 0.6}, styles.row, styles.paddingHorizontal30, styles.padding, styles.flexEndHorizontal]}>
                                <Text style={[styles.fontSize25, styles.white]}>
                                    Enter
                                </Text>
                                <Text style={[styles.fontSize25, styles.darkGreen]}>
                                    {' OTP'}
                                </Text>
                            </View>
                            {/* <View style={[styles.flexQuarterToOne, styles.row, styles.paddingHorizontal30, styles.padding, styles.flexEndHorizontal]}>
                                <Text style={[styles.fontSize25, styles.white]}>
                                    Enter
                                </Text>
                                <Text style={[styles.fontSize25, styles.darkGreen]}>
                                    {' OTP'}
                                </Text>
                            </View> */}
                            <View style={[styles.paddingHorizontal24, styles.flexOne]}>
                                <View style={[{  backgroundColor: this.state.lableCNo ? Colors.lightGray : 'transparent'}, styles.spaceBetweenVertical, styles.paddingHorizontal24, styles.radius16, styles.centerVertical]}>
                                    <Text style={[styles.white, styles.opacity65perc, styles.fontSize13,]}>
                                        MOBILE NUMBER
                                    </Text>
                                    <Text style={[styles.medium22, styles.white]}>
                                        {mobileNumber ? ( "XXXXXX" + mobileNumber.substr(mobileNumber.length - 4)) : ""}
                                    </Text>
                                    <View style={[styles.marginVertical ,{borderTopWidth: 0.8, borderColor: Colors.green}]}/>
                                </View>
                            </View>

                            <View style={[styles.paddingHorizontal24]}>
                                <View style={[{ backgroundColor: this.state.lablePass ? Colors.bluewhite : 'transparent'}, styles.spaceBetweenVertical, styles.paddingHorizontal24, styles.radius16, styles.centerVertical]}>
                                    <Text style={[styles.white, styles.opacity65perc, this.state.lablePass || this.state.password ? styles.small : styles.normal]}>
                                        OTP
                                    </Text>
                                    <TextInput
                                        value={this.state.password}
                                        style={[styles.medium, { paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: 0.8}, styles.white, styles.paddingRegular, styles.paddingBottom]}
                                        ref={(input) => { this.passwordInput = input; }}
                                        onFocus={ () => this.setState({lablePass: true})}
                                        onBlur={ () => this.setState({lablePass: false})}
                                        onChangeText={text => {
                                            this.setState({error: ''})
                                            var validationRegex = RegExp(/[0-9]+/, "g");
                                            if ( text === "" || validationRegex.test(text)) {
                                                this.setState({password: text})
                                            } else {

                                            }
                                            if (text.length === 4) {
                                                this.setState({otpValidation: true})
                                                this.passwordInput.blur();
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
                            <View style={styles.flexHalf}>

                            </View>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={[styles.flexOne]}>
                        <View style={[styles.flexTwo, styles.allCenter, styles.spaceEvenly]}>
                                <BodyText1 style={[styles.selfCenter, styles.paleRed, styles.paddingVertical]}>
                                    {this.state.error}
                                </BodyText1>
                            <View style={[ styles.bottom]}>
                                <Pressable disabled={this.state.otpValidation ? false : true} onPress={this.performLoginWithOtp} style={[styles.padding6, this.state.otpValidation ? styles.bgDarkGreen : styles.bgDarkGray, styles.extraRadius]}>
                                    {this.state.loading ?  <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                                <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
                                                <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
                                            </View> :<Text style={[styles.white, styles.medium, styles.paddingVertical6, styles.paddingHorizontal30]}>
                                        { screen == "login" ? "Sign In" : screen == "forgotPassword" ? "Submit" : "Verify Otp" }
                                    </Text>}
                                </Pressable>
                            </View>
                        </View>
                        <View style={[styles.flexTwo, styles.row, styles.allCenter]}>
                            <Text style={[darkMode? styles.white: styles.black, styles.fontSize17]}>
                            { screen == "login" ? '' :  'Already have an account '}
                            </Text>
                            <Pressable onPress={()=> screen == "login" ? this.props.navigation.navigate('Register', {mobileNumber: "", LoginID: ""}) : this.props.navigation.navigate('Login')}>
                                <Text style={[styles.green,styles.fontSize17]}>
                                    { screen == "login" ? '' : 'Log In' }
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {return {
    darkMode: commonSelectors.darkMode(state),

}}

function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        performLoginActions: (username, password, type) => dispatch(loginActions.performLoginActions(username, password, type)),
    }
}

const OtpScreen= connect(
    mapStateToProps,
    mapDispatchToProps
)(Otp);
export {OtpScreen}
