import {apiClient} from "SmartgasConsumerApp/js/api";
import {netMeterApiConstant} from "SmartgasConsumerApp/js/constants";

export const netMeterApi = () => {
    return (token, userid, msn, Phase) => {
        let params = {};
        params = {
            LoginID: userid,
            msn, Phase
        };
        let urlString = netMeterApiConstant;
        return new Promise(async (resolve, reject) => {

            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Net Meter Response is", JSON.parse(JSON.stringify(resp)));
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
