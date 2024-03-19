import {apiClient} from "SmartgasConsumerApp/js/api";
import {consumptionLogDetailsApiConstant} from "SmartgasConsumerApp/js/constants";

export const consumptionLogDetailsApi = (StartDate, EndDate, UnitOrAmount) => {
    return (token, loginId,msn) => {
        // let params = {};

        // params = {
        //     LoginID: userid,
        //     Frequency: '100',
        //     StartDate,
        //     EndDate,
        //     UnitOrAmount
        // };
        let urlString = `${consumptionLogDetailsApiConstant}${msn}`;

        console.log("consumptionLogDetailsApi params asdf32asdf",msn);

        return new Promise(async (resolve, reject) => {

            try {
                let resp = await apiClient.httpGet(urlString, token, {});

                console.log("Consumption Log Details Response is", JSON.parse(JSON.stringify(resp)));
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
