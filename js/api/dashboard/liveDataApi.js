import {apiClient} from "SmartgasConsumerApp/js/api";
import {liveDataApiConstant} from "SmartgasConsumerApp/js/constants";

export const liveDataApi = () => {
    return (token, userid, msn, Phase) => {
        let params = {};

        params = {
            msn
        };
        console.log("sumitapi",params,msn)
        let urlString = `${liveDataApiConstant}${msn}`;

        return new Promise(async (resolve, reject) => {
            try {
                let resp = await apiClient.httpGet(urlString, token, {});
                console.log("Live Data API response is", JSON.parse(JSON.stringify(resp)));
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
