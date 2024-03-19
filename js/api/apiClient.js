import axios from 'axios';

import {releaseBaseUrl, debugBaseUrl, isDebug} from "SmartgasConsumerApp/js/constants";

const apiBaseUrl = isDebug ? debugBaseUrl : releaseBaseUrl;
class ApiClient {

    static headersPromise(token){
        axios.defaults.timeout = 150000;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

        if (token) {
            axios.defaults.headers.common['Authorization'] = token;
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            // axios.defaults.headers.common['Bearer-Token'] = token;
        }
    }

    async httpGet(url, token, additionalHeaders) {
        ApiClient.headersPromise(token);
        if(additionalHeaders){
            let keys = Object.keys(additionalHeaders);
            keys.forEach(h =>{
                axios.defaults.headers.common[h] = additionalHeaders[h];
            });
        }
        console.log(url, token,"hss", additionalHeaders,"sumitwel",axios.defaults.headers)
        return(await axios.get(apiBaseUrl + url,{headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${token}`,

            }
        }));
    }
    async httpGetEncrypt(url, additionalHeaders) {
        console.log("encryptpass",PlainText,url)
        // ApiClient.headersPromise(token);
                if(additionalHeaders){
            let keys = Object.keys(additionalHeaders);
            keys.forEach(h =>{
                axios.defaults.headers.common[h] = additionalHeaders[h];
            });
        }
        return(await axios.get(apiBaseUrl + url,{headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "X-Requested-With": "XMLHttpRequest",

            }
        }));
    }

    async httpPost(url, token, body, additionalHeaders){
        console.log(apiBaseUrl + url, body,'httppost');
        body = body || {};
        ApiClient.headersPromise(token);
        if (additionalHeaders) {
            let keys = Object.keys(additionalHeaders);
            keys.forEach(h => {
                axios.defaults.headers.common[h] = additionalHeaders[h].value;
            });
        }
        console.log(axios.defaults,token,"headerbody",apiBaseUrl + url, body)
        try {

            let resp =  (await axios.post(apiBaseUrl + url, body, {
                headers: {
                    "Access-Control-Allow-Origin" : "*",
                    "Content-type": "Application/json",
                    // "X-Requested-With": "XMLHttpRequest",
                    "Authorization": token ? `Bearer ${token}`:''
                }
            }));
            
            
            
            console.log("apiClirnt",resp, apiBaseUrl + url, body,token);
            return resp
        } catch (e){
            console.log(e,'apiclienterror')
        }
    }

    async httpPut(url, token, body, additionalHeaders){
        body = body || {};
        ApiClient.headersPromise(token);

        if(additionalHeaders){
                let keys = Object.keys(additionalHeaders);
                keys.forEach(h => {
                    axios.defaults.headers.common[h] = additionalHeaders[h].value;
                });
        }
        console.log("put", apiBaseUrl + url, token, body )
        let resp =  (await axios.put(apiBaseUrl + url, body,{headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${token}`
            }
        }));
        console.log("apiClient put", resp);
        return resp
    }

    async httpDelete(url, token, body, additionalHeaders){
        body = body || {};
        ApiClient.headersPromise(token);

        if(additionalHeaders){
            let keys = Object.keys(additionalHeaders);
            keys.forEach(h => {
                axios.defaults.headers.common[h] = additionalHeaders[h].value;
            });
        }
        console.log("put", apiBaseUrl + url, body )
        let resp =  (await axios.delete(apiBaseUrl + url,{headers: {
                "Access-Control-Allow-Origin" : "*",
                "Content-type": "Application/json",
                "X-Requested-With": "XMLHttpRequest",
                "Authorization": `Bearer ${token}`
            }, data: body
        }));
        console.log("apiClient delete", resp);
        return resp
    }

    async httpGetWithoutBaseUrl(url, additionalHeaders, token) {
        // token && ApiClient.headersPromise(token);
        // if(additionalHeaders){
        //     let keys = Object.keys(additionalHeaders);
        //     keys.forEach(h =>{
        //         axios.defaults.headers.common[h] = additionalHeaders[h].value;
        //     });
        // }
        delete axios.defaults.headers.common["Authorization"];
        axios.defaults.headers.common['accept'] = 'application/json, text/plain, */*';

        return(await axios.get(url));
    }

}
const apiClient = new ApiClient();
export {apiClient};
