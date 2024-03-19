import {apiClient} from "../../api";
import { requestApiConstant, customRequestHistoryConstant} from "../../constants";

export const requestApi = (requestId,remark) => {
    return (token, userid, msn, Phase,) => {
        let params = {};

        params = {
            LoginID: userid,
            RequestType:requestId,
            RequestRemark:remark
        };
        let urlString = requestApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});

                console.log("Send Request API response is", JSON.parse(JSON.stringify(resp)));
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

export const requestHistoryApi = (requestId,remark) => {
    return (token, userid, msn, Phase,) => {
        let params = {};

        params = {
            LoginID: userid,
        };
        let urlString = customRequestHistoryConstant;

        return new Promise(async (resolve, reject) => {
            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Request History API response is", JSON.parse(JSON.stringify(resp)));
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
