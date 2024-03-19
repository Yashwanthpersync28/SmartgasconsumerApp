import React from "react";
import {View, TextInput, TouchableOpacity, Image , KeyboardAvoidingView, ActivityIndicator, ScrollView, Keyboard, Alert} from "react-native";
import {Picker} from '@react-native-community/picker';//sumit

import {connect} from "react-redux";
import * as _ from "lodash";

import {styles} from "SmartgasConsumerApp/js/styles"
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import * as loginActions from "SmartgasConsumerApp/js/actions";
import {
    BodyText1,
    BodyText2,
    ButtonText, CustomText, HeaderComponent,
    HeadingText1, HeadingText10,
    HeadingText2,
    HeadingText3,
    HeadingText6,
    HeadingText9
} from "SmartgasConsumerApp/js/components/common";
import {validateEmailHelper} from "SmartgasConsumerApp/js/helpers/common/validateEmailHelper";
import Colors from "SmartgasConsumerApp/js/styles/Colors";
import {apiDispatcher} from "SmartgasConsumerApp/js/actions";
import {commonApis, login} from "SmartgasConsumerApp/js/api";
import {icons} from "../../constants/imageConstants";
import {checkPhoneOrEmail} from "../../helpers/common/checkPhoneOrEmail";
import {logout} from "SmartgasConsumerApp/js/actions";
import { ErrorBoundaryMainComponent } from "../../components/errorBoundary/ErrorBoundaryComponent";

class ResetPassword extends React.Component{
    constructor (props) {
        super (props);
        this.state={
            username: "",
            oldPassword: __DEV__ ? "Pass@1234" :"",
            password:  "",
            passwordHide: true,
        }
    }



    resetPassword = async ()=> {
        this.setState({loading: true},async ()=> {
           try {
               let resp = await this.props.apiDispatcher(login.resetPasswordApi(this.props.profile.email, this.state.oldPassword, this.state.password, this.props.token));
               console.log("login", resp);
               if (resp.data === "password has been updated." || resp.data === "PASSWORD_UPDATED") {
                  if (this.state.logoutFromAll) {
                      let logout = await this.props.apiDispatcher(login.logoutApi(true));
                      console.log("logout", logout);
                      if (logout.data === "USER_LOGGED_OUT_FROM_ALL_DEVICES") {
                          Alert.alert(
                              'Congratulations',
                              'Your password has been reset successfully. Login to continue',
                              [
                                  {text: 'OK', onPress: () => this.props.logout}
                              ]
                          );
                      }
                  }else {
                       Alert.alert(
                           'Congratulations',
                           'Your password has been reset successfully.',
                           [
                               {text: 'OK', onPress: () => this.props.navigation.goBack()}
                           ]
                       );
                   }
               }
               this.setState({loading: false, password: "", confirmPassword: ""})
           } catch (e) {
               console.log("resetPassWord", e)
               if(e.status == 400) {
                   this.setState({error: "Invalid Current password", loading: false});
               }
           }
        })
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
            if (pass && pass.match(/([!,%,&,@,#,$,^,*,?,_,~,=,+,;,:,<,>])/)) {
                strength++;
            } else {
                this.setState({error: 'Password must contain a special character'})
            }
            if (pass && pass.length > 7) {
                strength++;
            } else {
                this.setState({error: 'Password must contain at least 8 characters'})
            }
            if (pass === newPass && this.state.newPassword.length > 0 && this.state.confirmPassword.length > 0) {
                // strength++
                // this.setState({error: ''})
            }else {
                this.setState({error: 'Password and Confirm Password did not match'})
            }
            if (strength === 5) {
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
    //         if (this.state.password.match(/([a-z])/)) {
    //             strength++;

    //         } else {
    //             this.setState({error: 'Password must contain a lowercase character'})
    //         }
    //         //if (this.state.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
    //         if (this.state.password.match(/([A-Z])/)) {
    //             strength++;

    //         } else {
    //             this.setState({error: 'Password must contain an uppercase character'})

    //         }
    //         //If it has numbers and characters, increase strength value.
    //         // if (this.state.password.match(/([a-zA-Z])/) && this.state.password.match(/([0-9])/)) {
    //         if (this.state.password.match(/([0-9])/)) {
    //             strength++;

    //         } else {
    //             this.setState({error: 'Password must contain a number'})

    //         }
    //         //If it has one special character, increase strength value.
    //         if (this.state.password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
    //             strength++;

    //         } else {
    //             this.setState({error: 'Password must contain a special character'})

    //         }
    //         if (this.state.password.length > 7) {
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


    sanitizeData = () => {
        let passwordTest = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

        if(!passwordTest.test(this.state.password)) {
        //    this.checkPassword();
        } else if(this.state.password !== this.state.confirmPassword) {
            this.setState({error: "Passwords do not match"})
        } else {
            this.resetPassword();
        }
    };


    render() {
        return (
            <ErrorBoundaryMainComponent>
            <View style={[styles.flexOne, styles.height,styles.width, styles.paddingHorizontal24]}>
                <HeaderComponent
                    title={"Edit Company Experience"}
                    backPress={()=>this.props.navigation.navigate('Security')}
                    goBack={this.props.navigation.toggleDrawer.bind(this)}
                    backImage={icons.logout}
                    image={icons.menu}

                />
                <View style={[styles.statusBarHeight]}>
                    <CustomText style={[{fontSize: 24}, styles.bold]}>
                       Reset Password
                    </CustomText>
                </View>
                <KeyboardAvoidingView behavior="padding" enabled={true} style={[   this.state.emailVerified ? styles.flexFour :styles.flexTwo]}>
                    {
                        <ScrollView style={[styles.flexFour]}>


                            <View
                                style={ [ styles.desc]}


                            >
                                <ButtonText
                                >
                                    Old Password:
                                </ButtonText>
                            </View>


                            <View style={[styles.loginInputBox, styles.centerHorizontal, styles.spaceBetweenVertical, styles.statusBarHeight, styles.marginTop18, styles.shadow, styles.elevate, styles.paddingRight10, styles.row]}>
                                <TextInput
                                    placeholder= {"Current Password"}
                                    style={[styles.paddingHorizontal, styles.darkgrey, styles.b1, styles.flexOne, styles.statusBarHeight, styles.paddingLeft16]}
                                    secureTextEntry={this.state.passwordHide}
                                    value={this.state.oldPassword}
                                    onChangeText={oldPassword=>{
                                        this.setState({oldPassword: oldPassword})
                                    }}
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
                            </View>



                            <View
                                style={ [ styles.desc]}


                            >
                                <ButtonText
                                >
                                    New Password:
                                </ButtonText>
                            </View>

                            <View style={[styles.loginInputBox, styles.centerHorizontal, styles.spaceBetweenVertical, styles.statusBarHeight, styles.marginTop18, styles.shadow, styles.elevate, styles.paddingRight10, styles.row]}>
                                <TextInput
                                    placeholder= {"New Password"}
                                    style={[styles.paddingHorizontal, styles.darkgrey, styles.b1, styles.flexOne, styles.statusBarHeight, styles.paddingLeft16]}
                                    secureTextEntry={this.state.passwordHide}
                                    value={this.state.password}
                                    onChangeText={password=>{
                                        this.setState({password: password}, ()=> this.checkPassword(password, this.state.confirmPassword))

                                    }}
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
                            </View>



                            <View
                                style={ [ styles.desc]}


                            >
                                <ButtonText
                                >
                                    Confirm Password:
                                </ButtonText>
                            </View>

                            <View style={[styles.loginInputBox, styles.centerHorizontal, styles.spaceBetweenVertical, styles.statusBarHeight, styles.marginTop18, styles.shadow, styles.elevate, styles.paddingRight10, styles.row]}>
                                <TextInput
                                    placeholder= {"Confirm Password"}
                                    style={[styles.paddingHorizontal, styles.darkgrey, styles.b1, styles.flexOne, styles.statusBarHeight, styles.paddingLeft16]}
                                    secureTextEntry={this.state.passwordHide}
                                    value={this.state.confirmPassword}
                                    onChangeText={text => {
                                        this.setState({confirmPassword: text}, ()=>{
                                            this.checkPassword(text, this.state.pass)
                                            // if(this.state.password !== this.state.confirmPassword) {
                                            //     this.setState({error: "Passwords do not match"})
                                            // } else {
                                            //     this.setState({error: ""})
                                            // }

                                        })
                                    }}
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
                            </View>

                            <View style={[ styles.centerHorizontal,styles.marginTop18, styles.shadow,styles.paddingRight10, styles.row]}>

                                <BodyText1 style={[styles.paddingLeft24]}>
                                    Log out from all devices.
                                </BodyText1>
                                <TouchableOpacity
                                    style={[ styles.allCenter,  styles.padding, styles.paddingRight10, ]}
                                    onPress={ ()=> {this.setState({logoutFromAll: !this.state.logoutFromAll})} }
                                >
                                    <View style={[this.state.logoutFromAll  ?styles.bgPrimaryBlue : styles.bgTint5DeepGreyBlue,{height: 24, width: 24, borderRadius: 12, borderWidth: 8, borderColor: Colors.white}]}/>
                                </TouchableOpacity>
                            </View>


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
                                            this.sanitizeData()
                                        }}
                                        style={[styles.loginButton, {backgroundColor:  Colors.secondaryBlue}, styles.marginHorizontalNormal]}
                                    >
                                        <ButtonText style={[styles.white]}>
                                            Change Password
                                        </ButtonText>
                                    </TouchableOpacity>
                                </View> : <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>

                            }
                        </ScrollView>
                    }
                </KeyboardAvoidingView>

                <View style={[styles.row, styles.flexOne]}>

                </View>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}


function mapStateToProps (state) {
    return {
        token: commonSelectors.getToken(state),
        profile: commonSelectors.userDetails(state)

    }
}

function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
    }
}

const ResetPasswordScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ResetPassword);
export {ResetPasswordScreen};

