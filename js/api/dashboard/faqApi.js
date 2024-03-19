import {apiClient} from "SmartgasConsumerApp/js/api";
import {faqApiConstant} from "SmartgasConsumerApp/js/constants";

export const faqApi = (LangID) => {
    return (token, userid, msn, Phase,) => {
        let params = {};

        params = {
            LoginID: userid,
            LangID,
            msn, Phase,
        };
        let urlString = faqApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});

                console.log("overview response is", JSON.parse(JSON.stringify(resp)));
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
