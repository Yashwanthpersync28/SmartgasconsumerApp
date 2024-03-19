import React from 'react';
import { FlatList, Dimensions, Text, View, ScrollView, RefreshControl, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
import { styles } from 'SmartgasConsumerApp/js/styles';
// Components
import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound';
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
// Library
import LottieView from 'lottie-react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import { ENERGY_TIPS } from 'SmartgasConsumerApp/js/constants/lottie';
  // Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import {strings} from "SmartgasConsumerApp/js/strings";
import {apiDispatcher, userDetailActions} from "../../actions";
import * as dashboard from "../../api/dashboard";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

const {height, width} = Dimensions.get('window');

class EnergyTips extends React.Component{

    constructor(props){
        super(props);
        this.state = {

        };
    }

    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'EnergyTips') {
                    this.props.setCurrentRoute('EnergyTips');
                    this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('EnergyTips');
    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        console.log('Component Updated', this.props.energyTips, 'Prevoius', prevProps.energyTips, );
        if(this.props.energyTips !== prevProps.energyTips) {
            let data = await this.props.energyTips ? JSON.parse(JSON.stringify(this.props.energyTips)) : [];
            console.log("check",data,this.props, this.props.energyTips);
            if (this.props.energyTips) {
                this.setState({
                    tips: data,
                    refreshing: false
                }, () => console.log(this.state))
            } else {
                // alert('energy tips', this.props.energyTips,this.props);
                this.syncData();
            }
        } else {
            console.log(true, this.props.energyTips);
        }

        // if(!this.state.tips){
        //     this.setState({
        //         tips: this.props.energyTips,
        //         refreshing: false
        //     }, () => console.log(this.state))
        // } else {
        //     this.syncData();
        // }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        // alert(`${this.props.energyTips}`)
        try {
            let data = await this.props.apiDispatcher(dashboard.energyTipsApi(this.props.language == 'english' ? 1 : 2 ))
            console.log("energyTips",data.data);
            if(data.status == 200) {
                this.props.setEnergyTips(data.data);
                this.setState({ noData: false})
                // alert(200)
            } else if(data.status == 204){
                this.setState({ noData: true })
                alert('Data not foound 204')

            }
            this.setState({refreshing: false})
        } catch (e) {
            console.log('EnergyTips 204',e);
            alert(`${e}energytipserror`)
            this.setState({refreshing: false})
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()

    };


    _renderItem = ({item, index}) => {
        const {language, darkMode} = this.props;
        console.log("energytipssumit",item);

        return (
            <View style={[styles.bgLightGray, styles.flexOne, styles.radius16, styles.padding20, styles.spaceBetween, {height:height/3.2}]}>
            <View style={[styles.alignLeft]}>
                <Text style={[styles.green, styles.medium22]}>
                    {`${strings[language].energyTips.tip} ${index+1}`}
                </Text>
            </View>
            <View style={[styles.flexOne]}>
                <View style={[styles.flexOne,styles.allCenter]}>
                    <LottieView style={[{width: 100, height: 100}]} source={ENERGY_TIPS.tip1} autoPlay loop />
                </View>
                <View style={[styles.row, styles.paddingVertical4]}>
                    <Text style={[styles.white, styles.normal]}>
                        {/* {`${item.title} `} */}
                    </Text>
                    <Text style={[styles.green, styles.normal]}>
                        {item.tips}
                    </Text>
                </View>
                <Text style={[styles.white, styles.small, styles.opacity50perc, styles.lineHeight16]}>
                    {item.body}
                </Text>
            </View>
        </View>
        );
    }

    renderItem = ({item, index}) => {
        return (
           
            <View style={[]}>
                 <View style={[styles.paddingTop10, styles.paddingVertical6]}>
                    <View style={[{borderWidth:0.7},styles.opacity25perc,this.props.darkMode ?{borderColor:Colors.white} : {borderColor:Colors.black}]}>

                    </View>
                </View>
                <Text style={[styles.flexOne, styles.normal, this.props.darkMode ? styles.white : styles.black, styles.paddingVertical4]}>
                {`${index+1}. ${item.tips} `}
 
                    {/* { item.tips } */}
                </Text>
                <Text style={[styles.flexOne, styles.normal, this.props.darkMode ? styles.white : styles.black, styles.opacity50perc]}>
                    { item.description }
                </Text>
                {/* { index!=3 ? */}
                   
                {/* : null } */}
            </View>
        );
    }

    get pagination () {
        const { activeSlide } = this.state;
        return (
            <Pagination
              dotsLength={this.state.tips.length}
              activeDotIndex={activeSlide}
              containerStyle={{ backgroundColor: 'transparent', top: -20, marginBottom:-40 }}
              dotStyle={{
                  width: 25,
                  height: 10,
                  borderRadius: 5,
                  marginHorizontal: -5,
                  backgroundColor: '#8A8A98'
              }}              
              inactiveDotStyle={{
                width: 16,
                height: 16,
                marginHorizontal: -20,
                borderRadius: 8,
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
        );
    }

    render(){
        const {language, darkMode} = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal20]}>
                <ScrollView
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                    showsVerticalScrollIndicator={false}
                >
                    {this.state.noData ?
                        <View style={[ styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
                            <DataNotFound darkMode={darkMode}/> 
                        </View>
                    :
                    <>
                    {/* this.state.tips */}
                        {this.state.tips ?
                            <>
                            <View style={[styles.row, styles.paddingVertical4]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                    {`${strings[language].energyTips.energy}  `}
                                </Text>
                                <Text style={[styles.darkGreen, styles.medium]}>
                                    {strings[language].energyTips.savingsTips}
                                </Text>
                            </View>
                            <View>
                                <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                    {strings[language].energyTips.headerContext}
                                </Text>
                            </View>
                            <View style={[styles.flexOne, styles.paddingTop20]}>
                                <View style={[styles.flexOne, styles.allCenter]}>
                                    <Carousel layout = {'stack'} 
                                        layoutCardOffset={`10`}
                                        ref={(c) => { this._carousel = c; }}
                                        data={this.state.tips}
                                        renderItem={this._renderItem}
                                        sliderWidth={width}
                                        itemWidth={width/1.7}
                                        inactiveSlideOpacity={0.8}
                                        onSnapToItem={(index) => this.setState({ activeSlide: index }) }
                                        layoutCardOffset={15}
                                    />
                                    { this.pagination }
                                </View>
                            </View>
                            <View style={[styles.paddingVertical10, styles.paddingBottom32]}>
                                <View style={[styles.row, styles.marginVertical4]}>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.regularPlus]}>
                                        {`${strings[language].energyTips.saving}  `}
                                    </Text>
                                    <Text style={[styles.darkGreen, styles.regularPlus]}>
                                        {strings[language].energyTips.guidelines}
                                    </Text>
                                </View>
                                <FlatList
                                    style={[styles.flexOne]}
                                    data={this.state.tips}
                                    renderItem={this.renderItem}
                                    numColumns={1}
                                    initialNumToRender={10}
                                    ref={ref => this.listView = ref}
                                    keyExtractor={(item, index) => item.id + index}
                                />
                            </View>
                            </>
                            :  <View style={[styles.flexOne, styles.allCenter]}>
                                    <View style={[ styles.allCenter, styles.height50Points]}>
                                        <LoaderComponent/>
                                    </View>
                                </View> 
                            }
                    </>}
                </ScrollView>  
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        language: commonSelectors.language(state),
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),
        energyTips: commonSelectors.energyTips(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setEnergyTips: (data={}) => dispatch(userDetailActions.setEnergyTips(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const EnergyTipsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(EnergyTips);
export {EnergyTipsScreen}
