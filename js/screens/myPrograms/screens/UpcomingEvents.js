import React from 'react';
import { connect } from "react-redux";
import {Text, View, StatusBar, Pressable, ScrollView, Dimensions, Image, RefreshControl} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'

import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Components
import CircleTickComponent from 'SmartgasConsumerApp/js/components/common/circleTick/CircleTick'
import DeleteComponent from  '../components/DeleteComponent'
import EpisodeInformationComponent from '../components/EpisodeInformation'
// Icons
import FIcons from 'react-native-vector-icons/Feather';
import MIcons from 'react-native-vector-icons/MaterialIcons';
// Libraries
import Modal from 'react-native-modal';
// Backend
import {strings} from "SmartgasConsumerApp/js/strings";
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import * as dashboard from "../../../api/dashboard";
import {apiDispatcher, userDetailActions} from "../../../actions";
import { ErrorBoundaryMainComponent } from '../../../components/errorBoundary/ErrorBoundaryComponent';

const {height, width} = Dimensions.get('window');

class UpcomingEvents extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            // noInterest:true,
            description: this.props.route.params.description
        }
    }
    
    async componentDidMount(): void {
        // this.syncData()
        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <TouchableOpacity style={[styles.row,styles.allCenter,styles.paddingHorizontal20]} onPress={() => this.props.navigation.goBack()}>
               <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter,styles.fontSize15,styles.paddingHorizontal6]}>
                    {strings[this.props.language].back}
                </Text>
            </TouchableOpacity>
        ), });

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'UpcomingEvents') {
                    this.props.setCurrentRoute('UpcomingEvents');
                }
            }
        );
    }

    // syncData = async () => {
    //     try {
    //         console.log("SYNC")
    //         let data = await this.props.apiDispatcher(dashboard.myProgramsApi())
    //         console.log("My Programs API",data.data);
    //         this.props.setMyPrograms(data.data);
    //     } catch (e) {
    //         this.setState({refreshing: false})
    //     }
    // }
    // onRefresh = () => {
    //     this.setState({refreshing: true});
    //     this.syncData()

    // };

    // componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
    //     if(this.props.myPrograms !== prevProps.myPrograms){
    //         let data =this.props.myPrograms ? JSON.parse(JSON.stringify(this.props.myPrograms)) : [];
    //         console.log('DID update',data, this.props.myPrograms)

    //         this.setState({
    //             past: data.past,
    //             upcoming: data.upcoming,
    //             refreshing: false
    //         }, ()=>console.log('My Program States',this.state))
    //     }

    //     if(this.props.activeCount !== prevProps.activeCount) {
    //         this.syncData();
    //     }
    // }

    // renderItem = ({item, index}) => {
    //     return (
           
    //         <View style={[]}>
    //             <EventsComponent eventName={item.eventName}  savings= {item.savings} date={item.date} darkMode={this.props.darkMode}/>
    //         </View>
    //     );
    // }

    showInterest = async () => {
        console.log('Show interest');
        let data = await this.props.apiDispatcher(dashboard.eventEnrollmentApi(this.props.route.params.id,'true',1))
        console.log("Event Enrolment Subscribed API",data.data);
        // this.props.setMyPrograms(data.data);
        this.setState( {showInterest: true} )
    }

    noInterest = async () => {
        console.log('No interest');
        let data = await this.props.apiDispatcher(dashboard.eventEnrollmentApi(this.props.route.params.id,'false',0))
        console.log("Event Enrolment Unsbuscribed API",data.data);
        this.setState( {noInterest: true} )
    }

    render(){
        const { language, darkMode } = this.props;
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
                            {strings[language].myPrograms.thirdScreenHeaderContext}
                        </Text>
                    </View>
                    <View style={[ styles.padding12, styles.radius16,{height: width} ]}>
                        <Image style={[styles.flexOne, styles.radius16]} resizeMode={'stretch'} source={{uri: this.state.description.image}}/> 

                            {/* Image {this.state.description.image} */}
                    </View>
                    <View style={[styles.padding12, styles.row]}>
                        <Text style={[styles.regularPlus, darkMode ? styles.white : styles.black]}>
                            {`${strings[language].myPrograms.episode}  `} 
                        </Text>
                        <Text style={[styles.regularPlus, styles.green]}>
                            {`${strings[language].myPrograms.information}  `} 
                        </Text>
                    </View>
                    <View style={[styles.paddingBottom20]}>
                        <EpisodeInformationComponent description={this.state.description} language={language} darkMode={darkMode} type={'upcoming'}/>
                    </View>
                    <Pressable onPress={()=> this.props.route.params.type != "showInterest" ? this.showInterest() : this.noInterest()} style={[styles.padding, styles.bgDarkGreen, styles.selfCenter, styles.radius16, styles.paddingHorizontal20, styles.marginBottom5Percent]}>
                        <Text style={[styles.regularPlus, styles.white]}>
                            {this.props.route.params.type != "showInterest" ? strings[language].checkPrograms.showInterest : strings[language].myPrograms.noMoreInterest}
                        </Text>
                    </Pressable>
                    {/* POPUP Modal Show Interest*/}
                    <Modal isVisible={this.state.showInterest} animationInTiming={1000} style={[styles.marginHorizontal24,{paddingRight:20}]}>
                        <Pressable onPress={()=> this.setState({ showInterest: false })} style={[{top:20,right:-20},styles.zIndex, styles.icon40, styles.right, styles.bgMediumGray , styles.allCenter]}>
                            <FIcons name={'x'} size={20} color={Colors.white}/>
                        </Pressable>
                        <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20, styles.padding, styles.paddingVertical20, styles.allCenter]}>
                            <View style={[styles.paddingVertical24]}>
                                <CircleTickComponent size={100} darkMode={darkMode}/>
                            </View>
                            <View style={[styles.allCenter, styles.paddingVertical20]}>
                                <Text style={[styles.regularPlus, darkMode ? styles.white : styles.black]}>
                                    {strings[language].checkPrograms.thankYouForShowingthe}
                                </Text>
                                <Text style={[styles.darkGreen, styles.regularPlus]}>
                                    {strings[language].checkPrograms.interest}
                                </Text>
                            </View>
                        </View>
                    </Modal>
                    {/* POPUP Modal No Interest*/}
                    {/* this.state.noInterest */}
                    <Modal isVisible={this.state.noInterest} animationInTiming={1500} style={[styles.marginHorizontal24,{paddingRight:20}]}>
                        <Pressable onPress={()=> this.setState({ noInterest: false })} style={[{top:20,right:-20},styles.zIndex, styles.icon40, styles.right, styles.bgMediumGray , styles.allCenter]}>
                            <FIcons name={'x'} size={20} color={Colors.white}/>
                        </Pressable>
                        <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20, styles.padding, styles.paddingVertical20]}>
                            <View style={[styles.allCenter]}>
                                <View style={[styles.paddingVertical24, styles.marginVertical]}>
                                    <DeleteComponent size={90} darkMode={darkMode}/>
                                </View>
                                <View style={[styles.allCenter, styles.paddingVertical20]}>
                                    <View style={[styles.row]}>
                                        <Text style={[styles.regularPlus, darkMode ? styles.white : styles.black]}>
                                            {strings[language].youHave}
                                        </Text>
                                        <Text style={[styles.darkGreen, styles.regularPlus]}>
                                            {` ${strings[language].myPrograms.succesfully} `}
                                        </Text>
                                        <Text style={[styles.regularPlus, darkMode ? styles.white : styles.black]}>
                                            {strings[language].myPrograms.been}
                                        </Text>
                                    </View>
                                    <View style={[styles.row]}>
                                        <Text style={[styles.darkGreen, styles.regularPlus]}>
                                            {strings[language].myPrograms.unSubuscribed}
                                        </Text>
                                        <Text style={[styles.regularPlus, darkMode ? styles.white : styles.black]}>
                                            {` ${strings[language].myPrograms.fromTheEvent}`}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </Modal>
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
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        setMyPrograms: (data={}) => dispatch(userDetailActions.setMyPrograms(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const UpcomingEventsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(UpcomingEvents);
export {UpcomingEventsScreen}
