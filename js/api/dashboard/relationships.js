import {apiClient} from "SmartgasConsumerApp/js/api";
import {relationshipsApiConstant} from "SmartgasConsumerApp/js/constants";

export const relationshipsApi = (LangID) => {
    return (token, userid, msn, Phase) => {
        let params = {};
        params = {
            LangID
        };
        let urlString = relationshipsApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("RelationShips response is", JSON.parse(JSON.stringify(resp)));
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
