// import Reactotron from 'reactotron-react-native';

import {logout, setAuth} from './loginActions';
// import {commonActions} from "./index";
import {appContext} from "SmartgasConsumerApp/js/utils";
// import {refreshTokenApi} from "../api/common/refreshToken";

export const apiDispatcher = (apiCall, shouldShowAlert=true) => {
    console.log('hi',apiCall)
    return (dispatch, getState) => {
        // alert(appContext.getIsConnectedToNetwork());

        return new Promise(async (resolve, reject) => {
            if (appContext.getIsConnectedToNetwork()) {
                // shouldShowLoader && dispatch(commonActions.pushActivityIndicator());
                const client = getState().auth;
                console.log("api dispatcher",getState().auth.get('msn'),client);
                let authToken = "";
                let authUser = "";
                let msn = "";
                let Phase = "";
                // let refreshToken = "";
                let HashCode = "";
                let roleid = 2;
                if (client.get('token')) {
                    authToken = client.get('token');
                    authUser = client.get('user');
                    msn = client.get('msn');
                    Phase = client.get('Phase');
                    // refreshToken = client.get('refreshToken');
                    HashCode = client.get('HashCode');
                }
                
                try {
                    let resp = await apiCall(authToken, authUser, msn, Phase, dispatch);
                    console.log("api response",resp);
                    return resolve(resp);
                } catch (e) {
                    console.log("catch",e);
                    if(e.status === 500){
                        dispatch(logout());
                        return resolve(e);
                    }

                    if (e.status === 401 || e === "VERIFICATION_FAILED") {

                        if (authToken=== "") {
                            return resolve(e);
                        }
                        // shouldShowLoader && dispatch(commonActions.popActivityIndicator());
                    try {
                        // let refreshStatus = await refreshTokenApi(authToken, authUser, refreshToken, roleid);
                        // if (refreshStatus.data.refreshToken) {
                        //     const token = (refreshStatus.data && refreshStatus.data.token) ? refreshStatus.data.token : null;
                        //     const user = (refreshStatus.data && refreshStatus.data.userid) ? refreshStatus.data.userid : authUser;
                        //     const refreshToken = (refreshStatus.data && refreshStatus.data.refreshToken) ? refreshStatus.data.refreshToken : null;
                        //     const param = {
                        //         token,
                        //         user,
                        //         refreshToken,
                        //         msn,
                        //         Phase,
                        //         HashCode, 
                        //         password: 'rrr'
                        //     };
                        //     console.log('Refresh Token Data', refreshStatus);
                        //     // const userDetails = response.data;
                        //     await dispatch(setAuth(param));
                        //     // await dispatch(setAuth("rizwan").payload('password'));

                        //     let resp = await dispatch(apiDispatcher(apiCall));
                        //     return resolve(resp);

                        // }
                        // console.log('Refresh TOken',refreshStatus);
                    } catch (e) {
                        //     console.log("jjjjj", e)
                        // if (e.status === 400) {
                        //     console.log("api Dispatcher");
                        //     if(e.data.ErrorDescription == "REFRESH_TOKEN_EXPIRED"){
                        //         await dispatch(logout())
                        //         // alert("Session expired");
                        //         reject(e.response || e || "Session expired");
                        //     }
                        // }
                    }


                    }
                    if (e.status === 406) {
                        // shouldShowLoader && dispatch(commonActions.popActivityIndicator());
                        resolve(e);
                    }
                    if (e.status === 404) {
                        // shouldShowLoader && dispatch(commonActions.popActivityIndicator());
                        return resolve(e);
                    }
                    if (e.status === 422){
                        return reject(e.data)
                    }

                    if (e.message === "Network Error"){
                        return reject(e.data)
                    }

                    else{
                        console.log("api bug",e);

                        return reject(e)
                    }
                }
            } else {
                shouldShowAlert && setTimeout(()=>alert('Not connected to the internet. Please connect and try again.'), 1000);
                return reject("noInternet");
            }
        });
    };
};
