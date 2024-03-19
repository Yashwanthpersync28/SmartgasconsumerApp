import {apiClient} from "SmartgasConsumerApp/js/api";
import {checkProgramsApiConstant} from "SmartgasConsumerApp/js/constants";

export const checkProgramsApi = (start, end) => {
    return (token, userid, msn, Phase) => {
        let params = {};
        params = {
            LoginID: userid,
            start, end,
            msn, Phase
        };
        let urlString = checkProgramsApiConstant;
        return new Promise(async (resolve, reject) => {

            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Check Program Response is", JSON.parse(JSON.stringify(resp)));
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
