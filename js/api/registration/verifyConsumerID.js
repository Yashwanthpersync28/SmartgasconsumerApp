import {apiClient} from "SmartgasConsumerApp/js/api";
import {verifyCIDApiConstant} from "SmartgasConsumerApp/js/constants";

export const verifyConsumerID = (CID, type) => {
    return (token) => {
        let params = {};
        params = {
            CID,
            Type: type

        };
        let urlString = verifyCIDApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("verifyConsumerID response is", resp);

                if (resp == "invalid password") {

                }
                return resolve(resp);
            } catch (err) {
                console.log(err, err);
                // console.warn(err.response || err.code);
                if (err.code === "ECONNABORTED") {
                    return reject("Timeout error")
                } else {
                    return reject(err.response || err);
                }
            }
        })
    }
};
