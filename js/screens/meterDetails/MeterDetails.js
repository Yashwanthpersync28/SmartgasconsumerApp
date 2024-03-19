// import React from 'react';
// import { connect } from "react-redux";
// import { Text, View, TextInput, FlatList, ScrollView, Dimensions, Linking, TouchableOpacity, RefreshControl, ActivityIndicator } from 'react-native';
// // STYLES
// import { styles } from '../../styles';
// import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// // ICONS
// import MCIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import IIcons from 'react-native-vector-icons/Ionicons';
// // COMPONENTS
// import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound';
// import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
// // BACKEND
// import * as dashboard from "../../api/dashboard";
// import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
// import { strings } from "SmartgasConsumerApp/js/strings";
// import { apiDispatcher, userDetailActions } from "../../actions";
// import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
// import { DropdownComponent } from '../../components/common/input/DropdownPickerComponent';
// import DropDownPicker from 'react-native-dropdown-picker';
// import { MeterDropdownComponent } from './components/MeterDropdownComponent';
// import { DynamicBackendListComponent } from './components/DynamicBackendList';


// const { height, width } = Dimensions.get('window');

// class MeterDetails extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             schemesResponse: [],
//             response: [],
//             noData: false,
//             meterDropdown: [
//                 // { label: "Current Meter Details", value: "1001" },
//                 // { label: "Previous Meter Details", value: "1002" },
//             ],
//             meterDetails: [
//                 // { title: "Meter Number", value: "7107140" },
//                 // { title: "Meter Phase", value: "1 Phase" },
//                 // { title: "Meter Condition", value: "OK" },
//                 // { title: "Meter Reading (Kwh)", value: "150" },
//                 // { title: "Meter Reading (Kvah)", value: "158" },
//                 // { title: "Meter Installation Date", value: "08/08/2013 17:46:30" },
//             ],
//             meterListLoading: false,
//             meterDetailsLoading: false,
//             meterSelected: ""
//         };
//     }

//     async componentDidMount(): void {
//         this.syncData();
//         const didFocusSubscription = this.props.navigation.addListener(
//             'focus',
//             payload => {
//                 if (this.props.currentRoute !== 'Schemes') {
//                     this.props.setCurrentRoute('Schemes');
//                     this.syncData()
//                 }
//             }
//         );

//     }

//     componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
//         if (this.props.activeCount !== prevProps.activeCount) {
//             this.syncData();
//         }
//     }

//     labelDateFilter = (data) => {
//         const filterData = data.map((item, index) => {
//             item.value = item.id;
//             item.label = item.name;
//             delete item.id;
//             delete item.name;
//             // delete item.amount;
//             return item;
//         });
//         this.setState({ meterDropdown: filterData })
//     }

//     meterDetailsApiCall = async (meterSelected) => {
//         try {
//             this.setState({ meterDetailsLoading: true })
//             let meterDetailsResponse = await this.props.apiDispatcher(dashboard.meterDetailsApi(meterSelected))
//             if (meterDetailsResponse.status == 200) {
//                 console.log('Meter Details Screen API', meterDetailsResponse)
//                 this.setState({ meterDetails: meterDetailsResponse.data, noData: false })
//                 // this.labelDateFilter(meterDetailsResponse.data)
//             } else if (meterDetailsResponse.status == 212) {
//                 this.setState({ noData: true })
//             }
//             else if (meterDetailsResponse.status == 204) {
//                 this.setState({ noData: true })
//             }
//             this.setState({ meterDetailsLoading: false })
//         } catch (e) {
//             this.setState({ refreshing: false, meterDetailsLoading: false })
//         }
//     }

//     syncData = async () => {
//         try {
//             this.setState({ meterListLoading: true })
//             let meterListResp = await this.props.apiDispatcher(dashboard.meterSequenceListApi())
//             if (meterListResp.status == 200) {
//                 console.log('Meter List Screen API', meterListResp)
//                 this.labelDateFilter(meterListResp.data)
//                 this.meterDetailsApiCall()
//             } else if (data.status == 212) {
//                 this.setState({ noData: true })
//             }
//             else if (data.status == 204) {
//                 this.setState({ noData: true })
//             }
//             this.setState({ meterListLoading: false })
//         } catch (e) {
//             this.setState({ refreshing: false, meterListLoading: false })
//         }
//     }

//     onRefresh = () => {
//         this.setState({ refreshing: true });
//         this.syncData()
//         this.setState({ refreshing: false });
//     };

//     render() {

//         console.log("asdfayshoudljkf", this.state);


//         const { language, darkMode } = this.props;
//         return (
//             <ErrorBoundaryMainComponent>
//                 <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]}>
//                     <ScrollView showsVerticalScrollIndicator={false}
//                         refreshControl={
//                             <RefreshControl
//                                 tintColor={Colors.sunglowYellow}
//                                 refreshing={this.state.refreshing}
//                                 onRefresh={this.onRefresh} />
//                         }
//                         contentContainerStyle={[styles.flexOne]}
//                     >
//                         {/* {this.state.noData ?
//                             <View style={[styles.paddingTop12Percent, styles.allCenter, styles.flexOne]}>
//                                 <DataNotFound darkMode={darkMode} />
//                             </View>
//                             : */}
//                         <View style={[styles.flexOne,]}>
//                             <View style={[styles.row, styles.marginVertical]}>
//                                 <Text style={[darkMode ? styles.white : styles.black, styles.medium22]}>
//                                     {`Meter `}
//                                 </Text>
//                                 <Text style={[styles.darkGreen, styles.medium22]}>
//                                     Details
//                                 </Text>
//                             </View>
//                             <View style={[]} >
//                                 <Text style={[darkMode ? styles.white : styles.black, styles.normal, styles.lineHeight24]}>
//                                     {/* {strings[language].comparison.headerContext} */}
//                                     Know your meter reading, based on meter selection.
//                                 </Text>
//                             </View>
//                             {!this.state.meterListLoading ? <MeterDropdownComponent zIndex={2} key={"gender"} data={this.state.meterDropdown} placeholder={"Select Type"} onChangeItem={(e) => { console.log("asdfasdf", e); this.meterDetailsApiCall(e.value); this.setState({ meterSelected: e.value }) }} value={this.state.meterSelected} />
//                                 :
//                                 <View style={[styles.row, styles.allCenter]}>
//                                     <Text style={[styles.green, styles.regular]}>{strings[language].eventAnalysis.loadingDropdown}</Text>
//                                     <ActivityIndicator size={Platform.OS == "android" ? 24 : 36} color={Colors.green} style={[Platform.OS == "android" ? styles.padding6 : null]} />
//                                 </View>}
//                             {this.state.meterDetailsLoading ? <View style={[{ marginTop: height / 3 }]}>
//                                 <LoaderComponent />
//                             </View> :
//                                 this.state.noData ?
//                                     <View style={[styles.allCenter, styles.flexOne]}>
//                                         <DataNotFound hideLottie={true} darkMode={darkMode} />
//                                     </View>
//                                     : <>
//                                         {this.state.meterSelected != "" && <DynamicBackendListComponent style={[styles.marginTop18]} data={this.state.meterDetails} />}
//                                     </>
//                             }
//                         </View>
//                         {/* } */}
//                     </ScrollView>
//                 </View>
//             </ErrorBoundaryMainComponent>
//         );
//     }
// }

// function mapStateToProps(state) {
//     return {
//         language: commonSelectors.language(state),
//         darkMode: commonSelectors.darkMode(state),
//         userDetails: commonSelectors.userDetails(state),
//     }
// }

// function mapDispatchToProps(dispatch) {
//     return {
//         apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
//         setCurrentRoute: (data = {}) => dispatch(userDetailActions.setCurrentRoute(data)),
//     }
// }

// const MeterDetailsScreen = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(MeterDetails);
// export { MeterDetailsScreen };