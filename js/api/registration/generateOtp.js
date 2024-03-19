import {apiClient} from "SmartgasConsumerApp/js/api";
import {registrationGetOtpApiConstant} from "SmartgasConsumerApp/js/constants";

export const generateOtpRegistration = (LoginID, type) => {
    return (token) => {
        let params = {};
        params = {
            LoginID,
            SMSTypeID: type

        };
        let urlString = registrationGetOtpApiConstant;

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
                    return reject(err.response.data);
                }
            }
        })
    }
};
