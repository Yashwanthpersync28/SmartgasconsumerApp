import {apiClient} from "SmartgasConsumerApp/js/api";
import {refreshTokenApiConstant} from "SmartgasConsumerApp/js/constants";

export const refreshTokenApi = (token, userid, refreshToken, roleid ) => {
    // return (token, userid) => {
        let params = {};

        params = {
            RefreshToken: refreshToken,
        };
        let urlString = refreshTokenApiConstant;

        return new Promise(async (resolve, reject) => {

            try {
                console.log("refreshTokenApi response before");

                let resp = await apiClient.httpPost(urlString,token, params, {});
                console.log("refreshTokenApi response after");


                console.log("refreshTokenApi response is", JSON.parse(JSON.stringify(resp)));
                return resolve(resp);
            } catch (err) {
                console.log("hhhhhh",err.response);
                if (err.code === "ECONNABORTED") {
                    return reject("Timeout error")
                } else {
                    return reject(err.response || err);
                }
            }
        })
    // }
};
