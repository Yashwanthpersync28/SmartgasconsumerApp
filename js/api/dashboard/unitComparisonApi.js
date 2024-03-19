import {apiClient} from "SmartgasConsumerApp/js/api";
import {unitComparisonApiConstant} from "SmartgasConsumerApp/js/constants";

export const unitComparisonApi = () => {
    return (token,loginId,msn,...rest) => {
        let params = {};

        // params = {
        //     LoginID: userid,
        //     msn, Phase
        // };
        let urlString = `${unitComparisonApiConstant}${msn}`;

        console.log('APIsumit',unitComparisonApiConstant,rest);

        return new Promise(async (resolve, reject) => {

            try {

                let resp = await apiClient.httpGet(urlString, token, {});

                console.log("Unit Comparison response is", JSON.parse(JSON.stringify(resp)));
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
