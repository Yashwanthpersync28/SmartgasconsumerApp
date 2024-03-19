import {apiClient} from "SmartgasConsumerApp/js/api";
import {deleteAccountApiConstant} from "SmartgasConsumerApp/js/constants";

export const deleteAccountApi = (CANumber, MobileNumber) => {
    return (token, userid) => {
        let params = {};

        params = {
            CANumber,
            MobileNumber
        };

        console.log('Params',params);

        let urlString = deleteAccountApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpDelete(urlString, token, params, {});

                console.log("Delete Account response is", JSON.parse(JSON.stringify(resp)));
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
