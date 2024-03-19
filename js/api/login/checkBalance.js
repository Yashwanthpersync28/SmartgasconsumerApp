import {apiClient} from "SmartgasConsumerApp/js/api";
import { checkBalanceApiConstant } from "../../constants";
checkBalanceApiConstant

export const checkBalanceApi = (consumerNumber) => {
    return (token, userid) => {
        let params = {};
        params = {
            RRNumber: consumerNumber
        };

        let urlString = checkBalanceApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Check Balance API", JSON.parse(JSON.stringify(resp)));
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
