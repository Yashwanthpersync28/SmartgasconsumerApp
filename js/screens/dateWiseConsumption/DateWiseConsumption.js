import React from 'react';
import { Text, View, Dimensions, Platform, TouchableOpacity, Pressable, ActivityIndicator } from 'react-native';
import { connect } from "react-redux";
// Styles and Colors
import { styles } from "../../styles/styles"
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Actions
import {userDetailActions, apiDispatcher} from "SmartgasConsumerApp/js/actions";
import { showLogout } from "SmartgasConsumerApp/js/actions/commonActions";
// Libraries
// Components
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
import FIcons from 'react-native-vector-icons/Feather';

// Constants
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import * as dashboard from "../../api/dashboard";
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { setDateWiseConsumption, setLiveData } from '../../actions/userDetailsActions';
import moment from "moment"
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
import CalendarPicker from 'react-native-calendar-picker';

class DateWiseConsumption extends React.Component{

    constructor(props) {
        super(props);
        this.state={
            dateWiseConsumption: [],
            showStartDateCalendar: false,
            showStartEndCalendar: false,
            error:''
        };
        console.log("Props Live",this.props);
    }

    async componentDidMount(): void {

        // this.syncData()
        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'DateWise') {
                    this.props.setCurrentRoute('DateWise');
                    // this.syncData()
                }
            }
        );
        this.props.setCurrentRoute('DateWise');
        // this.setState({error:""})

    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if(this.props.overview !== prevProps.overview) {
            let data = this.props.overview ? JSON.parse(JSON.stringify(this.props.overview)) : [];
        }

        if(this.props.activeCount !== prevProps.activeCount) {
            // this.syncData();
        }
        // this.setState({error:""})
    }

    syncData = async () => {
        try {
            this.setState({loading: true})
            let dateWise = await this.props.apiDispatcher(dashboard.dateWiseConsumptionApi(moment(this.state.selectedStartDate).format("YYYY-MM-DD"),moment(this.state.selectedEndDate).format("YYYY-MM-DD")))

            console.log("Date Wise Consumption", dateWise);
            if(dateWise.data.message){
                this.props.setDateWiseConsumption([])
                this.setState({loading:false,submit: false,error: dateWise.data.message, dateWiseConsumption: []})
                setDateWiseConsumption(dateWise.data)
            } else {
                this.props.setDateWiseConsumption(dateWise.data)
                this.setState({loading:false,submit: false,error:" ",dateWiseConsumption:dateWise.data.reverse()})
                setDateWiseConsumption(dateWise.data)
            }
          
            console.log("Date Wise consumption", dateWise);
        } catch (e) {
            console.log("Error in date wise consumption",e);
        }
    }

    onDateChange = (date) => {
        let endDate = moment(date).add(30, 'd');

        this.setState({
            selectedStartDate: date.toISOString(),
            showStartDateCalendar: false,
            selectedEndDate:endDate.toISOString(),
            submit: false
        });
        console.log('Date,',date, this.state.selectedStartDate);
    };

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

    onRefresh = () => {
        this.setState({refreshing: true});
        // this.syncData()
    };

    renderItem = ({item, index}) => {
        const { language, darkMode } = this.props;

        const TextComponent = ({title}) => {
            return(
                <Text style={[darkMode ? styles.white : styles.black,styles.padding6,styles.fontSize15,{borderColor:darkMode? Colors.white: Colors.black ,borderWidth:0.3}, styles.flexOne]}>{title}</Text>
            )
        }

        return(
            <View style={[styles.flexOne, {flexDirection: 'column'}]}>
                <TextComponent  title={item.consumptionDate}/>
                <TextComponent  title={item.fixedCharges}/>
                <TextComponent  title={item.energyCharges}/>
                <TextComponent  title={item.meterRent}/>
                <TextComponent  title={item.installment}/>
                <TextComponent  title={item.arrearPay}/>
                <TextComponent  title={item.rechargeAmount}/>
                <TextComponent  title={item.billSettlement}/>
                <TextComponent  title={item.temporaryDeferment}/>
                <TextComponent  title={item.rechargeCancellation}/>
                <TextComponent  title={item.invoiceSettlement}/>
                {/* <TextComponent  title={item.consumptionDate}/> */}
                <TextComponent  title={item.openingBalance}/>
                <TextComponent  title={item.closingBalance}/>
                <TextComponent  title={item.currentReading}/>
                <TextComponent  title={item.previousReading}/>
                <TextComponent  title={item.dayConsumption}/>
                <TextComponent  title={item.totalDeduction}/>
                {/* <TextComponent  title={item.arrearsCharges}/> */}
            </View>   
        )
    }
   
    render(){

        const { language, darkMode } = this.props;
        const { height, width } = Dimensions.get('window')
        console.log("DateWise propss", this.props);
        const { selectedStartDate, showStartDateCalendar, showEndDateCalendar, selectedEndDate } = this.state;
        const startDate = selectedStartDate ? moment(selectedStartDate).format("DD-MM-YY") : '';
        const endDate = selectedEndDate ? moment(selectedEndDate).format("DD-MM-YY") : '';


        const TextComponent = ({title, style}) => {
            return(
                <Text style={[darkMode ? styles.white : styles.black,styles.padding6,styles.fontSize15,{borderColor:darkMode? Colors.white: Colors.black ,borderWidth:0.3}, styles.flexOne, style]}>{title}</Text>
            )
        }

        return(
            <ErrorBoundaryMainComponent>
            <ScrollView style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader]}>
                <View style={[styles.row,styles.paddingHorizontal24]}>
                    <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17]}>
                        Date Wise
                    </Text>
                    <Text style={[styles.green, styles.fontSize17]}>
                        {" Consumption"}
                    </Text>
                </View>
                <View style={[ styles.marginHorizontal24, styles.marginVertical]}>
                                <View style={[ styles.zIndex]}>
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
                                            <FIcons name={'calendar'} size={14} color={darkMode ? Colors.white : Colors.black}/>
                                        </View>
                                        <View style={[styles.flexFour]}>
                                            {showStartDateCalendar ?
                                                <CalendarPicker
                                                    width={width/1.3}
                                                    // allowRangeSelection={true}
                                                    onDateChange={this.onDateChange}
                                                    textStyle={[darkMode ? styles.white : styles.black]}
                                                    disabledDatesTextStyle={[darkMode ? {color: '#ffffff26'} : '#00000026']}
                                                    // maxRangeDuration={6}
                                                    maxDate={moment(this.state.date).subtract(1, "days")}
                                                /> 
                                            :
                                                <TouchableOpacity onPress={this.toggleStartDateCalendar} style={[styles.padding]}>
                                                    <Text style={[styles.paddingLeft8, darkMode ? styles.white : styles.black]}> {strings[language].history.startDate} { startDate }</Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                </View>
                                
                                <View style={[ { zIndex: 1 } ]}>
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
                                            <FIcons name={'calendar'} size={14} color={darkMode ? Colors.white : Colors.black}/>
                                        </View>
                                        <View style={[styles.flexFour]}>
                                            {showEndDateCalendar ?
                                                <CalendarPicker
                                                    width={width/1.3}
                                                    selectedStartDate={this.state.selectedStartDate}
                                                    initialDate={this.state.selectedStartDate}
                                                    disabledDatesTextStyle={[darkMode ? {color: '#ffffff26'} : '#00000026']}
                                                    onDateChange={this.onEndDateChange}
                                                    minDate={moment(this.state.selectedStartDate)}
                                                    maxDate={moment(this.state.selectedStartDate).add(31,"days")}
                                                    // maxDate={moment(this.state.selectedStartDate).add('days', moment(selectedStartDate).daysInMonth()-1)}
                                                    textStyle={[darkMode ? styles.white : styles.black]}
                                                /> 
                                            :
                                                <TouchableOpacity onPress={this.toggleEndDateCalendar} style={[styles.padding]}>
                                                    <Text style={[styles.paddingLeft12, darkMode ? styles.white : styles.black]}>{strings[language].history.endDate} { endDate }</Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                </View>
                                <Text style={[darkMode ? styles.white : styles.black, styles.opacity80perc, styles.textCenter, styles.paddingTop4, styles.paleRed,styles.marginTop10]}>
                                    {strings[language].history.legend}
                                </Text>
                                <Text style={[styles.paleRed, styles.selfCenter, styles.regular, styles.paddingVertical]}>
                                        {this.state.error}
                                    </Text>

                                { !this.state.submit ?
                                    <View style={[styles.allCenter]}>
                                        <Pressable disabled={this.state.selectedStartDate && this.state.selectedEndDate ? false : true} onPress={() => this.syncData()} style={[, this.state.selectedStartDate && this.state.selectedEndDate ? styles.bgGreen : styles.bgDarkGray, styles.allCenter, styles.radius20]}>
                                            {!this.state.loading ? <Text style={[styles.white, styles.medium, styles.paddingVertical, styles.paddingHorizontal30]}>
                                                {strings[language].history.submit}
                                            </Text> :
                                            <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                                <Text style={[styles.white, styles.regularPlus]}>{strings[language].history.loading}</Text>
                                                <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
                                            </View>}
                                        </Pressable>
                                    </View> 
                                :
                                <Text>Submitted</Text>
                            }
                        </View>
                        <View style={[styles.flexOne,styles.paddingHorizontal20]}>
                            { this.props.dateWiseConsumption.length == 0 ? null : 
                                <View style={[ styles.flexOne, styles.row, darkMode ? styles.bgLightGray : styles.bgWhite, styles.padding16, styles.radius10, styles.marginBottom30Percent]} >
                                    <View style={[]}>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Consumption Date"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Fixed Charges"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Energy Charges"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Meter Rent"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Installment"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Arrear Pay"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Recharge Amount"}/>
                                        {/* Data not available */}
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Bill Settlement"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Temporary Deferment"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Recharge Cancellation"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Invoice Settlement"}/>
                                        {/* <TextComponent title={"Date"}/> */}
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Opening Balance"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Closing Balance"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Current Reading"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Previous Reading"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Day Consumption"}/>
                                        <TextComponent style={[{fontWeight: "bold"}]} title={"Total Deduction"}/>
                                        {/* <TextComponent title={"Day Consumption"}/> */}
                                        {/* <TextComponent title={"Arrears Charges"}/> */}
                                    </View>
                                    <FlatList
                                        horizontal
                                        data={this.props.dateWiseConsumption}
                                        renderItem = {this.renderItem}
                                    />
                                </View>
                            }
                        </View>
                </ScrollView>
            </ErrorBoundaryMainComponent>
        );
    }
}

function mapStateToProps (state) {
    return {
        language: commonSelectors.language(state),
        darkMode: commonSelectors.darkMode(state),
        userDetails: commonSelectors.userDetails(state),
        dateWiseConsumption: commonSelectors.dateWiseConsumption(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        showLogout: (state=true) => dispatch(showLogout(state)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
        setDateWiseConsumption: (data={}) => dispatch(userDetailActions.setDateWiseConsumption(data)),
    }
}
const DateWiseConsumptionScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(DateWiseConsumption);
export {DateWiseConsumptionScreen}
