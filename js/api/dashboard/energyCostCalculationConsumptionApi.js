import {apiClient} from "SmartgasConsumerApp/js/api";
import {energyCostCalculationConsumptionApiConstant} from "SmartgasConsumerApp/js/constants";

export const energyCostCalculationConsumptionApi = (PCategory, Product, Page, Rating ) => {
    return (token, userid, msn, Phase) => {
        let params = {};

        params = {
            LoginID: userid,
            PCategory, Product, Page, Rating,
            msn, Phase,
        };
        let urlString = energyCostCalculationConsumptionApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});

                console.log("energyCostCalculationConsumptionApi response is", JSON.parse(JSON.stringify(resp)));
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
