import React from 'react';
import { connect } from "react-redux";
import { Text, View, StatusBar, ScrollView, Dimensions, RefreshControl, FlatList, Pressable } from 'react-native';
// Styles and Colors
import { styles } from '../../styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Icons
import SLIcons from 'react-native-vector-icons/SimpleLineIcons';
// Component
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader';
import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound'
import UtilizationComponent from './components/Utilization'

// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {strings} from "SmartgasConsumerApp/js/strings";
import * as dashboard from "../../api/dashboard";
import {apiDispatcher, userDetailActions} from "../../actions";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

const {height, width} = Dimensions.get('window');

class NetMeter extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            index: 1,
            balance: {},
        }
    }

    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'NetMeter') {
                    this.props.setCurrentRoute('NetMeter');
                    this.syncData()
                }
            }
        );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.netMeter !== prevProps.netMeter){
            let data =this.props.netMeter ? JSON.parse(JSON.stringify(this.props.netMeter)) : [];
            console.log('DID update',data, this.props.netMeter)

            this.setState({
                today: data.today,
                week: data.week,
                month: data.month,
                refreshing: false
            }, ()=>console.log('Net Meter States'))
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            this.setState({ loading: true })
            let data = await this.props.apiDispatcher(dashboard.netMeterApi())
            if(data.status == 200){
                console.log("Net Meter Api",data.data);
                this.props.setNetMeter(data.data);
            }
            else if(data.status == 204 || 212){
                this.setState({ noData: true })
            }
            else{
                console.log("Net Meter Error from Backend",data.data);
                // alert(`Status : ${data.status}, Message : ${data.data.message}`);
                // this.setState({ error: data.data.message })
            }
            this.setState({ loading: false })
        } catch (e) {
            this.setState({refreshing: false})
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()

    };

    render(){
        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader]} >
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                    style={[styles.flexOne]}
                >
                    {this.state.loading && !this.state.today ?
                        <View style={[{marginTop: height/3}]}>
                            <LoaderComponent />
                        </View>
                        :
                    <> 
                        {this.state.noData ?
                            <View style={[ styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
                                <DataNotFound darkMode={darkMode}/> 
                            </View>
                        :
                        <>
                            { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
                            <View style={[styles.flexQuarterToOne, styles.marginVertical, styles.paddingHorizontal24]}>
                                <View style={[styles.row, styles.marginVertical2,]}>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                        {`${strings[language].netMetering.net}  `}
                                    </Text>
                                    <Text style={[styles.darkGreen, styles.medium]}>
                                        {strings[language].netMetering.metering}
                                    </Text>
                                </View>
                                <View style={[]} >
                                    <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                        {strings[language].netMetering.headerContext}
                                    </Text>
                                </View>
                            </View>
                            <View style={[ darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.padding14, styles.elevate2, styles.marginHorizontal24, styles.extraMarginVertical,]}>
                                <View style={[styles.row, styles.marginVertical4, styles.paddingHorizontal10, styles.spaceBetween]}>
                                    <View style={[styles.row]}>
                                        <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                            {`${strings[language].netMetering.savings} `}
                                        </Text>
                                        <Text style={[styles.darkGreen, styles.medium]}>
                                            {strings[language].netMetering.utilization}
                                        </Text>
                                    </View>
                                </View>
                                <View style={[styles.row, styles.marginHorizontal10, styles.marginVertical4, styles.marginTop18, styles.radius6, {backgroundColor:darkMode ? "#ffffff26" : "#00000026"}]}>
                                    <Pressable onPress={()=> this.setState({ index: 0 })} style={[styles.flexOne, this.state.index == 0 ? styles.bgGreen : null, styles.padding6, styles.radius6, styles.allCenter]}>
                                        <Text style={[darkMode ? styles.white : this.state.index == 0 ? styles.white : styles.black, styles.fontSize15]}>
                                            {strings[language].netMetering.today}
                                        </Text>
                                    </Pressable>
                                    <Pressable onPress={()=> this.setState({ index: 1 })} style={[styles.flexOne, this.state.index == 1 ? styles.bgGreen : null, styles.padding6, styles.radius6, styles.allCenter]}>
                                        <Text style={[darkMode ? styles.white : this.state.index == 1 ? styles.white : styles.black, styles.fontSize15]}>
                                            {strings[language].netMetering.week}
                                        </Text>
                                    </Pressable>
                                    <Pressable onPress={()=> this.setState({ index: 2 })} style={[styles.flexOne, this.state.index == 2 ? styles.bgGreen : null, styles.padding6, styles.radius6, styles.allCenter]}>
                                        <Text style={[darkMode ? styles.white : this.state.index == 2 ? styles.white : styles.black, styles.fontSize15]}>
                                            {strings[language].netMetering.month}
                                        </Text>
                                    </Pressable>
                                </View>
                                {this.state.index == 0 && this.state.today ?
                                    <UtilizationComponent percent={20} data={this.state.today} darkMode={darkMode} language={language}/> : null
                                }
                                {this.state.index == 1 && this.state.week ?
                                    <UtilizationComponent percent={60} data={this.state.week} darkMode={darkMode} language={language}/> : null
                                }
                                {this.state.index == 2 && this.state.month?
                                    <UtilizationComponent percent={80} data={this.state.month} darkMode={darkMode} language={language}/> : null
                                }
                            </View>
                            {/* <Pressable onPress={this.captureAndShareScreenshot} style={[styles.flexOne, styles.centerVertical, styles.elevatePlus, styles.flexEndHorizontal, styles.marginHorizontal20, styles.extraMarginVertical, styles.marginBottom5Percent]}>
                                <View style={[styles.padding, styles.paddingHorizontal16, styles.radius16, darkMode ? styles.bgLightGray : styles.bgWhite, styles.row, styles.elevateMild]}>
                                    <View style={[styles.paddingRight10, styles.opacity50perc, styles.allCenter]}>
                                        <SLIcons name='share' size={16} color={darkMode ? Colors.white : Colors.black} />
                                    </View>
                                    <View>
                                        <Text style={[styles.regular, darkMode ? styles.white : styles.black]}>
                                            {strings[language].netMetering.share}
                                        </Text>
                                    </View>
                                </View>
                            </Pressable> */}
                        </>}
                    </>}
                </ScrollView>
            </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        language: commonSelectors.language(state),
        netMeter: commonSelectors.netMeter(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setNetMeter: (data={}) => dispatch(userDetailActions.setNetMeter(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const NetMeterScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(NetMeter);
export {NetMeterScreen}
