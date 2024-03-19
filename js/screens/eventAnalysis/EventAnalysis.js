// import React from 'react';
// import { connect } from "react-redux";
// import {Text, View, StatusBar, FlatList, Pressable, ScrollView, TouchableOpacity, Platform, Dimensions, RefreshControl, ActivityIndicator} from 'react-native';
// // Styles and Colors
// import { styles } from 'SmartgasConsumerApp/js/styles';
// import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// // Component
// import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound'
// // Icons
// import CheckBox from '@react-native-community/checkbox';
// import SLIcons from 'react-native-vector-icons/SimpleLineIcons';
// import FIcons from 'react-native-vector-icons/Feather';
// import MIcons from 'react-native-vector-icons/MaterialIcons';

// // Libraries
// import CalendarPicker from 'react-native-calendar-picker';
// import DropDownPicker from 'react-native-dropdown-picker';
// // Backend
// import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
// import {strings} from "SmartgasConsumerApp/js/strings";
// import moment from "moment"
// import {apiDispatcher, userDetailActions} from "../../actions";
// import * as dashboard from "../../api/dashboard";
// import {chartDataWithoutDate} from "../../helpers/common/chartDataHelper";
// import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

// const {height, width} = Dimensions.get('window');

// let monthConst = [
//     {label: 'Jan', value: 1},
//     {label: 'Feb', value: 2},
//     {label: 'Mar', value: 3},
//     {label: 'Apr', value: 4},
//     {label: 'May', value: 5},
//     {label: 'Jun', value: 6},
//     {label: 'Jul', value: 7},
//     {label: 'Aug', value: 8},
//     {label: 'Sept', value: 9},
//     {label: 'Oct', value: 10},
//     {label: 'Nov', value: 11},
//     {label: 'Dec', value: 12},
// ]

// class EventAnalysis extends React.Component{

//     constructor(props){
//         super(props)
//         this.state = {
//             submit: false,
//             showStartDateCalendar: false,
//             showStartEndCalendar: false,
//             categories: [],
//             isVisibleA: false,
//             monthList: monthConst,
//             yearList: "asdf",
//             isVisibleB: false,
//             // event: 'dropVoltage'
//         }
//         this.controller;
//     }
//     changeVisibility(state) {
//         this.setState({
//             isVisibleA: false,
//             isVisibleB: false,
//             ...state
//         });
//     }

//     async componentWillMount(){
//         this.trimYear()
//     }

//     async componentDidMount(): void {

//         this.syncData()

//         const didFocusSubscription = this.props.navigation.addListener(
//             'focus',
//             payload => {
//                 if (this.props.currentRoute !== 'eventAnalysis') {
//                     this.props.setCurrentRoute('eventAnalysis');
//                     this.syncData()
//                 }
//             }
//         );
        
//     }

//     syncData = async () => {
//         try {
//             let data = await this.props.apiDispatcher(dashboard.eventCategoriesApi(this.props.language == 'english' ? 1 : 2 ));
//             if(data.status == 200){
//                 data = data.data.map(d=> {let data= {}; data.label=d.event_Name; data.value = d.id; return data;})
//                 this.setState({categories: data, noData: false});
//             } else if(data.status == 204){
//                 this.setState({noData: true})
//             }
            
           
//         } catch (e) {
//             this.setState({refreshing: false})
//         }
//     }
//     onRefresh = () => {
//         this.setState({refreshing: true});
//         this.syncData()

//     };

//     onDateChange = (date) => {
//         this.setState({
//             selectedStartDate: date,
//             showStartDateCalendar: false,
//             submit: false
//         });
//     };

//     onEndDateChange = (date) => {
//         this.setState({
//             selectedEndDate: date,
//             showEndDateCalendar: false,
//             submit: false
//         });
//     };

//     toggleStartDateCalendar = () => {
//         this.setState({
//             showStartDateCalendar: !this.state.showStartDateCalendar

//         })
//     };

//     toggleEndDateCalendar = () => {
//         this.setState({
//             showEndDateCalendar: !this.state.showEndDateCalendar

//         })
//     }

//     toggleCheckBox = (value,type) =>{
//         this.setState({submit: false, type, month: '', monthYear: '', year: '', selectedStartDate: false, selectedEndDate: false,})
//         if(type=='daily'){
//             this.setState({daily: value})
//             if(value)
//             this.setState({yearly:false,  monthly: false, loading: false })
//         }
//         if(type=='yearly'){
//             this.setState({yearly: value})
//             if(value)
//             this.setState({daily: false, monthly: false , loading: false})
//         }
//         if(type=='monthly'){
//             this.setState({monthly: value, })
//             if(value)
//                 this.setState({daily: false, yearly: false, loading: false})
//         }
//     };

//     trimMonth = (year) => {
//         let month = moment(new Date()).format('M')
//         let currentYear = moment(new Date()).format('YYYY')

//         console.log('MOnt',month,year, currentYear);
//         const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec" ]
//         var data = [];     
//         if(currentYear == year){
//             console.log('Year Condition', this.state.defaultMonth);
//             for(var i = 0; i < month; i++){
//                 var obj = {}; 
//                 obj['label'] = months[i];
//                 obj['value'] = i+1;
//                 data.push(obj);
//             }
//             // this.state.monthList ? this.setState({ monthList: '' }) :
//             // this.controller.resetItems(data)
//             this.setState({defaultMonth: null, monthList: data})
//             console.log('Year Condition After', this.state.defaultMonth);

//         }
//         else
//         this.setState({monthList: monthConst})
//     }

//     trimYear =  () => {
//         // let currentYear = 2030
//         let currentYear = moment(new Date()).format('YYYY')

//         console.log('Year asdf', currentYear);
//         var data = [];     
//         // if(currentYear == year){
//             for(var i = 2019; i <= currentYear; i++){
//                 var obj = {}; 
//                 obj['label'] = `${i}`;
//                 obj['value'] = i;
//                 data.push(obj);
//             }
//              this.setState({yearList: data})
//             console.log('THi.', data, this.state.yearList);
//         // }
//         // else
//         // this.setState({yearList: monthConst})
//     }

//     getData = async () => {
//         this.setState({loading: true,},async()=>{
//         try {
//             console.log("EventAnalysis")
//             let data = await this.props.apiDispatcher(dashboard.eventAnalysisApi(this.getSamplingFreq(), this.state.event,  {
//                 "SDate": !this.state.selectedStartDate  ? "" : moment(this.state.selectedStartDate).format("YYYY-MM-DD"),
//                 "EDate": !this.state.selectedStartDate  ? "" :  moment(this.state.selectedEndDate).format("YYYY-MM-DD")
//             }, {
//                 "M": this.state.month ? this.state.month : 0,
//                 "Y": this.state.monthYear ? this.state.monthYear : 0
//             }, this.state.year ? this.state.year : 0))
//             this.setState({ data: data })
//             console.log("EventAnalysis",data.data);
//             this.props.setEventAnalysis(data.data);
//             this.setState({loading: false})
//         } catch (e) {
//             this.setState({loading: false})
//         }
//         })
//     };

//     getSamplingFreq = () => {
//       if (this.state.daily) {
//           return "Daily"
//       } else if (this.state.monthly) {
//           return "Monthly"
//       } else {
//           return "Yearly"
//       }
//     };

//     renderItem = ({item, index}) => {
//         console.log('Event type', this.state.type)
//         return (

//             <View style={[]}>
//                 <View style={[styles.row, styles.spaceBetween]}>
//                     <Text style={[{flex:.68}, styles.fontSize11,  this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
//                         {this.state.type=='yearly' ? item.monthName :  moment(item.logDate).format("DD/MM") }
//                     </Text>
//                     <Text style={[styles.flexOneAndQuarter, styles.fontSize11, styles.padding, this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
//                         { item.eventName }
//                     </Text>
//                     <Text style={[styles.flexHalf, styles.fontSize11, styles.padding,  this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
//                         { item.eventCount }
//                     </Text>
//                     <Text style={[styles.flexHalf, styles.fontSize11, styles.padding,  this.props.darkMode ? styles.white : styles.black, styles.opacity80perc]}>
//                         { item['duration(Min)'] }

//                     </Text>
//               </View>
//               <View style={[{ borderBottomWidth:0.7 }, styles.opacity25perc, styles.paddingTop2, this.props.darkMode ?{ borderColor:Colors.white } : { borderColor:Colors.black }]}/>
//             </View>
//         );
//     };

//     componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
//         if(this.props.eventAnalysis !== prevProps.eventAnalysis) {
//             let data = this.props.eventAnalysis ? JSON.parse(JSON.stringify(this.props.eventAnalysis)) : [];
//             console.log(data, this.props.eventAnalysis)
//             this.setState({ refreshing: false })
//             if (this.props.eventAnalysis) {
//                 this.setState({
//                     eventAnalysis: data,
//                     refreshing: false,
//                     submit: true
//                 }, () => console.log(this.state))
//             }
//         }

//         if(this.props.activeCount !== prevProps.activeCount) {
//             this.syncData();
//         }
//     }

//     render(){
//         const { selectedStartDate, showStartDateCalendar, showEndDateCalendar, selectedEndDate } = this.state;
//         const startDate = selectedStartDate ? moment(selectedStartDate).format("DD-MM-YY") : '';
//         const endDate = selectedEndDate ? moment(selectedEndDate).format("DD-MM-YY") : '';


//         const {language, darkMode} = this.props;
//         return(
//             <ErrorBoundaryMainComponent>
//             <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal16]} >
//                 { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
//                 <ScrollView showsVerticalScrollIndicator={false}
//                     // refreshControl={
//                     //     <RefreshControl
//                     //         tintColor={Colors.sunglowYellow}
//                     //         refreshing={this.state.refreshing}
//                     //         onRefresh={this.onRefresh} />
//                     // }
//                 >
//                     {this.state.noData ?
//                         <View style={[ styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
//                             <DataNotFound darkMode={darkMode}/> 
//                         </View>
//                     :
//                     <>
//                         <View style={[styles.marginBottom10, styles.paddingHorizontal]}>
//                             <View style={[ styles.row, styles.marginVertical]}>
//                                 <Text style={[darkMode ? styles.white : styles.black,  styles.medium]}>
//                                     {`${strings[language].eventAnalysis.event}  `}
//                                 </Text>
//                                 <Text style={[styles.green,  styles.medium]}>
//                                     {strings[language].eventAnalysis.analysis}
//                                 </Text>
//                             </View>
//                             <View style={[]}>
//                                 <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
//                                     {strings[language].eventAnalysis.headerContext}
//                                 </Text>
//                             </View>
//                         </View>
//                         <View style={[, styles.paddingHorizontal]}>
//                             <View style={[ styles.row, styles.marginVertical10]}>
//                                 <Text style={[darkMode ? styles.white : styles.black,  styles.regular]}>
//                                     {`${strings[language].eventAnalysis.event}  `}
//                                 </Text>
//                                 <Text style={[styles.green,  styles.regular]}>
//                                     {strings[language].eventAnalysis.category}
//                                 </Text>
//                                 <Text style={[styles.paleRed]}>
//                                     {'  *'}
//                                 </Text>
//                             </View>
//                             <View style={[ styles.radius, Platform.OS=="android" ? null : darkMode ? styles.bgLightGray : styles.bgWhite, styles.padding2, styles.row, styles.centerVertical,Platform.OS=="android" ? null : styles.elevate2]}>
//                                 <View
//                                     style={[styles.flexHalf, styles.centerVertical, styles.flexEndHorizontal, styles.opacity80perc]}>
//                                     <MIcons name={'event'} size={22} color={darkMode ? Colors.white : Colors.black}/>
//                                 </View>
//                                 <View style={[styles.flexFour,Platform.OS=="android" ? null : styles.zIndex]}>
//                                     { (this.state.categories && this.state.categories.length>0) ? <DropDownPicker
//                                         items={this.state.categories}
//                                         defaultValue={this.state.event}
//                                         arrowSize={24}
//                                         placeholder={strings[language].eventAnalysis.category}
//                                         containerStyle={{ height: 40 }}
//                                         dropDownStyle = {[darkMode ? { backgroundColor: Colors.lightGray, borderWidth:1, borderColor: '#ffffff45' } : { backgroundColor: Colors.white,borderColor: '#00000045', borderWidth:1 }]}
//                                         itemStyle={[{ justifyContent: 'flex-start',padding:20, borderBottomWidth:0.5, },darkMode ? { borderColor: '#ffffff45'} : {borderColor: '#00000045'}]}
//                                         style={{backgroundColor: 'none', borderWidth:0 }}
//                                         onChangeItem={(item)=>{
//                                             this.setState({event: item.value, eventId: item.id, submit: false}, ()=> console.log(item))
//                                         }}
//                                         activeLabelStyle={[darkMode ? {color: Colors.white}: {color: Colors.black}]}
//                                         arrowColor={darkMode ? Colors.white : Colors.black}
//                                         arrowSize = {20}
//                                         labelStyle={[styles.fontSize17, darkMode ? styles.green : styles.darkGreen]}
//                                         /> :  
//                                         <View style={[styles.row, styles.allCenter]}>
//                                             <Text style={[styles.green, styles.regular]}>{strings[language].eventAnalysis.loadingDropdown}</Text>
//                                             <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.green} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
//                                         </View>                                         
//                                     }
//                                 </View>
//                             </View>
//                         </View>
//                         <View style={[ { zIndex:-2 }, styles.paddingHorizontal]}>
//                             <View style={[styles.row, styles.paddingVertical12]}>
//                                 <Text style={[darkMode ? styles.white : styles.black,  styles.regular]}>
//                                     {`${strings[language].eventAnalysis.make}  `}
//                                 </Text>
//                                 <Text style={[styles.green,  styles.regular]}>
//                                     {strings[language].eventAnalysis.selection}
//                                 </Text>
//                                 <Text style={[styles.paleRed]}>
//                                     {'  *'}
//                                 </Text>
//                             </View>
//                             <View style={[styles.flexTwo, styles.row, styles.paddingHorizontal, Platform.OS == 'ios' && styles.paddingVertical12, styles.radius, darkMode ? styles.bgLightGray : styles.bgWhite]}>
//                                 <View style={[styles.row , styles.flexOne, styles.allCenter]}>
//                                     <Text style={[darkMode ? styles.white : styles.black,  styles.fontSize15]}>
//                                         {strings[language].eventAnalysis.daily}
//                                     </Text>
//                                     <CheckBox
//                                         disabled={this.state.event ? false : true}
//                                         tintColors={{ true: Colors.green, false: this.state.event ? darkMode ? Colors.white : Colors.black : darkMode ? '#ffffff48' : '#00000048' }}
//                                         tintColor={ this.state.event ? darkMode ? Colors.white : Colors.black : darkMode ? '#ffffff48' : '#00000048' }
//                                         onCheckColor={Colors.green}
//                                         onTintColor={Colors.green}
//                                         boxType={'square'}
                                        
//                                         style={{ height: Platform.OS == "ios" ? width/18 : width/8, width: width/8, left : Platform.OS == "ios" ? 10 : null}}
//                                         value={this.state.daily}
//                                         onValueChange={(value) => this.toggleCheckBox(value,'daily')}
//                                     />
//                                 </View>
//                                 <View style={[styles.row, styles.flexOne, styles.allCenter]}>
//                                     <Text style={[darkMode ? styles.white : styles.black,  styles.fontSize15]}>
//                                         {strings[language].eventAnalysis.monthly}
//                                     </Text>
//                                     <CheckBox
//                                         disabled={this.state.event ? false : true}
//                                         tintColors={{ true: Colors.green, false: this.state.event ? darkMode ? Colors.white : Colors.black : darkMode ? '#ffffff48' : '#00000048' }}
//                                         tintColor={ this.state.event ? darkMode ? Colors.white : Colors.black : darkMode ? '#ffffff48' : '#00000048' }
//                                         onCheckColor={Colors.green}
//                                         onTintColor={Colors.green}
//                                         boxType={'square'}
//                                         style={{ height: Platform.OS == "ios" ? width/18 : width/8, width: width/8, left : Platform.OS == "ios" ? 10 : null }}
//                                         value={this.state.monthly}
//                                         onValueChange={(value) => this.toggleCheckBox(value,'monthly')}
//                                     />
//                                 </View>
//                                 <View style={[styles.row, styles.flexOne, styles.allCenter, styles.flexEndVertical]}>
//                                     <Text style={[ darkMode ? styles.white : styles.black, styles.fontSize15]}>
//                                         {strings[language].eventAnalysis.yearly}
//                                     </Text>
//                                     <CheckBox
//                                         disabled={this.state.event ? false : true}
//                                         tintColors={{ true: Colors.green, false: this.state.event ? darkMode ? Colors.white : Colors.black : darkMode ? '#ffffff48' : '#00000048' }}
//                                         style={[{borderColor: '#fff'}]}
//                                         tintColor={ this.state.event ? darkMode ? Colors.white : Colors.black : darkMode ? '#ffffff48' : '#00000048' }
//                                         onCheckColor={Colors.green}
//                                         onTintColor={Colors.green}
//                                         boxType={'square'}
//                                         style={{ height: Platform.OS == "ios" ? width/18 : width/8, width: width/8, left : Platform.OS == "ios" ? 10 : null }}
//                                         value={this.state.yearly}
//                                         onValueChange={(value) => this.toggleCheckBox(value,'yearly')}
//                                     />
//                                 </View>
//                             </View>
//                         </View>
//                         {
//                             this.state.daily &&
//                             <View style={[{zIndex: -1}, , styles.paddingHorizontal]}>
//                                 <View style={[styles.row, styles.marginVertical10, {zIndex: -1}]}>
//                                     <Text style={[darkMode ? styles.white : styles.black, styles.regular]}>
//                                         {`${strings[language].eventAnalysis.period}  `}
//                                     </Text>
//                                     <Text style={[styles.green, styles.regular]}>
//                                         {strings[language].eventAnalysis.duration}
//                                     </Text>
//                                     <Text style={[styles.paleRed]}>
//                                         {'  *'}
//                                     </Text>
//                                 </View>
//                                 <View
//                                     style={[styles.radius, styles.marginBottom10, darkMode ? styles.bgLightGray : styles.bgWhite, styles.paddingRegular, styles.row, styles.centerVertical, styles.elevate2]}>
//                                     <View
//                                         style={[styles.flexHalf, styles.centerVertical, styles.flexEndHorizontal, styles.opacity80perc]}>
//                                         <FIcons name={'calendar'} size={14} color={darkMode ? Colors.white : Colors.black}/>
//                                     </View>
//                                     <View style={[styles.flexFour]}>
//                                         {showStartDateCalendar ?
//                                             <CalendarPicker
//                                                 width={width/1.3}
//                                                 onDateChange={this.onDateChange}
//                                                 textStyle={[darkMode ? styles.white : styles.black]}
//                                                 maxDate={moment(new Date()).subtract(1, "days")}
//                                                 disabledDatesTextStyle={[darkMode ? {color: '#ffffff26'} : '#00000026']}
//                                             /> 
//                                         :
//                                             <TouchableOpacity onPress={this.toggleStartDateCalendar} style={[styles.padding]}>
//                                                 <Text style={[styles.paddingLeft8, darkMode ? styles.white : styles.black]}>
//                                                     {strings[language].eventAnalysis.startDate} { startDate }
//                                                 </Text>
//                                             </TouchableOpacity>
//                                         }
//                                     </View>
//                                 </View>
//                                 <View
//                                     style={[styles.radius, styles.marginBottom10, darkMode ? styles.bgLightGray : styles.bgWhite, styles.paddingRegular, styles.row, styles.centerVertical, styles.elevate2]}>
//                                     <View
//                                         style={[styles.flexHalf, styles.centerVertical, styles.flexEndHorizontal, styles.opacity80perc]}>
//                                         <FIcons name={'calendar'} size={14} color={darkMode ? Colors.white : Colors.black}/>
//                                     </View>
//                                     <View style={[styles.flexFour]}>
//                                         {showEndDateCalendar ?
//                                             <CalendarPicker
//                                                 width={width/1.3}
//                                                 onDateChange={this.onEndDateChange}
//                                                 textStyle={[darkMode ? styles.white : styles.black]}
//                                                 minDate={this.state.selectedStartDate}
//                                                 maxDate={moment(new Date())}
//                                                 disabledDatesTextStyle={[darkMode ? {color: '#ffffff26'} : '#00000026']}
//                                             /> 
//                                         :
//                                             <TouchableOpacity onPress={this.toggleEndDateCalendar} style={[styles.padding]}>
//                                                 <Text style={[styles.paddingLeft8, darkMode ? styles.white : styles.black]}>
//                                                     {strings[language].eventAnalysis.endDate} { endDate }
//                                                 </Text>
//                                             </TouchableOpacity>
//                                         }
//                                     </View>
//                                 </View>
//                             </View>
//                         }

//                         {
//                             this.state.monthly &&
//                             <View style={[Platform.OS=="android" ? null : {zIndex: -1}, , styles.paddingHorizontal]}>
//                                 <View style={[styles.row, styles.marginVertical10, {zIndex: -1}]}>
//                                     <Text style={[styles.green, styles.regular]}>
//                                         {strings[language].eventAnalysis.year}
//                                     </Text>
//                                     <Text style={[styles.paleRed]}>
//                                         {'  *'}
//                                     </Text>
//                                 </View>
//                                 <View
//                                     style={[Platform.OS=="android" ? null : {zIndex: -1},styles.radius, styles.marginBottom10,Platform.OS=="android" ? null : darkMode ? styles.bgLightGray : styles.bgWhite, styles.paddingRegular, styles.row, styles.centerVertical,Platform.OS=="android" ? null : styles.elevate2]}>
//                                     <View
//                                         style={[styles.flexHalf, styles.centerVertical, styles.flexEndHorizontal, styles.opacity80perc]}>
//                                         <FIcons name={'calendar'} size={24} color={darkMode ? Colors.white : Colors.black}/>
//                                     </View>
//                                     <View style={[styles.flexFour]}>
//                                         <DropDownPicker
//                                             isVisible={this.state.isVisibleB}
//                                             onOpen={() => this.changeVisibility({
//                                                 isVisibleB: true
//                                             })}
//                                             onClose={() => this.setState({
//                                                 isVisibleB: false
//                                             })}
//                                             items={this.state.yearList}
//                                             zIndex={4000}
//                                             arrowSize={24}
//                                             placeholder={strings[language].eventAnalysis.year}
//                                             dropDownStyle = {[darkMode ? { backgroundColor: Colors.lightGray, borderWidth:1, borderColor: '#ffffff45' } : { backgroundColor: Colors.white,borderColor: '#00000045', borderWidth:1 }]}
//                                             containerStyle={{height: 40}}
//                                             itemStyle={[{ justifyContent: 'flex-start',padding:20, borderBottomWidth:0.5, },darkMode ? { borderColor: '#ffffff45'} : {borderColor: '#00000045'}]}
//                                             style={{backgroundColor: 'none', borderWidth: 0}}
//                                             onChangeItem={(item) => {
//                                                 // this.controller.props.items == this.state.monthList;
//                                                 this.setState({monthYear: item.value, submit: false},  this.trimMonth(item.value))
//                                             }}
//                                             activeLabelStyle={[darkMode ? {color: Colors.white}: {color: Colors.black}]}
//                                             arrowColor={darkMode ? Colors.white : Colors.black}
//                                             arrowSize={20}
//                                             labelStyle={[styles.fontSize17, darkMode ? styles.green : styles.darkGreen]}
//                                         />
//                                     </View>
//                                 </View>

//                                 <View style={[styles.row, styles.marginVertical10, {zIndex: -2}]}>
//                                     <Text style={[styles.green, styles.regular]}>
//                                         {strings[language].eventAnalysis.month}
//                                     </Text>
//                                     <Text style={[styles.paleRed]}>
//                                         {'  *'}
//                                     </Text>
//                                 </View>
//                                 <View

//                                     style={[Platform.OS=="android" ? null : {zIndex: -2}, styles.marginVertical, styles.radius,Platform.OS=="android" ? null : darkMode ? styles.bgLightGray : styles.bgWhite, styles.paddingRegular, styles.row, styles.centerVertical,Platform.OS=="android" ? null : styles.elevate2]}>
//                                     <View
//                                         style={[styles.flexHalf, styles.centerVertical, styles.flexEndHorizontal, styles.opacity80perc]}>
//                                         <FIcons name={'calendar'} size={24} color={darkMode ? Colors.white : Colors.black}/>
//                                     </View>
//                                     <View style={[styles.flexFour]}>
//                                         <DropDownPicker
//                                             items={this.state.monthList}
//                                             defaultValue={this.state.defaultMonth}
//                                             isVisible={this.state.isVisibleA}
//                                             onOpen={() => this.changeVisibility({
//                                                 isVisibleA: true
//                                             })}
//                                             onClose={() => this.setState({
//                                                 isVisibleA: false
//                                             })}
//                                             zIndex={4000}
//                                             arrowSize={24}
//                                             placeholder={strings[language].eventAnalysis.month}
//                                             dropDownStyle = {[darkMode ? { backgroundColor: Colors.lightGray, borderWidth:1, borderColor: '#ffffff45' } : { backgroundColor: Colors.white,borderColor: '#00000045', borderWidth:1 }]}
//                                             containerStyle={{height: 40}}
//                                             itemStyle={[{ justifyContent: 'flex-start',padding:20, borderBottomWidth:0.5, },darkMode ? { borderColor: '#ffffff45'} : {borderColor: '#00000045'}]}
//                                             style={{backgroundColor: 'none', borderWidth: 0}}
//                                             onChangeItem={(item) => {
//                                                 this.setState({month: item.value, submit:false}, console.log('Month check ',this.state.month))
//                                             }}
//                                             activeLabelStyle={[darkMode ? {color: Colors.white}: {color: Colors.black}]}
//                                             arrowColor={darkMode ? Colors.white : Colors.black}
//                                             arrowSize={20}
//                                             labelStyle={[styles.fontSize17, darkMode ? styles.green : styles.darkGreen]}
//                                         />
//                                     </View>
//                                 </View>
                                
//                             </View>
//                         }

//                         {
//                             this.state.yearly &&
//                             <View style={[Platform.OS=="android" ? null : {zIndex: -1}, , styles.paddingHorizontal]}>
//                                 <View style={[styles.row, styles.marginVertical10, {zIndex: -1}]}>
//                                     <Text style={[styles.green, styles.regular]}>
//                                         {strings[language].eventAnalysis.year}
//                                     </Text>
//                                     <Text style={[styles.paleRed]}>
//                                         {'  *'}
//                                     </Text>
//                                 </View>
//                                 <View
//                                     style={[styles.radius, styles.marginBottom10,Platform.OS=="android" ? null : darkMode ? styles.bgLightGray : styles.bgWhite, styles.paddingRegular, styles.row, styles.centerVertical,Platform.OS=="android" ? null : styles.elevate2]}>
//                                     <View
//                                         style={[styles.flexHalf, styles.centerVertical, styles.flexEndHorizontal, styles.opacity80perc]}>
//                                         <FIcons name={'calendar'} size={24} color={darkMode ? Colors.white : Colors.black}/>
//                                     </View>
//                                     <View style={[styles.flexFour]}>
//                                         <DropDownPicker
//                                             items={this.state.yearList}
//                                             zIndex={4000}
//                                             arrowSize={24}
//                                             placeholder={strings[language].eventAnalysis.year}
//                                             dropDownStyle = {[darkMode ? { backgroundColor: Colors.lightGray, borderWidth:1, borderColor: '#ffffff45' } : { backgroundColor: Colors.white,borderColor: '#00000045', borderWidth:1 }]}
//                                             containerStyle={{height: 40}}
//                                             itemStyle={[{ justifyContent: 'flex-start',padding:20, borderBottomWidth:0.5, },darkMode ? { borderColor: '#ffffff45'} : {borderColor: '#00000045'}]}
//                                             style={{backgroundColor: 'none', borderWidth: 0}}
//                                             onChangeItem={(item) => {
//                                                 this.setState({year: item.value, submit: false})
//                                             }}
//                                             activeLabelStyle={[darkMode ? {color: Colors.white}: {color: Colors.black}]}
//                                             arrowColor={darkMode ? Colors.white : Colors.black}
//                                             arrowSize={20}
//                                             labelStyle={[styles.fontSize17, darkMode ? styles.green : styles.darkGreen]}
//                                         />
//                                     </View>
//                                 </View>
//                             </View>
//                         }
                        
//                         { !this.state.submit ?
//                             <View style={[styles.allCenter, styles.marginTop24,{zIndex:-3},styles.row]}>
//                                 <Pressable onPress={this.getData}
//                                 disabled={
//                                     this.state.event &&
//                                     (this.state.selectedStartDate && this.state.selectedEndDate) ||
//                                     (this.state.monthly && this.state.event, this.state.month && this.state.monthYear) ||
//                                     (this.state.year && this.state.event) ? false : true
//                                 }
//                                 style={[
//                                     this.state.event &&
//                                     (this.state.selectedStartDate && this.state.selectedEndDate) ||
//                                     (this.state.monthly && this.state.event && this.state.month && this.state.monthYear) ||
//                                     (this.state.year && this.state.event)
//                                     ? styles.bgDarkGreen : styles.bgDarkGray,
//                                     styles.marginBottom30Percent,
//                                     styles.allCenter, styles.radius18]}>
//                                     {!this.state.loading ? 
//                                         <Text style={[styles.white, styles.medium, styles.paddingVertical, styles.paddingHorizontal30]}>
//                                             {strings[language].eventAnalysis.submit}
//                                         </Text> :
//                                         <View style={[styles.row, styles.centerHorizontal, styles.paddingHorizontal20]}>
//                                             <Text style={[styles.white, styles.regularPlus]}>{strings[language].eventAnalysis.loading}</Text>
//                                             <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
//                                         </View>
//                                     }
//                                 </Pressable>
//                                 {/* <TouchableOpacity onPress={()=>{this.setState({submit: false,showStartDateCalendar: false,showStartEndCalendar: false,isVisibleA: false ,monthList: false,yearList: "",isVisibleB: false,event:false}),this.syncData}}
//                                  style={[styles.bgDarkGreen,styles.marginBottom30Percent,styles.allCenter, styles.radius18,styles.marginLeft16]}>
//                                 <Text style={[styles.white, styles.medium, styles.paddingVertical, styles.paddingHorizontal30]}>
//                                             {strings[language].eventAnalysis.cancel}
//                                         </Text>
//                                 </TouchableOpacity> */}
//                             </View>
//                         :
//                         this.state.data.status == 200 ? 
//                         <View style={[styles.paddingHorizontal, {zIndex:-4}]}>
//                             <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius8, styles.marginVertical10, styles.paddingHorizontal24, styles.paddingTop20, styles.elevate2]}>
//                                 <View style={[styles.row, styles.paddingBottom]}>
//                                     <Text style={[darkMode ? styles.white : styles.black,  styles.regular]}>
//                                         {`${strings[language].eventAnalysis.recorded}  `}
//                                     </Text>
//                                     <Text style={[ styles.regular, styles.darkGreen]}>
//                                         {strings[language].eventAnalysis.events}
//                                     </Text>
//                                 </View>
//                                 <View style={[]}>
//                                     <View style={[styles.row, styles.spaceBetween]}>
//                                         <Text style={[styles.small,  this.props.darkMode ? styles.white : styles.black]}>
//                                             {strings[language].eventAnalysis.date}
//                                         </Text>
//                                         <Text style={[styles.small,  this.props.darkMode ? styles.white : styles.black]}>
//                                             {strings[language].eventAnalysis.eventName}
//                                         </Text>
//                                         <Text style={[styles.small,  this.props.darkMode ? styles.white : styles.black]}>
//                                             {strings[language].eventAnalysis.count}
//                                         </Text>
//                                         <Text style={[styles.small,  this.props.darkMode ? styles.white : styles.black]}>
//                                             {strings[language].eventAnalysis.duration}
//                                         </Text>
//                                     </View>
//                                     <View style={[{ borderBottomWidth:0.7 }, styles.opacity25perc, styles.padding, this.props.darkMode ? { borderColor: Colors.white } : { borderColor:Colors.black }]}/>
//                                     <FlatList
//                                         showsVerticalScrollIndicator={false} nestedScrollEnabled={true}
//                                         style={[{height: 130}]}
//                                         data={this.state.eventAnalysis}
//                                         renderItem={this.renderItem}
//                                         numColumns={1}
//                                         initialNumToRender={10}
//                                         ref={ref => this.listView = ref}
//                                         keyExtractor={(item, index) => item.logDate + index}
//                                     />
//                                     {/* </View> */}
//                                     <View style={[styles.allCenter, styles.paddingBottom10, styles.paddingVertical]}>
//                                         <Text style={[ styles.green, styles.extraSmall, styles.textCenter]}>
//                                             {/* A-MD - Assigned MD, P-MD - Assigned MD */}
//                                         </Text>
//                                     </View>
//                                 </View>
//                             </View>
//                             {/* <Pressable onPress={this.captureAndShareScreenshot} style={[styles.flexOne, styles.centerVertical, styles.elevatePlus, styles.flexEndHorizontal, styles.extraMarginVertical]}>
//                                 <View style={[styles.paddingVertical6, styles.paddingHorizontal16, styles.radius16, darkMode ? styles.bgLightGray : styles.bgWhite, styles.row, styles.elevateMild]}>
//                                     <View style={[styles.paddingRight10, styles.opacity50perc, styles.allCenter]}>
//                                         <SLIcons name='share' size={16} color={darkMode ? Colors.white : Colors.black} />
//                                     </View>
//                                     <View>
//                                         <Text style={[styles.regular, darkMode ? styles.white : styles.black]}>
//                                             {strings[language].eventAnalysis.share}
//                                         </Text>
//                                     </View>
//                                 </View>
//                             </Pressable> */}
//                         </View>
//                         : 
//                     //   console.log('Error mEssage',this.state.data)
//                         <Text style={[styles.paleRed, styles.selfCenter,styles.marginBottom30Percent,  {paddingVertical:30}, styles.regular, {zIndex:-4}]}>
//                             {this.state.data.data.message}
//                         </Text>
                    
//                     }
//                 </>}
//                 </ScrollView>
//             </View>
//             </ErrorBoundaryMainComponent>
//         );
//     }
// }

// function mapStateToProps (state) {
//     return {
//         activeCount: commonSelectors.activeCount(state),
//         darkMode: commonSelectors.darkMode(state),
//         language: commonSelectors.language(state),
//         eventAnalysis: commonSelectors.eventAnalysis(state),
//         currentRoute: commonSelectors.currentRoute(state),
//     }
// }
// function mapDispatchToProps (dispatch) {
//     return {
//         apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
//         logout: (state=false) => dispatch(logout(state)),
//         setEventAnalysis: (data={}) => dispatch(userDetailActions.setEventAnalysis(data)),
//         setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
//     }
// }
// const EventAnalysisScreen = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(EventAnalysis);
// export {EventAnalysisScreen}
