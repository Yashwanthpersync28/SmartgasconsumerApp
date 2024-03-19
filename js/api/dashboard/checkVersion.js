import {apiClient} from "SmartgasConsumerApp/js/api";
import {appVersionApiConstant} from "SmartgasConsumerApp/js/constants";

export const appVersionApi = (version) => {
    return (token, userid,   msn, Phase) => {
        let params = {
            APKVersion: version,
        };

        let urlString = appVersionApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});

                console.log("appVersionApi response is", JSON.parse(JSON.stringify(resp)));
                return resolve(resp);
            } catch (err) {
                console.log("appVersionApi response is", JSON.parse(JSON.stringify(err.response)), token);

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
