import {apiClient} from "SmartgasConsumerApp/js/api";
import {resetPasswordApiConstant} from "SmartgasConsumerApp/js/constants";

export const resetPasswordApi = (LoginID, NEW_PASSWORD, CONFIRM_NEW_PASSWORD, MobileNumber) => {
    return (token, userid) => {
        let params = {};

        params = {
            LoginID,
            NEW_PASSWORD,
            CONFIRM_NEW_PASSWORD,
            MobileNumber
        };
        let urlString = resetPasswordApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});

                console.log("overview response is", JSON.parse(JSON.stringify(resp)));
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
