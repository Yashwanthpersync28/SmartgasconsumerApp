import React from 'react';
import { connect } from "react-redux";
import {
    Text,
    View,
    Pressable,
    Image,
    TouchableWithoutFeedback,
    TextInput,
    ActivityIndicator,
    Platform,
    Alert, Dimensions,KeyboardAvoidingView
} from 'react-native';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors  from 'SmartgasConsumerApp/js/styles/Colors';
// Icons
import MIcons from 'react-native-vector-icons/MaterialIcons';
import FIcons from 'react-native-vector-icons/Feather';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import {BodyText1} from "../../components/common";
import {commonApis, login} from "../../api";
import {apiDispatcher} from "../../actions";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
const {height, width} = Dimensions.get('window');

class ChangePassword extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            
        }
        this.currPassInput;
        this.newPassInput;
        this.conPassInput;
    }

    componentDidMount(){
        console.log("PRops",this.props);
        this.props.navigation.setOptions({ header : ()=> null })
    }

    focusOutAll = () => {
        this.currPassInput ? this.currPassInput.blur() : null;
        this.newPassInput ? this.newPassInput.blur() : null;
        this.conPassInput ? this.conPassInput.blur() : null;
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
                this.setState({error: 'Password must contain a lowercase character'})
            }
            //if (this.state.password.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/)) {
            if (this.state.password && this.state.password.match(/([A-Z])/)) {
                strength++;

            } else {
                this.setState({error: 'Password must contain an uppercase character'})

            }
            //If it has numbers and characters, increase strength value.
            // if (this.state.password.match(/([a-zA-Z])/) && this.state.password.match(/([0-9])/)) {
            if (this.state.password && this.state.password.match(/([0-9])/)) {
                strength++;

            } else {
                this.setState({error: 'Password must contain a number'})

            }
            //If it has one special character, increase strength value.
            if (this.state.password && this.state.password.match(/([!,%,&,@,#,$,^,*,?,_,~])/)) {
                strength++;

            } else {
                this.setState({error: 'Password must contain a special character'})

            }
            if (this.state.password && this.state.password.length > 7) {
                strength++;

            } else {
                this.setState({error: 'Password must contain at least 8 character'})

            }
            if (strength === 5) {
                this.setState({error: ''})

            }

        } else {

        }
    };

    // passwordMatch = (pass, newPass) => {
    //     if (pass === newPass && this.state.newPassword.length > 0 && this.state.confirmPassword.length > 0) {
    //         // strength++
    //         this.setState({error: ''})
    //     }else if(pass != newPass && this.state.confirmPassword != undefined){
    //         if(this.state.confirmPassword != undefined)
    //         this.setState({error: 'Password and Confirm Password did not match'})
    //     }
    // }

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

    resetPassword = async ()=> {
        this.setState({error:this.state.confirmPassword == this.state.newPassword ? '' : this.state.error})
        console.log('Error', this.state.error);
        if(this.state.error == '')
        this.setState({loading: true},async ()=> {
            try {
                let resp = await this.props.apiDispatcher(commonApis.changePasswordApi( this.state.password, this.state.newPassword, this.state.confirmPassword));
                console.log("login", resp);

                        Alert.alert(
                            'Congratulations',
                            'Your password has been reset successfully.',
                            [
                                {text: 'OK', onPress: () => this.props.navigation.goBack()}
                            ]
                        );
                this.setState({loading: false, password: "", confirmPassword: "", newPassword: ""})
            } catch (e) {
                console.log("resetPassWord", e)
                    if(e.status == 430){
                        
                        if(e.data.ErrorDescription == "OLDPASSWORD_NOT_MATCHED_INSYSTEM")
                        this.setState({error: 'Current Password not Matched', loading: false});
                        if(e.data.ErrorDescription == "NEWPASSWORD_CANNOT_BE_SAME_AS_OLDPASSWORD")
                        this.setState({error: 'New Password cannot be same as Current Password', loading: false});
                    }
                    else{
                        console.log('Errro',e);
                        this.setState({error: e.errorDescription == "'CONFIRM_NEW_PASSWORD' and 'NEW_PASSWORD' do not match." && "'Confirm New Password' and 'New Password' are not matching", loading: false});
                    }
            }
        })
    };

    render(){
        const {language, darkMode, profile} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <TouchableWithoutFeedback onPress={this.focusOutAll}>
                <KeyboardAvoidingView style={[styles.flexOne]} contentContainerStyle={{flex: 1}} behavior={Platform.OS === 'ios' ? 'position' : undefined} >               
                    <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingHorizontal24, styles.paddingTopHeaderHalf]} >
                        <Pressable style={[styles.row]} onPress={() => this.props.navigation.navigate('/settings')}>
                            <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                            <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter,styles.paddingHorizontal6]}>
                                {strings[this.props.language].back}
                            </Text>
                        </Pressable>
                        <View style={[styles.selfCenter, styles.centerHorizontal, styles.centerHorizontal, styles.zIndex, styles.elevate]}>
                            {profile.image?.img?
                                <Image style={{width: height/8, height: height/8, borderRadius:width/3 }} source={{uri: profile.image?.img}}/>                   :
                                <Image style={[styles.profileImage]} source={require('SmartgasConsumerApp/assets/images/Nazim.jpg')}/>
                            }
                        </View>
                        <View style={[ darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20, styles.marginVertical, styles.allCenter, styles.elevate, styles.padding12]}>
                            <View style={[ styles.allCenter]}>
                                <Text style={[darkMode ? styles.white : styles.black, profile?.fullName?.length > 50 ? styles.fontSize15 :  styles.medium, styles.textCenter]}>
                                    {profile.name}
                                </Text>
                                <Text style={[styles.green, styles.normal]}>
                                {strings[language].changePassword.caNo}: 
                                {` ${profile.consumerId}`}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.flexFour]}>
                            <View style={[styles.flexOne]}>
                                <View style={[styles.row, styles.paddingVertical6]}>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                                        {`${strings[language].changePassword.reset} `}
                                    </Text>
                                    <Text style={[styles.darkGreen, styles.fontSize17]}>
                                        {strings[language].changePassword.password}
                                    </Text>
                                </View>
                                <View>
                                    <Text style={[styles.normal, darkMode ? styles.white : styles.black, styles.lineHeight20]}>
                                    {strings[language].changePassword.headerContext}
                                    </Text>
                                </View>
                            </View>
                            <View style={[styles.flexTwo]}>
                                <View style={[styles.flexOne, styles.paddingVertical4]}>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.opacity65perc, this.state.lableCurrent ? styles.normal : styles.fontSize17]}>
                                        {strings[language].changePassword.currentPassword}
                                    </Text>
                                    <View style={[styles.paddingBottom, styles.flexOne]}>
                                        <View style={[styles.row]}>
                                            <TextInput
                                                value={this.state.password}
                                                style={[styles.flexOne, styles.regular,styles.justifyContentFlexStart, styles.paddingHorizontalZero, darkMode ? styles.white : styles.black, styles.paddingRegular]}
                                                ref={(input) => { this.currPassInput = input; }}
                                                onFocus={ () => this.setState({lableCurrent: true})}
                                                onBlur={ () => this.setState({lableCurrent: false})}
                                                maxLength={15}
                                                onChangeText={text=>{
                                                    text.length === 15 && this.currPassInput.blur();
                                                    this.setState({password: text})
                                                    if(this.state.error == "Current Password not Matched"){
                                                        this.setState({error: ""})
                                                    }
                                                }}
                                                secureTextEntry={!this.state.currentPassIcon}
                                                autoCorrect={false}
                                            />
                                            <Pressable onPress={()=> this.state.currentPassIcon ? this.setState({currentPassIcon: false}) : this.setState({currentPassIcon: true})}>
                                                <Text style={[styles.opacity50perc]}>
                                                    <FIcons name={this.state.currentPassIcon ? 'eye' : 'eye-off'} color={darkMode ? Colors.white : Colors.black} size={height/30}/>
                                                </Text>
                                            </Pressable>
                                        </View>
                                        <View style={{ borderBottomWidth: 1 , borderColor: Colors.green }}/>
                                    </View>
                                </View>
                                <View style={[styles.flexOne, styles.paddingVertical4]}>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.opacity65perc, this.state.lableNewPass ? styles.normal : styles.fontSize17]}>
                                        {strings[language].changePassword.newPassword}
                                    </Text>
                                        <View style={[styles.paddingBottom, styles.flexOne]}>
                                            <View style={[styles.row]}>                                    
                                                <TextInput
                                                    value={this.state.newPassword}
                                                    style={[styles.flexOne, styles.regular, styles.justifyContentFlexStart, styles.paddingHorizontalZero, darkMode ? styles.white : styles.black, styles.paddingRegular]}
                                                    ref={(input) => { this.newPassInput = input; }}
                                                    onFocus={ () => this.setState({lableNewPass: true})}
                                                    onBlur={ () => this.setState({lableNewPass: false})}
                                                    maxLength={15}
                                                    onChangeText={newPassword =>{
                                                        newPassword.length === 15 && this.newPassInput.blur();
                                                        this.setState({newPassword: newPassword}, this.checkNewPassword(newPassword, this.state.confirmPassword))
                                                    }}
                                                    secureTextEntry={!this.state.newPassIcon}
                                                    autoCorrect={false}
                                                />
                                            <Pressable onPress={()=> this.state.newPassIcon ? this.setState({newPassIcon: false}) : this.setState({newPassIcon: true})}>
                                                <Text style={[styles.opacity50perc]}>
                                                    <FIcons name={this.state.newPassIcon ? 'eye' : 'eye-off'} color={darkMode ? Colors.white : Colors.black} size={height/30}/>
                                                </Text>
                                            </Pressable>
                                        </View>
                                        <View style={{ borderBottomWidth: 1 , borderColor: Colors.green }}/>
                                    </View>
                                </View>
                                <View style={[styles.flexOne, styles.paddingVertical4]}>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.opacity65perc, this.state.lableConPass ? styles.normal : styles.fontSize17]}>
                                        {strings[language].changePassword.confirmPassword}
                                    </Text>
                                    <View style={[styles.paddingBottom, styles.flexOne]}>
                                        <View style={[styles.row]}>
                                            <TextInput
                                                value={this.state.confirmPassword}
                                                style={[styles.flexOne, styles.regular, styles.justifyContentFlexStart, styles.paddingHorizontalZero, darkMode ? styles.white : styles.black, styles.paddingRegular]}
                                                ref={(input) => { this.conPassInput = input; }}
                                                onFocus={ () => this.setState({lableConPass: true})}
                                                onBlur={ () => this.setState({lableConPass: false})}
                                                maxLength={15}
                                                // onChangeText={text =>{
                                                //     this.setState({confirmPassword: text},this.passwordMatch(text))
                                                // }}
                                                onChangeText={text => {
                                                    text.length === 15 && this.conPassInput.blur();
                                                    this.setState({confirmPassword: text},  ()=> {
                                                        if(text.length == 0 ){
                                                            this.setState({error: ""})
                                                        } 
                                                        else
                                                        this.checkNewPassword( this.state.newPassword, text)
                                                    },)
                                                }}
                                                secureTextEntry={!this.state.conPassIcon}
                                                autoCorrect={false}
                                            />
                                            <Pressable onPress={()=> this.state.conPassIcon ? this.setState({conPassIcon: false}) : this.setState({conPassIcon: true})}>
                                                <Text style={[styles.opacity50perc]}>
                                                    <FIcons name={this.state.conPassIcon ? 'eye' : 'eye-off'} color={darkMode ? Colors.white : Colors.black} size={height/30}/>
                                                </Text>
                                            </Pressable>
                                        </View>
                                        <View style={{ borderBottomWidth: 1 , borderColor: Colors.green }}/>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={[styles.flexOne, styles.allCenter, styles.marginVertical14]}>
                            <BodyText1 style={[styles.paddingBottom, styles.paleRed]}>
                                {this.state.error}
                            </BodyText1>
                            <Pressable
                                // disabled={this.state.password && this.state.newPassword && this.state.confirmPassword && !this.state.error ? false : true}
                                // onPress={this.resetPassword}
                                style={[styles.padding, styles.radius32, //this.state.password && this.state.newPassword && this.state.confirmPassword &&  !this.state.error ? 
                                styles.bgDarkGreen, 
                                // : styles.bgDarkGray, 
                                styles.allCenter]}>
                                {!this.state.loading ?
                                <Text style={[styles.regularPlus, styles.white, styles.paddingHorizontal30]}>
                                    {strings[language].changePassword.submit}
                                </Text> : 
                                <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                    <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
                                    <ActivityIndicator size={Platform.OS == "android" ? 24 : 28} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
                                </View>}
                            </Pressable>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        language: commonSelectors.language(state),
        profile: commonSelectors.profile(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
    }
}
const ChangePasswordScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ChangePassword);
export {ChangePasswordScreen}
