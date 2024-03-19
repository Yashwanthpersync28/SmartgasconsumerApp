import {apiClient} from "SmartgasConsumerApp/js/api";
import {eventAnalysisApiConstant} from "SmartgasConsumerApp/js/constants";

export const eventAnalysisApi = (SamplingFreq, Event,  DPeriod, MPeriod, YPeriod) => {
    return (token, userid, msn, Phase,) => {
        let params = {};

        params = {
            LoginID: userid,
            msn,
            Phase,
            "SamplingFreq": SamplingFreq,
            "Event": Event,
            "DPeriod": DPeriod,
            "MPeriod": MPeriod,
            "YPeriod": YPeriod
        };
        let urlString = eventAnalysisApiConstant;

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
