import {apiClient} from "SmartgasConsumerApp/js/api";
import {updateProfileApiConstant} from "SmartgasConsumerApp/js/constants";

export const updateProfileApi = (email, contactNumber) => {
    return (token, userid, msn, Phase) => {
        let params = {};

        params = {
            ConsumerNumber : userid,
            Mobile: contactNumber,
            Email: email
        };

        let urlString = updateProfileApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Update profile response is", resp);
                return resolve(resp);
            } catch (err) {
                console.log("update profile  error is", err, err.response);
                // console.warn(err.response || err.code);
                if (err.code === "ECONNABORTED") {
                    return reject("Timeout error")
                } else {
                    return reject(err.response.data);
                }
            }
        })
    }
};
