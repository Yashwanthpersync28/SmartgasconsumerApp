import {apiClient} from "SmartgasConsumerApp/js/api";
import {changeLanguageApiConstant} from "SmartgasConsumerApp/js/constants";

export const changeLanguageApi = (MobileNumber, LangID) => {
    return (token, userid, msn, Phase) => {
        let params = {};

        params = {
            LoginID: userid,
            MobileNumber,
            LangID,
            msn, Phase
        };
        let urlString = changeLanguageApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});

                console.log("Change Language response is", JSON.parse(JSON.stringify(resp)));
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
