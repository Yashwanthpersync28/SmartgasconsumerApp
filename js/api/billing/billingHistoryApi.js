import axios from 'axios';
import { parseString } from "react-native-xml2js";
import { fetchPayhistoryHelper, getOutStandingHelper, viewbillDetailsHelper } from '../../helpers/common/billingXmlToJsonHelper';

export const fetchPayhistoryApi = () => {
    return (token, userid, msn, Phase) => {
       
        return new Promise(async (resolve, reject) => {
            // console.log("Pressed");
            const fetchPayhistory = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><fetchPayhistory xmlns="http://hpsebl.in/wssmartmtr/"><conId xmlns="">${userid}</conId></fetchPayhistory></Body></Envelope>`;
            const getOutStanding = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><getOutStanding xmlns="http://hpsebl.in/wssmartmtr/"><conId xmlns="">100003020226</conId></getOutStanding></Body></Envelope>`;
            const viewbillDetails = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><viewbillDetails xmlns="http://hpseb.in/BillDetails/"><consumerId xmlns="">100003020226</consumerId></viewbillDetails></Body></Envelope>`;
            const createBill = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><createBill xmlns="http://hpseb.in/BillDetails/"><opbel xmlns="">240008568909</opbel></createBill></Body></Envelope>`
            axios.defaults.baseURL = 'https://www.hpseb.in/SmartMeterMobAppWebServicesService/';
            axios.defaults.headers.post['Content-Type'] = 'text/xml';
            axios.post('/SmartMeterMobAppWebServices', fetchPayhistory)
            .then(function (response) {
                const xmlResponse = response.data
                parseString(xmlResponse, {explicitArray: false},async function  (err, result) {
                    console.log("XML Payment History", result);
                    const jsonResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:fetchPayhistoryResponse']['return'];
                    let resp = ""
                    if(Array.isArray(jsonResponse)){
                        const jsonFiltered = jsonResponse.map(({$, ...rest}, i) => (rest['_']))
                        const payHistoryData = await fetchPayhistoryHelper(jsonFiltered)
                        resp = { status: 200, data: payHistoryData }
                    } else {
                        resp = { status: 400, data: filterArrayStructure['_']}
                    }
                    return resolve(resp)
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        })
    }
}

export const getOutStandingApi = () => {
    return (token, userid, msn, Phase) => {
       
        return new Promise(async (resolve, reject) => {
            // console.log("Pressed");
            const getOutStanding = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><getOutStanding xmlns="http://hpsebl.in/wssmartmtr/"><conId xmlns="">${userid}</conId></getOutStanding></Body></Envelope>`;
            axios.defaults.baseURL = 'https://www.hpseb.in/SmartMeterMobAppWebServicesService';
            axios.defaults.headers.post['Content-Type'] = 'text/xml';
            axios.post('/SmartMeterMobAppWebServices', getOutStanding)
            .then(function (response) {
                const xmlResponse = response.data
                parseString(xmlResponse, {explicitArray: false},async function  (err, result) {
                    const JsonResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:getOutStandingResponse']['return'];
                    let resp = ""
                        const payHistoryData = await getOutStandingHelper(JsonResponse)
                    return resolve(payHistoryData)
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        })
    }
}

export const viewbillDetailsApi = () => {
    return (token, userid, msn, Phase) => {
       
        return new Promise(async (resolve, reject) => {
            // console.log("Pressed");
            const viewbillDetails = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><viewbillDetails xmlns="http://hpseb.in/BillDetails/"><consumerId xmlns="">${userid}</consumerId></viewbillDetails></Body></Envelope>`;
            axios.defaults.baseURL = 'https://www.hpseb.in/BillingServiceService';
            axios.defaults.headers.post['Content-Type'] = 'text/xml';
            axios.post('/BillingService', viewbillDetails)
            .then(function (response) {
                const xmlResponse = response.data
                parseString(xmlResponse, {explicitArray: false},async function  (err, result) {
                console.log("3232323r", result);

                    const jsonResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:viewbillDetailsResponse']['return'];
                    let resp = ""
                    if(Array.isArray(jsonResponse)){
                        const viewBillHistoryData = await viewbillDetailsHelper(jsonResponse)
                        resp = { status: 200, data: viewBillHistoryData }
                    } else {
                        resp = { status: 400, data: jsonResponse}
                    }
                    return resolve(resp)
                });
            })
            .catch(function (error) {
                console.log(error);
            });
        })
    }
}


export const createBillApi = (billNumber) => {
    return (token, userid, msn, Phase) => {
        return new Promise(async (resolve, reject) => {

            console.log("Billl asdfas", billNumber);
            // console.log("Pressed");
            const createBill = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><createBill xmlns="http://hpsebl.in/wssmartmtr/"><vkont xmlns="">${userid}</vkont><opbel xmlns="">${billNumber}</opbel></createBill></Body></Envelope>`
            // const createBill = `<Envelope xmlns="http://schemas.xmlsoap.org/soap/envelope/"><Body><createBill xmlns="http://hpseb.in/wssmartmtr/"><vkont xmlns="">${userid}</vkont><opbel xmlns="">${billNumber}</opbel></createBill></Body></Envelope>`
            console.log("Requets", createBill);
            axios.defaults.baseURL = 'https://www.hpseb.in/SmartMeterMobAppWebServicesService';
            axios.defaults.headers.post['Content-Type'] = 'text/xml';
            axios.post('/SmartMeterMobAppWebServices', createBill)
            .then(function (response) {
                const xmlResponse = response.data
                parseString(xmlResponse, {explicitArray: false},async function  (err, result) {
                console.log("3232323r", result);

                    const jsonResponse = result['SOAP-ENV:Envelope']['SOAP-ENV:Body']['ns2:createBillResponse']['return'];
                    console.log("as23rasdf",jsonResponse);
                    // let resp = ""
                    // if(Array.isArray(jsonResponse)){
                    //     const viewBillHistoryData = await viewbillDetailsHelper(jsonResponse)
                    //     console.log("asf23333asdfasdf", viewBillHistoryData);
                    //     resp = { status: 200, data: viewBillHistoryData }
                    // } else {
                    //     resp = { status: 400, data: jsonResponse}
                    // }
                    return resolve(jsonResponse)
                });
            })
            .catch(function (error) {
                reject(error)
                console.log(error);
            });
        })
    }
}