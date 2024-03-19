import React from 'react';
import { connect } from "react-redux";
import { Text, View, ScrollView, Dimensions, Pressable, StatusBar, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
// import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Component
import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound'
import StaticBarComponent from 'SmartgasConsumerApp/js/components/common/StaticBarComponent';
import VictoryHistoryBarComponent from 'SmartgasConsumerApp/js/screens/history/components/VictoryHistoryBar';
// Constants
import { LOADING } from 'SmartgasConsumerApp/js/constants/lottie';
import { StaticBarPhaseTwo, StaticBarPhaseOne, TodayConsumption, WeekConsumption, MonthConsumption, VictoryBarFixed } from 'SmartgasConsumerApp/js/constants/dashboard/VictoryChart';
// Libraries
import LottieView from 'lottie-react-native';
import Swiper from 'react-native-swiper';
import CalendarPicker from 'react-native-calendar-picker';
// Icons
import FIcons from 'react-native-vector-icons/Feather';
import SLIcons from 'react-native-vector-icons/SimpleLineIcons';
import Icon from 'react-native-vector-icons/FontAwesome';
import MIcons from 'react-native-vector-icons/MaterialIcons';
import OIcons from 'react-native-vector-icons/Octicons';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { userDetailActions, apiDispatcher } from "SmartgasConsumerApp/js/actions";
import { strings } from "SmartgasConsumerApp/js/strings";
import * as dashboard from "../../api/dashboard";
import { chartData, chartDataWithoutDate, backgroundFixedBar, handleNegative } from "../../helpers/common/chartDataHelper";
import moment from "moment"
import { DailyConsumption } from '../../constants/dashboard/VictoryChart';
import VictoryCustomBarComponent from './components/VictoryCustomBar';
import { FlatList } from 'react-native-gesture-handler';
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
import { styles } from '../../styles';


const { height, width } = Dimensions.get('window');

const data = [
    { height: 5 },
    { height: 7 },
    { height: 8 },
    { height: 10 },
    { height: 5 },
    { height: 5 },
    { height: 4 },
    { height: 7 },
    { height: 5 },
    { height: 10 },
]

class History extends React.Component {

    constructor(props) {
        super(props);
        this.done = false;
        this.state = {
            index: 0,
            custom: false,
            todayConsumption: {},
            weekConsumption: {},
            monthConsumption: {},
            yearConsumption: {},
            showStartDateCalendar: false,
            showStartEndCalendar: false,
            table: false,
            consumptionType: 1
        };
        this.onDateChange = this.onDateChange.bind(this);
        // console.log("state Today",this.state.todayConsumption);
    }

    onDateChange = (date) => {
        let endDate = moment(date).add(30, 'd');

        this.setState({
            selectedStartDate: date.toISOString(),
            showStartDateCalendar: false,
            selectedEndDate: endDate.toISOString(),
            submit: false
        });
        console.log('Date,', date, this.state.selectedStartDate);
    };

    // onDateChange(date, type) {
    //     console.log('Date',date);
    //     if (type === 'END_DATE') {
    //       this.setState({
    //         selectedEndDate: date,
    //         showDateCalendar: false, submit: false
    //       });
    //     } else {
    //       this.setState({
    //         selectedStartDate: date,
    //         selectedEndDate: null
    //       });
    //     }
    //     console.log('Start ',this.state.selectedStartDate,"End", this.state.selectedEndDate);
    //   }

    onEndDateChange = (date) => {
        this.setState({
            selectedEndDate: date.toISOString(),
            showEndDateCalendar: false,
            submit: false
        });
    };

    toggleStartDateCalendar = () => {
        this.setState({
            showStartDateCalendar: !this.state.showStartDateCalendar
        })
        console.log('Start Date: ', this.state.selectedStartDate);
    };

    toggleEndDateCalendar = () => {
        this.setState({
            showEndDateCalendar: !this.state.showEndDateCalendar, submit: false
        })
        console.log('End Date: ', this.state.selectedEndDate);
    }

    getData = async () => {
        this.setState({ loading: true }, async () => {
            try {
                console.log("In get data");
                let data = await this.props.apiDispatcher(dashboard.consumptionLogDetailsApi(moment(this.state.selectedStartDate).format("YYYY-MM-DD") + "T00:00:00.00Z", moment(this.state.selectedEndDate).format("YYYY-MM-DD") + "T00:00:00.00Z", this.state.consumptionType))
                console.log("Consumption History Response", data.data, data);

                this.setState({ customDateConsumption: handleNegative(data.data.graphData7), submit: true, loading: false, error: '' })
                this.props.setConsumptionLogDetails(data.data);
                console.log('Graph Date on Submit', this.props.consumptionLogDetails, this.state.customDateConsumption);
            } catch (e) {
                this.setState({ loading: false, error: e.data.ErrorDescription == "No records" && strings[this.props.language].history.noRecordsFound })
                console.log('Error,e', e, "State", this.state.error);
                alert(`${e}\nHistory\n${this.state.error}\n${this.props.history}\n${this.state?.today}`)

            }
        })
    };

    async componentDidMount(): void {
        // alert(`${this.props?.consumptionLogHistory?.lastSevenHoursHistory?.graphData}`)
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'consumptionLogHistory') {
                    this.props.setCurrentRoute('consumptionLogHistory');
                    this.syncData()
                }
            }
        );
    }

    componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.consumptionLogHistory !== prevProps.consumptionLogHistory) {
            let data = this.props.consumptionLogHistory ? JSON.parse(JSON.stringify(this.props.consumptionLogHistory)) : [];
            console.log(data, this.props.consumptionLogHistory)
            if (this.props.consumptionLogHistory) {
                this.setState({
                    currentMonth: data.currentMonth,
                    todayConsumption: data.lastOnedayHistory.consumption,//history graph changes
                    weekConsumption: data.lastWeekHistory.consumption,
                    monthConsumption: data.lastMonthHistory.consumption,
                    yearConsumption: data?.lastYearHistory?.consumption,
                    today: handleNegative(data.lastOnedayHistory.graphData),
                    week: handleNegative(data.lastWeekHistory.graphData),
                    month: handleNegative(data.lastMonthHistory.graphData),
                    year: data?.lastYearHistory?.graphData ? handleNegative(data?.lastYearHistory?.graphData) : data?.lastYearHistory?.graphData,
                    refreshing: false
                }, () => console.log('History States', this.state))
            } else {
                this.syncData();
            }
        }
        // alert(`${this.state?.today}\n${!this.state.today}componentDidUpdate\n${this.props.consumptionLogHistory.currentMonth}`)
        // if(!this.state.today){
        //     this.setState({
        //         currentMonth: this.props.consumptionLogHistory.currentMonth,
        //         todayConsumption: this.props.consumptionLogHistory.lastSevenHoursHistory?.consumption,
        //         weekConsumption: this.props?.consumptionLogHistory.lastWeekHistory?.consumption,
        //         monthConsumption: this.props?.consumptionLogHistory.lastMonthHistory?.consumption,
        //         yearConsumption: this.props?.consumptionLogHistory?.lastYearHistory?.consumption,
        //         today: handleNegative(this.props?.consumptionLogHistory?.lastSevenHoursHistory?.graphData),
        //         week: handleNegative(this.props?.consumptionLogHistory?.lastWeekHistory?.graphData),
        //         month: handleNegative(this.props?.consumptionLogHistory?.lastMonthHistory?.graphData),
        //         year: this.props.consumptionLogHistory?.lastYearHistory?.graphData ? handleNegative(this.props.consumptionLogHistory?.lastYearHistory?.graphData) : this.props.consumptionLogHistory?.lastYearHistory?.graphData,
        //         refreshing: false
        //     }, () => console.log('History States', this.state))
        // }

        if (this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
        }

        if (this.state.consumptionType !== prevState.consumptionType) {
            if (this.state.custom) {
                this.getData()
            } else {
                this.syncData()
            }
        }
    }

    syncData = async () => {
        try {
            console.log("Sync Consumption Log History")
            let data = await this.props.apiDispatcher(dashboard.consumptionLogHistoryApi())
            // let data = await this.props.apiDispatcher(dashboard.consumptionLogHistoryApi(this.state.consumptionType))
            console.log("Consumption Log History", data.data, data);
            if (data.status == 200)
                this.props.setConsumptionLogHistory(data.data);
            else if (data.status == 204)
                this.setState({ noData: true })
        } catch (e) {
            this.setState({ refreshing: false })
            alert(`${e}\nHistory1\n${this.state.error}\n${this.props.history}\n${this.state?.today}`)
        }
        this.setState({ refreshing: false })

    }
    onRefresh = () => {
        this.setState({ refreshing: true });
        this.syncData()

    };

    handleSwipeIndexChange = index => {
        console.log('Index Number', index);
        this.setState({ index: index })
    };

    // Share
  

    render() {

        const { language, darkMode } = this.props;
        const { selectedStartDate, showStartDateCalendar, showEndDateCalendar, selectedEndDate } = this.state;
        const startDate = selectedStartDate ? moment(selectedStartDate).format("DD-MM-YY") : '';
        const endDate = selectedEndDate ? moment(selectedEndDate).format("DD-MM-YY") : '';
        console.log("asdfasfasdf", this.state);
        return (
            <ErrorBoundaryMainComponent>
                <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader]} >
                    {this.props.darkMode ? <StatusBar backgroundColor={Colors.black} barStyle='light-content' /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content' />}
                    <ScrollView style={[styles.flexOne]} showsVerticalScrollIndicator={false}
                        refreshControl={
                            <RefreshControl
                                tintColor={Colors.sunglowYellow}
                                refreshing={this.state.refreshing}
                                onRefresh={this.onRefresh} />
                        }
                    >
                        {this.state.noData ?
                            <View style={[styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
                                <DataNotFound darkMode={darkMode} />
                            </View>
                            :
                            <>
                                    <View style={[styles.flexOne, styles.paddingHorizontal24]}>
                                        <View style={[styles.marginVertical,]}>
                                            <Text style={[styles.green, styles.medium]}>
                                                {strings[language].history.header}
                                            </Text>
                                        </View>
                                        <View style={[styles.paddingBottom20]} >
                                            <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                                {strings[language].history.headerContext}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.flexOne}>
                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={[styles.flexOne, styles.marginHorizontal24, styles.radius10, darkMode ? styles.bgLightGray : styles.bgOffWhite]}>
                                            {/* <Pressable onPress={() => { this.setState({ custom: true }); this.refs.swiper?.scrollTo(this.state.index) }} style={[styles.paddingVertical4, styles.paddingHorizontal16, this.state.custom ? [styles.bgGreen, styles.elevatePlus] : null, styles.radius10, styles.flexOne]}>
                                                <Text style={[darkMode ? styles.white : styles.black, this.state.custom ? [styles.fontSize19, styles.white] : styles.fontSize17]}>
                                                    {strings[language].history.custom}
                                                </Text>
                                            </Pressable> */}
                                            {/* <Pressable onPress={async () => { this.setState({ custom: false }); this.state.custom == false ? this.refs.swiper?.scrollTo(0) : this.setState({ index: 0 }) }} style={[styles.paddingVertical4, styles.paddingHorizontal16, this.state.index == 0 && !this.state.custom ? [styles.bgGreen, styles.elevatePlus] : null, styles.radius10, styles.flexOne]}>
                                                <Text style={[darkMode ? styles.white : styles.black, this.state.index == 0 && !this.state.custom ? [styles.fontSize19, styles.white] : styles.fontSize17]}>
                                                    {strings[language].history.today}
                                                </Text>
                                            </Pressable> */}
                                            <Pressable onPress={async () => { this.setState({ custom: false }); this.state.custom == false ? this.refs.swiper?.scrollTo(0) : this.setState({ index: 0 }) }} style={[styles.paddingVertical4, styles.paddingHorizontal16, this.state.index == 0 && !this.state.custom ? [styles.bgGreen, styles.elevatePlus] : null, styles.radius10, styles.flexOne]}>
                                                <Text style={[darkMode ? styles.white : styles.black, this.state.index == 0 && !this.state.custom ? [styles.fontSize19, styles.white] : styles.fontSize17]}>
                                                    {strings[language].history.week}
                                                </Text>
                                            </Pressable>
                                            <Pressable onPress={async () => { this.setState({ custom: false }); this.state.custom == false ? this.refs.swiper?.scrollTo(1) : this.setState({ index: 1 }) }} style={[styles.paddingVertical4, styles.paddingHorizontal16, this.state.index == 1 && !this.state.custom ? [styles.bgGreen, styles.elevatePlus] : null, styles.radius10, styles.flexOne]}>
                                                <Text style={[darkMode ? styles.white : styles.black, this.state.index == 1 && !this.state.custom ? [styles.fontSize19, styles.white] : styles.fontSize17]}>
                                                    {strings[language].history.month}
                                                </Text>
                                            </Pressable>
                                            {this.state?.year && <Pressable onPress={async () => { this.setState({ custom: false }); this.state.custom == false ? this.refs.swiper?.scrollTo(2) : this.setState({ index: 2 }) }} style={[styles.paddingVertical4, styles.paddingHorizontal10, this.state.index == 2 && !this.state.custom ? [styles.bgGreen, styles.elevatePlus] : null, styles.radius10]}>
                                                <Text style={[darkMode ? styles.white : styles.black, this.state.index == 2 && !this.state.custom ? [styles.fontSize19, styles.white] : styles.fontSize17]}>
                                                    {strings[language].history.year}
                                                </Text>
                                            </Pressable>}
                                        </ScrollView>
                                    </View>
                                    {this.state.custom ?
                                        <View style={[styles.flexOne, styles.marginHorizontal24, styles.marginVertical]}>
                                            <View style={[styles.flexOne, styles.zIndex]}>
                                                <View style={[styles.row, styles.paddingVertical4]}>
                                                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                                                        {`${strings[language].history.start}  `}
                                                    </Text>
                                                    <Text style={[styles.green, styles.fontSize17]}>
                                                        {strings[language].history.date}
                                                    </Text>
                                                </View>
                                                <View style={[styles.radius, styles.marginBottom10, darkMode ? styles.bgLightGray : styles.bgWhite, styles.paddingRegular, styles.row, styles.centerVertical, styles.elevate2]}>
                                                    <View
                                                        style={[styles.flexHalf, styles.centerVertical, styles.flexEndHorizontal, styles.opacity80perc]}>
                                                        <FIcons name={'calendar'} size={14} color={darkMode ? Colors.white : Colors.black} />
                                                    </View>
                                                    <View style={[styles.flexFour]}>
                                                        {showStartDateCalendar ?
                                                            <CalendarPicker
                                                                width={width / 1.3}
                                                                // allowRangeSelection={true}
                                                                onDateChange={this.onDateChange}
                                                                textStyle={[darkMode ? styles.white : styles.black]}
                                                                disabledDatesTextStyle={[darkMode ? { color: '#ffffff26' } : '#00000026']}
                                                                // maxRangeDuration={6}
                                                                maxDate={moment(this.state.date).subtract(1, "days")}
                                                            />
                                                            :
                                                            <TouchableOpacity onPress={this.toggleStartDateCalendar} style={[styles.padding]}>
                                                                <Text style={[styles.paddingLeft8, darkMode ? styles.white : styles.black]}> {strings[language].history.startDate} {startDate}</Text>
                                                            </TouchableOpacity>
                                                        }
                                                    </View>
                                                </View>
                                            </View>

                                            <View style={[styles.flexOne, { zIndex: 1 }]}>
                                                <View style={[styles.row, styles.paddingVertical4]}>
                                                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                                                        {`${strings[language].history.end}  `}
                                                    </Text>
                                                    <Text style={[styles.green, styles.fontSize17]}>
                                                        {strings[language].history.date}
                                                    </Text>
                                                </View>
                                                <View style={[styles.radius, darkMode ? styles.bgLightGray : styles.bgWhite, styles.paddingRegular, styles.row, styles.centerVertical, styles.elevate2]}>
                                                    <View
                                                        style={[styles.flexHalf, styles.centerVertical, styles.flexEndHorizontal, styles.opacity80perc]}>
                                                        <FIcons name={'calendar'} size={14} color={darkMode ? Colors.white : Colors.black} />
                                                    </View>
                                                    <View style={[styles.flexFour]}>
                                                        {showEndDateCalendar ?
                                                            <CalendarPicker
                                                                width={width / 1.3}
                                                                selectedStartDate={this.state.selectedStartDate}
                                                                initialDate={this.state.selectedStartDate}
                                                                disabledDatesTextStyle={[darkMode ? { color: '#ffffff26' } : '#00000026']}
                                                                onDateChange={this.onEndDateChange}
                                                                minDate={moment(this.state.selectedStartDate)}
                                                                maxDate={moment(this.state.selectedStartDate).add(31, "days")}
                                                                // maxDate={moment(this.state.selectedStartDate).add('days', moment(selectedStartDate).daysInMonth()-1)}
                                                                textStyle={[darkMode ? styles.white : styles.black]}
                                                            />
                                                            :
                                                            <TouchableOpacity onPress={this.toggleEndDateCalendar} style={[styles.padding]}>
                                                                <Text style={[styles.paddingLeft12, darkMode ? styles.white : styles.black]}>{strings[language].history.endDate} {endDate}</Text>
                                                            </TouchableOpacity>
                                                        }
                                                    </View>
                                                </View>

                                            </View>


                                            <Text style={[darkMode ? styles.white : styles.black, styles.opacity80perc, styles.textCenter, styles.paddingTop4, styles.paleRed, styles.marginTop10]}>
                                                {strings[language].history.legend}
                                            </Text>


                                            <Text style={[styles.paleRed, styles.selfCenter, styles.regular, styles.paddingVertical]}>
                                                {this.state.error}
                                            </Text>
                                            {!this.state.submit ?
                                                <View style={[styles.allCenter]}>
                                                    <Pressable disabled={this.state.selectedStartDate && this.state.selectedEndDate ? false : true} onPress={() => this.getData()} style={[, this.state.selectedStartDate && this.state.selectedEndDate ? styles.bgGreen : styles.bgDarkGray, styles.allCenter, styles.radius20]}>
                                                        {!this.state.loading ? <Text style={[styles.white, styles.medium, styles.paddingVertical, styles.paddingHorizontal30]}>
                                                            {strings[language].history.submit}
                                                        </Text> :
                                                            <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                                                <Text style={[styles.white, styles.regularPlus]}>{strings[language].history.loading}</Text>
                                                                <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]} />
                                                            </View>}
                                                    </Pressable>
                                                </View>
                                                :
                                                <>
                                                    {this.state.customDateConsumption ?
                                                        <>
                                                                <View style={[{ height: height / 1.9, }]}>
                                                                    <VictoryCustomBarComponent chart={'custom'} consumption={this.state.customDateConsumption} fixed={backgroundFixedBar(this.state.customDateConsumption)} darkMode={darkMode} current={"today"} onPress={() => this.setState({ table: !this.state.table })} table={this.state.table} />
                                                                </View>
                                                                {/* <VictoryCustomBarComponent chart={'custom'} consumption = {this.props.consumptionLogDetails.graphData7} fixed = {backgroundFixedBar(this.state.customDateConsumption)} darkMode = {darkMode}/> */}
                                                                <View>
                                                                    {/* <View style={[styles.marginBottom14, { backgroundColor: this.props.darkMode ? "#3C3C43" : Colors.lightGrey, zIndex: 2 }, styles.radius20, styles.row, styles.allCenter, styles.selfCenter]}>
                                                                        <TouchableOpacity onPress={() => this.setState({ table: !this.state.table })} style={[styles.padding, { backgroundColor: this.state.table ? "#64AE64" : null }, styles.radius20]}>
                                                                            <Icon name={"table"} size={15} color={this.props.darkMode ? Colors.white : Colors.black} />
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() => this.setState({ table: !this.state.table })} style={[styles.padding, { backgroundColor: this.state.table ? null : "#64AE64" }, styles.radius20]}>
                                                                            <Icon name={"bar-chart"} size={15} color={this.props.darkMode ? Colors.white : Colors.black} />
                                                                        </TouchableOpacity>
                                                                    </View> */}
                                                                    <View style={[styles.row, styles.spaceEvenly, { top: -10 }]}>
                                                                        {/* <View style={[styles.marginBottom8, { backgroundColor: this.props.darkMode ? "#3C3C43" : Colors.lightGrey, zIndex: 2 }, styles.radius20, styles.row, styles.allCenter,]}>
                                                                            <TouchableOpacity onPress={() => this.setState({ consumptionType: 1 })} style={[styles.padding, styles.paddingHorizontal16, { backgroundColor: this.state.consumptionType == 1 ? "#64AE64" : null }, styles.radius20]}>
                                                                                <Text style={[this.state.consumptionType == 1 ? styles.white: styles.black]}>Units</Text>
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity  onPress={() => this.setState({ consumptionType: 2 })} style={[styles.padding,  styles.paddingHorizontal16, { backgroundColor: this.state.consumptionType == 1 ? null : "#64AE64" }, styles.radius20]}>
                                                                                <Text style={[this.state.consumptionType == 2 ? styles.white: styles.black]}>Amount</Text>
                                                                            </TouchableOpacity>
                                                                        </View> */}
                                                                        <View style={[styles.marginBottom8, { backgroundColor: this.props.darkMode ? "#3C3C43" : Colors.lightGrey, zIndex: 2 }, styles.radius20, styles.row, styles.allCenter]}>
                                                                            <TouchableOpacity onPress={() => this.setState({ table: !this.state.table })} style={[styles.padding, styles.paddingHorizontal10, { backgroundColor: this.state.table ? "#64AE64" : null }, styles.radius20]}>
                                                                                <Icon name={"table"} size={15} color={this.props.darkMode ? Colors.white : Colors.black} />
                                                                            </TouchableOpacity>
                                                                            <TouchableOpacity onPress={() => this.setState({ table: !this.state.table })} style={[styles.padding, styles.paddingHorizontal10, { backgroundColor: this.state.table ? null : "#64AE64" }, styles.radius20]}>
                                                                                <Icon name={"bar-chart"} size={15} color={this.props.darkMode ? Colors.white : Colors.black} />
                                                                            </TouchableOpacity>
                                                                        </View>
                                                                    </View>
                                                                    <View style={[styles.allCenter, { marginTop: -10 }]}>
                                                                        <View style={[styles.row]}>
                                                                            <Text style={[styles.paddingHorizontal10, styles.paddingTop2]}>
                                                                                <OIcons name='primitive-dot' size={14} color={Colors.green} />
                                                                            </Text>
                                                                            <Text style={[styles.green, styles.selfCenter, styles.fontSize13]}>
                                                                                {strings[language].history.customLegend} {this.state.consumptionType == 1 ? "Units" : "Amount"}
                                                                            </Text>
                                                                        </View>
                                                                        <Text style={[darkMode ? styles.white : styles.black, styles.selfCenter, styles.extraSmall]}>
                                                                            {strings[language].history.graphButton}
                                                                        </Text>
                                                                    </View>
                                                                    {/* <TouchableOpacity style={[styles.bgGreen, styles.radius10, styles.selfCenter, styles.padding, styles.marginTop4, styles.marginBottom16]} onPress={() => this.props.navigation.navigate("horizontalGraph", { data: this.props.consumptionLogDetails.graphData30, type: "Monthly" })}>
                                                                        <Text style={[styles.white, styles.selfCenter, styles.small]}>
                                                                            View Detailed Data
                                                                        </Text>
                                                                    </TouchableOpacity> */}
                                                                </View>
                                                           
                                                            {/* <Pressable onPress={()=>this.captureAndShareScreenshot('CustomGraph')} style={[styles.flexOne, styles.centerVertical, styles.elevatePlus, styles.flexEndHorizontal, styles.marginBottom32]}>
                                                    <View style={[styles.paddingVertical6, styles.paddingHorizontal16, styles.radius16, darkMode ? styles.bgLightGray : styles.bgWhite, styles.row, styles.elevateMild]}>
                                                        <View style={[styles.paddingRight10, styles.opacity50perc, styles.allCenter]}>
                                                            <SLIcons name='share' size={20} color={darkMode ? Colors.white : Colors.black} />
                                                        </View>
                                                        <View>
                                                            <Text style={[styles.regular, styles.lineHeight24, darkMode ? styles.white : styles.black]}>
                                                                {strings[language].history.share}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                </Pressable> */}
                                                        </>
                                                        : <View style={[styles.allCenter, { height: height / 2 }]}>
                                                            <View style={[, styles.selfCenter, { height: 50, width: 50 }]}>
                                                                <LottieView style={[]} source={LOADING.loadingLottie} autoPlay loop />
                                                            </View>
                                                        </View>
                                                    }
                                                    {this.state.error ?
                                                        <Text style={[styles.paleRed, styles.selfCenter, { top: 10 }, styles.regular]}>
                                                            {strings[this.props.language].noDataFound}
                                                        </Text> : null}
                                                </>

                                            }
                                        </View>
                                        :
                                        //android
                                        <>
                                            {this.state.today ?
                                                <>
                                                    <View style={[styles.flexOne, styles.paddingHorizontal10]}>
                                                        <Swiper
                                                            containerStyle={{ height: Dimensions.get("window").height / 1.9 }}
                                                            showsPagination={false}
                                                            showsButtons={false}
                                                            onIndexChanged={this.handleSwipeIndexChange}
                                                            ref={'swiper'}
                                                            loop={false}
                                                            index={this.state.index}
                                                        >
                                                            {/* <VictoryHistoryBarComponent consumption={this.state.today && this.state.today} fixed={backgroundFixedBar(this.state.today)} darkMode={darkMode} current={"today"} onPress={() => this.setState({ table: !this.state.table })} table={this.state.table} /> */}
                                                            <VictoryHistoryBarComponent consumption={this.state.week && this.state.week} fixed={backgroundFixedBar(this.state.week)} darkMode={darkMode} current={"week"} onPress={() => this.setState({ table: !this.state.table })} table={this.state.table} />
                                                            <VictoryHistoryBarComponent consumption={this.state.month && this.state.month} fixed={backgroundFixedBar(this.state.month)} darkMode={darkMode} current={"month"} onPress={() => this.setState({ table: !this.state.table })} table={this.state.table} />
                                                            {!!this.state?.year && <VictoryHistoryBarComponent consumption={this.state?.year && this.state.year} fixed={backgroundFixedBar(this.state.year)} darkMode={darkMode} current={"month"} onPress={() => this.setState({ table: !this.state.table })} table={this.state.table} />}
                                                        </Swiper>
                                                        <View style={[styles.row, styles.spaceEvenly,]}>
                                                            {/* <View style={[styles.marginBottom8, { backgroundColor: this.props.darkMode ? "#3C3C43" : Colors.lightGrey, zIndex: 2 }, styles.radius20, styles.row, styles.allCenter,]}>
                                                                <TouchableOpacity onPress={() => this.setState({ consumptionType: 1 })} style={[styles.padding, styles.paddingHorizontal16, { backgroundColor: this.state.consumptionType == 1 ? "#64AE64" : null }, styles.radius20]}>
                                                                    <Text style={[this.state.consumptionType == 1 ? styles.white: styles.black]}>Units</Text>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity  onPress={() => this.setState({ consumptionType: 2 })} style={[styles.padding,  styles.paddingHorizontal16, { backgroundColor: this.state.consumptionType == 1 ? null : "#64AE64" }, styles.radius20]}>
                                                                    <Text style={[this.state.consumptionType == 2 ? styles.white: styles.black]}>Amount</Text>
                                                                </TouchableOpacity>
                                                            </View> */}
                                                            <View style={[styles.marginBottom8, { backgroundColor: this.props.darkMode ? "#3C3C43" : Colors.lightGrey, zIndex: 2 }, styles.radius20, styles.row, styles.allCenter]}>
                                                                <TouchableOpacity onPress={() => this.setState({ table: !this.state.table })} style={[styles.padding, styles.paddingHorizontal10, { backgroundColor: this.state.table ? "#64AE64" : null }, styles.radius20]}>
                                                                    <Icon name={"table"} size={15} color={this.props.darkMode ? Colors.white : Colors.black} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() => this.setState({ table: !this.state.table })} style={[styles.padding, styles.paddingHorizontal10, { backgroundColor: this.state.table ? null : "#64AE64" }, styles.radius20]}>
                                                                    <Icon name={"bar-chart"} size={15} color={this.props.darkMode ? Colors.white : Colors.black} />
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                        <View style={[styles.paddingBottom, styles.allCenter]}>
                                                            <View style={[styles.row]}>
                                                                <Text style={[styles.paddingHorizontal10, styles.selfCenter]}>
                                                                    {/* <OIcons name='primitive-dot' size={14} color={Colors.green} /> */}
                                                                </Text>
                                                                <Text style={[styles.green, styles.selfCenter, styles.fontSize13]}>
                                                                    {this.state.index == 0 ? strings[language].history.legend1 : null}
                                                                    {this.state.index == 1 ? strings[language].history.legend2 : null}
                                                                    {this.state.index == 2 ? strings[language].history.legend3 : null}
                                                                    {this.state.index == 3 ? strings[language].history.legend4 : null}
                                                                </Text>
                                                            </View>
                                                            <Text style={[darkMode ? styles.white : styles.black, styles.selfCenter, styles.small]}>
                                                                {strings[language].history.graphButton}
                                                            </Text>
                                                            {/* {this.state.index == 0 ? <TouchableOpacity style={[styles.bgGreen, styles.radius10, styles.selfCenter, styles.padding, styles.marginTop4]} onPress={() => this.props.navigation.navigate("horizontalGraph", { data: this.props.consumptionLogHistory.lastOnedayHistory.graphData, type: "Daily" })}>
                                                                <Text style={[styles.white, styles.selfCenter, styles.small]}>
                                                                    View Detailed Data
                                                                </Text>
                                                            </TouchableOpacity> : null} */}
                                                        </View>
                                                    </View>

                                                    <View style={[darkMode ? styles.bgMediumDarkGray : styles.bgWhite, styles.radius10, styles.flex, styles.padding16, styles.marginHorizontal24, styles.marginVertical, styles.elevate2]}>
                                                        <View style={[styles.row]}>
                                                            <View style={[styles.flexTwo]}>
                                                                <View style={[styles.row, styles.paddingBottom4]} >
                                                                    <View>
                                                                        <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                                                            {`${strings[language].history.total}  `}
                                                                        </Text>
                                                                    </View>
                                                                    <View>
                                                                        <Text style={[styles.medium, styles.green]}>
                                                                            {strings[language].history.consumption}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                                <View style={[styles.row, styles.bottomHorizontal, styles.flexOne, darkMode ? styles.white : styles.black]}>
                                                                    <StaticBarComponent darkMode={darkMode} data={data} width={width / 30} />
                                                                </View>
                                                            </View>
                                                            <View style={[styles.flexOneAndHalf, styles.flexEndHorizontal, styles.centerVertical]}>
                                                                <View style={[styles.row]}>
                                                                    {/* <Text style={[darkMode ? styles.white : styles.black, styles.small, styles.opacity80perc]}>
                                                                        {this.state.currentMonth}
                                                                    </Text> */}
                                                                    <View style={[{ margin: -2 }]}>
                                                                        <MIcons name='keyboard-arrow-up' size={20} color={Colors.darkGreen} />
                                                                    </View>
                                                                </View>
                                                                <View style={[]}>
                                                                    <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.green, styles.mediumLarge]}>
                                                                        {this.state.index == 0 ? this.state.todayConsumption.total == -1 ? "" : this.state.todayConsumption.total : null}
                                                                        {this.state.index == 1 ? this.state.weekConsumption.total == -1 ? "" : this.state.weekConsumption.total : null}
                                                                        {this.state.index == 2 ? this.state.monthConsumption.total == -1 ? "" : this.state.monthConsumption.total : null}
                                                                        {this.state.index == 3 ? this.state.yearConsumption.total == -1 ? "" : this.state.yearConsumption.total : null}
                                                                    </Text>
                                                                </View>
                                                                <View style={[]} >
                                                                    <Text style={[darkMode ? styles.white : styles.black, styles.small, styles.lineHeight18p]} >
                                                                        {strings[language].history.units}
                                                                    </Text>
                                                                </View>
                                                            </View>

                                                        </View>
                                                    </View>
                                                    <View style={[darkMode ? styles.bgMediumDarkGray : styles.bgWhite, styles.radius10, styles.flexOne, styles.padding16, styles.marginHorizontal24, styles.marginVertical, styles.elevate2]}>
                                                        <View style={[styles.row]}>
                                                            <View style={[styles.flexOneAndHalf, styles.centerVertical]}>
                                                                <View style={[styles.row]}>
                                                                    <View style={[{ margin: -2 }]}>
                                                                        <MIcons name='keyboard-arrow-up' size={20} color={Colors.darkGreen} />
                                                                    </View>
                                                                    {/* <Text style={[darkMode ? styles.white : styles.black, styles.small, styles.opacity80perc]}>
                                                                        {this.state.currentMonth}
                                                                    </Text> */}

                                                                </View>
                                                                <View style={[]}>
                                                                    <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.green, styles.mediumLarge]}>
                                                                        {this.state.index == 0 ? this.state.todayConsumption?.average == -1 ? "" : this.state.todayConsumption.average : null}
                                                                        {this.state.index == 1 ? this.state.weekConsumption?.average == -1 ? "" : this.state.weekConsumption.average : null}
                                                                        {this.state.index == 2 ? this.state.monthConsumption?.average == -1 ? "" : this.state.monthConsumption.average : null}
                                                                        {this.state.index == 3 ? this.state.yearConsumption?.average == -1 ? "" : this.state.yearConsumption.average : null}
                                                                    </Text>
                                                                </View>
                                                                <View style={[]} >
                                                                    <Text style={[darkMode ? styles.white : styles.black, styles.small, styles.lineHeight18p]} >
                                                                        {strings[language].history.units}
                                                                    </Text>
                                                                </View>
                                                            </View>
                                                            <View style={[styles.flexTwo, styles.flexEndHorizontal]}>
                                                                <View style={[styles.row, styles.paddingBottom4]} >
                                                                    <View>
                                                                        <Text style={[darkMode ? styles.white : styles.black, styles.medium,]}>
                                                                            {`${strings[language].history.average}  `}
                                                                        </Text>
                                                                    </View>
                                                                    <View>
                                                                        <Text style={[styles.medium, styles.green]}>
                                                                            {strings[language].history.consumption}
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                                <View style={[styles.row, styles.bottomHorizontal, styles.flexOne, darkMode ? styles.white : styles.black]}>
                                                                    <StaticBarComponent darkMode={darkMode} data={data} width={width / 30} />
                                                                </View>
                                                            </View>
                                                        </View>
                                                    </View>


                                                    {/* {this.state.index === 0 &&
                            <View style={[darkMode ? styles.bgMediumDarkGray : styles.bgWhite, styles.radius10, styles.flexOne, styles.padding16, styles.marginHorizontal24, styles.marginVertical, styles.elevate2]}>
                                <FlatList data={nqqqc} renderItem={(item)=>
                            <View style={[styles.row]}>
                                    <View style={[styles.flexTwo]}>
                                        <View style={[styles.row, styles.paddingBottom4]} >
                                            <View>
                                                <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
                                                    Year    
                                                </Text>
                                            </View>
                                            <View>
                                                <Text style={[styles.medium, styles.green]}>  2022</Text>
                                            </View>
                                        </View>
                                        <View style={[styles.row, styles.bottomHorizontal, styles.flexOne, darkMode ? styles.white : styles.black]}>
                                            <StaticBarComponent darkMode={darkMode} data={data} width={width/30}/>    
                                        </View>
                                    </View>
                                    <View style={[styles.flexOneAndHalf, styles.flexEndHorizontal, styles.centerVertical]}>
                                        <View style={[styles.row]}>
                                            <Text style={[darkMode ? styles.white : styles.black, styles.small, styles.opacity80perc]}>
                                                {this.state.currentMonth}
                                            </Text>
                                            <View style={[{margin:-2}]}>
                                                <MIcons name='keyboard-arrow-up' size={20} color={Colors.darkGreen} />
                                            </View>
                                        </View>
                                        <View style={[]}>
                                            <Text ellipsizeMode='tail' numberOfLines={1} style={[styles.green, styles.mediumLarge]}>
                                                {this.state.index == 0 ? this.state.todayConsumption.total == -1 ? 0 : this.state.todayConsumption.total : null}
                                                {this.state.index == 1 ? this.state.weekConsumption.total == -1 ? 0 : this.state.weekConsumption.total : null}
                                                {this.state.index == 2 ? this.state.monthConsumption.total == -1 ? 0 : this.state.monthConsumption.total : null}
                                            </Text>
                                        </View>
                                        <View style={[]} >
                                            <Text style={[darkMode ? styles.white : styles.black, styles.small, styles.lineHeight18p]} >
                                                {strings[language].history.units}
                                            </Text>
                                        </View>
                                    </View>
                                   
                                </View>}/>
                                </View>} */}



                                                    {/* <Pressable onPress={()=>this.captureAndShareScreenshot('FixedGraph')} style={[styles.flexOne, styles.centerVertical, styles.elevatePlus, styles.flexEndHorizontal, styles.marginHorizontal24, styles.extraMarginVertical, styles.marginBottom32]}>
                                <View style={[styles.paddingVertical6, styles.paddingHorizontal16, styles.radius16, darkMode ? styles.bgLightGray : styles.bgWhite, styles.row, styles.elevateMild]}>
                                    <View style={[styles.paddingRight10, styles.opacity50perc, styles.allCenter]}>
                                        <SLIcons name='share' size={20} color={darkMode ? Colors.white : Colors.black} />
                                    </View>
                                    <View>
                                        <Text style={[styles.regular, styles.lineHeight24, darkMode ? styles.white : styles.black]}>
                                            {strings[language].history.share}
                                        </Text>
                                    </View>
                                </View>
                            </Pressable> */}

                                                    <View style={[styles.flexOne, styles.marginBottom14]}>
                                                        <View style={[styles.flexTwo, styles.allCenter, styles.paddingVertical12]}>
                                                            <View style={[styles.centerVertical, { flexDirection: 'row' }]}>
                                                                <Text style={[darkMode ? styles.white : styles.black, styles.normal, { paddingRight: 5, fontWeight: '600' }]}>
                                                                    {"Disclaimer :"}
                                                                </Text>
                                                                {/* <Text style={[darkMode ? styles.white : styles.black, styles.normal, { fontWeight: '500' }]}>
                                                {this.state?.date}
                                            </Text> */}
                                                            </View>
                                                            <View style={[styles.row, styles.flexStartHorizontal, { paddingTop: 2, paddingBottom: 5, paddingLeft: 19, paddingRight: 20, flexWrap: 'nowrap' }]}>
                                                                <Text style={[styles.green, { fontSize: 13, fontFamily: 'Roboto-Regular', fontStyle: 'italic' }]}>
                                                                    {"The displayed consumption is only for information purposes and might be estimated in some cases, so please do not infer this as the exact biliing for consumption"}
                                                                </Text>
                                                                <Text style={[styles.green, styles.regular, styles.paddingVertical2]}>
                                                                    {``}
                                                                </Text>
                                                            </View>

                                                        </View>
                                                    </View>
                                                </>
                                                : <View style={[styles.allCenter, { height: height / 2 }]}>
                                                    <View style={[, styles.selfCenter, { height: 50, width: 50 }]}>
                                                        <LottieView style={[]} source={LOADING.loadingLottie} autoPlay loop />
                                                    </View>
                                                </View>
                                            }
                                        </>

                                    }

                            </>}
                    </ScrollView>
                </View>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps(state) {
    return {
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        language: commonSelectors.language(state),
        consumptionLogHistory: commonSelectors.consumptionLogHistory(state),
        consumptionLogDetails: commonSelectors.consumptionLogDetails(state),
        currentRoute: commonSelectors.currentRoute(state),

    }
}
function mapDispatchToProps(dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state = false) => dispatch(logout(state)),
        setConsumptionLogHistory: (data = {}) => dispatch(userDetailActions.setConsumptionLogHistory(data)),
        setConsumptionLogDetails: (data = {}) => dispatch(userDetailActions.setConsumptionLogDetails(data)),
        setCurrentRoute: (data = {}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const HistoryScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(History);
export { HistoryScreen }