import React from 'react';
import { Text, View, StatusBar, Dimensions, Pressable, FlatList , ScrollView, RefreshControl, ActivityIndicator} from 'react-native';
import { connect } from "react-redux";
// Styles , Colors and Constants
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import { VoltageLine, peakVoltage } from 'SmartgasConsumerApp/js/constants/dashboard/VictoryChart';

// Icons
import MIcons from 'react-native-vector-icons/MaterialIcons';
import SLIcons from 'react-native-vector-icons/SimpleLineIcons';
import OIcons from 'react-native-vector-icons/Octicons';
// Components
import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound'
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";

import { VictoryLine, VictoryChart, VictoryScatter, VictoryAxis, VictoryLabel } from "victory-native";
import {chartDataPowerQuality} from "../../helpers/common/chartDataHelper";
// Backend
import * as dashboard from "../../api/dashboard";
import {apiDispatcher, userDetailActions} from "../../actions";
import moment from "moment";
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

const {height,width} = Dimensions.get("window")

class PowerQuality extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            graph: true,
        }
    }


    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'billingHistory') {
                    this.props.setCurrentRoute('billingHistory');
                    this.syncData()
                }
            }
        );

        // this.backHandler = BackHandler.addEventListener(
        //     "hardwareBackPress",
        //     this.backAction
        // );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.powerQuality !== prevProps.powerQuality){
            let data =this.props.powerQuality ? JSON.parse(JSON.stringify(this.props.powerQuality)) : [];
            console.log(data, this.props.powerQuality)

            this.setState({
                peakVoltage: data.peakVoltage,
                voltageHourlyTrend: data.voltageHourlyTrend,
                voltageHourlyTrendGraph: data.voltageHourlyTrend ? chartDataPowerQuality(JSON.parse(JSON.stringify(data.voltageHourlyTrend))): null,
                refreshing: false
            },()=>console.log( this.state.voltageHourlyTrendGraph, this.state.voltageHourlyTrend, this.state.peakVoltage)
            )
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            let data = await this.props.apiDispatcher(dashboard.powerQualityApi());
            console.log("powerQuality",data.data);
            this.props.setPowerQuality(data.data);
            if(data.status == 204){
                this.setState({ noData: true })
            }
        } catch (e) {
            this.setState({refreshing: false})
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()

    };

    renderItem = ({item, index}) => {
        return (
            <View style={[styles.opacity65perc]}>
                <View style={[styles.row]}>
                    <Text style={[styles.small, styles.flexOneAndHalf, styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                        { moment(item.logHour).format("h a")}
                    </Text>
                    <Text style={[styles.small, styles.flexOneAndHalf, styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                        { item.voltage == -1 ? 0 :  item.voltage}
                    </Text>
                    <Text style={[styles.small, styles.flexOne, styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                        { item.freq == -1 ? 0 : item.freq }
                    </Text>
                    <Text style={[styles.small, styles.flexHalf, styles.textRight, styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
                        { item.md == -1 ? 0 : item.md }
                    </Text>
                </View>
                <View style={[{ borderBottomWidth:0.7 }, styles.opacity25perc, styles.paddingTop,this.props.darkMode ?{ borderColor:Colors.white } : { borderColor:Colors.black }]}/>
            </View>
        );
    }

    switch = (state)=> {
        this.setState({graph:state})
    }

    timeFormat = (t) => {
        return t
    }

   

    render(){
        const {language, darkMode} = this.props;

        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]} >
            { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    // refreshControl={
                    //     <RefreshControl
                    //         tintColor={Colors.sunglowYellow}
                    //         refreshing={this.state.refreshing}
                    //         onRefresh={this.onRefresh.bind(this)} />
                    // }
                >
                    {this.state.noData ?
                        <View style={[ styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
                            <DataNotFound darkMode={darkMode}/> 
                        </View>
                    :<>
                    <View style={[styles.row, styles.marginVertical]}>
                        <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                            {`${strings[language].powerQuality.power}  `}
                        </Text>
                        <Text style={[styles.green, styles.medium]}>
                            {strings[language].powerQuality.quality}
                        </Text>
                    </View>
                    <View style={[styles.paddingBottom]} >
                        <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                            {strings[language].powerQuality.headerContext}
                        </Text>
                    </View>
                    <View>
                        <>
                        {

                            this.state.peakVoltage ?

                                <View
                                    style={[styles.elevate, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius10, styles.flexOne, styles.padding16, styles.marginVertical]}>
                                    <View style={[styles.row]}>
                                        <Text
                                            style={[darkMode ? styles.white : styles.black, styles.fontSize17, {marginBottom: -10}]}>
                                            {`${strings[language].powerQuality.peak}  `}
                                        </Text>
                                        <Text style={[styles.green, styles.fontSize17, {marginBottom: -10}]}>
                                            {strings[language].powerQuality.voltage}
                                        </Text>
                                    </View>
                                    <View style={[styles.row, styles.flexOne]}>
                                        <View
                                            style={[styles.flexThree, styles.allCenter, darkMode ? styles.white : styles.black,]}>
                                            <View style={[styles.flexOne, styles.centerVertical]}>
                                                {/* <VictoryChart
                                                    width={Dimensions.get("window").width / 1.4} // from react-native
                                                    height={50}
                                                >
                                                    <VictoryAxis
                                                        dependentAxis
                                                        style={{
                                                            ticks: {stroke: "transparent"},
                                                            tickLabels: {fill: "transparent"},
                                                            axis: {stroke: "none"},
                                                            grid: {stroke: "grey", opacity: 0.4}
                                                        }}
                                                    />
                                                    <VictoryLine interpolation="natural"
                                                                style={{data: {stroke: Colors.darkGreen, strokeWidth: 1}}}
                                                                data={VoltageLine}/>
                                                </VictoryChart> */}
                                                <VictoryChart
                                                    width={Dimensions.get("window").width/1.4} // from react-native
                                                    height={50}
                                                >
                                                    <VictoryAxis
                                                        dependentAxis
                                                        style={{
                                                            ticks: {stroke: "transparent"},
                                                            tickLabels: { fill:"transparent"},
                                                            axis: {stroke: "none"},
                                                            grid : { stroke: "grey", opacity: 0.4},
                                                            height:10
                                                        }}
                                                    />
                                                    <VictoryLine interpolation="natural" style={{ data: { stroke: Colors.darkGreen, strokeWidth: 1  }}} data={peakVoltage}/>
                                                </VictoryChart>
                                            </View>
                                        </View>
                                        <View style={[styles.flexTwo,styles.flexEndHorizontal, styles.spaceBetweenVertical]}>
                                            <View style={[styles.row, styles.allCenter]}>
                                                <Text
                                                    style={[darkMode ? styles.white : styles.black, styles.small, styles.opacity80perc]}>
                                                    {this.state.peakVoltage ? moment(this.state.peakVoltage.peakedAt).format("h a") : ""}
                                                </Text>
                                                <View style={[{}]}>
                                                    <MIcons name='keyboard-arrow-up' size={20} color={Colors.darkGreen}/>
                                                </View>
                                            </View>
                                            <View style={[]}>
                                                <Text style={[styles.green, styles.mediumLarge]}>
                                                    {this.state.peakVoltage && this.state.peakVoltage.value == -1 ? 0 : this.state.peakVoltage.value}
                                                </Text>
                                            </View>
                                            <View style={[]}>
                                                <Text style={[darkMode ? styles.white : styles.black, styles.small]}>
                                                    {strings[language].powerQuality.voltage}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                </View> : null
                        }
                        {
                            this.state.peakVoltage ?
                                <View
                                    style={[{zIndex: 2}, styles.radius20, darkMode ? styles.bgLightGray : styles.bgWhite, styles.flexThree, styles.marginTop10, styles.paddingHorizontal24, styles.paddingTop24, styles.paddingBottom12]}>
                                    {/* <View style={{
                                        width: 150,
                                        height: 100,
                                        backgroundColor:'red',
                                        borderRadius:20
                                    }}>
                                        <View style={{
                                            backgroundColor: 'red',
                                            left:0,
                                            top:0,
                                            width: 90,
                                            height: 83,
                                            borderRadius:20,
                                            left:20,
                                            alignSelf:"flex-end",
                                            transform: [{rotate: '30deg'}]
                                        }}>

                                        </View>
                                    </View> */}
                                    <View style={[styles.row]}>
                                        <Text
                                            style={[darkMode ? styles.white : styles.black, styles.fontSize17, {marginBottom: -10}]}>
                                            {`${strings[language].powerQuality.voltage}  `}
                                        </Text>
                                        <Text style={[styles.green, styles.fontSize17, {marginBottom: -10}]}>
                                            {strings[language].powerQuality.hourlyTrend}
                                        </Text>
                                    </View>
                                    {this.state.graph ?
                                        <View style={[styles.flexOne]}>
                                            <View style={[styles.flexFour, styles.allCenter, {top: -10, left: 15}]}>
                                                <VictoryChart
                                                    domainPadding={{y: [20, 0]}}
                                                    width={Dimensions.get("window").width / 1.1}
                                                    height={260}
                                                >
                                                    <VictoryAxis
                                                        crossAxis
                                                        tickLabelComponent={<VictoryLabel style={[{
                                                            fontSize: 12,
                                                            fill: darkMode ? Colors.white : Colors.black,
                                                            opacity: 0.5
                                                        }]}/>}
                                                        tickValues={VoltageLine.x}
                                                        tickFormat={(t) => this.timeFormat(t)}
                                                        style={{axis: {stroke: "none"}}}
                                                    />
                                                    <VictoryAxis
                                                        tickLabelComponent={<VictoryLabel style={[{
                                                            fontSize: 12,
                                                            fill: darkMode ? Colors.white : Colors.black,
                                                            opacity: 0.5
                                                        }]}/>}
                                                        dependentAxis
                                                        tickValues={VoltageLine.y}
                                                        tickFormat={(t) => `${Math.round(t)} v`}
                                                        style={{
                                                            axis: {stroke: "none"},
                                                            grid: {stroke: "grey", opacity: 0.3}
                                                        }}
                                                    />
                                                    <VictoryLine style={{
                                                        data: {stroke: Colors.darkGreen},
                                                        parent: {border: "1px solid #ccc"}
                                                    }} data={this.state.voltageHourlyTrendGraph}/>
                                                    <VictoryScatter
                                                        style={{
                                                            parent: {border: "1px solid #ccc"},
                                                            data: {
                                                                fill: Colors.darkGreen,
                                                                fillOpacity: 1,
                                                                stroke: Colors.white,
                                                                strokeWidth: 2
                                                            },
                                                        }}
                                                        size={6}
                                                        data={this.state.voltageHourlyTrendGraph}
                                                    />
                                                </VictoryChart>
                                            </View>
                                            <View style={[styles.allCenter, styles.row, {top: -20}]}>
                                                <View style={[styles.paddingHorizontal10]}>
                                                    <OIcons name='primitive-dot' size={14} color={Colors.green}/>
                                                </View>
                                                <Text style={[styles.green, styles.small]}>
                                                    {strings[language].powerQuality.legend}
                                                </Text>
                                            </View>
                                        </View>
                                        :
                                        <View style={[styles.flexOne, styles.paddingTop10]}>
                                            <View style={[styles.row, styles.paddingTop10]}>
                                                <Text style={[styles.flexOneAndHalf, darkMode ? styles.white : styles.black]}>
                                                    {strings[language].powerQuality.logHour}
                                                </Text>
                                                <Text style={[styles.flexOneAndHalf, darkMode ? styles.white : styles.black]}>
                                                    {strings[language].powerQuality.voltage}
                                                </Text>
                                                <Text style={[styles.flexOne, darkMode ? styles.white : styles.black]}>
                                                    {strings[language].powerQuality.freq}
                                                </Text>
                                                <Text style={[styles.flexHalf, darkMode ? styles.white : styles.black, styles.textRight]}>
                                                    {strings[language].powerQuality.md}
                                                </Text>
                                            </View>
                                            <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop, darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                                            <FlatList showsVerticalScrollIndicator={false}
                                                refreshing={true}
                                                style={[styles.flexOne,{height:width/1.82}]}
                                                data={this.state.voltageHourlyTrend}
                                                renderItem={this.renderItem}
                                                numColumns={1}
                                                initialNumToRender={10}
                                                ref={ref => this.listView = ref}
                                                keyExtractor={(item, index) => item.logHour + index}
                                            />
                                            <View style={[styles.allCenter, styles.paddingVertical12, styles.marginBottom8]}>
                                                {/* <Text style={[styles.palanquinSemiBold, styles.lineHeight22, styles.green, styles.small]}> */}
                                                <Text style={[styles.green, styles.small]}>
                                                    {strings[language].powerQuality.tableFooter}
                                                </Text>
                                            </View>
                                        </View>
                                    }
                                </View> : null
                        }</>
                        </View>
                        {this.state.peakVoltage ?
                        <>
                            <View style={[styles.flexHalf, {top:-20}]}>
                                <Pressable onPress={() => this.switch(false)}
                                    style={[{
                                        backgroundColor: 'transparent',
                                        zIndex: !this.state.graph ? 1 : 0,
                                        borderWidthColor: 'transparent',
                                        paddingRight: Dimensions.get("window").width/2.5,
                                        borderBottomLeftRadius:20,
                                        borderBottomRightRadius:20,
                                        borderRightWidth: width/10,
                                        borderRightColor: 'transparent',
                                        borderTopWidth: width/8,
                                        borderTopColor: !this.state.graph ? darkMode ? Colors.lightGray : Colors.white : Colors.darkGreen ,
                                        // bottom: -80,
                                        alignSelf:"flex-start"

                                    }]}
                                >
                                    <View style={[
                                        this.state.graph ? styles.bgDarkGreen : darkMode ? styles.bgLightGray : styles.bgWhite,
                                        styles.absolute,
                                        styles.flexOne,
                                        styles.allCenter, {
                                            borderBottomEndRadius:15,
                                            borderBottomLeftRadius:15,
                                            borderBottomRightRadius:15,
                                            bottom:-Dimensions.get("window").width/50,
                                            width:Dimensions.get("window").width/2.47,
                                            height:Dimensions.get("window").height/16
                                        }]}
                                    >
                                        <Text style={[this.state.graph ? styles.white : styles.green, styles.fontSize17]}>
                                            {strings[language].powerQuality.dataTable}
                                        </Text>
                                    </View>
                                </Pressable>
                                <Pressable onPress={() => this.switch(true)}
                                    style={[{

                                        position: "absolute",
                                        backgroundColor: 'transparent',
                                        zIndex: this.state.graph ? 1 : 0,
                                        borderWidthColor: 'transparent',
                                        paddingLeft: Dimensions.get("window").width/2.5,
                                        borderBottomLeftRadius:20,
                                        borderBottomRightRadius:20,
                                        borderLeftWidth: width/10,
                                        borderLeftColor: 'transparent',
                                        borderTopWidth: width/8,
                                        borderTopColor: this.state.graph ? darkMode ? Colors.lightGray : Colors.white : Colors.darkGreen ,
                                        // bottom:Dimensions.get("window").height*RFPercentage(1) / Dimensions.get("window").width,
                                        alignSelf:"flex-end"

                                    }]}
                                >
                                    <View style={[
                                        this.state.graph ? darkMode ? styles.bgLightGray : styles.bgWhite : styles.bgDarkGreen,
                                        styles.absolute,
                                        styles.flexOne,
                                        styles.allCenter, {
                                            borderBottomEndRadius:15,
                                            borderBottomLeftRadius:15,
                                            borderBottomRightRadius:15,
                                            right:0.5,
                                            bottom:-Dimensions.get("window").width/50,
                                            width:Dimensions.get("window").width/2.48,
                                            height:Dimensions.get("window").height/16
                                        }]}
                                    >
                                        <Text style={[this.state.graph ? styles.green : styles.white, styles.fontSize17]}>
                                            {strings[language].powerQuality.graph}
                                        </Text>
                                    </View>
                                </Pressable>
                            </View>
                        
                            {/* <Pressable onPress={this.captureAndShareScreenshot}  style={[styles.flexQuarterToOne, styles.centerVertical, styles.elevatePlus, styles.flexEndHorizontal]}>
                                <View style={[styles.paddingVertical6, styles.paddingHorizontal16, styles.radius16, darkMode ? styles.bgLightGray : styles.bgWhite, styles.row, styles.elevate2]}>
                                    <View style={[styles.paddingRight10, styles.opacity50perc, styles.allCenter]}>
                                        <SLIcons name='share' size={16} color={darkMode ? Colors.white : Colors.black} />
                                    </View>
                                    <View>
                                        <Text style={[styles.fontSize15, darkMode ? styles.white : styles.black]}>
                                            {strings[language].powerQuality.share}
                                        </Text>
                                    </View>
                                </View>
                            </Pressable> */}
                        </>
                        : 
                        <View style={[styles.allCenter,styles.height50Points]}>
                            <LoaderComponent/>
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
        activeCount: commonSelectors.activeCount(state),
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),
        powerQuality: commonSelectors.powerQuality(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setPowerQuality: (data={}) => dispatch(userDetailActions.setPowerQuality(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const PowerQualityScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(PowerQuality);
export {PowerQualityScreen}
