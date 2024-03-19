import Axios from "axios";
import {apiClient} from "SmartgasConsumerApp/js/api";
import {rsaApiConstant} from "SmartgasConsumerApp/js/constants";
import { paymentDetails } from "../../constants";
// import { ccavenueURL } from "../../constants";



export const paymentDetailsPostApi = async (consumer_no,razorpay_payment_id,token) => {
    console.log("payyyyyyyyyyyyyyyyyyyyyyyyyy");
    // console.log(amount,consumer_no, razorpay_payment_id, order_id,'1');
    // return (token, userid, msn, Phase,) => {
        const apiKey = `rzp_test_kDzekKAUDtWnN6:xYYqSLNNCEedSelDsA8SAu1M`;
        try {
            const response = await Axios.get(`https://api.razorpay.com/v1/payments/${razorpay_payment_id}`, {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic cnpwX3Rlc3Rfa0R6ZWtLQVVEdFduTjY6eFlZcVNMTk5DRWVkU2VsRHNBOFNBdTFN`,
                // 'Authorization': `Basic ${btoa(apiKey)}`,
              },
            });
        
            const paymentData = response.data;
            console.log('Razorpay Payment Data:', paymentData);
            let params = {};
            const unixTimestamp = paymentData.created_at;
            const date = new Date(unixTimestamp * 1000);
            const year = date.getFullYear();
            const month = date.getMonth() + 1; // Months are zero-based, so add 1
            const day = date.getDate();
            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();

            console.log(`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`);

            params = {
                "ConsumerNo" : consumer_no,
                "transaction_id" : paymentData?.id,
                "OrderId" : paymentData?.order_id,
                "accountid" : paymentData?.id,
                "bill_amount" : paymentData?.amount/100,
                "paid_amount" : paymentData?.amount/100,
                "status" : paymentData?.status,
                "PaymentMethod" : paymentData?.method,
                "Currency" :paymentData?.currency,
                "CreatedAt": `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
            };
            let urlString = paymentDetails

            return new Promise(async (resolve, reject) => {
                console.log("innnnnn");
                try {
                    let resp = await apiClient.httpPost(urlString, token, params, {});
                    console.log("save paymentDetailsApi response is", JSON.parse(JSON.stringify(resp)));
                    return resolve(resp);
                } catch (err) {
                    console.log("errrrrr---->",err);
                    console.warn(err.response || err.code);
                    if (err.code === "ECONNABORTED") {
                        return reject("Timeout error")
                    } else {
                        return reject(err.response || err);
                    }
                }
            })
            // return paymentData;
          } catch (error) {
            console.error('Error fetching Razorpay payment:', error.message);
          }
        console.log(amount,consumer_no, razorpay_payment_id, order_id,'2');
        
        
        // let urlString = rsaApiConstant+"?amount="+`${amount}`+"?consumer_no="+`${consumer_no}`+"?ip_address="+`${ipAddress}`;
        // let urlString = `${rsaApiConstant}?amount=${amount}&consumer_no=${consumer_no}&ip_address=${ipAddress}`;
        
    // }
};
