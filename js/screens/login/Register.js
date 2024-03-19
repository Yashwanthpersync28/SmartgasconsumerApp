import React from 'react';
import { connect } from "react-redux";
import { View, Text, TextInput, TouchableWithoutFeedback, Image, KeyboardAvoidingView, Pressable, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import {styles} from '../../styles';
import Colors from '../../styles/Colors';
// Components
import {Form3dBackgroundComponent} from "../../components/common/Form3dBackground";
import {BodyText1} from "../../components/common";
// Libraries
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
// Icons
import FIcon from 'react-native-vector-icons/FontAwesome';
import FIcons from 'react-native-vector-icons/Feather';
// Constants
import { REGISTER } from 'SmartgasConsumerApp/js/constants/lottie';
// Backend
import {apiDispatcher} from "SmartgasConsumerApp/js/actions";
import * as login from "../../api/login";
import * as commonSelectors from "../../selectors/common";
import {registration} from "../../api";
import {verifyOtpTypes} from "../../constants";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
// Helper
import { CANumberValidation } from '../../helpers/common/userInputValidations';

const {height, width} = Dimensions.get('window');

class Register extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            // next: "Next"
            createAccount: false,
            // consumerNumber: __DEV__ ? "11000085636" : ""
            // consumerNumber: __DEV__ ? "51000076641" : ""


        }
        this.FullNameInput;
        this.consumerNumberInput;
        this.mobileNumberInput ? this.mobileNumberInput.blur() : null;
        this.consumerNumberInput;
        this.passwordInput;
        this.confirmPasswordInput;
    }

    componentDidMount(){
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                const { mobileNumber, LoginID, createAccount } = this.props.route.params;
                console.log(mobileNumber, LoginID, createAccount)
                this.setState({mobileNumber: mobileNumber ? mobileNumber : "" ,consumerNumber: LoginID ? LoginID : "", createAccount: createAccount ? createAccount : false })

            }
        );


        this.props.navigation.setOptions({ header : ()=> null });
        const { mobileNumber, LoginID, createAccount } = this.props.route.params;
        this.setState({mobileNumber: mobileNumber ? mobileNumber : "" ,consumerNumber: LoginID ? LoginID : "", createAccount: createAccount ? createAccount : false })

    }

    verifyOtp = async () => {
        if (!this.props.showAlert)
        {
            this.setState({loading: true}, async () => {
                let resp;
                try {
                    console.log("login Before");
                    resp = await this.props.apiDispatcher(registration.verifyConsumerID(this.state.consumerNumber, verifyOtpTypes.register));
                    console.log("login", resp);
                    this.setState({loading: false, mobileNumber: resp.data.MobileNumber, error: ''});
                    this.props.navigation.navigate('Otp',{ screen: 'Register',  mobileNumber: resp.data.MobileNumber, LoginID: this.state.consumerNumber })
                } catch (e) {
                    console.log("login screen",e, "ERRRO",e.data.ErrorDescription);
                    if(e.status == 440)
                    // Consumer ID is not Linked with SBPDCL. The Application is only for those consumers who have installed smart meter in their premises.
                        this.setState({loading: false,notValidUser: "Smart meter not installed or under process. Please try after sometime.", loading: false})
                    else if(e.status == 430)
                    {
                        if(e.data.ErrorDescription === "CANumber already registered")
                        {
                            this.setState({error : "Consumer ID already registered", loading: false})
                        }
                        else
                        {
                            this.setState({error :e.data.ErrorDescription , loading: false})
                        }
                    }
                }
            })
        } else {
            alert("No internet connectivity detected. Please check your Network Settings and try again.")
        }

    };

    createAccount = () => {
        let { mobileNumber, emailID, consumerNumber, password, confirmPassword, FullName} = this.state;
        if (!this.props.showAlert)
        {
            this.setState({loading: true}, async () => {
                let resp;
                try {
                    resp = await this.props.apiDispatcher(registration.registerAccountApi(consumerNumber, mobileNumber, emailID, consumerNumber, password, confirmPassword, FullName));
                    console.log("login", resp);
                    this.setState({loading: false});
                    alert('Registered Successfully. Please login to continue')
                    this.props.navigation.navigate('Login')

                } catch (e) {
                    console.log("Register screen",e);
                    // if(e.data.errorDescription === "CANumber already registered")
                    // {}
                    this.setState({error: e[0].errorDescription, loading: false})
                }
            })
        } else {
            alert("No internet connectivity detected. Please check your Network Settings and try again.")
        }

    };

    checkNewPassword = (pass, newPass) => {
        if (pass !== "") {
            let strength = 0;
            if (pass.match(/([a-z])/) != null) {
                strength++;
            } else {
                this.setState({error: 'New Password must contain a lowercase character'})
            }
            if (pass.match(/([A-Z])/) != null) {
                console.log("Upper Case22", pass.match(/([A-Z])/) != null);
                strength++;
                // this.setState({error: ''})
            } else {
                console.log("Upper Case", pass.match(/([A-Z])/) != null);
                this.setState({error: 'New Password must contain an uppercase character'})
            }
            if (pass && pass.match(/([0-9])/)) {
                strength++;
            } else {
                this.setState({error: 'Password must contain a number'})
            }
            if (pass && pass.match(/([!,%,&,@,#,$,^,*,?,_,~,=,+,;,:,<,>])/)) {
                strength++;
            } else {
                this.setState({error: 'Password must contain a special character'})
            }
            if (pass && pass.length > 7) {
                strength++;
            } else {
                this.setState({error: 'Password must contain at least 8 character'})
            }
            console.log("33333333",pass.match(/([a-z])/), pass.match(/([A-Z])/), strength);
            if (strength === 5) {
                this.setState({error: ''})
                this.passwordMatch(pass, newPass)
                newPass
            }
        }
    };

    passwordMatch = async (pass, newPass) => {
        console.log('State', pass, newPass, this.state.confirmPassword);
        if(pass != newPass && this.state.confirmPassword != undefined)
        this.setState({ error: 'Password and Confirm Password did not match' })
        else
        this.setState({ error: '' })
    }

    // checkNewPassword = () => {

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
    //         if (this.state.password && this.state.password.length > 8) {
    //             strength++;

    //         } else {
    //             this.setState({error: 'Password musadsft contain at least 8 character'})

    //         }
    //         if (strength === 5) {
    //             let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    //             if (reg.test(this.state.emailID) === false && this.state.emailID) {
    //                 this.setState({error: 'Invalid Email'})
    //             }
    //             else if(this.state.confirmPassword !== this.state.password && this.state.confirmPassword) {
    //                 this.setState({error: "Password and Comfirm Password did not match"})
    //             }
    //             else
    //             this.setState({error: ''})

    //         }

    //     } else {

    //     }
    // };

    focusOutAll = () => {
        this.FullNameInput ? this.FullNameInput.blur() : null;
        this.emailInput ? this.emailInput.blur() : null;
        this.mobileNumberInput ? this.mobileNumberInput.blur() : null;
        this.consumerNumberInput ? this.consumerNumberInput.blur() : null;
        this.passwordInput ?  this.passwordInput.blur() : null;
        this.confirmPasswordInput ?  this.confirmPasswordInput.blur() : null;
    };
    render(){
        const { darkMode } = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <TouchableWithoutFeedback onPress={this.focusOutAll}>
                <KeyboardAvoidingView style={[styles.flexOne]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>               
                    <ScrollView style={[ styles.paddingHorizontal40, darkMode ? styles.bgBlack : styles.bgIdk]}>
                        <View style={[styles.flexQuarterToOne, styles.allCenter, styles.paddingTop6Percent]}>
                            <Pressable onPress={()=>this.props.navigation.navigate('Login')} style={[styles.bgDarkGreen, styles.mediumImage, styles.allCenter]}>
                                <Text>
                                    <FIcon name="remove" size={35} color="#fff" />
                                </Text>
                            </Pressable>
                        </View>
                        { !this.state.createAccount ? 
                        <KeyboardAvoidingView style={[]} behavior={Platform.OS === 'ios' ? 'position' : undefined}>               
                            <View style={[{paddingTop: height/6}]}>
                                <Form3dBackgroundComponent/>
                                <View style={[ {height: width/2}, styles.extraRadius, styles.bgDarkGray]}>
                                    <View style={[styles.flexOne, styles.row, {paddingLeft: width/12}, styles.centerHorizontal]}>
                                        <Text style={[styles.fontSize25, styles.palanquinRegular, styles.white]}>
                                            {'Consumer '}
                                        </Text>
                                        <Text style={[styles.fontSize25, styles.palanquinRegular, styles.darkGreen]}>
                                            ID
                                        </Text>
                                    </View>
                                    <View style={[styles.paddingHorizontal20, styles.flexOne]}>
                                        <View style={[{ backgroundColor: this.state.lableCNo ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding24, styles.radius16, styles.centerVertical]}>
                                            <Text style={[{color: '#b8b1b0'}, this.state.lableCNo || this.state.consumerNumber ? styles.small : styles.normal]}>
                                                CONSUMER ID
                                            </Text>
                                            <TextInput
                                                value={this.state.consumerNumber}
                                                style={[styles.medium, { justifyContent:"flex-start", paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: this.state.consumerNumber && !this.state.lableCNo ? null : 0.7},styles.white,styles.paddingRegular]}
                                                ref={(input) => { this.consumerNumberInput = input; }}
                                                onFocus={ () => this.setState({lableCNo: true})}
                                                onBlur={ () => this.setState({lableCNo: false})}
                                                maxLength={13}
                                                // keyboardType={'number-pad'}
                                                onChangeText={text=>{
                                                    const data = CANumberValidation(text);
                                                    this.setState({ error: data.error, consumerNumber: data.CANumber })   
                                                    text.length === 13 && this.consumerNumberInput.blur();
                                                    // text.length === 12 && this.consumerNumberInput.blur();
                                                }}
                                            />
                                        </View>
                                    </View>
                                    <View style={styles.flexPoint33}>
                                            
                                    </View>
                                </View>
                            </View>
                        </KeyboardAvoidingView>

                        :
                        <>

                            <Form3dBackgroundComponent/>

                            <View style={[ styles.flexThree, styles.extraRadius, styles.bgDarkGray]}>
                                <View style={[styles.flexOne, styles.row, styles.paddingHorizontal30, styles.padding20, styles.centerHorizontal]}>
                                    <Text style={[styles.fontSize25, styles.palanquinRegular, styles.white]}>
                                        Create
                                    </Text>
                                    <Text style={[styles.fontSize25, styles.palanquinRegular, styles.green]}>
                                        {' Account'}
                                    </Text>
                                </View>
                                <View style={[styles.flexHalf, styles.paddingHorizontal20]}>
                                    <View style={[styles.flexOne, { backgroundColor: this.state.labelCNo ? Colors.bluewhite : 'transparent'}, styles.spaceBetweenVertical, styles.padding, styles.paddingHorizontal16, styles.radius16, styles.centerVertical]}>
                                        <Text style={[{color: '#b8b1b0'}, this.state.labelCNo || this.state.consumerNumber ? styles.small : styles.normal]}>
                                            CONSUMER ID
                                        </Text>
                                        <View>
                                            <Text style={[styles.regular, styles.white]}>
                                                {/* 510000058144 */}
                                                {this.state.consumerNumber}
                                                {/* TO Do Need to dynamic */}
                                            </Text>
                                            <View style={[styles.marginVertical ,{borderTopWidth: 0.7, borderColor: Colors.green}]}/>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.flexQuarterToOne, styles.paddingHorizontal20]}>
                                    <View style={[styles.flexOne, { backgroundColor: this.state.labelMobile ? Colors.bluewhite : 'transparent'}, styles.spaceBetweenVertical, styles.padding, styles.paddingHorizontal16, styles.radius16, styles.centerVertical]}>
                                        <Text style={[{color: '#b8b1b0'}, this.state.labelMobile || this.state.mobileNumber ? styles.small : styles.normal]}>
                                            MOBILE NUMBER
                                        </Text>
                                        <Text style={[styles.regular, styles.white]}>
                                            {/* 9741434253 */}
                                            {this.state.mobileNumber}
                                            {/*To Do Need to make dynamic */}
                                        </Text>
                                        <View style={[styles.marginVertical ,{borderTopWidth: 0.7, borderColor: Colors.green}]}/>
                                    </View>
                                </View>
                                <View style={[styles.paddingHorizontal20, styles.flexOne]}>
                                    <View style={[styles.flexOne, { backgroundColor: this.state.labelFullName ? Colors.bluewhite : 'transparent'}, styles.spaceBetweenVertical, styles.padding16, styles.radius16, styles.centerVertical]}>
                                        <View style={[styles.row]}>
                                            <Text style={[{ color: '#b8b1b0' }, this.state.labelFullName || this.state.FullName ? styles.small : styles.normal]}>
                                                FULL NAME
                                            </Text>
                                            <Text style={[styles.paleRed, styles.normal, styles.paddingLeft8, {bottom:4}]}>*</Text>
                                        </View>
                                        <TextInput
                                            value={this.state.FullName}
                                            style={[styles.regular, { justifyContent:"flex-start", paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: 0.7 }, styles.white, styles.paddingRegular]}
                                            ref={(input) => { this.FullNameInput = input; }}
                                            onFocus={ () => this.setState({labelFullName: true})}
                                            onBlur={ () => this.setState({labelFullName: false})}
                                            autoCapitalize='words'
                                            onChangeText={text=>{
                                                this.setState({FullName: text})
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.flexOne, styles.paddingHorizontal20]}>
                                    <View style={[styles.flexOne, { backgroundColor: this.state.labelEmail ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding16, styles.radius16, styles.centerVertical]}>
                                        <View style={[styles.row]}>
                                            <Text style={[{color: '#b8b1b0'}, this.state.labelEmail || this.state.emailID ? styles.small : styles.normal]}>
                                                Email
                                            </Text>
                                            <Text style={[styles.paleRed, styles.normal, styles.paddingLeft8, {bottom:4}]}>*</Text>
                                        </View>
                                        <TextInput
                                            value={this.state.emailID}
                                            style={[styles.regular, { paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: 0.7 }, styles.white, styles.paddingRegular]}
                                            ref={(input) => { this.emailInput = input; }}
                                            onFocus={ () => this.setState({labelEmail: true})}
                                            onBlur={ () => this.setState({labelEmail: false})}
                                            keyboardType={'email-address'}
                                            autoCapitalize='none'
                                            onChangeText={text=>{
                                                this.setState({emailID: text})
                                                let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                                                if (reg.test(text) === false && text) {
                                                    this.setState({error: 'Invalid Email'})
                                                }
                                                else{
                                                    if(this.state.error && this.state.password || this.state.confirmPassword){
                                                        this.checkNewPassword()
                                                    } if(this.state.password !== this.state.confirmPassword && this.state.password && this.state.confirmPassword)
                                                    this.setState({error: 'Passwords do not match'})
                                                    else
                                                    this.setState({error: ''})

                                                }
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={[styles.flexOne, styles.paddingHorizontal20]}>
                                    <View style={[styles.flexOne, { backgroundColor: this.state.labelPass ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.padding16, styles.radius16, styles.centerVertical]}>
                                    <View style={[styles.row]}>
                                            <Text style={[{color: '#b8b1b0'}, this.state.labelPass || this.state.password ? styles.small : styles.normal]}>
                                                PASSWORD
                                            </Text>
                                            <Text style={[styles.paleRed, styles.normal, styles.paddingLeft8, {bottom:4}]}>*</Text>
                                        </View>
                                        <View style={[styles.row,{borderColor: Colors.green, borderBottomWidth : 0.7}]}>
                                            <TextInput
                                                maxLength={15}
                                                value={this.state.password}
                                                style={[styles.regular, styles.flexOne, { paddingHorizontal: 0}, styles.white, styles.paddingRegular]}
                                                ref={(input) => { this.passwordInput = input; }}
                                                onFocus={ () => this.setState({labelPass: true})}
                                                onBlur={ () => this.setState({labelPass: false})}
                                                secureTextEntry={!this.state.passIcon}
                                                onChangeText={newPassword=>{
                                                    // this.setState({password: newPassword}, this.checkNewPassword)
                                                    newPassword.length === 15 && this.passwordInput.blur();
                                                    this.setState({password: newPassword}, this.checkNewPassword(newPassword, this.state.confirmPassword))

                                                }}
                                            />
                                            <Pressable style={[styles.selfCenter, {bottom: 10}]} onPress={()=> this.setState({passIcon: !this.state.passIcon})}>
                                                <Text style={[styles.opacity50perc]}>
                                                    <FIcons name={this.state.passIcon ? 'eye' : 'eye-off'} color={Colors.white } size={height/30}/>
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                                <View style={[styles.flexOne, styles.paddingHorizontal20, styles.paddingBottom20]}>
                                    <View style={[styles.flexOne ,{ backgroundColor: this.state.labelCPass ? Colors.bluewhite : 'transparent' },styles.spaceBetweenVertical, styles.padding16, styles.radius16, styles.centerVertical]}>
                                        <View style={[styles.row]}>
                                            <Text style={[{color: '#b8b1b0'}, this.state.labelCPass || this.state.password ? styles.small : styles.normal]}>
                                                CONFIRM PASSWORD
                                            </Text>
                                            <Text style={[styles.paleRed, styles.normal, styles.paddingLeft8, {bottom:4}]}>*</Text>
                                        </View>
                                        <View style={[styles.row,{borderColor: Colors.green, borderBottomWidth : 0.7}]}>
                                            <TextInput
                                                maxLength={15}
                                                value={this.state.confirmPassword}
                                                style={[styles.regular, styles.flexOne, { paddingHorizontal: 0 }, styles.white, styles.paddingRegular]}
                                                ref={(input) => { this.confirmPasswordInput = input; }}
                                                onFocus={ () => this.setState({labelCPass: true})}
                                                onBlur={ () => this.setState({labelCPass: false})}
                                                secureTextEntry={!this.state.passIcon2}
                                                onChangeText={password=>{
                                                    password.length === 15 && this.confirmPasswordInput.blur();
                                                    this.setState({confirmPassword: password},  ()=> {
                                                        if(password.length == 0 ){
                                                            this.setState({error: ""})
                                                        } 
                                                        else if(this.state.password != undefined){
                                                            this.checkNewPassword( this.state.password, password)
                                                        }
                                                    },)
                                                }}
                                            />
                                            <Pressable style={[styles.selfCenter, {bottom: 10}]} onPress={()=> this.setState({passIcon2: !this.state.passIcon2})}>
                                                <Text style={[styles.opacity50perc]}>
                                                    <FIcons name={this.state.passIcon2 ? 'eye' : 'eye-off'} color={Colors.white } size={height/30}/>
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.flexHalf}>

                                </View>
                            </View>
                        </>
                        }
                        <View style={[styles.flexQuarterToOne]}>
                            <View style={[styles.flexTwo, styles.allCenter]}>
                                <View style={[styles.flexOne, styles.allCenter]}>
                                    <BodyText1 style={[styles.paddingVertical, styles.paleRed, styles.textCenter]}>
                                        {this.state.error}
                                    </BodyText1>
                                    <Pressable
                                        // onPress={this.state.createAccount ?  this.createAccount : this.verifyOtp }
                                        disabled = {
                                            this.state.createAccount ?
                                                this.state.FullName && this.state.emailID && this.state.password && this.state.confirmPassword && !this.state.error ?
                                                    false : true 
                                                : this.state.consumerNumber && this.state.error == "" ?
                                                    false : true
                                        }
                                        style={[
                                            styles.padding6, styles.bgDarkGreen, styles.extraRadius,
                                            this.state.createAccount ?
                                                this.state.FullName && this.state.emailID && this.state.password && this.state.confirmPassword && !this.state.error ?
                                                    styles.bgDarkGreen : styles.bgDarkGray 
                                                : this.state.consumerNumber && this.state.error == "" ?
                                                    styles.bgDarkGreen : styles.bgDarkGray
                                        ]}
                                    >
                                        {this.state.loading? 
                                         <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                            <Text style={[styles.white, styles.medium]}>Loading</Text>
                                            <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
                                        </View> :
                                        <Text style={[styles.white, styles.medium, styles.paddingVertical6, styles.paddingVertical6, styles.paddingHorizontal30]}>
                                            { this.state.createAccount ? 'Register' : 'Next'}
                                        </Text> }
                                    </Pressable>
                                </View>
                            </View>
                            <View style={[styles.flexHalf, styles.row, styles.allCenter, styles.paddingVertical20]}>
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
                        {/* this.state.notValidUser */}
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
                    </ScrollView>
                </KeyboardAvoidingView>
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

const RegisterScreen= connect(
    mapStateToProps,
    mapDispatchToProps
)(Register);
export {RegisterScreen}
