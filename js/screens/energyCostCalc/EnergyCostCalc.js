// import React from 'react';
// import { connect } from "react-redux";
// import { Text, View, StatusBar, FlatList, PixelRatio, TextInput, Pressable, Dimensions, ScrollView, ActivityIndicator, BackHandler, KeyboardAvoidingView } from 'react-native';
// // Styles and Colors
// import { styles } from 'SmartgasConsumerApp/js/styles';
// import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// // Component
// import DottedBorderComponent from 'SmartgasConsumerApp/js/components/common/progressSteps/DottedBorder';
// import ProgressStepsComponent from 'SmartgasConsumerApp/js/components/common/progressSteps/ProgressSteps';
// import HouseholdApplianceComponent from 'SmartgasConsumerApp/js/screens/energyCostCalc/components/HouseholdAppliance';
// import ProductResultsComponent from 'SmartgasConsumerApp/js/screens/energyCostCalc/components/ProductResults';
// // Constants
// import { peakVoltage } from 'SmartgasConsumerApp/js/constants/dashboard/VictoryChart';
// // Icons
// import FIcons from 'react-native-vector-icons/Feather';
// import MIcons from 'react-native-vector-icons/MaterialIcons';
// import SLIcons from 'react-native-vector-icons/SimpleLineIcons';
// // Library
// import { VictoryLine, VictoryChart, VictoryAxis } from "victory-native";
// import DropDownPicker from 'react-native-dropdown-picker';
// import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
// // Backend
// import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
// import {strings} from "SmartgasConsumerApp/js/strings";
// import {apiDispatcher} from "../../actions";
// import * as dashboard from "../../api/dashboard";
// import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

// // Constants
// const { height, width } = Dimensions.get('window');
// const Rating = [
//     { id: 1},
//     { id: 2},
//     { id: 3},
//     { id: 4},
//     { id: 5},
// ]

// class EnergyCostCalculator extends React.Component{

//     constructor(props){
//         super(props)
//         this.state = {
//             rating: Rating,
//             index: 0,
//         }
//     }
    

//     componentDidMount(): void {

//         this.syncData()
//         this.backHandler = BackHandler.addEventListener(
//             "hardwareBackPress",
//             this.backAction
//         );
//         const didFocusSubscription = this.props.navigation.addListener(
//             'focus',
//             payload => {
//                 if (this.props.currentRoute !== 'EnergyCostCacl') {
//                     this.props.setCurrentRoute('EnergyCostCacl');
//                     this.syncData()
//                 }
//             }
//         );
//     }

    


//     backAction = () => {
//         if (this.props.navigation.isFocused() && this.state.index > 0) {
//             this.setState({index: this.state.index-1});
//             return true;
//         } else {
//             return true
//         }

//     }

//     getLabelAndValueFromObj = (arr) => {
//         let newArr = arr.map(item=> {
//             item.label = item.pName; return item
//         })
//         return newArr
//     }

//     getLabelAndValueFromArray = (arr) => {
//         let newArr = arr.map(item=> {
//             let newItem = {}
//             newItem.label = item;
//             newItem.value = item;
//             return newItem
//         })
//         return newArr;
//     }

//     async componentDidMount(): void {
//         let options = await this.props.apiDispatcher(dashboard.energyCostCalculationApi());
//         console.log("asasasas",options);
//         this.setState({
//             heavy_Equipment: this.getLabelAndValueFromArray(options.data.category.heavy_Equipment),
//             light_Equipment: this.getLabelAndValueFromArray(options.data.category.light_Equipment),
//             generalCategories: this.getLabelAndValueFromObj(options.data.typicalAppliance.generalCategories),
//             lightningCategories: this.getLabelAndValueFromObj(options.data.typicalAppliance.lightningCategories)}, ()=>console.log(this.state)

//             )
//     }

//     async componentDidUpdate(): void {
//         console.log(this.state);
//     }

//     renderItem = ({item, index}) => {
//         return (
//             <Pressable style={[styles.padding2]} onPress={()=> this.setState({ratingIndex: index})}>
//                 <FIcons name={'star'} size={24} color={item.id <= this.state.ratingIndex+1 ? Colors.green : this.props.darkMode ? Colors.white : Colors.black}/>
//             </Pressable>
//         );
//     }

//     steps = () =>{
//         this.setState({index: this.state.index+1})
//     };

//     calculateConsumption = async () => {
//         this.setState({loading:true},async ()=>{
//         let options = await this.props.apiDispatcher(dashboard.energyCostCalculationConsumptionApi(this.state.category, this.state.appliance,this.state.age,this.state.ratingIndex+1));
//         console.log("Caculate consumption Response",options);
//         this.setState({
//             Rate: options.data.Rate,
//             TimeFrame: options.data.TimeFrame,
//             consumption: options.data.consumption,
//             loading: false, 
//             }, ()=>{console.log(this.state); this.steps();}
//         )
//         })
//     };

//     forecastEnergy = async() => {
//         this.setState({loading:true},async ()=>{

//             let options = await this.props.apiDispatcher(dashboard.energyCostCalculationForecastApi(
//                 this.state.category,
//                 this.state.appliance,
//                 this.state.age,this.state.ratingIndex+1,
//                 this.state.newConsumption ? this.state.newConsumption : this.state.consumption,
//                 this.state.newTimeFrame ? this.state.newTimeFrame : this.state.TimeFrame,
//                 this.state.newRate ? this.state.newRate : this.state.Rate));
//             console.log("ForeCast Response",options);
//             this.setState({
//                 daily: options.data.daily,
//                 forecastBill: options.data.forecastBill,
//                 monthly: options.data.monthly,
//                 yearly: options.data.yearly,
//                 loading: false, ratingIndex: -1,
//                 index: this.state.index+1}, ()=>{console.log(this.state)}
//             )
//         })
//     };

//     changeVisibility(state) {
//         this.setState({
//             isVisibleA: false,
//             isVisibleB: false,
//             ...state
//         });
//     }

  

//     render(){
//         const {language, darkMode} = this.props;
//         return(
//             <ErrorBoundaryMainComponent>
//             <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader]} >
//                 <KeyboardAvoidingView style={[]} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>               
//                     { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
//                     <ScrollView showsVerticalScrollIndicator={false}>
//                         <View style={[styles.flexQuarterToOne, styles.marginVertical, styles.marginHorizontal20]}>
//                             <View style={[styles.row, styles.marginVertical4,]}>
//                                 <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
//                                     {`${strings[language].energyCostCalc.energy}  `}
//                                 </Text>
//                                 <Text style={[styles.darkGreen, styles.medium]}>
//                                     {strings[language].energyCostCalc.costCalculator}
//                                 </Text>
//                             </View>
//                             <View style={[]} >
//                                 <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
//                                     {strings[language].energyCostCalc.headerContext}
//                                 </Text>
//                             </View>
//                         </View>
//                         <View style={[styles.marginVertical10, styles.marginHorizontal20]}>
//                             <DottedBorderComponent darkMode={darkMode}/>
//                             <View style={[styles.row, styles.spaceBetween]}>
//                                 <ProgressStepsComponent step={'01'} label={strings[language].energyCostCalc.fillDetails} bgColor={styles.bgDarkGreen} darkMode={darkMode}/>
//                                 <ProgressStepsComponent step={'02'} label={strings[language].energyCostCalc.analysis}  bgColor={this.state.index > 0 ? styles.bgDarkGreen : styles.bgLightGray} darkMode={darkMode}/>
//                                 <ProgressStepsComponent step={'03'} label={strings[language].energyCostCalc.results} bgColor={this.state.index > 1 ? styles.bgDarkGreen : styles.bgLightGray} darkMode={darkMode}/>
//                             </View>
//                         </View>
//                         { this.state.index == 0 ?

//                             <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.flexOne, styles.padding20, styles.marginVertical14, styles.elevate2, styles.marginHorizontal20]}>
//                                 <View style={styles.row}>
//                                     <Text style={[styles.fontSize15, darkMode ? styles.white : styles.black]}>
//                                         {`${strings[language].energyCostCalc.fillThe}  `}
//                                     </Text>
//                                     <Text style={[styles.fontSize15, styles.darkGreen]}>
//                                         {strings[language].energyCostCalc.details}
//                                     </Text>
//                                 </View>
//                                 <View>
//                                     <View style={[styles.row]}>
//                                         <Text style={[styles.fontSize13, styles.paddingHorizontal4, styles.paddingTop12, darkMode ? styles.white : styles.black, styles.opacity65perc]}>
//                                             {strings[language].energyCostCalc.product} {strings[language].energyCostCalc.category}
//                                         </Text>
//                                         <Text style={[, styles.paddingTop, {color: 'red'}]}>
//                                             *
//                                         </Text>
//                                     </View>
//                                     <View style={[styles.flexOne]}>
//                                         <DropDownPicker
//                                             isVisible={this.state.isVisibleA}
//                                             onOpen={() => this.changeVisibility({
//                                                 isVisibleA: true
//                                             })}
//                                             onClose={() => this.setState({
//                                                 isVisibleA: false
//                                             })}
//                                             items={[
//                                                 {label: 'Heavy Equipment', value: 'heavy_Equipment'},
//                                                 {label: 'Light Equipment', value: 'light_Equipment'},
//                                                 {label: 'General Category', value: 'generalCategories'},
//                                                 {label: 'Lighting Category', value: 'lightningCategories'},
//                                             ]}
//                                             zIndex={4000}
//                                             arrowSize={24}
//                                             placeholder={`${strings[language].energyCostCalc.select} ${strings[language].energyCostCalc.category}`}
//                                             placeholderStyle={{color: Colors.green}}
//                                             dropDownStyle = {[darkMode ? { backgroundColor: Colors.lightGray, borderWidth:1, borderColor: '#ffffff45' } : { backgroundColor: Colors.white,borderColor: '#00000045', borderWidth:1 }]}
//                                             containerStyle={{height: 45}}
//                                             itemStyle={[{ justifyContent: 'flex-start',padding:20, borderBottomWidth:0.5, },darkMode ? { borderColor: '#ffffff45'} : {borderColor: '#00000045'}]}
//                                             style={{backgroundColor: 'none', borderWidth:0, borderBottomWidth:0.7, borderColor: Colors.darkGreen }}
//                                             onChangeItem = {(item)=>{this.setState({category: item.value})}}
//                                             activeLabelStyle={[darkMode ? {color: Colors.white}: {color: Colors.black}]}
//                                             arrowColor={darkMode ? Colors.white : Colors.black}
//                                             arrowSize = {RFPercentage(3)}
//                                             labelStyle={[styles.fontSize17, darkMode ? styles.green : styles.darkGreen,  {left: -10}]}
//                                         />
//                                     </View>
//                                 </View>
//                                 <View style={Platform.OS == "android" ? null : {zIndex:-1}}>
//                                     <View style={[styles.row]}>
//                                         <Text style={[styles.fontSize13, styles.paddingHorizontal4, styles.paddingTop12, darkMode ? styles.white : styles.black, styles.opacity65perc]}>
//                                             {strings[language].energyCostCalc.product}
//                                         </Text>
//                                         <Text style={[, styles.paddingTop, {color: 'red'}]}>
//                                             *
//                                         </Text>
//                                     </View>
//                                     <View style={[styles.flexOne]}>
//                                         <DropDownPicker
//                                             isVisible={this.state.isVisibleB}
//                                             onOpen={() => this.changeVisibility({
//                                                 isVisibleB: true
//                                             })}
//                                             onClose={() => this.setState({
//                                                 isVisibleB: false
//                                             })}
//                                             items={this.state.category ? this.state[this.state.category] : [{label: "", value: ""}]}
//                                             zIndex={4000}
//                                             arrowSize={24}
//                                             placeholder={`${strings[language].energyCostCalc.select} ${strings[language].energyCostCalc.product}`}
//                                             placeholderStyle={{color: Colors.green}}
//                                             dropDownStyle = {[darkMode ? { backgroundColor: Colors.lightGray, borderWidth:1, borderColor: '#ffffff45' } : { backgroundColor: Colors.white,borderColor: '#00000045', borderWidth:1 }]}
//                                             containerStyle={{height: 45}}
//                                             itemStyle={[{ justifyContent: 'flex-start',padding:20, borderBottomWidth:0.5, },darkMode ? { borderColor: '#ffffff45'} : {borderColor: '#00000045'}]}
//                                             style={{backgroundColor: 'none', borderWidth:0, borderBottomWidth:0.7, borderColor: Colors.green }}
//                                             onChangeItem = {(item)=>{this.setState({appliance: item.value})}}
//                                             activeLabelStyle={[darkMode ? {color: Colors.white}: {color: Colors.black}]}
//                                             arrowColor={darkMode ? Colors.white : Colors.black}
//                                             arrowSize = {RFPercentage(3)}
//                                             labelStyle={[styles.fontSize17, darkMode ? styles.green : styles.darkGreen,  {left: -10}]}
//                                         />
//                                     </View>
//                                 </View>
//                                 <View style={[styles.paddingHorizontal4, Platform.OS == "android" ? null : {zIndex:-2}]}>
//                                     <View style={[styles.row]}>
//                                         <Text style={[styles.fontSize13, styles.paddingTop16, darkMode ? styles.white : styles.black, styles.opacity65perc]}>
//                                             {strings[language].energyCostCalc.productAge}
//                                         </Text>
//                                         <Text style={[, styles.paddingTop, {color: 'red'}]}>
//                                             *
//                                         </Text>
//                                     </View>

//                                     <View style={[styles.flexOne]}>
//                                         <TextInput
//                                             style={[styles.fontSize17, { paddingHorizontal: 0, borderColor: Colors.green, flexBasis: PixelRatio.get() < 2.5 ? 28 : 28, borderBottomWidth: 0.7}, styles.darkGreen, styles.paddingRegular]}
//                                             ref={(input) => { this.ageInput = input; }}
//                                             maxLength={2}
//                                             onChangeText={number=>{
//                                                 this.setState({age: number})
//                                             }}
//                                             keyboardType={'numeric'}
//                                         />
//                                     </View>
//                                 </View>
//                                 <View style={[styles.row, Platform.OS == "android" ? null : {zIndex:-2}]}>
//                                     <Text style={[styles.fontSize13, styles.paddingHorizontal4, styles.paddingTop16, darkMode ? styles.white : styles.black, styles.opacity65perc]}>
//                                         {strings[language].energyCostCalc.greenStartRating}
//                                     </Text>
//                                     <Text style={[, styles.paddingTop, {color: 'red'}]}>
//                                             *
//                                     </Text>
//                                 </View>
//                                 <View style={[{zIndex:-2},styles.centerHorizontal, styles.centerVertical]}>
//                                     <FlatList
//                                         horizontal
//                                         style={[styles.flexOne]}
//                                         data={this.state.rating}
//                                         extraData={this.state.rating}
//                                         renderItem={this.renderItem}
//                                         numColumns={1}
//                                         initialNumToRender={10}
//                                         ref={ref => this.listView = ref}
//                                         keyExtractor={(item, index) => item.id + index}
//                                     />
//                                 </View>
//                             </View> : null
//                         }
//                         { this.state.index == 1 ?
//                             <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius16, styles.flexOne, styles.padding20, styles.marginVertical14, styles.zIndex, styles.marginHorizontal20, styles.elevate2]}>
//                                 <View style={[styles.row, styles.marginVertical4]}>
//                                     <Text style={[darkMode ? styles.white : styles.black, styles.regular]}>
//                                         {`${strings[language].energyCostCalc.confirm} /${strings[language].energyCostCalc.fillThe} `}
//                                     </Text>
//                                     <Text style={[styles.regular, styles.darkGreen]}>
//                                         {strings[language].energyCostCalc.details}
//                                     </Text>
//                                 </View>
//                                 <View style={[styles.marginVertical14]}>
//                                     <View style={[styles.flexOne, styles.marginVertical]}>
//                                         <View style={[styles.row]}>
//                                             <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.opacity65perc]}>
//                                                 {strings[language].energyCostCalc.consumption}
//                                             </Text>
//                                             <Text style={[styles.paddingHorizontal4, {bottom:3}, {color: 'red'}]}>
//                                                 *
//                                             </Text>
//                                         </View>
//                                         <View style={[styles.flexOne, styles.row, styles.centerHorizontal, { borderColor: Colors.green, borderBottomWidth: 0.7 }]}>
//                                             <TextInput
//                                                 // value={this.state.consumption + ""}
//                                                 value={this.state.newConsumption !=null ? this.state.newConsumption : this.state.consumption + ""}
//                                                 style={[styles.regularPlus, styles.flexOne, { paddingHorizontal: 0}, styles.darkGreen, styles.padding]}
//                                                 ref={(input) => { this.passwordInput = input; }}
//                                                 keyboardType="numeric"
//                                                 // editable={false}
//                                                 maxLength={6}
//                                                 onChangeText={number=>{
//                                                     // this.setState({newConsumption: number})
//                                                     if(!this.state.newConsumption) {
//                                                         this.setState({newConsumption: number})
//                                                     }
//                                                     else {
//                                                         let OldState = this.state.newConsumption
//                                                         let newState = parseInt(this.state.newConsumption)+parseInt(number);
//                                                         if(OldState < 20000 || !newState){
//                                                             this.setState({newConsumption: number})
//                                                             console.log('add time',newState,this.state.newConsumption, number);
//                                                         }
//                                                         if(newState > 20001){
//                                                             this.setState({newConsumption: '1'})
//                                                         }
//                                                     }
//                                                 }}
//                                                 keyboardType={'numeric'}
//                                             />
//                                             <Text style={[darkMode ? styles.white : styles.black, styles.regular]}>
//                                                 {strings[language].energyCostCalc.watts}
//                                             </Text>
//                                         </View>
//                                     </View>
//                                     <View style={[styles.flexOne, styles.marginVertical]}>
//                                         <View style={[styles.row]}>
//                                             <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.opacity65perc]}>
//                                                 {strings[language].energyCostCalc.timeFrame}
//                                             </Text>
//                                             <Text style={[styles.paddingHorizontal4, {bottom:3}, {color: 'red'}]}>
//                                                 *
//                                             </Text>
//                                         </View>
//                                         <View style={[styles.flexOne, styles.row, styles.centerHorizontal, { borderColor: Colors.green, borderBottomWidth: 0.7 }]}>
//                                             <TextInput
//                                                 style={[styles.regularPlus, styles.flexOne, { paddingHorizontal: 0}, styles.darkGreen, styles.padding]}
//                                                 ref={(input) => { this.passwordInput = input; }}
//                                                 // value={this.state.TimeFrame + ""}
//                                                 // editable={false}
//                                                 maxLength={2}
//                                                 value={this.state.newTimeFrame !=null ? this.state.newTimeFrame : this.state.TimeFrame + ""}
//                                                 onChangeText={number=>{
//                                                     if(!this.state.newTimeFrame) {
//                                                         this.setState({newTimeFrame: number})
//                                                     }
//                                                     else {
//                                                         let OldState = this.state.newTimeFrame
//                                                         let newState = parseInt(this.state.newTimeFrame)+parseInt(number);
//                                                         if(OldState < 25 || !newState){
//                                                             this.setState({newTimeFrame: number})
//                                                             console.log('add time',newState,this.state.newTimeFrame, number);
//                                                         }
//                                                         if(newState > 26){
//                                                             this.setState({newTimeFrame: '1'})
//                                                         }
//                                                     }
//                                                 }}
//                                                 keyboardType={'numeric'}
//                                             />
//                                             <Text style={[darkMode ? styles.white : styles.black, styles.regular]}>
//                                                 {strings[language].energyCostCalc.hoursDays}
//                                             </Text>
//                                         </View>
//                                     </View>
//                                     <View style={[styles.flexOne, styles.marginVertical]}>
//                                         <View style={[styles.row]}>
//                                             <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.opacity65perc]}>
//                                                 {strings[language].energyCostCalc.rate}
//                                             </Text>
//                                             <Text style={[styles.paddingHorizontal4, {bottom:3}, {color: 'red'}]}>
//                                                     *
//                                             </Text>
//                                         </View>
//                                         <View style={[styles.flexOne, styles.row, styles.centerHorizontal, { borderColor: Colors.green, borderBottomWidth: 0.7 }]}>
//                                             <TextInput
//                                                 style={[styles.regularPlus, styles.flexOne, { paddingHorizontal: 0}, styles.darkGreen, styles.padding]}
//                                                 ref={(input) => { this.passwordInput = input; }}
//                                                 onChangeText={text=>{
//                                                     this.setState({newRate: text})
//                                                 }}
//                                                 maxLength={5}
//                                                 // keyboardType={'numeric'}
//                                                 // editable={true}
//                                                 value={this.state.newRate !=null ? this.state.newRate : this.state.Rate + ""}
//                                             />
//                                             <Text style={[darkMode ? styles.white : styles.black, styles.regular]}>
//                                                 INR
//                                             </Text>
//                                         </View>
//                                     </View>
//                                 </View>
//                             </View> : null
//                         }
//                         { this.state.index == 2 ?
//                             <View style={[styles.marginVertical10]}>
//                                 <View>
//                                     <View style={[darkMode ? styles.bgLightGray : styles.bgWhite, styles.padding20, styles.radius16, styles.marginVertical, styles.marginHorizontal20, styles.elevate2]}>
//                                         <View style={[styles.row, styles.allCenter, styles.marginVertical4]}>
//                                             <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
//                                                 {`${strings[language].energyCostCalc.product} `}
//                                             </Text>
//                                             <Text style={[styles.medium, styles.darkGreen]}>
//                                                 {strings[language].energyCostCalc.results}
//                                             </Text>
//                                         </View>
//                                         <View style={[styles.marginHorizontal24, styles.marginVertical, styles.marginBottom24, styles.opacity65perc,{ borderTopWidth: 1, borderColor: Colors.darkGreen }]}/>
//                                         <ProductResultsComponent darkMode={darkMode} language={language} header={strings[language].energyCostCalc.daily} consumption={this.state.daily.consumption} cost={this.state.daily.costing}/>
//                                         <ProductResultsComponent darkMode={darkMode} language={language} header={strings[language].energyCostCalc.monthly} consumption={this.state.monthly.consumption} cost={this.state.monthly.costing}/>
//                                         <ProductResultsComponent darkMode={darkMode} language={language} header={strings[language].energyCostCalc.yearly} consumption={this.state.yearly.consumption} cost={this.state.yearly.costing}/>
//                                     </View>
//                                     <View style={[styles.elevateMild, darkMode ? styles.bgLightGray : styles.bgWhite, styles.radius10, styles.padding16, styles.marginVertical, styles.marginHorizontal20]}>
//                                         <View style={[styles.row]} >
//                                             <Text style={[darkMode ? styles.white : styles.black, styles.fontSize17, { marginBottom:-10 }]}>
//                                                 {`${strings[language].energyCostCalc.forecasted}  `}
//                                             </Text>
//                                             <Text style={[styles.green, styles.fontSize17, {marginBottom:-10}]}>
//                                                 {strings[language].energyCostCalc.bill}
//                                             </Text>
//                                         </View>
//                                         <View style={[styles.row]}>
//                                             <View style={[styles.flexThree, styles.allCenter, darkMode ? styles.white : styles.black,]}>
//                                                 <View style={[ styles.centerVertical, {top:RFPercentage(1),height:50}]}>
//                                                     <VictoryChart
//                                                         width={Dimensions.get("window").width/1.4} // from react-native
//                                                         height={RFPercentage(10)+80}
//                                                     >
//                                                         <VictoryAxis
//                                                             dependentAxis
//                                                             style={{
//                                                                 ticks: {stroke: "transparent"},
//                                                                 tickLabels: { fill:"transparent"},
//                                                                 axis: {stroke: "none"},
//                                                                 grid : { stroke: "grey", opacity: 0.4}
//                                                             }}
//                                                         />
//                                                         <VictoryLine interpolation="natural" style={{ data: { stroke: Colors.darkGreen, strokeWidth: 1  }}} data={peakVoltage}/>
//                                                     </VictoryChart>
//                                                 </View>
//                                             </View>
//                                             <View style={[styles.flexTwo,styles.flexEndHorizontal]}>
//                                                 <View style={[styles.row]}>
//                                                     <Text style={[darkMode ? styles.white : styles.black, styles.small, styles.opacity80perc]}>
//                                                         {strings[language].energyCostCalc.month}
//                                                     </Text>
//                                                     <View style={[{}]}>
//                                                         <MIcons name='keyboard-arrow-up' size={20} color={Colors.darkGreen} />
//                                                     </View>
//                                                 </View>
//                                                 <View style={[]}>
//                                                     <Text style={[styles.green, styles.mediumLarge]}>
//                                                         {this.state.forecastBill}
//                                                     </Text>
//                                                 </View>
//                                                 <View style={[]} >
//                                                     <Text style={[darkMode ? styles.white : styles.black, styles.small]} >
//                                                         INR
//                                                     </Text>
//                                                 </View>
//                                             </View>
//                                         </View>
//                                     </View>
//                                 </View>
//                                 <View style={[styles.row, styles.marginHorizontal20, styles.paddingVertical10]}>
//                                     <Pressable onPress={()=> this.setState({ index: 0 })} style={[styles.bgDarkGreen, styles.allCenter, styles.selfCenter, styles.row, styles.radius20, styles.paddingHorizontal16]}>
//                                         <SLIcons name={'arrow-left'} size={RFPercentage(1.8)} color={Colors.white}/>
//                                         <Text style={[styles.paddingHorizontal10,styles.white, styles.regular, styles.padding]}>
//                                             {strings[language].energyCostCalc.goBack}
//                                         </Text>
//                                     </Pressable>
//                                     {/* <Pressable onPress={this.captureAndShareScreenshot} style={[styles.flexOne, styles.centerVertical, styles.elevatePlus, styles.flexEndHorizontal, styles.extraMarginVertical]}>
//                                         <View style={[styles.padding, styles.paddingHorizontal16, styles.radius16, darkMode ? styles.bgLightGray : styles.bgWhite, styles.row, styles.elevateMild]}>
//                                             <View style={[styles.paddingRight10, styles.opacity50perc, styles.allCenter]}>
//                                                 <SLIcons name='share' size={16} color={darkMode ? Colors.white : Colors.black} />
//                                             </View>
//                                             <View>
//                                                 <Text style={[styles.regular, darkMode ? styles.white : styles.black]}>
//                                                     {strings[language].energyCostCalc.share}
//                                                 </Text>
//                                             </View>
//                                         </View>
//                                     </Pressable> */}
//                                 </View>
//                             </View> : null
//                         }
//                         { this.state.index < 2 ?
//                             <>
//                                 <View style={[styles.flexQuarterToOne, styles.row, styles.centerVertical, styles.spaceBetween, styles.marginVertical14, styles.marginHorizontal20]}>
//                                     { !this.state.index == 0 ?
//                                         <View style={[styles.flexOne, styles.left]}>
//                                             <Pressable
//                                                 onPress={()=> this.setState({index: this.state.index-1, age: null, appliance: null, category: null, ratingIndex: -1})}
//                                                 style={[styles.bgLightBlack, styles.allCenter, styles.row, styles.padding, styles.radius20, styles.paddingHorizontal24]}
//                                             >
//                                                 <SLIcons name={'arrow-left'} size={RFPercentage(1.8)} color={Colors.white}/>
//                                                 <Text style={[styles.paddingHorizontal10,styles.white, styles.regularPlus]}>
//                                                     {strings[this.props.language].back}
//                                                 </Text>
//                                             </Pressable>
//                                         </View> : null
//                                     }
//                                     { this.state.index < 1 ?
//                                         <View style={[styles.flexOne,styles.flexEndHorizontal]}>
//                                             <Pressable
//                                                 disabled={this.state.category && this.state.age && this.state.appliance && this.state.ratingIndex >= 0  ? false : true}
//                                                 onPress={()=> this.calculateConsumption()} style={[
//                                                     this.state.category && this.state.age && this.state.appliance && this.state.ratingIndex >= 0  ? styles.bgDarkGreen : styles.bgDarkGray,
//                                                     styles.allCenter, styles.row, styles.paddingHorizontal20, styles.radius20]
//                                                 }
//                                             >
//                                                 {this.state.loading ?
//                                                     <View style={[styles.row, styles.centerHorizontal, styles.padding2]}>
//                                                         <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
//                                                         <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
//                                                     </View> :
//                                                     <Text
//                                                         style={[styles.paddingHorizontal10, styles.white, styles.regularPlus, styles.padding]}>
//                                                         {strings[this.props.language].next}
//                                                     </Text> }
//                                                     < SLIcons name={'arrow-right'} size={RFPercentage(1.8)} color={Colors.white}/>
//                                             </Pressable>
//                                         </View>
//                                         :
//                                         <View style={[styles.flexOne,styles.flexEndHorizontal]}>
//                                             <Pressable
//                                                 onPress={this.forecastEnergy}
//                                                 style={[
//                                                     //  this.state.newConsumption || this.state.newTimeFrame || this.state.newRate ?
//                                                     styles.bgDarkGreen,
//                                                     //   : styles.bgDarkGray,
//                                                     styles.allCenter, styles.row, styles.radius20, styles.paddingHorizontal20]
//                                                 }
//                                             >
//                                                 {this.state.loading ?
//                                                     <View style={[styles.row, styles.centerHorizontal, styles.padding2]}>
//                                                         <Text style={[styles.white, styles.regularPlus]}>Loading</Text>
//                                                         <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.white} style={[Platform.OS == "android" ? styles.padding6 : null]}/>
//                                                     </View> :
//                                                 <Text style={[styles.paddingHorizontal10,styles.white, styles.regularPlus, styles.padding]}>
//                                                     {strings[language].energyCostCalc.calculate}
//                                                 </Text> }
//                                             </Pressable>
//                                         </View>
//                                     }
//                                 </View>
//                                 <View style={[styles.flexQuarterToOne, styles.marginVertical, styles.marginHorizontal20]}>
//                                     <View style={[styles.row, styles.marginVertical4,]}>
//                                         <Text style={[darkMode ? styles.white : styles.black, styles.medium]}>
//                                             {`${strings[language].energyCostCalc.typical}  `}
//                                         </Text>
//                                         <Text style={[styles.darkGreen, styles.medium]}>
//                                             {strings[language].energyCostCalc.householdAppliance}
//                                         </Text>
//                                     </View>
//                                     <View style={[]} >
//                                         <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
//                                             {strings[language].energyCostCalc.householdApplianceContent}
//                                         </Text>
//                                     </View>
//                                 </View>
//                                 <ScrollView
//                                     contentContainerStyle={[{ borderWidth:0 }, styles.paddingHorizontal16]}
//                                     horizontal showsHorizontalScrollIndicator={false} decelerationRate={100} snapToInterval={width/1.13}
//                                     snapToAlignment={"center"}
//                                 >
//                                     <HouseholdApplianceComponent darkMode={darkMode} language={language}/>
//                                     <HouseholdApplianceComponent darkMode={darkMode} language={language}/>
//                                     <HouseholdApplianceComponent darkMode={darkMode} language={language}/>
//                                 </ScrollView>
//                                 <View style={[styles.centerHorizontal, styles.marginBottom8, styles.marginVertical2]}>
//                                     <Pressable onPress={()=> this.props.navigation.navigate('HouseholdAppliance',{generalCategories: this.state.generalCategories,lightningCategories: this.state.light_Equipment  })}>
//                                         <Text style={[styles.darkGreen, styles.normal, styles.paddingVertical]}>
//                                             {strings[language].energyCostCalc.clickHere}
//                                         </Text>
//                                     </Pressable>
//                                 </View>
//                             </> : null
//                         }
//                     </ScrollView>
//                 </KeyboardAvoidingView>
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
//     }
// }
// function mapDispatchToProps (dispatch) {
//     return {
//         apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
//     }
// }
// const EnergyCostCalculatorScreen = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(EnergyCostCalculator);
// export {EnergyCostCalculatorScreen}
