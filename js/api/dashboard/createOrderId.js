import {apiClient} from "SmartgasConsumerApp/js/api";
import {createOrderIdApiConstant} from "SmartgasConsumerApp/js/constants";
// import { ccavenueURL } from "../../constants";
import Axios from "axios";

export const createOrderIdApi = async (token, amount, consumer_no,timestamp) => {
    // console.log(rest,'rest')
    // return () => {
        console.log(token, amount, consumer_no)
        let params = {};

        params = {
                    "amount": parseFloat(amount)*100,
                    "currency": "INR",
                    "receipt": `Receipt_${timestamp}${consumer_no.slice(-4)}`,
                    "notes": {
                        "consumer_no": consumer_no,
                        "amount": parseFloat(amount)*100,
                        "source" : "mobile"
                    }
                };
        
        let urlString = createOrderIdApiConstant;
        try {
            // Make the API call using your apiClient.httpPost method
            let resp = await apiClient.httpPost(urlString, token, params, {});
            
            console.log("Payment History Response is", JSON.parse(JSON.stringify(resp)));
    
            // Return the response data
            return resp.data; // Assuming the response is in JSON format and you want to return the data part
        } catch (err) {
            console.warn(err.response || err.code);
    
            // Reject with an error message
            if (err.code === "ECONNABORTED") {
                throw new Error("Timeout error");
            } else {
                throw new Error(err.response || err);
            }
        }
    // }
};



// export const createOrderIdApi =  (amount,consumer_no,timestamp) => {
//     console.log(amount,consumer_no,timestamp,'createorderapi1',createOrderIdApiConstant)
//         let params = {};
        
//         params = {
//             "amount": parseFloat(amount)*100,
//             "currency": "INR",
//             "receipt": `Receipt_${timestamp}${consumer_no.slice(-4)}`,
//             "notes": {
//                 "consumer_no": consumer_no,
//                 "amount": parseFloat(amount)*100,
//                 "source" : "mobile"
//             }
//         };
        
//         // let urlString = rsaApiConstant+"?amount="+`${amount}`+"?consumer_no="+`${consumer_no}`+"?ip_address="+`${ipAddress}`;
//         let urlString = createOrderIdApiConstant;
//         return new Promise(async (resolve, reject) => {
//             try {
//                 let resp = await apiClient.httpPost(urlString, token, params, {});
//                 console.log("RSA response is", JSON.parse(JSON.stringify(resp)));
//                 return resolve(resp);
//             } catch (err) {
//                 console.warn(err.response || err.code);
//                 if (err.code === "ECONNABORTED") {
//                     return reject("Timeout error")
//                 } else {
//                     return reject(err.response || err);
//                 }
//             }
//         })
//     }

