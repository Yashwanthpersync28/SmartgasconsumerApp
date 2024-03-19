import {apiClient} from "SmartgasConsumerApp/js/api";
import {deleteMemberApiConstant} from "SmartgasConsumerApp/js/constants";

export const deleteMemberApi = (mobileNumber) => {
    return (token, userid) => {
        let params = {};

        params = {
            CANumber: userid,
            MobileNumber: mobileNumber
        };
        let urlString = deleteMemberApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpDelete(urlString, token, params, {});

                console.log("delete Member response is", JSON.parse(JSON.stringify(resp)));
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
