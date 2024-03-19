import React from 'react';
import {connect} from "react-redux";
import {
    View,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    Pressable,
    PixelRatio,
    Platform,
    Alert,
    ActivityIndicator,
    Dimensions,
    KeyboardAvoidingView
} from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Components
import {Form3dBackgroundComponent} from "../../components/common/Form3dBackground";
// Constansts
import { REGISTER } from 'SmartgasConsumerApp/js/constants/lottie';
import {verifyOtpTypes} from "../../constants";
// Icons
import FIcon from 'react-native-vector-icons/FontAwesome';
import FIcons from 'react-native-vector-icons/Feather';
// Libraries
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
// Backend
import {commonApis, registration} from "../../api";
import {apiDispatcher} from "../../actions";
import {BodyText1} from "../../components/common";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
import * as commonSelectors from "../../selectors/common";
// Helper
import { CANumberValidation } from '../../helpers/common/userInputValidations';
const {height, width} = Dimensions.get('window');


class ForgotPassword extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            otpStatus: false,
            passIcon: false,
            confirmPassIcon: false.valueOf,
            customerNumber: ''
            // customerNumber: __DEV__ ? "11000085636" : ""
        }
        this.customerNumberInput;
        this.mobileNumberInput;
        this.otpInput;
        this.passwordInput;
        this.confirmPasswordInput;
    }

    componentDidMount(){
        this.props.navigation.setOptions({ header : ()=> null });
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                const {  LoginID, otpMatched } = this.props.route.params;
                console.log(otpMatched, LoginID, )
                this.setState({ otpStatus: otpMatched ? otpMatched : false })

            }
        );

    }

    focusOutAll = () => {
        this.customerNumberInput ? this.customerNumberInput.blur() : null;
        this.mobileNumberInput ?  this.mobileNumberInput.blur() : null;
        this.otpInput ?  this.otpInput.blur() : null;
        this.passwordInput ?  this.passwordInput.blur() : null;
        this.confirmPasswordInput ?  this.confirmPasswordInput.blur() : null;
    };

    verifyOtp = async () => {
        if (!this.props.showAlert)
        {
            this.setState({loading: true}, async () => {
                let resp;
                try {
                    resp = await this.props.apiDispatcher(registration.verifyConsumerID(this.state.customerNumber, verifyOtpTypes.other));
                    console.log("Forgot Password Response", resp);
                    this.setState({loading: false, mobileNumber: resp.data.MobileNumber, otpStatus: true, error: ''});
                    this.props.navigation.navigate('Otp',{ screen: 'forgotPassword',  mobileNumber: resp.data.MobileNumber, LoginID: this.state.customerNumber })

                } catch (e) {
                    console.log("Forgot Password screen",e);
                    // CANumuber is not registered
                    // notValidUser: "Consumer ID is not Linked with APDCL. The Application is only for those consumers who have installed smart meter in their premises."
                    this.setState({notValidUser: e.data.ErrorDescription == 'CANumuber is not registered' && 'User not Registered. Please Sign Up first', loading: false})
                }
            })
        } else {
            alert("No internet connectivity detected. Please check your Network Settings and try again.")
        }

    };

    checkPassword = (pass, newPass) => {
        if (pass !== "") {
            let strength = 0;
            if (pass && pass.match(/([a-z])/)) {
                strength++;
            } else {
                this.setState({error: 'Password must contain a lowercase character'})
            }
            if (pass && pass.match(/([A-Z])/)) {
                strength++;
            } else {
                this.setState({error: 'Password must contain an uppercase character'})
            }
            if (pass && pass.match(/([0-9])/)) {
                strength++;
            } else {
                this.setState({error: 'Password must contain a number'})
            }
            if (pass && pass.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                strength++;
            } else {
                this.setState({error: 'Password must contain a special character'})
            }
            if (pass && pass.length > 7) {
                strength++;
            } else {
                this.setState({error: 'Password must contain at least 8 character'})
            }
            if (pass === newPass && this.state.password.length > 0 && this.state.confirmPassword.length > 0) {
                strength++
                // this.setState({error: ''})
            }else {
                this.setState({error: 'Password and Confirm password did not match'})
            }
            if (strength === 6) {
                this.setState({error: ''})
                newPass
            }
        }
    };

    // checkPassword = () => {

    //     //-----------------------------------------
    //     if (this.state.password !== "") {
    //         //If password contains both lower and uppercase characters, increase strength value.
    //         //if (this.state.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    //         let strength = 0;
    //         if (this.state.password && this.state.password.match(/([a-z])/)) {
    //             strength++;

    //         } else {
    //             this.setState({error: 'Password must contain a lowercase character'})
    //         }
    //         //if (this.state.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    //         if (this.state.password && this.state.password.match(/([A-Z])/)) {
    //             strength++;

    //         } else {
    //             this.setState({error: 'Password must contain an uppercase character'})

    //         }
    //         //If it has numbers and characters, increase strength value.
    //         // if (this.state.password.match(/([a-zA-Z])/) && this.state.password.match(/([0-9])/)) {
    //         if (this.state.password && this.state.password.match(/([0-9])/)) {
    //             strength++;

    //         } else {
    //             this.setState({error: 'Password must contain a number'})

    //         }
    //         //If it has one special character, increase strength value.
    //         if (this.state.password && this.state.password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
    //             strength++;

    //         } else {
    //             this.setState({error: 'Password must contain a special character'})

    //         }
    //         if (this.state.password && this.state.password.length > 7) {
    //             strength++;

    //         } else {
    //             this.setState({error: 'Password must contain at least 8 character'})

    //         }
    //         if (strength === 5) {
    //             this.setState({error: ''})

    //         }

    //     } else {

    //     }
    // }

    changePassword = () => {
        try {
            this.setState({loading: true}, async () => {
                let resp;
                try {
                    resp = await this.props.apiDispatcher(commonApis.resetPasswordApi(this.state.customerNumber, this.state.password, this.state.confirmPassword, this.state.mobileNumber));
                    console.log("login", resp);
                    this.setState({loading: false, mobileNumber: resp.data.MobileNumber, otpStatus: false});
                    Alert.alert(
                        'Congratulations',
                        'Your password has been reset successfully. Please login to your account.',
                        [
                            {
                                text: 'OK', onPress: () => this.props.navigation.navigate('Login')
                            }
                        ]
                    );

                } catch (e) {
                    console.log("login screen", e);
                    this.setState({error: e[0] ? e[0].errorDescription : e.data.ErrorDescription == "NEWPASSWORD_CANNOT_BE_SAME_AS_OLD" && "New Password Can Not Be Same As Old Password ", loading: false})
                }
            
            })
            
        } catch (e) {
            this.setState({error: e.ErrorDescription, loading: false})
        }
    };

    render(){
        const { darkMode } = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <TouchableWithoutFeedback onPress={this.focusOutAll}>
                <View style={[styles.flexOne, styles.paddingVertical12, styles.paddingHorizontal40, darkMode ? styles.bgBlack : styles.bgIdk]}>
              
                    <View style={[styles.flexOne, styles.allCenter]}>
                        <Pressable onPress={()=>this.props.navigation.navigate('Login')} style={[styles.bgDarkGreen, styles.mediumImage, styles.allCenter]}>
                            <Text>
                                <FIcon name="remove" size={35} color="#fff" />
                            </Text>
                        </Pressable>
                    </View>
                    <KeyboardAvoidingView style={[]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>               
                    <Form3dBackgroundComponent/>
                    <View style={[ !this.state.otpStatus ? {height: width/1.4} : {height: width/1.3}, styles.extraRadius, styles.bgDarkGray]}>
                        <View style={[styles.flexQuarterToOne, styles.row, styles.paddingHorizontal30, styles.centerHorizontal, styles.paddingTop]}>
                            <Text style={[styles.fontSize25, styles.palanquinRegular, styles.white]}>
                                {this.state.otpStatus ? "Set" : "Forgot"}
                            </Text>
                            <Text style={[styles.fontSize25, styles.palanquinRegular, styles.darkGreen]}>
                                {this.state.otpStatus ? ' New Password' : ' Password'  }
                            </Text>
                        </View>
                        {!this.state.otpStatus ?
                        <>
                        <View style={[styles.paddingHorizontal24, styles.flexOne]}>
                            <View style={[styles.flexOne, { backgroundColor: this.state.lableCNo ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding24, styles.radius16, styles.centerVertical]}>
                                <Text style={[{color: '#b8b1b0',},this.state.lableCNo || this.state.customerNumber ? styles.small : styles.normal]}>
                                    CONSUMER ID
                                </Text>
                                <TextInput
                                    value={this.state.customerNumber}
                                    style={[styles.medium, { justifyContent:"flex-start", paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: this.state.customerNumber && !this.state.lableCNo ? null : 0.7},styles.white,styles.paddingRegular]}
                                    ref={(input) => { this.customerNumberInput = input; }}
                                    onFocus={ () => this.setState({lableCNo: true})}
                                    // onBlur={ () => { this.state.customerNumber != "" && this.state.customerNumber.length < 12 && this.setState({ error: "Consumer Id should contain only 12 digits"}); this.setState({lableCNo: false})}}
                                    onChangeText={text=>{
                                        const data = CANumberValidation(text);
                                        this.setState({ error: data.error, customerNumber: data.CANumber })   
                                        text.length === 13 && this.customerNumberInput.blur();
                                    }}
                                    maxLength={13}
                                    // keyboardType={'numeric'}
                                />
                            </View>
                            <Modal isVisible={this.state.notValidUser ? true : false} animationInTiming={1000} style={[styles.marginHorizontal24,{paddingRight:20}]}>
                                <Pressable onPress={()=> this.setState({ notValidUser: '' })} style={[{top:20,right:-20},styles.zIndex, styles.icon40, styles.right, styles.bgMediumGray , styles.allCenter]}>
                                    <FIcons name={'x'} size={20} color={Colors.white}/>
                                </Pressable>
                                <View style={[{backgroundColor: '#c5cdd4'}, styles.radius20, styles.padding, styles.paddingVertical20, styles.allCenter]}>
                                    <LottieView style={[{height:200}]} source={REGISTER.userAccount} autoPlay loop />
                                    <Text style={[styles.black, styles.paddingHorizontal10, styles.textCenter, styles.opacity50perc, styles.paddingBottom12]}>
                                        {this.state.notValidUser}
                                    </Text>
                                </View>
                            </Modal>
                        </View>
                        </>
                        :
                        <>
                        <View style={[styles.flexOne, styles.paddingHorizontal24]}>
                            <View style={[ styles.flexOne, { backgroundColor: this.state.lablePassword ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding24, styles.radius16, styles.centerVertical]}>
                                <Text style={[{ color: '#b8b1b0'}, this.state.lablePassword || this.state.password ? styles.small : styles.normal]}>
                                    Password
                                </Text>
                                <View style={[styles.row,{borderColor: Colors.green, borderBottomWidth : 0.7}]}>
                                    <TextInput
                                        value={this.state.password}
                                        style={[styles.medium, styles.flexOne, { paddingHorizontal: 0, borderColor: Colors.green },styles.white, styles.paddingRegular]}
                                        ref={(input) => { this.passwordInput = input; }}
                                        onFocus={ () => this.setState({lablePassword: true})}
                                        onBlur={ () => this.setState({lablePassword: false})}
                                        maxLength={15}
                                        onChangeText={password=>{
                                            this.setState({password: password},()=>{
                                                this.checkPassword(password, this.state.confirmPassword)
                                            },)
                                            password.length === 15 && this.passwordInput.blur();
                                        }}
                                        secureTextEntry={!this.state.passIcon}
                                    />
                                    <Pressable style={[styles.selfCenter]} onPress={()=> this.setState({passIcon: !this.state.passIcon})}>
                                        <Text style={[styles.opacity50perc]}>
                                            <FIcons name={this.state.passIcon ? 'eye' : 'eye-off'} color={Colors.white } size={height/30}/>
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.flexOne, styles.paddingHorizontal24]}>
                            <View style={[styles.flexOne, { backgroundColor: this.state.lableCPass ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding24, styles.radius16, styles.centerVertical]}>
                                <Text style={[{ color: '#b8b1b0', flexBasis: 18 }, this.state.lableCPass || this.state.confirmPassword ? styles.small : styles.normal]}>
                                    Confirm Password
                                </Text>
                                <View style={[styles.row,{borderColor: Colors.green, borderBottomWidth : 0.7}]}>
                                    <TextInput
                                        value={this.state.confirmPassword}
                                        style={[styles.medium, { paddingHorizontal: 0}, styles.flexOne, styles.white, styles.paddingRegular]}
                                        ref={(input) => { this.otpInput = input; }}
                                        onFocus={ () => this.setState({lableCPass: true})}
                                        onBlur={ () => this.setState({lableCPass: false})}
                                        maxLength={15}
                                        onChangeText={pass=>{
                                            this.setState({confirmPassword: pass},()=>{
                                                this.checkPassword(pass, this.state.password)
                                            },)
                                            pass.length === 15 && this.otpInput.blur();
                                        }}
                                        secureTextEntry={!this.state.confirmPassIcon}
                                    />
                                    <Pressable style={[styles.selfCenter]} onPress={()=> this.setState({confirmPassIcon: !this.state.confirmPassIcon})}>
                                        <Text style={[styles.opacity50perc]}>
                                            <FIcons name={this.state.confirmPassIcon ? 'eye' : 'eye-off'} color={Colors.white } size={height/30}/>
                                        </Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                        </> }

                        <View style={styles.flexHalf}>
                           
                        </View>
                        
                    </View>
                    </KeyboardAvoidingView>

                    <View style={[styles.flexOne]}>
                    
                        <View style={[styles.flexTwo, styles.allCenter]}>
                            <View style={[styles.flexThree, styles.allCenter]}>
                            <BodyText1 style={[styles.paddingBottom, styles.paleRed, styles.textCenter]}>
                                {this.state.error}
                            </BodyText1>
                                <Pressable
                                    // onPress={()=>{
                                    //     if(this.state.otpStatus){
                                    //        this.changePassword()
                                    //     }
                                    //     else {
                                    //         this.verifyOtp();
                                    //     }

                                    // }}
                                    disabled={!this.state.otpStatus ?
                                        this.state.customerNumber && !this.state.error ? false : true : 
                                        !this.state.error && this.state.password && this.state.confirmPassword ? false : true
                                    }
                                    style={[
                                        styles.padding6,
                                        !this.state.otpStatus ?
                                            (this.state.customerNumber && !this.state.error) ? styles.bgDarkGreen : styles.bgDarkGray : 
                                            !this.state.error && this.state.password && this.state.confirmPassword ? styles.bgDarkGreen : styles.bgDarkGray,
                                        styles.extraRadius]
                                    }
                                >
                                    {this.state.loading?<View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                                            <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
                                                            <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
                                                        </View> :
                                                        <Text style={[styles.white, styles.medium, styles.paddingVertical6, styles.paddingHorizontal20]}>
                                        { !this.state.otpStatus ? 'Submit' : 'Reset' }
                                    </Text>}
                                </Pressable>
                            </View>

                        </View>
                        <View style={[styles.flexHalf, styles.row, styles.centerVertical]}>
                            <Text style={[darkMode? styles.white: styles.black, styles.fontSize17]}>
                                {'Already have an account ? '}
                            </Text>
                            <Pressable onPress={()=>this.props.navigation.navigate('Login')}>
                                <Text style={[styles.green,styles.fontSize17]}>
                                    Sign In
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

function mapStateToProps (state) {
    return {
        darkMode: commonSelectors.darkMode(state),
    }
}

function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),

    }
}

const ForgotPasswordScreen= connect(
    mapStateToProps,
    mapDispatchToProps
)(ForgotPassword);
export {ForgotPasswordScreen}
