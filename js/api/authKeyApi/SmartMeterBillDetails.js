import {authKeyApiClient} from "../AuthKeyApiClient";
import {smartMeterBillDetailsConstant} from "SmartgasConsumerApp/js/constants";
const querystring = require('querystring'); //sumit

export const smartMeterBillDetailsApi = (authKey) => {
    return (token, userid, msn, Phase) => {
        let params =  querystring.stringify({
            consumer_no: userid,
            msn, Phase
        });
        let urlString = smartMeterBillDetailsConstant;
        console.log('URL',urlString);
        return new Promise(async (resolve, reject) => {
            try {
                let resp = await authKeyApiClient.httpPost(urlString, authKey, params, {});
                console.log('SmartMeterBillDetailsApi Response',resp);
                // console.log("overview response is", JSON.parse(JSON.stringify(resp)));
                return resolve(resp);
            } catch (err) {
                console.warn(err.response || err.code);
                if (err.code === "ECONNABORTED") {
                    return reject("Timeout error")
                } else {
                    return reject(err.response || err);
                }
            }
        })
    }
};
