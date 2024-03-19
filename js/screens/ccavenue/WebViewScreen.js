import React from 'react';
import { Dimensions, Platform, Text, View, TouchableOpacity} from 'react-native';
import { connect } from "react-redux";
// Styles and Colors
import { styles } from "../../styles/styles"
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Icons
import MIcons from 'react-native-vector-icons/MaterialIcons';
// Libraries
import { WebView } from 'react-native-webview';
import { RSA } from 'react-native-rsa-native';
// Actions
import {strings} from "SmartgasConsumerApp/js/strings";
import {userDetailActions, apiDispatcher} from "SmartgasConsumerApp/js/actions";
import { showLogout } from "SmartgasConsumerApp/js/actions/commonActions";
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";


class WebViewComponent extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            amount: this.props.route.params.key,
            rsaKey: ""
        };
    }

    

    async componentDidMount (){

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {

                if (this.props.currentRoute !== 'WebView') {
                    this.props.setCurrentRoute('WebView');
                    // this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('WebView');
        // this.props.navigation.setOptions({ header : ()=> null, gestureEnabled: false });
        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <TouchableOpacity style={[styles.row,styles.allCenter,styles.paddingHorizontal16, {top: -20}]} onPress={() => this.props.navigation.goBack()}>
               <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter,styles.fontSize15,styles.paddingHorizontal6]}>
                    {strings[this.props.language].back}
                </Text>
            </TouchableOpacity>
        ), });
    }

    render(){
        const { language, darkMode,navigation,rsa,userDetails } = this.props;
        console.log("States and props in webview",this.state, this.props);
        // let key = this.props.rsa.rsa_key;
        const urlTest = `https://secure.ccavenue.com/transaction/initTrans?tid=${encodeURIComponent(rsa.tid)}&access_code=${encodeURIComponent(rsa.access_code)}&merchant_id=${encodeURIComponent(rsa.merchant_id)}&order_id=${encodeURIComponent(rsa.order_id)}&redirect_url=${encodeURIComponent(rsa.redirect_url)}&cancel_url=${encodeURIComponent(rsa.cancel_url)}&billing_name=${encodeURIComponent(userDetails.Name)}&billing_address=&billing_tel=${encodeURIComponent(userDetails.mobilenumber)}&billing_email=&billing_state=Bihar&billing_zip=&billing_country=India&merchant_param1=${encodeURIComponent(userDetails.CANumber)}&merchant_param2=${encodeURIComponent(rsa.tid)}&merchant_param3=&merchant_param4=&merchant_param5=&promo_code=&customer_identifier=&enc_val=${encodeURIComponent(this.props.route.params.key)}`;
        console.log("Test url", urlTest);

        // console.log("RSA test",key.substring(31,428));
        return(
            <View style={[styles.flexOne, styles.paddingTopHeaderHalf, darkMode ? styles.bgBlack : styles.bgIdk]}>
                {/* <Text>{urlTest}</Text> */}
                <WebView source={{ 
                        uri: `https://secure.ccavenue.com/transaction/initTrans?tid=${encodeURIComponent(rsa.tid)}&access_code=${encodeURIComponent(rsa.access_code)}&merchant_id=${encodeURIComponent(rsa.merchant_id)}&order_id=${encodeURIComponent(rsa.order_id)}&redirect_url=${encodeURIComponent(rsa.redirect_url)}&cancel_url=${encodeURIComponent(rsa.cancel_url)}&billing_name=${encodeURIComponent(userDetails.Name)}&billing_address=&billing_tel=${encodeURIComponent(userDetails.mobilenumber)}&billing_email=&billing_state=Bihar&billing_zip=&billing_country=India&merchant_param1=${encodeURIComponent(userDetails.CANumber)}&merchant_param2=${encodeURIComponent(rsa.tid)}&merchant_param3=&merchant_param4=&merchant_param5=&promo_code=&customer_identifier=&enc_val=${encodeURIComponent(this.props.route.params.key)}`,
                        // uri: `https://test.ccavenue.com/transaction/initTrans?access_code=${rsa.access_code}&merchant_id=${rsa.merchant_id}&order_id=${rsa.order_id}&redirect_url=${encodeURIComponent(rsa.redirect_url)}&cancel_url=${encodeURIComponent(rsa.cancel_url)}&enc_val=${encodeURIComponent(this.state.rsaKey)}`,
                        method:'POST'
                    }}
                    javaScriptEnabled
                    style={{ marginTop: 20, flex: 1 }} 
                    onMessage={event => event.nativeEvent.data == "Close" && this.props.navigation.goBack()}
                    onError={(e) => console.log(" Log Error Recharge", e)}
                    onHttpError={(e) => console.log("HTTP Error Recharge", e)}
                    renderError={(e) => console.log("Render Error Recharge", e)}
                />
                <TouchableOpacity
                    onPress={()=> this.props.navigation.goBack()}
                    style={[styles.paddingRegular, styles.paddingHorizontal20, styles.zIndex, {position: "absolute", bottom: 0}, styles.radius20,styles.bgGreen, styles.elevatePlus, styles.selfCenter, styles.marginVertical10]}>
                        <Text style={[styles.white,  styles.fontSize19, styles.centerVertical, styles.textAlignVertical]}>Close</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

function mapStateToProps (state) {
    return {
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),
        rsa: commonSelectors.rsa(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        showLogout: (state=true) => dispatch(showLogout(state)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
        setRsa: (data={}) => dispatch(userDetailActions.setRsa(data)),
    }
}
const WebViewScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(WebViewComponent);
export {WebViewScreen}

