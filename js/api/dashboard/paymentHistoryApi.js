import Axios from "axios";
import {apiClient} from "SmartgasConsumerApp/js/api";
import {paymentHistoryApiConstant} from "SmartgasConsumerApp/js/constants";

export const paymentHistoryApi = () => {
    console.log("ppppppp-->");

    return (token, userid, msn, Phase) => {
        console.log("88888------>")
        let params = {};

        // params = {
        //     LoginID: userid,
        //     msn, Phase
        // };

        params =  {
            Consno :userid,
            PageNo:1,
            PageSize:10
        }
        
        // let urlString = `${paymentHistoryApiConstant}?consumerno=${userid}`;
        let urlString = paymentHistoryApiConstant;

        console.log("url-------->",urlString);
        return new Promise(async (resolve, reject) => {
            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("PaymentHistory------>", JSON.parse(JSON.stringify(resp)));
                return resolve(resp);
            } catch (err) {
                console.warn("catch---->",err.response);
                if (err.code === "ECONNABORTED") {
                    return reject("Timeout error")
                } else {
                    return reject(err.response || err);
                }
            }
        })
    }
};
