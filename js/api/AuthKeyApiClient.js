import axios from 'axios';

import {autKeyReleaseBaseUrl, autKeyDebugBaseUrl, isDebug} from "SmartgasConsumerApp/js/constants";
const querystring = require('querystring');

const apiBaseUrl = isDebug ? autKeyDebugBaseUrl : autKeyReleaseBaseUrl;

class AuthKeyApiClient {

    static headersPromise(token){
        axios.defaults.timeout = 150000;
    }

    async httpGet(url, token, additionalHeaders) {
        AuthKeyApiClient.headersPromise(token);
        return(await axios.get(apiBaseUrl + url,{headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "X-Requested-With": "XMLHttpRequest",
                // "Authorization": `Bearer ${token}`
            }
        }));
    }

    async httpPost(url, authKey, body){
        let resp =  (await  axios.post(apiBaseUrl + url, body, {
                headers: { 
                    "Content-Type": "application/x-www-form-urlencoded",
                    'auth-key' : authKey
                }
        }));
        return resp
    }

    async httpPut(url, token, body, additionalHeaders){
        body = body || {};
        AuthKeyApiClient.headersPromise(token);
        console.log("put", apiBaseUrl + url, body )
        let resp =  (await axios.put(apiBaseUrl + url, body,{headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "X-Requested-With": "XMLHttpRequest",
            }
        }));
        console.log("AuthKeyApiClient put", resp);
        return resp
    }
}
const authKeyApiClient = new AuthKeyApiClient();
export {authKeyApiClient};
