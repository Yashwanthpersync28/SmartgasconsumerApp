import {apiClient} from "SmartgasConsumerApp/js/api";
import {accountOtpVerifyApiConstant} from "SmartgasConsumerApp/js/constants";

export const accountOtpVerifyApi = (OTP,NewCANUMBER) => {
    return (token, userid) => {
        let params = {};

        params = {
            LoginID: userid,
            NewCANUMBER,
            OTP,
            SMSTypeID : 5
        };
        let urlString = accountOtpVerifyApiConstant;

        return new Promise(async (resolve, reject) => {
            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Account OTP Verify response is", JSON.parse(JSON.stringify(resp)));
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
