import React from 'react';
import { Text, View, ScrollView, FlatList, StatusBar, Pressable, RefreshControl, ActivityIndicator, Dimensions,TouchableOpacity,Animated } from 'react-native';
import {connect} from "react-redux";
// Styles, Colors and Constants
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import { TodayConsumption, StaticBarPhaseOne, StaticBarPhaseTwo, VictoryBarFixed, VictoryBarFixed1, VictoryBarFixed2 } from 'SmartgasConsumerApp/js/constants/dashboard/VictoryChart';
// Components
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader';
import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound'
import StaticBarComponent from 'SmartgasConsumerApp/js/components/common/StaticBarComponent';
import VictoryBarComponent from 'SmartgasConsumerApp/js/components/common/graphs/VictoryBar';
// Libraries
import moment from "moment";
// Icons
import OIcons from 'react-native-vector-icons/Octicons';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import SLIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/FontAwesome'
// import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
// Backend
import { strings } from "SmartgasConsumerApp/js/strings";
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import {chartDataBillingHistory, backgroundFixedBar, chartDataWithoutDate, handleNegative} from "../../helpers/common/chartDataHelper";
import * as dashboard from "../../api/dashboard";
import {userDetailActions, apiDispatcher} from "../../actions";
import VictoryBarBasicComponent from '../../components/common/graphs/VictoryBarBasic';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

const data = [
    { height:5 },
    { height:7 },
    { height:8 },
    { height:10 },
    { height:5 },
    { height:5 },
    { height:4 },
    { height:7 },
    { height:5 },
    { height:10 },
]

const {height, width} = Dimensions.get('window');

class MaximumDemandInterface extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            table:false
        };
        this.listView=React.createRef(null);
    }

    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'mdi') {
                    this.props.setCurrentRoute('mdi');
                    this.syncData()
                }
            }
        );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.mdi !== prevProps.mdi){
            let data =this.props.mdi ? JSON.parse(JSON.stringify(this.props.mdi)) : [];
            console.log("MDI Screen API Response",this.props.mdi);
            this.setState({
                assignedMaxDemand: data.assignedMaxDemand,
                lastSevenDaysMaxDemand: handleNegative(data.lastSevenDaysMaxDemand),
                monthlyMaxDemand: data.monthlyMaxDemand,
                month: data.month,
                recordedSpikeMD: data.recordedSpikeMD,
                refreshing: false
            }, ()=>console.log(data,'GRpahs', this.state.lastSevenDaysMaxDemand))
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }
    }

    syncData = async () => {
        try {
            this.setState({ loading: true })
            let data = await this.props.apiDispatcher(dashboard.mdiApi())
            // console.log("mdi",data.data);
            if(data.status == 200){
                this.props.setMdi(data.data);
            }
            else if(data.status == 204){
                this.setState({ noData: true })
            }
            else{

            }
            this.setState({ loading: false })
           
        } catch (e) {
            console.log("sss MDI Error", e)
            this.setState({refreshing: false})
        }
    }
    onRefresh = () => {
        this.setState({refreshing: true});
        this.syncData()

    };

    renderItem = ({item, index}) => {
        return (

            <View style={[]}>
                <View style={[{ borderBottomWidth:0.7 }, styles.opacity25perc, styles.paddingTop, this.props.darkMode ? { borderColor:Colors.white } : { borderColor:Colors.black }]}/>
                <View style={[styles.row, styles.spaceBetween]}>
                    {/* <Text style={[styles.paddingTop16, styles.palanquinRegular, this.props.darkMode ? styles.white : styles.black, styles.lineHeight18, styles.opacity80perc]}> */}
                   
                    

                    <View style={[styles.flexOne]}>
                        <Text style={[styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc, styles.normal]}>
                            {/* { moment(item.logDate).format("DD/MM") } */}
                                { moment(item.logDate).format("MMMM Do YYYY, h:mm:ss a") }
                        </Text>
                    </View>
                    <View style={[styles.flexOne, styles.centerHorizontal]}>
                        <Text style={[styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc, styles.normal]}>
                            { item.p_MD }
                        </Text>
                    </View>
                    <View style={[styles.flexOne, styles.centerHorizontal]}>
                        <Text style={[styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc, styles.normal]}>
                            { item.a_MD }
                        </Text>
                    </View>
                    <View style={[styles.flexOne, styles.flexEndHorizontal]}>
                        <Text style={[styles.paddingTop16, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc, styles.normal]}>
                            { item.voltage }
                        </Text>
                    </View>
              </View>
            </View>
        );
    };

   

    pressHandler = ()=>{
        
            this.listView?.current?.scrollTo({y: 0,animated: true})
    }

    render(){
        // const ref = React.useRef(null);
        // ref.scrollToOffset({ animated: true, offset: 0 });
        const {language, darkMode} = this.props;
        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal20]} >
                { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
                {/* <View style={[styles.flexOne,styles.absolute,{zIndex:2,alignSelf:"flex-end",top:height/1.2,right:width/30}]}>
                        <TouchableOpacity onPress={this.pressHandler} 
                                    style={[styles.icon40,styles.allCenter,{backgroundColor:this.props.darkMode?Colors.black:Colors.white,alignSelf:"flex-end"}]}>
                <Icon name={"arrow-up"} size={15} color={this.props.darkMode?Colors.white:Colors.black}/>
                </TouchableOpacity>
                </View> */}
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                >
                    {this.state.loading && !this.state.assignedMaxDemand ?
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
                        
                            <View style={[styles.row, styles.marginVertical]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                    {`${strings[language].mdi.maximum}  `}
                                </Text>
                                <Text style={[styles.green, styles.medium]}>
                                    {strings[language].mdi.demand}
                                </Text>
                            </View>
                            <View style={[styles.paddingVertical]} >
                                <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                    {strings[language].mdi.headerContext}                   
                                </Text>
                            </View>
                            <View style={[darkMode ? styles.bgMediumDarkGray : styles.bgWhite, styles.radius10, styles.flex, styles.padding14, styles.marginVertical, styles.elevate2, styles.marginHorizontal]}>
                                <View style={[styles.row]}>
                                    <View style={[styles.flexTwo]}>
                                        <View style={[styles.row, styles.paddingBottom4]} >
                                            <View>
                                                <Text style={[darkMode ? styles.white : styles.black, styles.fontSize19]}>
                                                    {`${strings[language].mdi.sanctioned}  `}
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.fontSize19, styles.green]}>
                                                    {strings[language].mdi.load}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row, styles.bottomHorizontal, styles.flexOne, darkMode ? styles.white : styles.black]}>
                                            <StaticBarComponent darkMode={darkMode} data={data} width={width/33}/>
                                        </View>
                                    </View>
                                    <View style={[styles.flexOneAndHalf, styles.flexEndHorizontal, styles.centerVertical]}>
                                        <View style={[styles.row]}>
                                            <Text style={[darkMode ? styles.white : styles.black, styles.small, styles.opacity80perc]}>
                                                {this.state.month}
                                            </Text>
                                            <View style={[{margin:-2}]}>
                                                <MIcons name='keyboard-arrow-up' size={20} color={Colors.darkGreen} />
                                            </View>
                                        </View>
                                        <View style={[]}>
                                            <Text style={[styles.green, styles.mediumLarge]}>
                                                {this.state.assignedMaxDemand}
                                            </Text>
                                        </View>
                                        <View style={[]} >
                                            <Text style={[darkMode ? styles.white : styles.black, styles.small, styles.lineHeight18p]} >
                                                {strings[language].mdi.units}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={[styles.radius16, darkMode ? styles.bgLightGray : styles.bgWhite, styles.flexOne, styles.marginVertical10, styles.padding24, styles.paddingVertical10, styles.paddingTop16, styles.elevate2, styles.marginHorizontal]}>
                                <View style={[styles.row,styles.centerHorizontal,styles.spaceBetween]}>
                                <View style={[styles.row, styles.paddingVertical10,styles.flexOne]}>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                        {`${strings[language].mdi.monthly} `}
                                    </Text>
                                    <Text style={[styles.green, styles.medium]}>
                                        {strings[language].mdi.maxDemand}
                                    </Text>
                                </View>
                                {/* <TouchableOpacity onPress={()=>this.setState({table:!this.state.table})} style={[styles.padding10,styles.right,styles.Margin10,styles.absolute,{top:-5,right:0,zIndex:2}]}>
                                    <Icon name={this.state.table?"grid":"server"} size={15} color={this.props.darkMode?Colors.white:Colors.black}/>
                                </TouchableOpacity> */}
                                 
                                </View>
                                <View style={[]}>
                                    {this.state.table?
                                    <View style={[styles.flexOne,styles.marginBottom14]}>
                                    <View style={[styles.row]}>
                                    <Text style={[this.props.darkMode ? styles.white : styles.black,styles.fontSize11,styles.textLeft,{flex:0.3}]}>Sl. No.</Text>
                                        <Text style={[darkMode ? styles.white : styles.black,styles.fontSize11,styles.flexOne,styles.textCenter]}>Months</Text>
                                        <Text style={[darkMode ? styles.white : styles.black,styles.fontSize11,styles.flexOne,styles.textCenter]}>Maximum Demand</Text>
                                    </View>
                                    <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop, this.props.darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                        <View style={[styles.row]}>
                        <FlatList data={this.state.lastSevenDaysMaxDemand} renderItem={(item)=><View style={[styles.opacity65perc]}>
                            <View style={[styles.row]}>
                            <Text style={[this.props.darkMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.textLeft,{flex:0.3}]}>{item.index+1} </Text>
                            <Text style={[darkMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.x}</Text>
                            <Text style={[darkMode ? styles.white : styles.black,styles.extraSmall,styles.opacity80perc, styles.paddingTop4,styles.flexOne,styles.textCenter]}>{item.item.y}</Text>
                            </View>
                        <View style={[{borderBottomWidth: 0.7}, styles.opacity25perc, styles.paddingTop4, this.props.darkMode ? {borderColor: Colors.white} : {borderColor: Colors.black}]}/>
                        </View>}/>
                        </View>
                                    </View>
                                    :
                                    <View style={[styles.allCenter]}>
                                        {this.state.lastSevenDaysMaxDemand ?
                                            <View style={[{height:height/2.7}]}>
                                            <VictoryBarBasicComponent consumption={this.state.lastSevenDaysMaxDemand}  fixed={backgroundFixedBar(this.state.lastSevenDaysMaxDemand)} darkMode={darkMode}/>
                                            </View>
                                        : null}
                                    </View>}
                                    <View style={[]}>
                                        {!this.state.table && <Text style={[,darkMode ? styles.white : styles.black, styles.extraSmall, styles.selfCenter, styles.paddingVertical2]}>
                                            {strings[language].mdi.barGraphInfo}
                                        </Text>}
                                        <View style={[styles.marginVertical4,{backgroundColor:darkMode ? "#3C3C43" : Colors.lightGrey,zIndex:2},styles.radius20,styles.row,styles.allCenter,styles.selfCenter]}>
                                            <TouchableOpacity onPress={()=>this.setState({table:!this.state.table})} style={[styles.padding,{backgroundColor:this.state.table?"#64AE64":null},styles.radius20]}>
                                            <Icon name={"table"} size={15} color={darkMode?Colors.white:Colors.black}/>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={()=>this.setState({table:!this.state.table})} style={[styles.padding,{backgroundColor:this.state.table?null:"#64AE64"},styles.radius20]}>
                                            <Icon name={"bar-chart"} size={15} color={darkMode?Colors.white:Colors.black}/>
                                            </TouchableOpacity>
                                            {/* styles.padding10,styles.right,styles.Margin10,styles.absolute,{top:20,right:0,zIndex:2} */}
                                        </View>
                                            {/* <View style={[styles.row,styles.relative]}>
                                                <Text style={[styles.paddingHorizontal10, styles.opacity65perc]}>
                                                    <OIcons name='primitive-dot' size={18} color={'gray'}/>
                                                </Text>
                                                <Text style={[darkMode ? styles.white : styles.black, styles.selfCenter, styles.small, styles.opacity65perc]}>
                                                    {`${strings[language].mdi.lastWeekConsumption}`} {'Units'}
                                                </Text>
                                            </View> */}
                                        {!this.state.table && <View style={[styles.row]}>
                                            <Text style={[styles.paddingHorizontal10]}>
                                                <OIcons name='primitive-dot' size={18} color={Colors.green}/>
                                            </Text>
                                            <Text style={[styles.green, styles.selfCenter, styles.small]}>
                                                {strings[language].mdi.legend}
                                                {/* {`${strings[language].mdi.currentWeekConsumption}`} {'Units'} */}
                                            </Text>
                                        </View>}
                                    </View>
                                </View>
                            </View>
                            <Pressable
                                onPress={()=> this.props.navigation.navigate('MDGraph',{graphData:this.state.monthlyMaxDemand, month: this.state.month})}
                                style={[styles.paddingVertical4, styles.marginVertical4, styles.paddingHorizontal10, styles.bgGreen, styles.radius16, styles.selfCenter]}
                            >
                                <Text style={[styles.white, styles.small, styles.textCenter]}>
                                    {`(${strings[language].mdi.graphButton})`}
                                </Text>
                            </Pressable>
                            <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius20, styles.flexOne, styles.marginVertical10, styles.paddingHorizontal24, styles.paddingTop24, styles.paddingBottom12, styles.elevate2, styles.marginHorizontal]}>
                                <View style={[styles.row]}>
                                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                                        {`${strings[language].mdi.recorded}  `}
                                    </Text>
                                    <Text style={[styles.fontSize17, styles.darkGreen]}>
                                        {strings[language].mdi.spikeMd}
                                    </Text>
                                </View>
                                <View options={{ format: "jpg", quality: 0.9 }}>
                                    <View style={[styles.row, styles.flexOne, styles.paddingTop10]}>
                                        <View style={[styles.flexOne]}>
                                            <Text style={[this.props.darkMode ? styles.white : styles.black, styles.normal]}>
                                                {strings[language].mdi.logDate}
                                            </Text>
                                        </View>
                                        <View style={[styles.flexOne, styles.centerHorizontal]}>
                                            <Text style={[this.props.darkMode ? styles.white : styles.black, styles.normal]}>
                                                {strings[language].mdi.pmd}
                                            </Text>
                                        </View>
                                        <View style={[styles.flexOne, styles.centerHorizontal]}>
                                            <Text style={[this.props.darkMode ? styles.white : styles.black, styles.normal]}>
                                                {strings[language].mdi.amd}
                                            </Text>
                                        </View>
                                        <View style={[styles.flexOne, styles.flexEndHorizontal]}>
                                            <Text style={[this.props.darkMode ? styles.white : styles.black, styles.normal]}>
                                                {strings[language].mdi.voltage}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={[styles.flexOne]}>
                                        <FlatList
                                            style={[styles.flexOne]}
                                            data={this.state.recordedSpikeMD}
                                            renderItem={this.renderItem}
                                            numColumns={1}
                                            initialNumToRender={10}
                                            ref={this.listView}
                                            // (ref)=> this.listView = ref
                                            keyExtractor={(item, index) => item.logDate + index}
                                            getItemLayout={(data, index) => (
                                                {length: height, offset: height * index, index}
                                              )}
                                            // onScroll={Animated.event([{ 
                                            //     nativeEvent: { contentOffset: { y: scrollY } } }], 
                                            //     { useNativeDriver: false, listener: (event) => handleScroll(event)})
                                            // }
                                        />
                                    <View style={[{borderBottomWidth:0.7}, styles.opacity25perc, styles.paddingTop, this.props.darkMode ? { borderColor: Colors.white } : { borderColor: Colors.black }]}/>
                                    </View>
                                    
                                    <View style={[styles.flexOne, styles.allCenter, styles.paddingTop10]}>
                                        <Text style={[styles.green, styles.extraSmall]}>
                                            {strings[language].mdi.tableFooter}
                                        </Text>
                                    </View>
                                </View>
                            </View>
                            {/* <Pressable onPress={this.captureAndShareScreenshot} style={[styles.flexOne, styles.centerVertical, styles.elevatePlus, styles.flexEndHorizontal, styles.extraMarginVertical]}>
                                <View style={[styles.paddingVertical6, styles.paddingHorizontal16, styles.radius16, darkMode ? styles.bgLightGray : styles.bgWhite, styles.row, styles.elevateMild]}>
                                    <View style={[styles.paddingRight10, styles.opacity50perc, styles.allCenter]}>
                                        <SLIcons name='share' size={16} color={darkMode ? Colors.white : Colors.black} />
                                    </View>
                                    <View>
                                        <Text style={[styles.regular, darkMode ? styles.white : styles.black]}>
                                            {strings[language].mdi.share}
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
        mdi: commonSelectors.mdi(state),
        currentRoute: commonSelectors.currentRoute(state),

    }
}
function mapDispatchToProps (dispatch) {
    return {
        setMdi: (data={}) => dispatch(userDetailActions.setMdi(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),

    }
}
const MaximumDemandInterfaceScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(MaximumDemandInterface);
export {MaximumDemandInterfaceScreen}
