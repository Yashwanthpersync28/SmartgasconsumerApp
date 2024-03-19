import React from 'react';
import { connect } from "react-redux";
import {Text, View, StatusBar, TouchableOpacity, ScrollView, Dimensions, Pressable, ActivityIndicator, RefreshControl} from 'react-native';
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
import FIcons from 'react-native-vector-icons/Feather';
// Libraries
import CalendarPicker from 'react-native-calendar-picker';
import moment from "moment"
// Backend
import {strings} from "SmartgasConsumerApp/js/strings";
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import * as dashboard from "../../api/dashboard";
import {apiDispatcher, userDetailActions} from "../../actions";
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';


const {height, width} = Dimensions.get('window');

class CheckPrograms extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            selectDate: 'DD/MM/YYYY - DD/MM/YYYY',
            showDateCalendar: false,
            selectedStartDate: null,
            selectedEndDate: null,
        }
        this.onDateChange = this.onDateChange.bind(this);

    }

    async componentDidMount(): void {
        this.syncData()

        const didFocusSubscription = this.props.navigation.addListener(
            'focus',
            payload => {
                if (this.props.currentRoute !== 'CheckPrograms') {
                    this.props.setCurrentRoute('CheckPrograms');
                    this.syncData()
                }
            }
        );
    }

    onRefresh = () => {
        this.setState({refreshing: true});

        this.setState({selectedStartDate: null, selectedEndDate: null, refreshing: false})
    };

    getData = async () => {
        this.setState({loading: true,},async()=>{
        try {
            console.log("Check Programs")
            let data = await this.props.apiDispatcher(dashboard.checkProgramsApi(
                moment(this.state.selectedStartDate).format("YYYY-MM-DD"), 
                moment(this.state.selectedEndDate).format("YYYY-MM-DD")
            ))
            this.setState({ data: data })
            console.log("Check Programs",data.data);
            this.props.setCheckPrograms(data.data);
            this.setState({loading: false})
            this.props.navigation.navigate('/DRProgram/CheckProgram/ProgramList')

        } catch (e) {
            this.setState({loading: false})
        }
        })
    };

    toggleDateCalendar = () => {
        this.setState({
            showDateCalendar: !this.state.showDateCalendar

        })
    };

    onDateChange(date, type) {
        if (type === 'END_DATE') {
          this.setState({
            selectedEndDate: date,
            showDateCalendar: false
          });
        } else {
          this.setState({
            selectedStartDate: date,
            selectedEndDate: null,
          });
        }
      }

    render(){
        const {language, darkMode} = this.props;
        const { selectedStartDate, showDateCalendar, showEndDateCalendar, selectedEndDate } = this.state;
        const startDate = selectedStartDate ? moment(selectedStartDate).format("DD-MM-YY") : '';
        const endDate = selectedEndDate ? moment(selectedEndDate).format("DD-MM-YY") : '';

        return(
            <ErrorBoundaryMainComponent>
            <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal16]} >
                { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
                <ScrollView showsVerticalScrollIndicator={false}
                      refreshControl={
                        <RefreshControl
                            tintColor={Colors.sunglowYellow}
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh} />
                    }
                >
                    <View style={[styles.marginBottom, styles.paddingHorizontal]}>
                        <View style={[ styles.row, styles.marginVertical]}>
                            <Text style={[darkMode ? styles.white : styles.black,  styles.medium]}>
                                {`${strings[language].checkPrograms.search}  `}
                            </Text>
                            <Text style={[styles.green,  styles.medium]}>
                                {strings[language].checkPrograms.upcomingProgram}
                            </Text>
                        </View>
                        <View style={[]}>
                            <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
                                {strings[language].checkPrograms.headerContext}
                            </Text>
                        </View>
                    </View>
                    <View style={[, styles.paddingHorizontal]}>
                        <View style={[ styles.row, styles.marginVertical10]}>
                            <Text style={[darkMode ? styles.white : styles.black,  styles.regular]}>
                                {`${strings[language].checkPrograms.period}  `}
                            </Text>
                            <Text style={[styles.green,  styles.regular]}>
                                {strings[language].checkPrograms.duration}
                            </Text>
                        </View>
                        <View style={[styles.radius, styles.marginBottom10, darkMode ? styles.bgLightGray : styles.bgWhite, styles.paddingRegular, styles.row, styles.centerVertical, styles.elevate2]}>
                            <View
                                style={[styles.flexHalf, styles.centerVertical, styles.flexEndHorizontal, styles.opacity80perc]}>
                                <FIcons name={'calendar'} size={14} color={darkMode ? Colors.white : Colors.black}/>
                            </View>
                            <View style={[styles.flexFour]}>
                                {this.state.showDateCalendar ?
                                    <CalendarPicker
                                        allowRangeSelection={true}
                                        width={width/1.3}
                                        onDateChange={this.onDateChange}
                                        minDate={moment(this.state.date)}
                                        disabledDatesTextStyle={[darkMode ? {color: '#ffffff26'} : '#00000026']}
                                        textStyle={[darkMode ? styles.white : styles.black]}
                                    /> 
                                :
                                    <TouchableOpacity onPress={this.toggleDateCalendar} style={[styles.padding]}>
                                        <Text style={[styles.paddingLeft8, darkMode ? styles.white : styles.black]}>  { this.state.selectedEndDate ?  `${moment(selectedStartDate).format("DD-MM-YYYY")} -  ${moment(selectedEndDate).format("DD-MM-YYYY")}` : this.state.selectDate }</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                        <View style={[styles.allCenter, styles.extraMarginVertical]}>
                            <Pressable onPress={this.getData}
                                disabled={this.state.selectedStartDate && this.state.selectedEndDate ? false : true}
                                style={[
                                    this.state.selectedStartDate && this.state.selectedEndDate ?
                                    styles.bgDarkGreen : styles.bgDarkGray,
                                    styles.padding2, styles.allCenter, styles.radius18]}>
                                    {!this.state.loading ? <Text style={[styles.white,  styles.fontSize19,  styles.paddingVertical6, styles.paddingHorizontal30]}>
                                        {strings[language].checkPrograms.submit}
                                    </Text> :
                                    <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
                                        <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
                                        <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
                                    </View>}
                            </Pressable>
                        </View>
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
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        // checkPrograms: commonSelectors.checkPrograms(state),
        currentRoute: commonSelectors.currentRoute(state),
    }
}
function mapDispatchToProps (dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state=false) => dispatch(logout(state)),
        setCheckPrograms: (data={}) => dispatch(userDetailActions.setCheckPrograms(data)),
        setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
    }
}
const CheckProgramsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(CheckPrograms);
export {CheckProgramsScreen}
