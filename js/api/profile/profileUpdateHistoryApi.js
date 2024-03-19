import {apiClient} from "SmartgasConsumerApp/js/api";
import {profileUpdateHistoryApiConstant} from "SmartgasConsumerApp/js/constants";

export const profileUpdateHistoryApi = (ImageID, Image) => {
    return (token, user, msn, Phase) => {
        let params = {};

        params = {
            ConsumerNumber: user,
        };
        let urlString = profileUpdateHistoryApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Profile Update History response is", resp);
                return resolve(resp);
            } catch (err) {
                console.log("Profile Update History error is", err, err.response);
                // // console.warn(err.response || err.code);
                // if (err.code === "ECONNABORTED") {
                //     return reject("Timeout error")
                // } else {
                //     return reject(err.response.data);
                // }
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
