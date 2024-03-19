import React from 'react';
import { connect } from "react-redux";
import { Text, View, Pressable } from 'react-native';
// STYLES
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Constants
import { SETTINGUP } from 'SmartgasConsumerApp/js/constants/lottie';
// Component
import ExtendedLoader from '../../components/common/loader/ExtendedLoader'
// Library
import Modal from 'react-native-modal';
import LottieView from 'lottie-react-native';
// ICONS
import MIcons from 'react-native-vector-icons/MaterialIcons';
import AIcons from 'react-native-vector-icons/AntDesign';
// BACKEND
import {drawerApi} from "../../api/drawer/drawerApi";
import * as dashboard from "../../api/dashboard";
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {apiDispatcher, userDetailActions } from "SmartgasConsumerApp/js/actions";
import { strings } from "SmartgasConsumerApp/js/strings";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
let timer;
class Language extends React.Component{
    constructor(props) {
        super(props);
         this.state = {
            timer: null,
            counter: 7
         };
    }
    componentDidMount(){
        if(this.props.language=='english'){
            this.setState({language: 'অসমীয়া'});
        }
        else
            this.setState({language: 'English'})
        this.props.navigation.setOptions({ headerRight : ()=> null });  
    }
    componentWillUnmount() {
        clearInterval(this.state.timer);
      }

    tick = async () => {
        if(this.state.counter < 1) {
            clearInterval(timer);  
            this.setState({ counter: 7 })
        }  
        else{
            this.setState({counter: this.state.counter - 1})
        }
        console.log('Counter',this.state.counter);

        if(this.state.counter == 1){
            this.setState({language: strings[this.props.language].language.languageType})

            if(this.props.language=='english'){
                this.props.setLanguage("assamese")
                const changeLanguage = await this.props.apiDispatcher(dashboard.changeLanguageApi(this.props.userDetails.mobilenumber, 2));
                console.log('language Changed to ',changeLanguage);
                const drawer = await this.props.apiDispatcher(drawerApi(this.props.userDetails.roleid,2));
                this.props.setMenu(drawer.data);
            }
            else{
                const changeLanguage = await this.props.apiDispatcher(dashboard.changeLanguageApi(this.props.userDetails.mobilenumber, 1));
                console.log('language Changed to ',changeLanguage);
                const drawer = await this.props.apiDispatcher(drawerApi(this.props.userDetails.roleid,1));
                this.props.setMenu(drawer.data);
                this.props.setLanguage("english")
            }
        }
    }

    switch(){
        timer = setInterval(this.tick, 1000);
        this.setState({timer});
    }

    render(){
        
        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[{backgroundColor: darkMode ? Colors.black : '#F3ECEC'}, styles.flexOne]} >
                {this.props.navigation.setOptions({ headerLeft : () => (
                    <Pressable style={[styles.row, styles.allCenter, styles.paddingHorizontal20 ]} onPress={() => this.props.navigation.navigate('/settings')}>
                        <MIcons name="keyboard-arrow-left" color={darkMode? Colors.white: Colors.black} size={28}/>
                        {/* <Text style={[styles.palanquinRegular,darkMode? styles.white : styles.black ,styles.selfCenter,styles.fontSize15,styles.paddingHorizontal6,styles.paddingBottom2]}>{strings[language].language.back}</Text> */}
                        <Text style={[darkMode? styles.white : styles.black, styles.selfCenter, styles.fontSize15, styles.paddingHorizontal6]}>
                            {strings[language].back}
                        </Text>
                    </Pressable>
                ), })}

                <View style={[ styles.marginVertical, styles.paddingHorizontal24, styles.centerVertical, styles.paddingTopHeader]}>
                    <View style={[styles.row, styles.marginVertical2,]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                            {`${strings[language].language.change}  `} 
                        </Text>
                        <Text style={[styles.darkGreen, styles.medium]}>
                            {strings[language].language.language}
                        </Text>
                    </View>
                    <View style={[]} >
                        <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                            {strings[language].language.headerContext}
                        </Text>
                    </View>
                </View>
            
                { this.state.counter < 7 && this.state.counter > 0 ? 
                    <ExtendedLoader
                        counter={this.state.counter < 7 && this.state.counter > 0 ? this.state.counter : false}
                        message1={strings[language].language.message1}
                        message2={strings[language].language.message2}
                        message3={strings[language].language.message3}
                        message4={strings[language].language.message4}
                    />
                :
                    <View style={[styles.radius20, styles.allCenter, styles.paddingTop12Percent]}>
                        <View style={[styles.elevate6, styles.bgWhite, styles.radius20, styles.Margin10, styles.padding]}>
                            <Text style={[styles.padding, styles.fontSize19]}>
                                {strings[language].language.selectedLanguage}
                            </Text>
                            <View style={[styles.row, styles.allCenter]}>
                                <Text style={[styles.padding, styles.selfCenter, styles.fontSize19]}>
                                    {strings[language].language.languageType}
                                </Text>
                                <AIcons name="checkcircle" color={Colors.green} size={22}/>
                            </View>
                        </View>
                        <Pressable onPress={()=> this.switch()} style={[styles.elevate6, styles.bgGreen, styles.radius20, styles.Margin10, styles.padding]}>
                            <Text style={[styles.white, styles.padding, styles.fontSize19]}>
                                {strings[language].language.chooseLanguage}
                            </Text>
                            <Text style={[styles.white, styles.padding6, styles.selfCenter, styles.fontSize19]}>
                                {this.state.language}
                            </Text>
                        </Pressable>
                    </View>
                }
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),

    }
}

function mapDispatchToProps (dispatch) {
    return {
        setMenu: (data={}) => dispatch(userDetailActions.setMenu(data)),
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        setLanguage: (data={}) => dispatch(userDetailActions.setCurrentLanguage(data)),
    }
}

const LanguageScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Language);
export {LanguageScreen};