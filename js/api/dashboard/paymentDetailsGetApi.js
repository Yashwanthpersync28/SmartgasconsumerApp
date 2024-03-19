import Axios from "axios";
import {apiClient} from "SmartgasConsumerApp/js/api";
import { paymentDetails } from "../../constants";
// import { ccavenueURL } from "../../constants";



export const paymentDetailsGetApi = (amount,consumer_no) => {
    console.log(amount,consumer_no, razorpay_payment_id, order_id,'1');
    // return (token, userid, msn, Phase,) => {
        console.log(amount,consumer_no, razorpay_payment_id, order_id,'2');
        let params = {};

        params = {
            "ConsumerNo": consumer_no,
            "bill_amount": amount,
            "OrderId": order_id,
            "transaction_id": razorpay_payment_id
            // amount,
            // consumer_no
        };
        
        // let urlString = rsaApiConstant+"?amount="+`${amount}`+"?consumer_no="+`${consumer_no}`+"?ip_address="+`${ipAddress}`;
        // let urlString = `${rsaApiConstant}?amount=${amount}&consumer_no=${consumer_no}&ip_address=${ipAddress}`;
        let urlString = paymentDetails

        return new Promise(async (resolve, reject) => {
            try {
                let resp = await apiClient.httpGet(urlString, token, params, {});
                console.log("save paymentDetailsApi response is", JSON.parse(JSON.stringify(resp)));
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
    // }
};
