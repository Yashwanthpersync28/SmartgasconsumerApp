import {apiClient} from "SmartgasConsumerApp/js/api";
import {switchAccountpiConstant} from "SmartgasConsumerApp/js/constants";

export const switchAccountApi = (NewCANumber) => {
    return (token, userid) => {
        let params = {};
        params = {
            NewCANumber: NewCANumber,
            // LoginID: userid,
        };
        let urlString = switchAccountpiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});

                console.log("switch account response is", JSON.parse(JSON.stringify(resp)));
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
