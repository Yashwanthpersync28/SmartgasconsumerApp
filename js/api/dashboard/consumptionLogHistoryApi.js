import {apiClient} from "SmartgasConsumerApp/js/api";
import {consumptionLogHistoryApiConstant} from "SmartgasConsumerApp/js/constants";

export const consumptionLogHistoryApi = () => {
    return (token,loginid, msn, ) => {
        // let params = {};

        // params = {
        //     LoginID: userid,
        //     msn, Phase,
        //     UnitOrAmount

        // };
        let urlString = `${consumptionLogHistoryApiConstant}${msn}`;

        return new Promise(async (resolve, reject) => {

            try {
                let resp = await apiClient.httpGet(urlString, token, {});

                console.log("Consumption Log History Response is", JSON.parse(JSON.stringify(resp)));
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
