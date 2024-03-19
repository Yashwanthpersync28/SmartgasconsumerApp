import {apiClient} from "SmartgasConsumerApp/js/api";
import {feedbackApiConstant} from "SmartgasConsumerApp/js/constants";

export const feedbackApi = (Experience,CatExp, Comment) => {
    return (token, userid) => {
        let params = {};

        params = {
            LoginID: userid,
            Experience,
            CatExp,
            Comment
        };
        let urlString = feedbackApiConstant;

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
