import {apiClient} from "SmartgasConsumerApp/js/api";
import {addMemberAccountDetailsApiConstant} from "SmartgasConsumerApp/js/constants";

export const addMemberAccountDetailsApi = (MemberName,MobileNumber, RelationshipID) => {
    return (token, userid, msn, Phase) => {
        let params = {};

        params = {
            LoginID: userid,
            "CANumber": userid,
            MemberName,MobileNumber, RelationshipID,
            msn, Phase

        };
        let urlString = addMemberAccountDetailsApiConstant;

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {});

                console.log("addMemberAccountDetailsApi response is", JSON.parse(JSON.stringify(resp)));
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
