import {apiClient} from "SmartgasConsumerApp/js/api";
import {drawerApiConstant} from "SmartgasConsumerApp/js/constants";

export const drawerApi = (roleid,LangID) => {
    return (token, userid, msn, Phase) => {
        let params = {};
        params = {
            LoginID: userid,
            roleid: roleid,
            msn, Phase,
            LangID
        };
        let urlString = drawerApiConstant;

        return new Promise(async (resolve, reject) => {

            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("drawer response is", JSON.parse(JSON.stringify(resp)));
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
