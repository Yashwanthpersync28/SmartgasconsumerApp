import {apiClient} from "SmartgasConsumerApp/js/api";
import {energyCostCalculationForecastApiConstant} from "SmartgasConsumerApp/js/constants";

export const energyCostCalculationForecastApi = (PCategory, Product, Page, Rating, consumption, TimeFrame, Rate ) => {
    return (token, userid) => {
        let params = {};

        params = {
            LoginID: userid,
            PCategory, Product, Page, Rating, consumption, TimeFrame, Rate
        };
        let urlString = energyCostCalculationForecastApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});

                console.log("energyCostCalculationForecastApi response is", JSON.parse(JSON.stringify(resp)));
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
