import {apiClient} from "SmartgasConsumerApp/js/api";
import {memberAccountDetailsApiConstant} from "SmartgasConsumerApp/js/constants";

export const memberAccountDetailsApi = (LangID) => {
    return (token, userid, msn, Phase) => {
        let params = {};

        params = {
            LoginID: userid,
            msn, Phase,
            LangID
        };
        let urlString = memberAccountDetailsApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});

                console.log("Member response is", JSON.parse(JSON.stringify(resp)));
                return resolve(resp);
            } catch (err) {
                console.log('Error Member',err.response || err.code);
                if (err.code === "ECONNABORTED") {
                    return reject("Timeout error")
                } else {
                    return reject('Member Error',err.response || err);
                }
            }
        })
    }
};
