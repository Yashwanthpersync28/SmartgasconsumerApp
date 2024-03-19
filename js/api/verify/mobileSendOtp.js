import {apiClient} from "SmartgasConsumerApp/js/api";
import {mobileSendOtpApiConstant} from "SmartgasConsumerApp/js/constants";

export const mobileSendOtpApi = (password, type, key) => {
    return (token, userid) => {
        let params = {};
        params = {
            type,
            password,
            token,
            userid,
            key
        };

        let urlString = mobileSendOtpApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});
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
