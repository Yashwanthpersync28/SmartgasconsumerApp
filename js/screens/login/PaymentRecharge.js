import React from 'react';
import { connect } from "react-redux";
import { View, Text, TextInput, TouchableWithoutFeedback, Platform, KeyboardAvoidingView, Pressable, ActivityIndicator, Dimensions, ScrollView } from 'react-native';
import {styles} from '../../styles';
import Colors from '../../styles/Colors';
// Components
import {Form3dBackgroundComponent} from "../../components/common/Form3dBackground";
import {BodyText1} from "../../components/common";
// Libraries
import LottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import { RSA } from 'react-native-rsa-native';
// Icons
import FIcon from 'react-native-vector-icons/FontAwesome';
import FIcons from 'react-native-vector-icons/Feather';
// Constants
import { REGISTER } from 'SmartgasConsumerApp/js/constants/lottie';
// Backend
import {apiDispatcher} from "SmartgasConsumerApp/js/actions";
import * as login from "../../api/login";
import * as commonSelectors from "../../selectors/common";
// import { getRsaApi } from "../../api/dashboard/getRsaApi";
import {verifyOtpTypes} from "../../constants";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
import { userDetailActions } from '../../actions';
import { setRsa } from '../../actions/userDetailsActions';
import { CANumberValidation } from '../../helpers/common/userInputValidations';

import DeviceInfo from  "react-native-device-info";


const {height, width} = Dimensions.get('window');

class PaymentRecharge extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            // next: "Next"
            getBalance: false,
            email: "",
            mobile: "",
            name: "",
            balance: "",
            rechargeAmount: "",
            consumerNumber: __DEV__ ?  "233206271602" : "",
            amount: "",
        }
    }


     componentDidMount = async () => {
        this.props.navigation.setOptions({ header : ()=> null, gestureEnabled: false });

        await DeviceInfo.getIpAddress().then((ip) => {
            console.log("IP Address", ip);
            this.setState({ipAddress: ip})
        });

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'PaymentRecharge') {
                    this.props.setCurrentRoute('PaymentRecharge');
                    // this.syncData()
                }

                

                if (this.props.currentRoute == 'WebView') {
                    this.setState({rechargeAmount: ""})
                    this.getRechargeDetails()
                    // this.props.setCurrentRoute('CcAvenue');
                    // this.syncData()
                }
            }
        )
    }

    // Get Recharge Details by Consumer ID
    getRechargeDetails = async () => {
        if (!this.props.showAlert)
        {
            this.setState({loading: true}, async () => {
                let resp;
                try {
                    resp = await this.props.apiDispatcher(login.checkBalanceApi(this.state.consumerNumber));
                    console.log("Get Consumer Deatils", resp);
                    const { consumer_email, consumer_mobile, consumer_name, current_balance } = resp.data
                    this.setState({loading: false, error: '', getBalance: true, email: consumer_email, mobile: consumer_mobile, name: consumer_name, balance: current_balance });
                    // this.props.navigation.navigate('Otp',{ screen: 'Register',  mobileNumber: resp.data.MobileNumber, LoginID: this.state.consumerNumber })
                } catch (e) {
                    console.log("Get Consumer screen",e, "ERRRO",e.data.ErrorDescription);
                    if(e.status == 440)
                        this.setState({loading: false,notValidUser: "Consumer ID is not Linked with SBPDCL. The Application is only for those consumers who have installed smart meter in their premises.", loading: false})
                }
            })
        } else {
            alert("No internet connectivity detected. Please check your Network Settings and try again.")
        }
    };

    // Get RSA Key and redirect to CCAvenue Payment Page
    recharge = async () => {
        // try {
        //     let rsa = await this.props.apiDispatcher(getRsaApi(parseFloat(this.state.rechargeAmount).toFixed(2),this.state.consumerNumber, this.state.ipAddress))
        //     this.props.setRsa(rsa.data)
        //     setRsa(rsa.data)
        //     console.log("RSA Screen Reponse", rsa,rsa.data.rsa_key);
        //     if(rsa.status === 200){
        //         this.props.setRsa(rsa.data)
        //         setRsa(rsa.data)
        //         let text = `&amount=${parseFloat(this.state.rechargeAmount).toFixed(2)}&currency=${rsa.data.currency}`
        //         this.encrypt(Platform.OS == "ios" ? rsa.data.rsa_key : rsa.data.rsa_key_android, text)
        //     }
        // } catch (e) {
        //     console.log("RSA Error",e);
        // }
    }

    encrypt = (key, text) =>{
        console.log("asdfsdf", text, key);
        RSA.encrypt(text, key)
        .then(encodedMessage => {
            console.log(`RSA Encoded String ${encodedMessage}`);
            this.props.navigation.navigate('WebViewScreen',{key: encodedMessage})
        }); 
    }

    render(){
        const { darkMode } = this.props;
        const TextComponent = ({title, value}) => {
            return(
                <View style={[styles.paddingHorizontal20, styles.marginVertical]}>
                    <View style={[{ backgroundColor:  'transparent' }, styles.spaceBetweenVertical, styles.paddingHorizontal, styles.radius16, styles.centerVertical]}>
                        <Text style={[{color: '#b8b1b0'}, styles.normal]}>
                            {title}
                        </Text>
                        <Text style={[styles.fontSize15, styles.white, styles.paddingRegular]}>
                            {value}
                        </Text>
                    </View>
                </View>
            )
        }

        return(
            <ErrorBoundaryMainComponent>
            <TouchableWithoutFeedback onPress={this.focusOutAll}>
                <KeyboardAvoidingView style={[styles.flexOne]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>     
                          
                    <ScrollView style={[ {height: height}, styles.paddingHorizontal40, darkMode ? styles.bgBlack : styles.bgIdk]}>
                        <View style={[styles.flexQuarterToOne, styles.allCenter, styles.paddingTop6Percent]}>
                            <Pressable onPress={()=> this.state.getBalance ? this.setState({getBalance: false}) : this.props.navigation.navigate('Login')} style={[styles.bgDarkGreen, styles.mediumImage, styles.allCenter]}>
                                <Text>
                                    <FIcon name="remove" size={35} color="#fff" />
                                </Text>
                            </Pressable>
                        </View>
                        <KeyboardAvoidingView style={[styles.flexOne]} behavior={Platform.OS === 'ios' ? 'position' : undefined}>               
                            <View style={[{paddingTop: height/(this.state.getBalance ? 12 : 6)}]}>
                                <Form3dBackgroundComponent/>
                                <View style={[  styles.extraRadius, styles.bgDarkGray, styles.paddingVertical16]}>
                                    <View style={[styles.marginTop10, styles.row, {paddingLeft: width/12}, styles.centerHorizontal]}>
                                        <Text style={[styles.fontSize25, styles.palanquinRegular, styles.white]}>
                                            {'Consumer '}
                                        </Text>
                                        <Text style={[styles.fontSize25, styles.palanquinRegular, styles.darkGreen]}>
                                            {this.state.getBalance ? "Details" : "ID"}
                                        </Text>
                                    </View>
                                    { !this.state.getBalance ?
                                        <View style={[styles.paddingHorizontal20, styles.marginTop10]}>
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
                                                    onChangeText={text=>{   
                                                        const data = CANumberValidation(text);
                                                        this.setState({ error: data.error, consumerNumber: data.CANumber })                                          
                                                        text.length === 13 && this.consumerNumberInput.blur();
                                                    }}
                                                />
                                            </View>
                                        </View> : 
                                        <View>
                                            <TextComponent title={'Consumer ID'} value={this.state.consumerNumber}/>
                                            <TextComponent title={'Email'} value={this.state.email}/>
                                            <TextComponent title={'Name'} value={this.state.name}/>
                                            <TextComponent title={'Mobile'} value={this.state.mobile}/>
                                            <TextComponent title={'Current Balance'} value={this.state.balance}/>
                                            <View style={[{ backgroundColor: this.state.lableCNo ? Colors.bluewhite : 'transparent' }, styles.spaceBetweenVertical, styles.marginHorizontal16, styles.padding10, styles.radius16, styles.centerVertical]}>
                                                <Text style={[{color: '#b8b1b0'}, this.state.lableCNo || this.state.consumerNumber ? styles.small : styles.normal]}>
                                                    Recharge Amount 
                                                </Text>
                                                <TextInput
                                                    value={this.state.rechargeAmount.toString()}
                                                    style={[styles.medium, { justifyContent:"flex-start", paddingHorizontal: 0, borderColor: Colors.green, borderBottomWidth: this.state.consumerNumber && !this.state.lableCNo ? null : 0.7},styles.white,styles.paddingRegular]}
                                                    ref={(input) => { this.consumerNumberInput = input; }}
                                                    onFocus={ () => this.setState({lableCNo: true})}
                                                    onBlur={ () => this.setState({lableCNo: false})}
                                                    // focusable={true}
                                                    autoFocus
                                                    // maxLength={6}
                                                    onChangeText={text=>{
                                                        var reg = /^\d+$/;
                                                        if(text.match(reg) || text.length == 0){
                                                            if(text > 1000000) {
                                                                this.setState({ error: "Recharge amount cannot exceed more then 10 lakh" })
                                                                setTimeout(() => {
                                                                    this.setState({ error: "" })
                                                                }, 3000);
                                                            } else {
                                                                this.setState({rechargeAmount: text, error: "" })
                                                            }
                                                        } 
                                                    }}
                                                />
                                            </View>
                                        </View>
                                    }
                                </View>
                            </View>
                        </KeyboardAvoidingView>

                        <View style={[styles.flexQuarterToOne]}>
                            <View style={[styles.flexTwo, styles.allCenter]}>
                                <View style={[styles.flexOne, styles.allCenter]}>
                                    <BodyText1 style={[styles.paddingVertical, styles.paleRed, styles.textCenter]}>
                                        {this.state.error}
                                    </BodyText1>
                                    <Pressable
                                        onPress={this.state.getBalance ? this.recharge : this.getRechargeDetails }
                                        disabled = {this.state.getBalance ? 
                                                (!this.state.error && this.state.rechargeAmount > 9 ) ? false : true 
                                            : this.state.consumerNumber != "" && !this.state.error ? false : true}
                                        style={[
                                            styles.padding6, styles.bgDarkGreen, styles.extraRadius,
                                            !this.state.getBalance ? 
                                                (this.state.consumerNumber != "" && !this.state.error) ? 
                                                    styles.bgDarkGreen : styles.bgDarkGray : (!this.state.error && this.state.rechargeAmount > 9 ) != 0 ? styles.bgDarkGreen : styles.bgDarkGray
                                        ]}
                                    >
                                        {this.state.loading? 
                                         <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                            <Text style={[styles.white, styles.medium]}>Loading</Text>
                                            <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
                                        </View> :
                                        <Text style={[styles.white, styles.medium, styles.paddingVertical6, styles.paddingVertical6, styles.paddingHorizontal30]}>
                                            { this.state.getBalance ? 'Recharge' : 'Next'}
                                        </Text> }
                                    </Pressable>
                                </View>
                            </View>
                            <View style={[styles.flexHalf, styles.row, styles.allCenter, styles.paddingVertical20]}>
                                <Pressable onPress={()=>this.props.navigation.navigate('Login')}>
                                    <Text style={[styles.green,styles.fontSize17]}>
                                        Sign In
                                    </Text>
                                </Pressable>
                            </View>
                        </View>
                        <Modal isVisible={this.state.notValidUser ? true : false} animationInTiming={1000} style={[styles.marginHorizontal24,{paddingRight:20}]}>
                            <Pressable onPress={()=> this.setState({ notValidUser: '' })} style={[{top:20, right:-20},styles.zIndex, styles.icon40, styles.right, styles.bgMediumGray , styles.allCenter]}>
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
        currentRoute: commonSelectors.currentRoute(state),
    }
}

function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        setRsa: (data={}) => dispatch(userDetailActions.setRsa(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}

const PaymentRechargeScreen= connect(
    mapStateToProps,
    mapDispatchToProps
)(PaymentRecharge);
export {PaymentRechargeScreen}