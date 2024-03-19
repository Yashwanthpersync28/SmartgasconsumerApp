import {apiClient} from "SmartgasConsumerApp/js/api";
import {notificationsApiConstant} from "SmartgasConsumerApp/js/constants";

export const notificationsApi = () => {
    return (token, userid) => {
        let params = {};

        params = {
            userid,
            token,
        };
        let urlString = notificationsApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPut(urlString, token, params, {});

                // console.log("login response is", JSON.parse(JSON.stringify(resp)));
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
