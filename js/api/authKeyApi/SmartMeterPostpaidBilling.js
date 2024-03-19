import {authKeyApiClient} from "../AuthKeyApiClient";
import {smartMeterPostpaidBillingConstant} from "SmartgasConsumerApp/js/constants";
const querystring = require('querystring');

export const smartMeterPostpaidBillingApi = (authKey) => {
    return (token, userid, msn, Phase) => {
        let params =  querystring.stringify({
            // consumer_no: '023000029342'
            consumer_no: userid,
            msn, Phase
                       
        });

        let urlString = smartMeterPostpaidBillingConstant;
        console.log('URL',urlString);
        return new Promise(async (resolve, reject) => {
            try {
                let resp = await authKeyApiClient.httpPost(urlString, authKey, params, {});
                console.log('Smart Meter Postpaid Billing Response',resp);
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
