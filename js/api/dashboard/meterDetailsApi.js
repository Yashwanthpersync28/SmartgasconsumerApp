import {apiClient} from "SmartgasConsumerApp/js/api";
import {meterDetailsApiConstant, meterSequenceListApiConstant} from "SmartgasConsumerApp/js/constants";

export const meterDetailsApi = (MeterSequence) => {
    return (token, userid, msn, Phase) => {
        let params = {};

        params = {
            LoginID: userid,
            msn, Phase,
            MeterSequence
        };
        let urlString = meterDetailsApiConstant;

        return new Promise(async (resolve, reject) => {
            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Meter Details API response is", JSON.parse(JSON.stringify(resp)));
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

export const meterSequenceListApi = () => {
    return (token, userid, msn, Phase) => {
        let params = {};

        params = {
            LoginID: userid,
            msn, Phase,
        };
        let urlString = meterSequenceListApiConstant;

        return new Promise(async (resolve, reject) => {
            try {
                let resp = await apiClient.httpGet(urlString, token, params, {});
                console.log("Meter Sequence List API response is", JSON.parse(JSON.stringify(resp)));
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