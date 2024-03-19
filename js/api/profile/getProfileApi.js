import {apiClient} from "SmartgasConsumerApp/js/api";
import {getProfileApiConstant} from "SmartgasConsumerApp/js/constants";

export const getProfileApi = () => {
    return (token, user, msn, Phase) => {
        let params = {};

        params = {
            LoginID: user,
            msn, Phase
        };
        let urlString = getProfileApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("get profile response is", resp);


                return resolve(resp);
            } catch (err) {
                console.log("get profile error is", err, err);
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
