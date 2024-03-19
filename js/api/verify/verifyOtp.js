import {apiClient} from "SmartgasConsumerApp/js/api";
import {verifyOtpApiConstant} from "SmartgasConsumerApp/js/constants";

export const verifyOtpApi = (otp, type, key) => {
    return (token, userid) => {
        let params = {};
        params = {
            type,
            otp,
            token,
            userid,
            key
        };

        let urlString = verifyOtpApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPut(urlString, token, params, {});
                console.log("login response is", JSON.parse(JSON.stringify(resp)));
                return resolve(resp);
            } catch (err) {
                // console.warn(err.response || err.code);
                if (err.code === "ECONNABORTED") {
                    return reject("Timeout error")
                } else {
                    return reject(err.response || err);
                }
            }
        })
    }
};
