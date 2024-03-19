import {apiClient} from "SmartgasConsumerApp/js/api";
import {saveAccoutDetailsApiConstant} from "SmartgasConsumerApp/js/constants";

export const saveAccoutDetailsApi = (NewCANumber) => {
    return (token, userid, msn, Phase) => {
        let params = {};
        params = {
            CANumber : userid,
            NewCANumber
        };
        let urlString = saveAccoutDetailsApiConstant;
        return new Promise(async (resolve, reject) => {

            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Save Account Details Response is", JSON.parse(JSON.stringify(resp)));
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
