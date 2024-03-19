import {apiClient} from "SmartgasConsumerApp/js/api";
import {deleteNotificationApiConstant} from "SmartgasConsumerApp/js/constants";

export const deleteNotificationsApi = (NotificationIDArray) => {
    return (token, userid, msn, Phase) => {
        let params = {};

        params = {
            LoginID: userid,
            msn,
            Phase,
            NotificationIDArray
        };
        let urlString = deleteNotificationApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpDelete(urlString, token, params, {});

                console.log("delete notifications response is", JSON.parse(JSON.stringify(resp)));
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
