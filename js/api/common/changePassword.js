import {apiClient} from "SmartgasConsumerApp/js/api";
import {changePasswordApiConstant} from "SmartgasConsumerApp/js/constants";

export const changePasswordApi = ( OLD_PASSWORD,NEW_PASSWORD, CONFIRM_NEW_PASSWORD) => {
    return (token, userid, msn, Phase) => {
        let params = {};

        params = {
            LoginID: userid,
            OLD_PASSWORD,
            NEW_PASSWORD,
            CONFIRM_NEW_PASSWORD,
            msn, Phase
        };
        let urlString = changePasswordApiConstant;

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
