import {apiClient} from "SmartgasConsumerApp/js/api";
import { ipDataApiConstant } from "../../constants";

export const ipDataApi = () => {
    return (token, userid, msn, Phase) => {
        let params = {};
        params = {
            LoginID: userid,
            msn, Phase,

        };
        let urlString = ipDataApiConstant;
        return new Promise(async (resolve, reject) => {

            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("IP Data response is", JSON.parse(JSON.stringify(resp)));
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
