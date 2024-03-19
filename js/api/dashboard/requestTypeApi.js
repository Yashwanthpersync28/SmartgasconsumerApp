import {apiClient} from "../../api";
import {requestTypeApiConstant} from "../../constants";

export const requestTypeApi = (id) => {
    return (token, userid, msn, Phase,) => {
        let params = {};

        params = {
            LangID: id
        };
        let urlString = requestTypeApiConstant;

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
