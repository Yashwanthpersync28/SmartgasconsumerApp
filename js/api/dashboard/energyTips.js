import {apiClient} from "SmartgasConsumerApp/js/api";
import {energyTipsApiConstant} from "SmartgasConsumerApp/js/constants";

export const energyTipsApi = (LangID) => {
    return (token, userid, msn, Phase,) => {
        let params = {};

        params = {
            LoginID: userid,
            LangID,
            msn, Phase,
            
        };
        let urlString = energyTipsApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpGet(urlString, token, params, {});

                console.log("energyTipsApi response is", JSON.parse(JSON.stringify(resp)));
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
