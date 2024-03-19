import React from "react";
import {View, TextInput, TouchableOpacity, Image , KeyboardAvoidingView, ActivityIndicator, ScrollView, Keyboard, Alert, Platform} from "react-native";
import {Picker} from '@react-native-community/picker';//sumit

import {connect} from "react-redux";
import * as _ from "lodash";

import {styles} from "SmartgasConsumerApp/js/styles"
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import * as loginActions from "SmartgasConsumerApp/js/actions";
import {
    BodyText1,
    BodyText2,
    ButtonText, CustomText,
    HeadingText1, HeadingText10,
    HeadingText2,
    HeadingText3,
    HeadingText6,
    HeadingText9
} from "SmartgasConsumerApp/js/components/common";
import {validateEmailHelper} from "SmartgasConsumerApp/js/helpers/common/validateEmailHelper";
import Colors from "SmartgasConsumerApp/js/styles/Colors";
import {apiDispatcher} from "SmartgasConsumerApp/js/actions";
import {commonApis, login, profile, verify} from "SmartgasConsumerApp/js/api";
import {icons} from "../../constants/imageConstants";
import {checkPhoneOrEmail} from "../../helpers/common/checkPhoneOrEmail";
import {userDetailActions} from "SmartgasConsumerApp/js/actions";
import {HeaderComponent} from "../../components/common/HeaderComponent";
import { ErrorBoundaryMainComponent } from "../../components/errorBoundary/ErrorBoundaryComponent";

class VerifyMobile extends React.Component{
    constructor (props) {
        super (props);
        this.state={
            oldPassword: __DEV__ ? "Pass@1234" :"",
            password:  "",
            passwordHide: true,
            language: "java",
            otp: "",
        }
    }



    getOtp = async ()=> {
        this.setState({loading: true},async ()=> {
            let resp = await this.props.apiDispatcher(verify.mobileSendOtpApi( this.state.confirmPassword, this.props.profile.mobileverified === "false" ? "SMS" : "MAIL", this.props.profile.mobileverified === "false" ? this.props.profile.mobile1 : this.props.profile.email ));
            console.log("login",resp);
            if (resp.data === "OTP_SENT"){
                this.setState({loading: false, showOtp: true})
            } else {
                this.setState({error: resp.data})
            }
        })
    }

    verifyOtp = () => {

        this.setState({loading: true},async ()=> {
            try {
                let resp = await this.props.apiDispatcher(verify.verifyOtpApi(this.state.otp, this.props.profile.mobileverified === "false" ? "SMS" : "MAIL", this.props.profile.mobileverified === "false" ? this.props.profile.mobile1 : this.props.profile.email));
                console.log("login", resp);
                if (resp.data === "VERIFICATION_SUCCESSFUL") {
                    let user = await this.props.apiDispatcher(profile.getProfileApi(this.props.profile.email));

                    this.props.setUser(user.data);

                    this.setState({loading: false, showOtp: false});
                    Alert.alert(
                        'Congratulations',
                        'Your details have been verified successfully.',
                        [
                            {text: 'OK', onPress: () => this.props.navigation.goBack()}
                        ]
                    );
                } else {
                    this.setState({error: resp.data, loading: false})
                }
            }catch (e) {
                console.warn(e);
                this.setState({error:e.data, loading: false})
            }
        })
    }


    sanitizeData = () => {
        let passwordTest = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

        if(!passwordTest.test(this.state.confirmPassword)) {
            this.setState({error: "Enter a valid password with atleast one number and one special character"})
        } else {
            this.getOtp();
        }
    };

    navigateToEditContact= () => {
        this.props.navigation.navigate("EditContact");

    }


    render() {
        return (
            <View style={[styles.flexOne]}>
                <ErrorBoundaryMainComponent>
                <HeaderComponent
                    title={"Verify Contact"}
                    backPress={()=>this.props.navigation.navigate('Security')}

                    goBack={this.props.navigation.toggleDrawer.bind(this)}
                    backImage={icons.logout}
                    image={icons.menu}
                />
                <View style={[styles.flexOne, styles.width,styles.bgTint5DeepGreyBlue, styles.paddingHorizontal24]}>

                <View style={[styles.flexOne]}>
                    <CustomText style={[{fontSize: 24}, styles.bold]}>
                        Verify Mobile Number
                    </CustomText>
                    <BodyText2>
                        {this.props.profile.mobileverified === "false" ? this.props.profile.mobile1 : this.props.profile.email }
                    </BodyText2>
                    <TouchableOpacity onPress={this.navigateToEditContact}>
                        <BodyText2 style={[styles.primaryBlue]}>
                            Change
                        </BodyText2>
                    </TouchableOpacity>
                </View>
                <KeyboardAvoidingView behavior="padding" enabled={true} style={[   this.state.emailVerified ? styles.flexFour :styles.flexTwo]}>
                    {
                        <ScrollView style={[styles.flexFour]}>


                            {   !this.state.showOtp ?
                            <View style={[styles.loginInputBox, styles.centerHorizontal, styles.spaceBetweenVertical, styles.statusBarHeight, styles.marginTop18, styles.shadow, styles.elevate, styles.paddingRight10, styles.row]}>
                                <TextInput
                                    placeholder= {"Confirm Password"}
                                    style={[styles.paddingHorizontal, styles.darkgrey, styles.b1, styles.flexOne, styles.statusBarHeight, styles.paddingLeft16]}
                                    secureTextEntry={this.state.passwordHide}
                                    value={this.state.confirmPassword}
                                    onChangeText={text => {this.setState({confirmPassword: text})}}
                                    blurOnSubmit={false}
                                    onSubmitEditing={()=> Keyboard.dismiss()}
                                    // onFocus={this.passWordTextFieldPress}
                                />

                                <TouchableOpacity
                                    style={[ styles.allCenter,  styles.padding, styles.paddingRight10]}
                                    onPress={ ()=> {this.setState({passwordHide: !this.state.passwordHide})} }
                                >
                                    <Image source={ icons.eye } style={[this.state.passwordHide && styles.opacity]}/>
                                </TouchableOpacity>
                            </View> : null }

                            {   this.state.showOtp ?
                                <View style={[styles.loginInputBox, styles.centerHorizontal, styles.spaceBetweenVertical, styles.statusBarHeight, styles.marginTop18, styles.shadow, styles.elevate, styles.paddingRight10, styles.row]}>
                                    <TextInput
                                        placeholder= {"OTP"}
                                        style={[styles.paddingHorizontal, styles.darkgrey, styles.b1, styles.flexOne, styles.statusBarHeight, styles.paddingLeft16]}
                                        value={this.state.otp}
                                        onChangeText={text => {this.setState({otp: text})}}
                                        maxLength={6}
                                        // onFocus={this.passWordTextFieldPress}
                                    />

                                    <TouchableOpacity
                                        style={[ styles.allCenter,  styles.padding, styles.paddingRight10]}
                                        onPress={ ()=> {this.setState({passwordHide: !this.state.passwordHide})} }
                                    >
                                        <Image source={ icons.eye } style={[this.state.passwordHide && styles.opacity]}/>
                                    </TouchableOpacity>
                                </View> : null }

                            {
                                <View>
                                    <BodyText1 style={[styles.red, styles.textCenter, styles.paddingTop4 ]}>
                                        {this.state.error}
                                    </BodyText1>
                                </View>
                            }

                            { !this.state.loading ?
                                <View style={[styles.row,]}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.state.showOtp ? this.verifyOtp() : this.sanitizeData()
                                        }}
                                        style={[styles.loginButton, {backgroundColor: Colors.secondaryBlue }, styles.marginHorizontalNormal]}
                                    >
                                        <ButtonText style={[styles.white]}>
                                            {  this.state.showOtp ? "Verify Mobile" : "Get OTP" }
                                        </ButtonText>
                                    </TouchableOpacity>
                                </View> : 
                                <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                    <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
                                    <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
                                </View>
                            }
                        </ScrollView>
                    }
                </KeyboardAvoidingView>
                </View>

                <View style={[styles.row, styles.width, {height: 50}]}>

                </View>
                </ErrorBoundaryMainComponent>
            </View>
        );
    }
}


function mapStateToProps (state) {
    return {
        token: commonSelectors.getToken(state),
        profile: commonSelectors.userDetails(state),

    }
}

function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        setUser: (data) => dispatch(userDetailActions.setUserDetails(data)),


    }
}

const VerifyMobileScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(VerifyMobile);
export {VerifyMobileScreen};

