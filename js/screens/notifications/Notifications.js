// import React from 'react';
// import { connect } from "react-redux";
// import { Text, View, StatusBar, FlatList, Dimensions, TouchableOpacity,Alert, RefreshControl, Pressable, ActivityIndicator  } from 'react-native';
// // Styles and Colors
// import { styles } from 'SmartgasConsumerApp/js/styles';
// import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// // Component
// import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound';
// import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
// import RadioButton from 'SmartgasConsumerApp/js/components/common/buttons/radioButton';
// // Icons
// import MIcons from 'react-native-vector-icons/MaterialIcons';
// // Backend
// import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
// import {strings} from "SmartgasConsumerApp/js/strings";
// import { RFValue } from 'react-native-responsive-fontsize';
// import {apiDispatcher, userDetailActions} from "../../actions";
// import {chartDataWithoutDate} from "../../helpers/common/chartDataHelper";
// import * as dashboard from "../../api/dashboard";
// // import  messaging from '@react-native-firebase/messaging';
// import moment from "moment"
// import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';
// import { DropdownComponent } from '../../components/common/input/DropdownPickerComponent';

// class Notifications extends React.Component{

//     constructor(props){
//         super(props)
//         this.state = {
//             notificationPermission:false,
//             notificationType: ''
//         }
//     }

//     async componentDidMount(): void {
//         this.props.navigation.setOptions({ headerRight : ()=> null });
//         this.props.navigation.setOptions({ headerLeft : () => (
//             <TouchableOpacity style={[styles.row,styles.allCenter,styles.paddingHorizontal24]} onPress={() => this.props.navigation.goBack()}>
//                <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25}/>
//                 <Text style={[this.props.darkMode ? styles.white : styles.black ,styles.selfCenter,styles.fontSize15,styles.paddingHorizontal6]}>
//                     {strings[this.props.language].back}
//                 </Text>
//             </TouchableOpacity>
//         ), });
//         this.syncData()

//         const didFocusSubscription = this.props.navigation.addListener(
//             'focus',
//             payload => {
//                 if (this.props.currentRoute !== 'notifications') {
//                     this.props.setCurrentRoute('notifications');
//                     this.syncData()
//                 }
//             }
//         );
//         this.props.setCurrentRoute('notifications');
//     }

//    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
//         if(this.props.notifications !== prevProps.notifications) {
//             let data = await this.props.notifications ? JSON.parse(JSON.stringify(this.props.notifications)) : [];
//             console.log(data, this.props.notifications)
//             if (this.props.notifications) {
//                 this.setState({
//                     notifications: data.notification.reverse(),
//                     refreshing: false
//                 }, () => console.log(this.state))
//             }
//         }

//         if(this.props.activeCount !== prevProps.activeCount) {
//             this.syncData();
//         }
//     }

//     syncData = async () => {
//         try {
//             let data = await this.props.apiDispatcher(dashboard.notificationsApi())
//             console.log("notif",data.data);
//             if(data.status == 200) {
//                 this.props.setNotifications(data.data);
//             } else if (data.status == 204){
//                 this.setState({ noData: true })
//             }
//         } catch (e) {
//             this.setState({refreshing: false})
//         }
//     }
//     onRefresh = () => {
//         this.setState({refreshing: true});
//         this.syncData()
//     };

//     changeActiveRadioButton(id) {
//         let notifications = this.state.notifications.map(n => {if (n.id === id) {n.selected =!n.selected} return n});
//         this.setState({ notifications: notifications, clearEnable: true })
//     }

//     deleteNotifications = async () => {
//         let notificationsToDelete = this.state.notifications.map(n=> {if (n.selected === true) return n.id + ""});
//         notificationsToDelete = notificationsToDelete.filter(n=> n)
//         // alert(notificationsToDelete);
//         let data = await this.props.apiDispatcher(dashboard.deleteNotificationsApi(notificationsToDelete))
//         console.log('Clear Response',data);
//         this.syncData();
//     }

//     deleteAllNotifications = async () => {
//         let notificationsToDelete = this.state.notifications.map(n=> {return n.id + ""});
//         notificationsToDelete = notificationsToDelete.filter(n=> n)
//         // alert(notificationsToDelete);
//         let data = await this.props.apiDispatcher(dashboard.deleteNotificationsApi(notificationsToDelete))
//         this.syncData();


//     }

//     checkNoti = async ()=> {
//         // const authStatus = await messaging().hasPermission();     
//         // console.log("asf",authStatus);   
//         // if (authStatus === 0) {
//         //     // console.log("NOt",authStatus, messaging.authorizationStatus);
//         //     this.setState({ notificationPermission: false })
//         // }
//         // else{    
//         //     this.setState({ notificationPermission: true })
//         // }
//     }

//     confirmPush = () =>
//     {
//         return Alert.alert(
//             'Enable Notifications',
//             'Allow notifications on this app?',
//             [
//                 {text: 'No', style: 'cancel'},
//                 {text : "Confirm", onPress:()=>{
//                     console.log("Push Enabled");
//                     this.setState({notificationPermission:true})
//                 }}
//             ]
//         );
//     }


//     renderItem = ({item, index}) => {

//         return (
//             <View
//                 // refreshControl={
//                 //     <RefreshControl
//                 //         tintColor={Colors.sunglowYellow}
//                 //         refreshing={this.state.refreshing}
//                 //         onRefresh={this.onRefresh} />
//                 // }
//                 style={[styles.flexThree, styles.row, styles.paddingBottom]}>
//                 {item.title ? 
//                 <View style={[ styles.row, styles.flexOne, styles.centerVertical]}>
//                     <View style={[ styles.flexHalf, {paddingTop:1.5}]}>
//                         <RadioButton key={index} button={item} size={15} color={Colors.lightGrey} activeColor={Colors.green} onClick={this.changeActiveRadioButton.bind(this,item.id)} />
//                     </View>
//                     <View style={[styles.flexThree]}>
//                         <View>
//                             <View style={[ styles.paddingBottom4]}>
//                                 <Text style={[styles.flexOne, styles.white, styles.normal]}>
//                                     {item.title}
//                                 </Text>
//                             </View>
//                             <View style={[]}>
//                                 <Text style={[styles.fontSize11, styles.opacity50perc, styles.white]}>
//                                     {item.description}
//                                 </Text>
//                             </View>
//                         </View>
//                         <View style={[styles.right, ]}>
//                             <Text style={[styles.flexOne, styles.small, styles.green]}>
//                                 {moment(item.time).format("MMM DD YYYY hh:mm:ss")}
//                             </Text>
//                         </View>
//                     </View>            
//                 </View> :     index ==1 &&
//                     <View style={[styles.flexThree, styles.paddingTop12Percent]}>
//                         <LoaderComponent/>
//                     </View>   }
//             </View>
           
//         );
//     }

//     render(){

//         const {language, darkMode} = this.props;
//         return(
//             <ErrorBoundaryMainComponent>
//             <View style={[darkMode ? styles.bgBlack: styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]} >
//                 { this.props.darkMode ?  <StatusBar backgroundColor={Colors.black} barStyle='light-content'  /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content'  />}
//                 {this.state.noData ?
//                     <View style={[ styles.allCenter, styles.flexOne]}>
//                         <DataNotFound darkMode={darkMode}/> 
//                     </View>
//                 :
//                 <>


//                     <View style={[styles.flexQuarterToOne, styles.marginBottom]}>
//                         <View style={[styles.row,]}>
//                             <Text style={[darkMode ? styles.white : styles.black, styles.medium, styles.lineHeight28]}>
//                                 {`${strings[language].notifications.be}  `}
//                             </Text>
//                             <Text style={[styles.darkGreen, styles.medium, styles.lineHeight28]}>
//                                 {strings[language].notifications.notified}
//                             </Text>
//                         </View>
//                         <View style={[ ]} >
//                             <Text style={[darkMode ? styles.white : styles.black, styles.lineHeight24, styles.normal]}>
//                                 {strings[language].notifications.headerContext}
//                             </Text>
//                         </View>
//                         {/* <DropdownComponent  zIndex={2} key={"gender"} data={["General","Alert","Updates"]} placeholder={"Select Type"} setValue={(e)=> {  this.setState({ notificationType: e })}} value={this.state.notificationType}/> */}
//                     </View>

//                     <View style={[styles.flexThree, styles.marginHorizontal]}>
//                         <View  style={[styles.bgDarkGreen,styles.absolute, { top: -Dimensions.get("window").width/28, left: Dimensions.get("window").width/80, width: Dimensions.get("window").width/1.6, height: Dimensions.get("window").height/6, borderRadius: 25, transform: [{rotate: '173deg'}]} ]}/>
//                         <View style={[styles.bgGreen, styles.absolute, { top: -Dimensions.get("window").width/50, left: 4, width: Dimensions.get("window").width/1.38, height: Dimensions.get("window").height/6, borderRadius: 25 ,transform: [{rotate: '176deg'}]} ]}/>
//                         <View style={[styles.flexOne, styles.bgLightBlack, styles.paddingHorizontal24, styles.radius16]}>
//                             <View style={[styles.flexOne, styles.centerVertical]}>
//                                 <Text style={[styles.darkGreen, styles.medium22]}>
//                                     {strings[language].notifications.notifications}
//                                 </Text>
//                             </View>
//                             {this.state.notifications ?
//                                 <View style={[styles.flexThree]}>
//                                     <FlatList showsVerticalScrollIndicator={false}
//                                         style={[styles.flexOne]}
//                                         data={this.state.notifications}
//                                         renderItem={this.renderItem}
//                                         numColumns={1}
//                                         initialNumToRender={10}
//                                         ref={ref => this.listView = ref}
//                                         keyExtractor={(item, index) => item.id }
//                                     />
//                                 </View>
//                                 :
//                                 <View style={[styles.flexThree, styles.allCenter]}>
//                                     <Text style={[styles.green, styles.textCenter]}>
//                                         {strings[language].notifications.noNotificationMessage}
//                                     </Text>
//                                 </View> 
//                             }
//                             <View style={[styles.flexQuarterToOne]}/>
//                         </View>
//                     </View>
//                     <View style={[styles.flexQuarterToOne, styles.centerVertical, styles.spaceBetween, styles.row, styles.marginHorizontal]}>
//                     {!this.state.notificationPermission && <TouchableOpacity onPress={()=>this.confirmPush()} 
//                         style={[darkMode? styles.bgDarkGreen : styles.bgDarkGray, styles.paddingRegular, styles.paddingHorizontal24, styles.radius20,styles.selfCenter,styles.marginVertical14,styles.paddingVertical]}>
//                             <Text style={[styles.lineHeight24,styles.white, styles.fontSize13]}>Enable Push Notifications</Text>
//                         </TouchableOpacity>}
//                         <Pressable disabled={this.state.notifications && this.state.clearEnable ? false : true} onPress={this.deleteNotifications} style={[this.state.notifications && this.state.clearEnable ? styles.bgDarkGreen : styles.bgDarkGray, styles.paddingRegular, styles.paddingHorizontal24, styles.paddingVertical, styles.radius20, styles.marginBottom24, {right:0, position:'absolute'}]}>
//                             <Text style={[styles.white, styles.palanquinRegular, styles.regular]}>
//                                 {strings[language].notifications.clear}
//                             </Text>
//                         </Pressable>
//                         {/* <TouchableOpacity onPress={this.deleteAllNotifications} style={[styles.bgDarkGreen, styles.paddingRegular, styles.paddingHorizontal24, styles.radius20, styles.marginBottom24]}>
//                             <Text style={[styles.white, styles.palanquinRegular, styles.regular, styles.lineHeight26]}>
//                                 {strings[language].notifications.clearAll}
//                             </Text>
//                         </TouchableOpacity> */}
//                     </View>
//                 </>}
//            </View>
//            </ErrorBoundaryMainComponent>
//         );
//     }
// }

// function mapStateToProps (state) {
//     return {
//         activeCount: commonSelectors.activeCount(state),
//         darkMode: commonSelectors.darkMode(state),
//         language: commonSelectors.language(state),
//         userDetails: commonSelectors.userDetails(state),
//         notifications: commonSelectors.notifications(state),
//         currentRoute: commonSelectors.currentRoute(state),
//     }
// }
// function mapDispatchToProps (dispatch) {
//     return {
//         apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
//         logout: (state=false) => dispatch(logout(state)),
//         setNotifications: (data={}) => dispatch(userDetailActions.setNotifications(data)),
//         setCurrentRoute: (data={}) => dispatch(userDetailActions.setCurrentRoute(data)),
//     }
// }
// const NotificationsScreen = connect(
//     mapStateToProps,
//     mapDispatchToProps
// )(Notifications);
// export {NotificationsScreen}









import React from 'react';
import { connect } from "react-redux";
import { Text, View, StatusBar, StyleSheet, FlatList, Dimensions, TouchableOpacity, Alert, RefreshControl, Pressable, ActivityIndicator, Modal } from 'react-native';
// Styles and Colors
import { styles } from 'SmartgasConsumerApp/js/styles';
import Colors from 'SmartgasConsumerApp/js/styles/Colors';
// Component
import DataNotFound from 'SmartgasConsumerApp/js/components/common/workInProgress/DataNotFound';
import LoaderComponent from 'SmartgasConsumerApp/js/components/common/loader/Loader'
import RadioButton from 'SmartgasConsumerApp/js/components/common/buttons/radioButton';
// Icons
import MIcons from 'react-native-vector-icons/MaterialIcons';
// Backend
import * as commonSelectors from "SmartgasConsumerApp/js/selectors/common";
import { strings } from "SmartgasConsumerApp/js/strings";
import { RFValue } from 'react-native-responsive-fontsize';
import { apiDispatcher, userDetailActions } from "../../actions";
import { chartDataWithoutDate } from "../../helpers/common/chartDataHelper";
import * as dashboard from "../../api/dashboard";
// import  messaging from '@react-native-firebase/messaging';
import moment from "moment"
import { ErrorBoundaryMainComponent } from '../../components/errorBoundary/ErrorBoundaryComponent';

import Icon from 'react-native-vector-icons/FontAwesome';



class Notifications extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            notificationPermission: false,
            notificationType: '',
            notifications: [],
            showModal: false,
            selectedNotificationId: null
        }
    }

    async componentDidMount(): void {
        this.props.navigation.setOptions({ headerRight: () => null });
        this.props.navigation.setOptions({
            headerLeft: () => (
                <TouchableOpacity style={[styles.row, styles.allCenter, styles.paddingHorizontal24]} onPress={() => this.props.navigation.goBack()}>
                    <MIcons name="keyboard-arrow-left" color={this.props.darkMode ? Colors.white : Colors.black} size={25} />
                    <Text style={[this.props.darkMode ? styles.white : styles.black, styles.selfCenter, styles.fontSize15, styles.paddingHorizontal6]}>
                        {strings[this.props.language].back}
                    </Text>
                </TouchableOpacity>
            ),
        });
        this.syncData()

        this.props.setCurrentRoute('notifications');
    }

    async componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS): void {
        if (this.props.notifications !== prevProps.notifications) {
            let data = await this.props.notifications ? JSON.parse(JSON.stringify(this.props.notifications)) : [];

            console.log(data, this.props.notifications)

            if (this.props.notifications) {
                this.setState({
                    notifications: data.notification,
                    refreshing: false
                }, () => console.log(this.state))
            }
        }

        if (this.props.activeCount !== prevProps.activeCount) {
            this.syncData();
            console.log("syn----->", this.props.activeCount, "oldcound", prevProps.activeCount)
        }
    }

    syncData = async () => {
 
        try {
            const baseRechargeDetailsUrl = 'https://cportalgasapi.esyasoft.com/api/Notification/Mobile/NotificationHistory';

            const token = this.props.token;
            const consumerNo = this.props?.userDetails?.consumerId;


            const headers = new Headers({
                Accept: 'application/json, text/plain, */*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            });

            const requestBody = JSON.stringify({
                consumerNo: consumerNo,
                limit: 100,
                offset: 0
            });

            console.log("requestBodyHistory", requestBody);
            console.log("NoBodyHistory");

            const response = await fetch(baseRechargeDetailsUrl, {
                method: 'POST',
                headers: headers,
                body: requestBody,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text(); // If not JSON, get response as text
            }

            console.log('History-App.Js:', response.status, data);
            this.props.setNotifications(data);

        } catch (error) {
            console.error('History-APPJS-Error:', error);
            this.setState({ refreshing: false })
        }


    }
    onRefresh = () => {
        this.setState({ refreshing: true });
        this.syncData()
    };

    deleteNotification = async id => {
        const deleteid = id;
        const updatedNotifications = this.state.notifications.filter(
            notification => notification.id !== id
        );

        //////////
        try {
            const baseRechargeDetailsUrl = 'https://cportalgasapi.esyasoft.com/api/Notification/Mobile/ClearNotification';

            const token = this.props.token;
            const consumerNo = this.props?.userDetails?.consumerId;


            const headers = new Headers({
                Accept: 'application/json, text/plain, */*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            });

            const requestBody = JSON.stringify({
                id: deleteid,
                consumerNo: consumerNo,
            });

            console.log("requestBodyDeleteNotification", requestBody);
            console.log("NoBodyDeleteNotification");

            const response = await fetch(baseRechargeDetailsUrl, {
                method: 'DELETE',
                headers: headers,
                body: requestBody,
            });

            console.log("response---->", response)

            if (response.ok) {
                // Show notification deleted alert
                Alert.alert('Notification Deleted', 'The selected notification has been deleted successfully.');
                // Update notifications list
            }


            if (!response.ok) {
                Alert.alert('Not able to delete', 'something went wrong !');
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text(); // If not JSON, get response as text
            }

            console.log('Delete-Noti :', response.status, data);

            // this.props.setNotifications(data);
            this.syncData();

        } catch (error) {
            console.error('Delete-Noti-Error:', error);
            this.setState({ refreshing: false })
        }

        //////////

        this.setState({ notifications: updatedNotifications, showModal: false });
    };





    // Function to clear all notifications
    clearAllNotifications = async () => {

        try {
            const baseRechargeDetailsUrl = 'https://cportalgasapi.esyasoft.com/api/Notification/Mobile/ClearNotifications';

            const token = this.props.token;
            const consumerNo = this.props?.userDetails?.consumerId;


            const headers = new Headers({
                Accept: 'application/json, text/plain, */*',
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
                'X-Requested-With': 'XMLHttpRequest',
            });

            const requestBody = JSON.stringify({
                consumerNo: consumerNo,
            });

            console.log("requestBodyDelete-ALL-noti", requestBody);
            console.log("NoBodyDelete-ALL-noti");

            const response = await fetch(baseRechargeDetailsUrl, {
                method: 'DELETE',
                headers: headers,
                body: requestBody,
            });

            console.log("response---->", response)

            if (response.ok) {
                // Show notification deleted alert
                Alert.alert('Notifications Deleted', 'All notifications has been deleted successfully.');
                // Update notifications list
            }


            if (!response.ok) {
                Alert.alert('Not able to delete all notifications', 'something went wrong !');
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            let data;
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text(); // If not JSON, get response as text
            }

            console.log('Delete-all-Noti :', response.status, data);

            // this.props.setNotifications(data);
            this.syncData();

        } catch (error) {
            console.error('Delete-all-Noti-Error:', error);
            this.setState({ refreshing: false })
        }

        // this.setState({ notifications: [], showModal: false });
    };

    toggleModal = (notificationId) => {
        this.setState(prevState => ({
            showModal: !prevState.showModal,
            selectedNotificationId: notificationId
        }));
    };

    renderNotificationItem = ({ item }) => (
        <View style={[newStyle.notificationContainer]}>
            <View style={newStyle.notificationContent}>
                <Text style={newStyle.notificationTitle}>{item.title}</Text>
                <Text style={newStyle.notificationDescription}>{item.description}</Text>
                <View style={newStyle.timeContainer}>
                    <Icon name="clock-o" size={11} color={newStyle.notificationDescription.color} style={newStyle.clockIcon} />
                    <Text style={newStyle.notificationTime}> {moment(item.time).format("MMM DD YYYY hh:mm:ss")}
                    </Text>
                </View>

            </View>
            <TouchableOpacity style={newStyle.iconContainer}  // Add a style for the TouchableOpacity
                onPress={() => this.toggleModal(item.id)}>
                <View>
                    <Icon name="ellipsis-v" size={28} color={newStyle.notificationTitle.color} />
                </View>
            </TouchableOpacity>
        </View>
    );

    renderModalContent = () => {
        const { selectedNotificationId, notifications } = this.state;
        const selectedNotification = notifications.find(notification => notification.id === selectedNotificationId);

        return (
            <View style={newStyle.modalContent}>
                {selectedNotification && (
                    <TouchableOpacity onPress={() => this.deleteNotification(selectedNotificationId)} style={newStyle.modalOption}>
                        {/* <Text>Delete "{selectedNotification.title}"</Text> */}
                        <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#666666' }}>Delete Notification</Text>

                    </TouchableOpacity>
                )}
                <TouchableOpacity onPress={() => { this.clearAllNotifications() }} style={newStyle.modalOption}>
                    <Text style={{ fontSize: 17, fontWeight: 'bold', color: '#666666' }}>Delete All Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleModal} style={[newStyle.modalOption, newStyle.modalCancelOption]}>
                    <Text style={newStyle.modalCancelOptionText}>Cancel</Text>
                </TouchableOpacity>
            </View>
        );
    };

    render() {

        const { language, darkMode } = this.props;
        return (
            <ErrorBoundaryMainComponent>
                <View style={[darkMode ? styles.bgBlack : styles.bgIdk, styles.flexOne, styles.paddingTopHeader, styles.paddingHorizontal24]} >
                    {this.props.darkMode ? <StatusBar backgroundColor={Colors.black} barStyle='light-content' /> : <StatusBar backgroundColor={Colors.idk} barStyle='dark-content' />}
                    {!this.state.notifications ?
                        <View style={[styles.allCenter, styles.height50Points]}>
                            <LoaderComponent />
                        </View>
                        :
                        <>
                            <View style={[styles.row,]}>
                                <Text style={[darkMode ? styles.white : styles.black, styles.medium, styles.lineHeight28, { fontWeight: '500', textAlign: 'center' }]}>
                                    {`${strings[language].notifications.be}  `}
                                </Text>
                                <Text style={[styles.darkGreen, styles.medium, styles.lineHeight28, { fontWeight: '500', textAlign: 'center' }]}>
                                    {strings[language].notifications.notified}
                                </Text>
                            </View>
                            <View style={{ alignContent: 'center', alignItems: 'center' }} >
                                <Text style={[darkMode ? styles.white : styles.black, styles.lineHeight24, styles.normal, { fontWeight: '500', textAlign: 'center' }]}>
                                    {strings[language].notifications.headerContext}
                                </Text>
                            </View>
                            <FlatList
                                showsVerticalScrollIndicator={false}
                                data={this.state.notifications}
                                renderItem={this.renderNotificationItem}
                                keyExtractor={item => item.id.toString()}
                                ListEmptyComponent={() => (
                                    <View style={[styles.allCenter, styles.height50Points]}>
                                        <LoaderComponent />
                                    </View>)}
                            />
                            <Modal
                                visible={this.state.showModal}
                                transparent={true}
                                animationType="slide"
                            >
                                <View style={newStyle.modalContainer}>
                                    <TouchableOpacity onPress={this.toggleModal} style={newStyle.modalBackground} />
                                    {this.renderModalContent()}
                                </View>
                            </Modal>
                        </>}
                </View>
            </ErrorBoundaryMainComponent>
        );
    }
}
const newStyle = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        backgroundColor: '#ffffff',
    },
    iconContainer: {
        padding: 10, // Adjust the padding to increase the area around the Icon
    },
    notificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        padding: 15,
        borderRadius: 8,
        backgroundColor: '#ffffff',
    },
    notificationContent: {
        flex: 1,
    },
    notificationTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 4,
        marginRight: 43,
        color: '#666666'
    },
    notificationDescription: {
        fontSize: 16,
        marginBottom: 4,
        color: '#666666'
    },
    notificationTime: {
        fontSize: 11,
        color: '#666666',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 20,
    },
    modalOption: {
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
        alignItems: 'center',
    },
    modalOptionText: {
        fontSize: 18,
        color: '#666666',
    },
    modalCancelOption: {
        backgroundColor: '#3A753C',
        // green: '#64AE64',
        // green50: '#64ae6480',
        // darkGreen: '#3A753C', // Red color for cancel button'#ff6347'
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
    },
    modalCancelOptionText: {
        fontSize: 18,
        color: '#ffffff',
        paddingVertical: 0,
        fontWeight: 'bold'
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    },
});
function mapStateToProps(state) {
    return {
        activeCount: commonSelectors.activeCount(state),
        darkMode: commonSelectors.darkMode(state),
        language: commonSelectors.language(state),
        userDetails: commonSelectors.userDetails(state),
        notifications: commonSelectors.notifications(state),
        currentRoute: commonSelectors.currentRoute(state),
        token: commonSelectors.getToken(state),
        userDetails: commonSelectors.profile(state),


    }
}
function mapDispatchToProps(dispatch) {
    return {
        apiDispatcher: (apiCall, shouldShowLoader) => dispatch(apiDispatcher(apiCall, shouldShowLoader)),
        logout: (state = false) => dispatch(logout(state)),
        setNotifications: (data = {}) => dispatch(userDetailActions.setNotifications(data)),
        setCurrentRoute: (data = {}) => dispatch(userDetailActions.setCurrentRoute(data)),
        //setFcmToken: (data = {}) => dispatch(userDetailActions.setFcmToken(data)),


    }
}
const NotificationsScreen = connect(
    mapStateToProps,
    mapDispatchToProps
)(Notifications);
export { NotificationsScreen }




