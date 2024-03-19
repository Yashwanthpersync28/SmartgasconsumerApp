import {Platform} from 'react-native';
// import {login, profile} from "SmartCrust/js/api";
import { dashboard, user } from "../api";
import {apiDispatcher} from "./apiDispatcher";
import * as _ from 'lodash';
// import messaging from '@react-native-firebase/messaging';

export const SET_FCM_TOKEN = "SET_FCM_TOKEN";
export const SET_FCM_NOTIFICATION = "SET_FCM_NOTIFICATION";
import {userDetailActions} from "./index";
// import { NotifeeSound } from '../helpers/NotifeeSound';


export const fcmToken = (data) => {
    return {
        type: SET_FCM_TOKEN,
        data
    }
}

export const setFcmToken = (details) => {
    return (dispatch, getState) => {
        dispatch(fcmToken(details));
    }
}

export const fcmNotification = (data) => {
    console.log("FCM notification",data);
    return {
        type: SET_FCM_NOTIFICATION,
        data
    }
}

export const setFcmNotification = (details) => {
    console.log("FCM notification",details);
    return (dispatch, getState) => {
        dispatch(fcmNotification(details));
    }
}

// export function setFcmNotification(data) {
//     return {
//         type: SET_FCM_NOTIFICATION,
//         payload: data
//     }
// }
// Get Token from Firebase

const requestUserPermission = async () => {
    // const authStatus = await messaging().requestPermission();
    // const enabled =
    //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    // if (enabled) {
    //     console.log('Authorization status:', authStatus);
    //     return await getFcmToken() //<---- Add this
    // }
}

const getFcmToken = async () => {
    // const fcmToken = await messaging().getToken();
    // if (fcmToken) {
    //     console.log(fcmToken);
    //     // setFcmToken(fcmToken)
    //     console.log("Your Firebase Token is:", fcmToken);
    //     // alert(fcmToken)
    //     // const storeToken = commonSelectors.fcmToken()
    //     // console.log("FCM Token in state", storeToken);
    //     return fcmToken
    // } else {
    //     console.log("Failed", "No token received");
    // }
  }

// Get Notification from Firebase

const firebaseMessages = async (dispatch) => { 

    messaging().onMessage(async remoteMessage => {
        console.log("Notification Received", remoteMessage);
        // NotifeeSound(remoteMessage)
        //         try {
        //             const noti = dashboard.notificationsApi();
        //             console.log("Notification Api Reponse", noti.data);                        
        //         }
        //         catch(err) {
        //             console.log("Notification Error",err);
        //         }
        //         console.log("Notification33 Received", remoteMessage);
        // });
            // const noti = await dispatch(apiDispatcher(dashboard.notificationsApi()));
            // console.log("Notification Api Reponse", noti.data);
            // await dispatch(userDetailActions.setNotifications(noti.data));

            const noti = await dispatch(apiDispatcher(user.notificationGetApi()));
            console.log("Notification Api FireBase Reponse", noti);
            await dispatch(userDetailActions.setNotifications(noti.data));

        // setFcmNotification(remoteMessage)
    });
        // Alert.alert('A asfasfasfnew FCM message arrived!', JSON.stringify(remoteMessage))
    messaging().setBackgroundMessageHandler(async remoteMessage => {
        // NotifeeSound(remoteMessage)
        const noti = await dispatch(apiDispatcher(user.notificationGetApi()));
        console.log("Notification Api FireBase Reponse", noti);
        await dispatch(userDetailActions.setNotifications(noti.data));
        // await dispatch(userDetailActions.setNotifications(noti.data));
        // setFcmNotification(remoteMessage)
    });
    messaging().onNotificationOpenedApp(remoteMessage => {
        console.log(
            'Notification caused app to open from background state:',
            remoteMessage,
        );
    });

    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
        if (remoteMessage) {
            console.log(
                'Notification caused app to open from quit state:',
                remoteMessage,
            );
        }
    });
}

export {requestUserPermission}
export {firebaseMessages}