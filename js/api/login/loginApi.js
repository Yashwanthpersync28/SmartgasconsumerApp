import {apiClient} from "SmartgasConsumerApp/js/api";
import {loginApiConstant} from "SmartgasConsumerApp/js/constants";

export const loginApi = (loginId, password) => {
    return (token) => {
        let params = {};
        let Username = loginId;

        
        let urlString = loginApiConstant;
        var myHeaders = new Headers();
        myHeaders.append("PlainText", password);
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };

        const Encrypt = async () =>{
            const enc = await fetch("http://40.123.236.176:4012/api/Admin/Encrypt", requestOptions)
            console.log("asdfasodihf",enc);
            const encResp = await enc.json();
            console.log("asdfasodih33f",encResp);

            return encResp.value
        }
        
            return new Promise(async (resolve, reject) => {
                const Password = await Encrypt();
            params = {
                Username,
                Password
    
            };

            try {

                let resp = await apiClient.httpPost(urlString, token, params, {"X-Requested-With": "XMLHttpRequest",});
                console.log("login response is", resp);

                if (resp == "invalid password") {
 
                }
                return resolve(resp);
            } catch (err) {
                console.log(err, err);
                // console.warn(err.response || err.code);
                if (err.code === "ECONNABORTED") {
                    return reject("Timeout error")
                } else {
                    return reject(err.response.data);
                }
            }
        })

        
    }
};
