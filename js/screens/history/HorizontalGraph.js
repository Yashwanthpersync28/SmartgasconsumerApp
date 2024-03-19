import React from 'react';
import { Text, View, Dimensions, Platform, Pressable,TouchableOpacity } from 'react-native';
import { connect } from "react-redux";
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Actions
import {userDetailActions, apiDispatcher} from "SmartgasConsumerApp/js/actions";
import { showLogout } from "SmartgasConsumerApp/js/actions/commonActions";
// Libraries
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

// Icons
import MIcons from 'react-native-vector-icons/MaterialIcons';
import  Icon  from 'react-native-vector-icons/FontAwesome';
// Components
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'

// Constants
import { DailyConsumption } from '../../constants/dashboard/VictoryChart';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import * as dashboard from "../../api/dashboard";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { setLiveData } from '../../actions/userDetailsActions';
import moment from "moment"
import VictoryHistoryHorizontalBarComponent from "./components/VictoryHistoryHorizotalBar"
import { backgroundFixedBar, handleNegative } from '../../helpers/common/chartDataHelper';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

class HorizontalGraph extends React.Component{

    constructor(props) {
        super(props);
        this.state={
           today: [],
           table:false
        };
        console.log("Proppss",this.props);
    }

    async componentDidMount(): void {

        this.props.navigation.setOptions({ headerRight : ()=> null });
        this.props.navigation.setOptions({ headerLeft : () => (
            <Pressable style={[styles.row,styles.allCenter,styles.paddingHorizontal20]} onPress={() => this.state.edit ? this.setState({edit: false}) : this.props.navigation.goBack()}>
               <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
                <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter,styles.fontSize15,styles.paddingHorizontal6]}>
                    {strings[this.props.language].back}
                </Text>
            </Pressable>
        ), });
            console.log("asdf2asdf",this.props.consumptionLogHistory);
        if (this.props.consumptionLogHistory) {
            console.log("asdf2as333df",this.props.consumptionLogHistory);

            this.setState({
                currentMonth: this.props.consumptionLogHistory.currentMonth,
                todayConsumption: this.props.consumptionLogHistory.today.consumption,
                weekConsumption: this.props.consumptionLogHistory.week.consumption,
                monthConsumption: this.props.consumptionLogHistory.month.consumption,
                today: handleNegative(this.props.consumptionLogHistory.today.graphData),
                week: handleNegative(this.props.consumptionLogHistory.week.graphData),
                month: handleNegative(this.props.consumptionLogHistory.month.graphData),
                refreshing: false
            }, () => console.log('History States',this.state))
        }

        // this.syncData()
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'DailyGraph') {
                    this.props.setCurrentRoute('DailyGraph');
                    this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('LiveData');

    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        // if(this.props.overview !== prevProps.overview) {
        //     let data = this.props.overview ? JSON.parse(JSON.stringify(this.props.overview)) : [];
        // }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            // await setInterval(6000);
            // let liveData = await this.props.apiDispatcher(dashboard.liveDataApi())
            // this.props.setLiveData(liveData.data.meterData)
            // setLiveData(liveData.data.meterData)
            // console.log("Live Data", liveData);
        } catch (e) {

        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()
    };
   
    render(){

        const { language, darkMode } = this.props;
        const { height, width } = Dimensions.get('window')
        console.log("asdffasdf", this.props, this.state);
        const { type, data } = this.props.route.params
        console.log("Type and data:",type,data);


        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]}>
                <View style={[styles.row,styles.marginTop,styles.centerHorizontal]}>
                <View style={[styles.row,styles.flexOne]}>
                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                        {type} Detailed
                    </Text>
                    <Text style={[styles.green, styles.fontSize17]}>
                        {" Graph"}
                    </Text>
                </View>
                <View style={[styles.margin6,{backgroundColor:this.props.darkMode ? "#3C3C43" : Colors.lightGrey,zIndex:2},styles.radius20,styles.row,styles.centerHorizontal]}>
                <TouchableOpacity onPress={()=>this.setState({table:!this.state.table})} style={[styles.padding,{backgroundColor:this.state.table?"#64AE64":null},styles.radius20]}>
                <Icon name={"table"} size={15} color={this.props.darkMode?Colors.white:Colors.black}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.setState({table:!this.state.table})} style={[styles.padding,{backgroundColor:this.state.table?null:"#64AE64"},styles.radius20]}>
                <Icon name={"bar-chart"} size={15} color={this.props.darkMode?Colors.white:Colors.black}/>
                </TouchableOpacity>
                {/* styles.padding10,styles.right,styles.Margin10,styles.absolute,{top:20,right:0,zIndex:2} */}
                </View>

                </View>
                {/* <VictoryHistoryBarComponent consumption = {this.state.today && this.state.today} fixed = {backgroundFixedBar(this.state.today)} darkMode = {darkMode}/> */}

                <View style={[styles.flexOne, {justifyContent: 'flex-start', alignItems: 'center' }]}>
                   <View style={[{width: height/0.8, height: width/1.2, transform: [ { rotate: '90deg' }], paddingLeft: Platform.OS == "ios" ? height/2.6 : height/2.6 }]}>
                       { this.state.table?
                   <View style={[styles.marginBottom14,styles.marginHorizontal24,styles.marginTop48,{height:width/1.4,width:height/1.4},styles.padding32]}>
                   <View style={[styles.row]}>
                   <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.textLeft,{flex:0.2}]}>Sl. No.</Text>
                       <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.flexOne,styles.textCenter]}>{type === 'Monthly'?"Date":type === 'Daily'?"Hours":null}</Text>
                       <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.flexOne,styles.textCenter]}>Consumption</Text>
                   </View>
                   <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop, this.props.darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                   <View style={[styles.row,styles.spaceBetween,]}>
                   <FlatList data={data} renderItem={(item,index)=><View style={[styles.opacity65perc]}>
                       <View style={[styles.row]}>
                       <Text style={[this.props.darkMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.textLeft,{flex:0.2}]}>{item.index+1} </Text>
                       <Text style={[this.props.darkMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.x}</Text>
                       <Text style={[this.props.darkMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.y}</Text>
                       </View>
                   <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop4, this.props.darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                   </View>}/>
                   </View>
                   </View> 
                    : <View style={[styles.flexOne, styles.extraMargin, styles.radius20,]}>
                            <View style={[styles.row, styles.flexOne]}>
                                <Text style={[darkMode ? styles.green : styles.black, styles.small,{position: 'absolute', left: height/50}  ]}>M3</Text>
                                <View style={[styles.flexOne]}>
                                    <VictoryHistoryHorizontalBarComponent consumption = {handleNegative(data)} fixed = {backgroundFixedBar(data)} darkMode = {darkMode}/>
                                    <Text style={[darkMode ? styles.green : styles.black, styles.small, {position: 'absolute', bottom: -width/12, left: type == "Daily" ? height/50 : height/30}, styles.marginBottom]}>{type == "Daily" ? "Hours" : "Date"}</Text>
                                </View>
                            </View>
                        </View>}
                    </View>
                </View>
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
        consumptionLogHistory: commonSelectors.consumptionLogHistory(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        showLogout: (state=true) => dispatch(showLogout(state)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const HorizontalGraphScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(HorizontalGraph);
export {HorizontalGraphScreen}
