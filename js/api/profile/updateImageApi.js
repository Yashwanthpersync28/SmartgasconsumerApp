import {apiClient} from "SmartgasConsumerApp/js/api";
import {updateImageApiConstant} from "SmartgasConsumerApp/js/constants";

export const updateImageApi = (ImageID, Image) => {
    return (token, user, msn, Phase) => {
        let params = {};

        params = {
            LoginID: user,
            ImageID: "2",
            Image,
            msn, Phase
        };
        let urlString = updateImageApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPut(urlString, token, params, {});
                console.log("get profile response is", resp);
                return resolve(resp);
            } catch (err) {
                console.log("update profile image error is", err, err.response);
                // // console.warn(err.response || err.code);
                // if (err.code === "ECONNABORTED") {
                //     return reject("Timeout error")
                // } else {
                //     return reject(err.response.data);
                // }
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
