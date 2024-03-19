import {apiClient} from "SmartgasConsumerApp/js/api";
import {registrationApiConstant} from "SmartgasConsumerApp/js/constants";

export const registerAccountApi = ( CANumber, MobileNumber, EmailID, CRNNumber, Password, ReenterPassword,FullName) => {
    return (token) => {
        let params = {};
        params = {
            CANumber: CANumber,
            MobileNumber: MobileNumber,
            EmailID,
            CRNNumber:CANumber,
            Password,
            ReenterPassword,
            FullName
      };
        let urlString = registrationApiConstant;

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
