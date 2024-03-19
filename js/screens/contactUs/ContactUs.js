import React from 'react';
import { Pressable, Dimensions, Text, View, Linking, Platform } from 'react-native';
import { connect } from "react-redux";
import { styles } from '../../styles';
// Components
// Constants
import LottieView from 'lottie-react-native';
// Icons
import FIcons from 'react-native-vector-icons/FontAwesome';
// Library
import { CONTACTUS } from 'SmartgasConsumerApp/js/constants/lottie';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import { strings } from "SmartgasConsumerApp/js/strings";
import { apiDispatcher, userDetailActions } from "../../actions";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
import { SettingsCard } from '../../screens/settings/components/SettingCard';

const { height, width } = Dimensions.get('window');

class ContactUs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            TollFreeNumber: "Loading...",
            HelplineNumber: "Loading...",
            Email: "Loading..."
        };
    }

    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'ContactUs') {
                    this.props.setCurrentRoute('ContactUs');
                    this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('ContactUs');
    }

    openURL(url) {
        Linking.openURL(url)
    }

    openDailer(number) {
        if (Platform.OS === 'ios') {
            Linking.openURL('telprompt' + number)
        }
        else {
            Linking.openURL('tel:' + number);
        }
    }


    syncData = async () => {
        try {
            const baseRechargeDetailsUrl = 'https://cportalgasapi.esyasoft.com/api/Consumer/ContactUs';
            const msnParameter = "MNGL";
            const urlString = `${baseRechargeDetailsUrl}?name=${msnParameter}`
            const token = this.props.token;
            const headers = new Headers({
                Accept: 'application/json, text/plain, */*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            });

            const response = await fetch(urlString, {
                method: 'GET',
                headers: headers,
            });


            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            console.log('ContactUs Response:', response.status, data);


            this.setState({
                TollFreeNumber: data?.tollFreeNumber,
                HelplineNumber: data?.helplineNumber,
                Email: data?.email
            })

        } catch (error) {
            console.error('ContactUs API Error:', error);
        }
    }



    render() {
        const { language, darkMode } = this.props;

        return (
            <ErrorBoundaryMainComponent>
                      <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]}>

                    <View style={[styles.row, styles.paddingVertical4]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.medium22]}>
                            {`${strings[language].contactUs.getIn} `}
                        </Text>
                        <Text style={[styles.darkGreen, styles.medium22]}>
                            {strings[language].contactUs.touch}
                        </Text>
                    </View>
                    <View style={[styles.paddingBottom20]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                            {strings[language].contactUs.headerContext}
                        </Text>
                    </View>
                    {/* <View>

                    <Text>
                        Lottie
                    </Text>
                </View> */}



                    <LottieView style={[styles.flexOne, styles.selfCenter, styles.marginLeft16, { scaleX: 1.1, scaleY: 1.1, height: height }]} source={CONTACTUS.contactUs} autoPlay loop />

                    <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.flexOne, styles.radius16, styles.paddingHorizontal32, styles.paddingVertical10]}>
                        {/* <Pressable onPress={() => this.props.navigation.navigate('SendRequest')}
                            style={[styles.flexOne, styles.spaceAroundVertical]}>
                            <Text style={[darkMode ? styles.white : styles.lightGray, styles.medium, { fontWeight: '500' }]}>
                                Send Request
                            </Text>
                            <Text style={[styles.green, styles.regular]}>
                                Share your thought to Smartgas
                            </Text>
                            <View style={[styles.opacity25perc, { borderWidth: 0.5, borderColor: darkMode ? Colors.white : Colors.black }]} />
                        </Pressable> */}


                        <Pressable onPress={() => this.openDailer(this.state.TollFreeNumber)} style={[styles.flexOne, styles.spaceAroundVertical]}>
                            <Text style={[darkMode ? styles.white : styles.lightGray, styles.medium, { fontWeight: '500' }]}>
                                Toll Free Number
                            </Text>
                            <Text style={[styles.green, styles.regular]}>
                                {this.state?.TollFreeNumber}
                            </Text>
                            <View style={[styles.opacity25perc, { borderWidth: 0.5, borderColor: darkMode ? Colors.white : Colors.black }]} />
                        </Pressable>


                        <Pressable onPress={() => this.openDailer(this.state.HelplineNumber)} style={[styles.flexOne, styles.spaceAroundVertical]}>
                            <Text style={[darkMode ? styles.white : styles.lightGray, styles.medium, { fontWeight: '500' }]}>
                                Helpline Number
                            </Text>
                            <Text style={[styles.green, styles.regular]}>
                                {this.state?.HelplineNumber}
                            </Text>
                            <View style={[styles.opacity25perc, { borderWidth: 0.5, borderColor: darkMode ? Colors.white : Colors.black }]} />
                        </Pressable>

                        <Pressable
                            onPress={() => this.openURL(`mailto:${this.state.Email}`)}
                            style={[styles.flexOne, styles.spaceAroundVertical]}>
                            <Text style={[darkMode ? styles.white : styles.lightGray, styles.medium, { fontWeight: '500' }]}>
                                {strings[language].contactUs.emailId}
                            </Text>
                            <Text style={[styles.green, styles.regular]}>
                                {this.state?.Email}
                            </Text>
                            <View style={[styles.opacity25perc, { borderWidth: 0.5, borderColor: darkMode ? Colors.white : Colors.black }]} />
                        </Pressable>
                        {/* <Pressable 
                     onPress={()=> this.openURL('https://www.esyasoft.com')} 
                    style={[styles.flexOne, styles.spaceAroundVertical]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                            {strings[language].contactUs.website}
                        </Text>
                        <Text style={[styles.green, styles.regular]}>
                        {this.state.HelplineNumber}
                        </Text>
                    </Pressable> */}
                    </View>


                    <View style={[styles.flexQuarterToOne, styles.spaceEvenly, styles.paddingTop20]}>
                        <View style={[styles.row, styles.marginVertical10, styles.marginHorizontal36, styles.centerHorizontal]}>
                        <View style={[styles.opacity25perc, styles.flexOne, {borderWidth:0.6, borderColor: darkMode ? Colors.white : Colors.black}]}/>
                            <Text style={[styles.paddingHorizontal16, styles.green, styles.regular]}>
                                {"Send Request"}
                            </Text>
                        <View style={[styles.opacity25perc, styles.flexOne,{borderWidth:0.6, borderColor: darkMode ? Colors.white : Colors.black}]}/>
                    </View>
                    <View style={[styles.allCenter, styles.row, styles.paddingBottom20]}>
                        {/* <Pressable onPress={()=> this.openURL('https://www.facebook.com/hpsebl/')} style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.allCenter, styles.radius10, {width: 50, height: 50}]}>
                            <FIcons name={'facebook'} color={'#4267B2'} size={30}/>
                        </Pressable> */}
                        <Pressable onPress={()=> this.props.navigation.navigate('SendRequest')} style={[styles.marginLeft16, darkMode ? styles.bgLightGray : styles.bgWhite, styles.allCenter, styles.radius10, {width: 50, height: 50}]}>
                            <FIcons name={'telegram'} color={'#64AE64'} size={30}/>
                        </Pressable>
                    </View>
                    <View style={[styles.allCenter, styles.paddingBottom]}>
                        <Text style={[styles.opacity50perc, darkMode ? styles.white : styles.black, styles.small]}>
                            {`Send your request to Smartgas`}
                        </Text>
                    </View>

                    </View>
                  
                </View>

               
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps(state) {
    return {
        language: commonSelectors.language(state),
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),
        energyTips: commonSelectors.energyTips(state),
        currentRoute: commonSelectors.currentRoute(state),
        token: commonSelectors.getToken(state),
    }
}
function mapDispatchToProps(dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state = false) => dispatch(logout(state)),
        setEnergyTips: (data = {}) => dispatch(userDetailActions.setEnergyTips(data)),
        setCurrentRoute: (data = {}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const ContactUsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactUs);
export { ContactUsScreen }
