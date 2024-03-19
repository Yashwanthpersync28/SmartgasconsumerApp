import {apiClient} from "SmartgasConsumerApp/js/api";
import {overviewApiConstant} from "SmartgasConsumerApp/js/constants";

export const overviewApi = () => {
    return (token,consumerId,msn,...rest) => {
        let params = {};

        params = {
            msn
        };
        let urlString = `${overviewApiConstant}${msn}`;
        console.log(params,token,"sumit123",msn,rest,urlString)

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpGet(urlString, token, {});

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
