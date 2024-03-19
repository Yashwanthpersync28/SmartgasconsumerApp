import {apiClient} from "SmartgasConsumerApp/js/api";
import { dateWiseConsumptionApiConstant } from "../../constants";

export const dateWiseConsumptionApi = (from,to) => {
    return (token, userid, msn, Phase) => {
        let params = {};
        let fromDate = from;
        let toDate = to;
        params = {
            LoginID: userid,
            msn, Phase,
            FromDate: fromDate,
            ToDate: toDate
        };
        let urlString = dateWiseConsumptionApiConstant;
        return new Promise(async (resolve, reject) => {

            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Date wise Consumption response is", JSON.parse(JSON.stringify(resp)));
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
