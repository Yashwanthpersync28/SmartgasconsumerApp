import React from 'react';
import {View,Text,StyleSheet,Pressable} from 'react-native';
import Swiper from 'react-native-swiper';

// Component
import OnboardingScreens from './components/OnboardingScreens';
import {styles} from 'SmartgasConsumerApp/js/styles';
import Color from 'SmartgasConsumerApp/js/styles/Colors';

// Constants
import {ONBOARDING} from 'SmartgasConsumerApp/js/constants/lottie';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class Onboarding extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            next: "Next"
        }
    }

    componentDidMount(){
        this.props.navigation.setOptions({ header : ()=> null });
    }

    handleSwipeIndexChange = index => {
        this.setState({index:index})
        if(index==2){
            this.setState({next:'Done'})
        }
        else
            this.setState({next:'Next'})
    };

    next = () => {
        if(this.state.next=='Next')
            this.refs.swiper.scrollBy(1)
        if(this.state.next=='Done')
        this.props.navigation.replace("Login");
    }

    render(){
        return(
        <>
        <ErrorBoundaryMainComponent>
            <Swiper
                buttonWrapperStyle={styles.buttonWrapperStyle}
                nextButton={<Text style={styles.onboardingButton}>▶	</Text>}
                prevButton={<Text style={styles.onboardingButton}>◀</Text>}
                dotColor={Color.white}
                activeDotColor={Color.green}
                showsButtons={true}
                onIndexChanged={this.handleSwipeIndexChange}
                ref='swiper'
                loop={false}
            >
                <OnboardingScreens
                    Header1 = '01'
                    Header2 = "Know your"
                    Header3 = "CONSUMPTION"
                    Image = {ONBOARDING.statistics}
                    // Body = "Solving your issues prior to they turn into a problem, is a real luxury. Keep a track of your comsumptions on your finger tips."
                    Body = "Solving your issues before they turn into a problem, is a real luxury. Keep a track of your comsumptions on your finger tips."
                />
                <OnboardingScreens
                    Header1 = '02'
                    Header2 = "Pay your"
                    Header3 = "BILLS ONLINE"
                    Image = {ONBOARDING.gpay}
                    Body = "Avoid Penalty for late payments nomore, Prepaid or Post paid - Pay your bills on time!"
                />
                <OnboardingScreens
                    Header1 = '03'
                    Header2 = "Get Event"
                    Header3 = "NOTIFICATION"
                    Image = {ONBOARDING.notification}
                    Body = "Be Notified for Every Event - Let it be your Bill Generation and Consumption track"
                />
                {/* <OnboardingScreens
                    Header1 = '04'
                    Header2 = "Know your"
                    Header3 = "POWER QUALITY"
                    Image = {ONBOARDING.clipboard}
                    Body = "Keep a track on your Power Quality. Know your Voltage Spikes and Drops, and protect your Household Electronics."
                /> */}
            </Swiper>
            <View>
                <Pressable onPress = {() => this.props.navigation.replace('Login')} style={[styles.absolute, styles.paddingLeft24, { bottom: 10 }]}>
                    <Text style={[styles.padding10, styles.green, styles.fontSize25, styles.rajdhaniMedium]}>
                        Login
                    </Text>
                </Pressable>
                <Pressable onPress={() => this.next()} style={[styles.absolute, styles.paddingRight24, styles.right, { bottom: 10 }]}>
                  <Text style={[styles.padding10, styles.green, styles.fontSize25, styles.rajdhaniMedium]}>
                        {this.state.next}
                    </Text>
                </Pressable>
            </View>
            </ErrorBoundaryMainComponent>
        </>
        );
    }
}

export const OnboardingScreen = Onboarding;
