import {apiClient} from "SmartgasConsumerApp/js/api";
import {eventEnrollmentApiConstant} from "SmartgasConsumerApp/js/constants";

export const eventEnrollmentApi = (id, status,returnDetails) => {
    return (token, userid, msn, Phase) => {
        let params = {};
        params = {
            LoginID: userid,
            id, status, returnDetails
        };
        let urlString = eventEnrollmentApiConstant;
        return new Promise(async (resolve, reject) => {

            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Event Enrolment Response is", JSON.parse(JSON.stringify(resp)));
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
