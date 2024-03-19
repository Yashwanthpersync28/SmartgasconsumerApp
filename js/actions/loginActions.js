
import {Platform} from 'react-native';
import {login, profile} from "SmartgasConsumerApp/js/api";
import {drawerApi} from '../api/drawer/drawerApi'
import * as dashboard from "SmartgasConsumerApp/js/api/dashboard";
import {apiDispatcher} from "./apiDispatcher";
import * as _ from 'lodash';
import {userDetailActions} from "./index";
import {appContext} from "../utils";

export const LOG_OUT = "LOG_OUT";
export const SET_AUTH = "SET_AUTH";
export const CLEAR_PASSWORD = "CLEAR_PASSWORD";
export const FETCHING_DATA = 'FETCHING_DATA';
export const FETCHING_DATA_SUCCESS = 'FETCHING_DATA_SUCCESS';
export const FETCHING_DATA_FAILURE = 'FETCHING_DATA_FAILURE';

export function getData(data) {
    return {
        type: FETCHING_DATA,
        payload: data
    }
}

export function getDataSuccess(data) {
    return {
        type: FETCHING_DATA_SUCCESS,
        data,
    }
}

export function getDataFailure() {
    return {
        type: FETCHING_DATA_FAILURE
    }
}

export function setAuth(param) {
    console.log("reached 1 ", param)
    return {
        type: SET_AUTH,
        payload: param
    }
}

export function clearPassword(param) {
    console.log("Clear Password 1 ", param)
    return {
        type: CLEAR_PASSWORD,
        // payload: param
    }
}

export function logout() {
    return {
        type: LOG_OUT,
    }
}

export function setLoader (status) {
    return (dispatch) => {
        status ? dispatch(getData()) : dispatch(getDataSuccess());
    }
}

export function performLoginActions(username, password, type) {
    return (dispatch, getState) => {
        return new Promise( async (resolve ,reject )=> {
            // dispatch(commonActions.pushActivityIndicator());

            try {
                let response;
// login.loginApi(
                if(type == "mpin"){
                    response = await username
                } else {
                    response = await dispatch(apiDispatcher(login.loginApi(username, password)));
                }
                // response = await dispatch(apiDispatcher(login.loginWithOtpApi(username, password, type)));

                console.log("performLoginActions success0001",response, 'type', type, 'token', response.data.jwtToken);
                if (response && response.data && response.data.jwtToken ) {

                // if (response && response.data && type === 2 && response.data.token ) {
                    console.log("performLoginActions success0pp1",response, 'type', type, 'token', response.data.jwtToken);
                    const token = (response.data && response.data.jwtToken) ? response.data.jwtToken : null;
                    const user = (response.data && response.data.consumerId) ? response.data.consumerId : null;
                    const msn = (response.data && response.data.msn) ? response.data.msn : null;
                    // const refreshToken = (response.data && response.data.refreshToken) ? response.data.refreshToken : null;
                    // const MID = (response.data && response.data.MID) ? response.data.MID : null;
                    // const Phase = (response.data && response.data.PHASE) ? response.data.PHASE : null;
                    // const HashCode = (response.data && response.data.HashCode) ? response.data.HashCode : null;
                    // const roleid = (response.data && response.data.roleid) ? response.data.roleid : null;
                    const LangID = (response.data && response.data.LangID) ? response.data.LangID : "english";
                    // console.log('inresponse3',msn);
                    const param = {
                        token,
                        user,
                        msn,
                        // refreshToken,
                        // msn: MID,
                        // Phase,
                        // HashCode,
                        // password,
                    };
                    console.log("performLoginActions param",param);

                    const userDetails = response.data;
                    dispatch(setAuth(param));
                     // User Details
                     await dispatch(userDetailActions.setUserDetails(response.data));
                     await dispatch(userDetailActions.setProfile(response.data));
                    // let data = await this.props.apiDispatcher(drawerApi(this.props.userDetails.roleid),false);
                    // this.props.setMenu(data.data);
                    // Language
                    // this.props.setLanguage("english")

                    // Change Language
                    dispatch(userDetailActions.setCurrentLanguage(LangID == 1 ? "english" : "english"));

                    // Drawer
                    // const drawer = await dispatch(apiDispatcher(drawerApi(roleid,LangID)));
                    // await dispatch(userDetailActions.setMenu(drawer.data));
                    
                   
                    // Profile
                    // const resp = await dispatch(apiDispatcher(profile.getProfileApi()));
                    // console.log("Profile Actions",resp);
                    // dispatch(userDetailActions.setProfile(resp.data));
                    // Notifications
                    // let data = await dispatch(apiDispatcher(dashboard.notificationsApi()))
                    // dispatch(userDetailActions.setNotifications(data.data));
                    // let profileDetails = await dispatch(apiDispatcher(profile.profileUpdateHistoryApi()))
                    // dispatch(userDetailActions.setProfileUpdateHistory(profileDetails.data));
                    // console.log("asf23fas222dfasf",profileDetails);
                    //accountdetails
                    // let details = await dispatch(apiDispatcher(dashboard.accountDetailsApi(response.data.CANumber)));
                    // console.log("Account Detail Actions",details);
                    // dispatch(userDetailActions.accountDetails(details.data));

                } else {
                    console.log("performLoginActionserror");
                    return reject("empty response");
                }

                return resolve(response.data);                // })
            } catch(err) {
                console.log("performLoginActionserror",err);
                return reject(err);
            }
        })
    }
}


export function performSwicthAccount(response) {
    console.log('Inside Switch',response);
    return (dispatch, getState) => {
        return new Promise( async (resolve ,reject )=> {
            // dispatch(commonActions.pushActivityIndicator());
            try {
                if (response && response.data ) {	
                    console.log("performSwicthAccount success0pp1",response,'token', response.data.token);	
                    const token = (response.data && response.data.token) ? response.data.token : null;	
                    const user = (response.data && response.data.CANumber) ? response.data.CANumber : null;	
                    // const refreshToken = (response.data && response.data.refreshToken) ? response.data.refreshToken : null;	
                    const msn = (response.data && response.data.msn) ? response.data.msn : null;	
                    const name = (response.data && response.data.name) ? response.data.name : null;	
                    const CANumber = (response.data && response.data.CANumber) ? response.data.CANumber : null;	
                    const Phase = (response.data && response.data.PHASE) ? response.data.PHASE : null;	
                    const mobilenumber = (response.data && response.data.mobilenumber) ? response.data.mobilenumber : null;	
                    const HashCode = (response.data && response.data.HMAC_HashCode) ? response.data.HMAC_HashCode : null;	
                    const roleid = (response.data && response.data.roleid) ? response.data.roleid : null;	
                    const LangID = 1//(response.data && response.data.LangID) ? response.data.LangID : 1;

                    console.log('inresponse3');
                    const param = {
                        token,
                        user,
                        // refreshToken,
                        msn,
                        // msn: MID,
                        Phase,
                        HashCode
                    };
                    const userDetails = {
                        token,
                        user,
                        // refreshToken,
                        msn,
                        Phase,
                        name,
                        CANumber,
                        mobilenumber,
                        HashCode,
                        roleid
                    }
                    console.log("performSwicthAccount param",param, response.data, 'UserDetails',userDetails);
                    console.log('User Response Action', response, );

                    
                    dispatch(setAuth(param));
                    // Change Language
                    dispatch(userDetailActions.setCurrentLanguage(LangID == 1 ? "english" : "assamese"));
                    // Drawer
                    const drawer = await dispatch(apiDispatcher(drawerApi(roleid, LangID)));
                    console.log("sumitapi",drawer.data);//sumit
                    dispatch(userDetailActions.setMenu(drawer.data));
                    // Changed by Rizwan on 01/02/2021 -> Multiple Accounts list was not populating
                    dispatch(userDetailActions.setUserDetails(userDetails));
                    const resp = await dispatch(apiDispatcher(profile.getProfileApi()));
                    dispatch(userDetailActions.setProfile(resp.data));
                    let data = await dispatch(apiDispatcher(dashboard.notificationsApi()))
                    dispatch(userDetailActions.setNotifications(data.data));
                    let details = await dispatch(apiDispatcher(dashboard.accountDetailsApi(CANumber)));
                    dispatch(userDetailActions.accountDetails(details.data));
                }

                return resolve(response.data);
                // })
            } catch(err) {
                console.log("performSwicthAccountActions",err);
                return reject(err);
            }
        })
    }
}
