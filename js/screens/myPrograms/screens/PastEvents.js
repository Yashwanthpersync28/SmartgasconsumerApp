import React from 'react';
import { connect } from "react-redux";
import {Text, View, StatusBar, ScrollView, Dimensions, RefreshControl, TouchableOpacity} from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Components
import CircleTickComponent from 'SmartgasConsumerApp/js/components/common/circleTick/CircleTick'
// Icons
import MIcons from 'react-native-vector-icons/MaterialIcons';
// Component
import EpisodeInformationComponent from 'SmartgasConsumerApp/js/screens/myPrograms/components/EpisodeInformation'
// Backend
import {strings} from "SmartgasConsumerApp/js/strings";
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {apiDispatcher, userDetailActions} from "../../../actions";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';


const {height, width} = Dimensions.get('window');

class PastEvents extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            description: this.props.route.params.description
        }
    }
    
    async componentDidMount(): void {
        // this.syncData()
        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <TouchableOpacity style={[styles.row,styles.allCenter,styles.paddingHorizontal24]} onPress={() => this.props.navigation.goBack()}>
               <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter,styles.fontSize15,styles.paddingHorizontal6]}>
                    {strings[this.props.language].back}
                </Text>
            </TouchableOpacity>
        ), });

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'PastEvents') {
                    this.props.setCurrentRoute('PastEvents');
                }
            }
        );
    }

    syncData = async () => {
        try {
            this.setState({refreshing: false})
           
        } catch (e) {
            this.setState({refreshing: false})
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()

    };

    render(){
        const {language, darkMode } = this.props;
        console.log('Props', this.props.route);
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal16]} >
                { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}
                >
                    <View style={[ styles.paddingHorizontal10]}>
                        <View style={[styles.marginVertical]}>
                            <Text style={[styles.green,  styles.medium]}>
                                {this.props.route.params.eventName}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.paddingBottom4, styles.paddingHorizontal10]} >
                        <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                            {strings[language].myPrograms.secondScreenHeaderContext}
                        </Text>
                    </View>
                        <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.flexOne, styles.padding20, styles.extraMarginVertical, styles.marginHorizontal10, styles.elevate2]}>
                        <View style={[styles.flexOne, styles.allCenter]}>
                            <Text style={[styles.darkGreen, styles.medium22, styles.paddingVertical10]}>
                                {strings[language].myPrograms.congratulations} !
                            </Text>
                        </View>
                        <View style={[styles.flexOne, styles.allCenter, styles.paddingVertical10]}>
                            <CircleTickComponent size={65} darkMode={darkMode}/>
                        </View>
                        <View style={[styles.paddingVertical12]}>
                            <View style={[styles.flexOne, styles.allCenter, styles.paddingHorizontal20, styles.paddingVertical2, styles.row]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                    {`${strings[language].myPrograms.youHaveSavedSuccessfully} `}
                                </Text>
                                <Text style={[styles.green]}>
                                    {this.state.description.mySaving}
                                </Text>
                            </View>
                            <View style={[styles.flexOne, styles.allCenter, styles.paddingHorizontal20, styles.paddingVertical2, styles.row]}>
                                <Text style={[styles.green, styles.normal]}>
                                    {'INR '}
                                </Text>
                                <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                    {strings[language].myPrograms.withThe}
                                </Text>
                                <Text style={[styles.green, styles.normal]}>
                                    {` ${this.state.description.programCategory} `}
                                </Text>
                                <Text style={[darkMode ? styles.white : styles.black, styles.normal]}>
                                    {strings[language].myPrograms.event}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.flexHalf, styles.allCenter, styles.paddingTop10,{ borderTopWidth: 0.8, borderColor: Colors.darkGreen }]}>
                            <Text style={[styles.small, styles.opacity65perc, darkMode ? styles.white : styles.black]}>
                                {strings[language].myPrograms.visit} APDCL.com/inst. {strings[language].myPrograms.forMoreOffers}
                            </Text>
                        </View>
                    </View> 
                    <View style={[styles.paddingBottom20]}>
                        <EpisodeInformationComponent description={this.state.description} darkMode={darkMode} language={language} type={'past'}/>
                    </View>
                </ScrollView>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const PastEventsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PastEvents);
export {PastEventsScreen}
