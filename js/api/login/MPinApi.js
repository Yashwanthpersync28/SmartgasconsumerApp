
import {apiClient} from "SmartgasConsumerApp/js/api";
import {verifyMPINApiConstant, createMPINApiConstant, validateMPINApiConstant } from "SmartgasConsumerApp/js/constants";

export const verifyMPinApi = (Username, Mpin) => {
    return (token) => {
        let params = {};

        let urlString = verifyMPINApiConstant;

        var myHeaders = new Headers();
        myHeaders.append("PlainText", Mpin);
        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        
        const Encrypt = async () =>{
            const enc = await fetch("http://40.123.236.176:4012/api/Admin/Encrypt", requestOptions)
            const encResp = await enc.json();
            return encResp.value
        }
        // params = {
        //     Username,
        //     Mpin,
        // };

        return new Promise(async (resolve, reject) => {
            const Mpin = await Encrypt();
            params = {
                Username,
                Mpin
            };
            try {
                let resp = await apiClient.httpPost(urlString, token, params, {"X-Requested-With": "XMLHttpRequest",});
                console.log("Verify MPin Api response is", resp);
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

export const createMPinApi = (NEWMPIN, CNFMPIN) => {
    return (token, userid, msn, Phase) => {
        let params = {};
        params = {
            LoginID: userid,
            NEWMPIN,
            CNFMPIN
        };
        let urlString = createMPINApiConstant;

        return new Promise(async (resolve, reject) => {
            try {
                let resp = await apiClient.httpPost(urlString, token, params, {});
                console.log("Create MPIN Api response is", resp);
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

export const validateMPinApi = (loginId) => {
    return (token) => {
        let params = {};
        let LoginID = loginId;
        params = {
            LoginID,
        };
        let urlString = validateMPINApiConstant;

        return new Promise(async (resolve, reject) => {
            try {
                let resp = await apiClient.httpPost(urlString, token, params, {"X-Requested-With": "XMLHttpRequest",});
                console.log("Validate MPin Api response is", resp);
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
