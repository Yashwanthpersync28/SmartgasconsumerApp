import {apiClient} from "SmartgasConsumerApp/js/api";
import {loginWithOtpApiConstant} from "SmartgasConsumerApp/js/constants";

export const loginWithOtpApi = (LoginID, OTP, type) => {
    return (token) => {
        let params = {};
        params = {
            LoginID,
            OTP,
            SMSTypeID: type

        };
        let urlString = loginWithOtpApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("login response is", resp);

                if (resp == "invalid password") {

                }
                return resolve(resp);
            } catch (err) {
                console.log(err, err);
                // console.warn(err.response || err.code);
                if (err.code === "ECONNABORTED") {
                    return reject("Timeout error")
                } else {
                    return reject(err.response.data);
                }
            }
        })
    }
};
