
export const SET_USER_DETAILS = 'SET_CHILDREN_DETAILS';
export const SET_OVERVIEW = "SET_OVERVIEW";
export const SET_LIVEDATA = "SET_LIVEDATA";
export const SET_UNIT_COMPARISON = "SET_UNIT_COMPARISON";
export const SET_CONSUMPTION_LOG_HISTORY = "SET_CONSUMPTION_LOG_HISTORY";
export const SET_CONSUMPTION_LOG_DETAILS = "SET_CONSUMPTION_LOG_DETAILS";
export const SET_PAY_MY_BILL = "SET_PAY_MY_BILL";
export const SET_BILLING_HISTORY = "SET_BILLING_HISTORY";
export const SET_PREPAID_BALANCE = "SET_PREPAID_BALANCE";
export const SET_POSTPAID_BILLING = "SET_POSTPAID_BILLING";
export const SET_PREPAID_BILLING = "SET_PREPAID_BILLING";
export const SET_POWER_QUALITY = "SET_POWER_QUALITY";
export const SET_CURRENT_ROUTE = "SET_CURRENT_ROUTE";
export const SET_CURRENT_LANGUAGE = "SET_CURRENT_LANGUAGE";
export const SET_MODE = "SET_MODE";
export const SET_PROFILE = "SET_PROFILE";
export const SET_PROFILE_UPDATE_HISTORY = "SET_PROFILE_UPDATE_HISTORY";

export const SET_MDI = "SET_MDI";

export const SET_EVENT_ANALYSIS = "SET_EVENT_ANALYSIS";
export const SET_FAQ = "SET_FAQ";
export const SET_FEEDBACK = "SET_FEEDBACK";
export const SET_ENERGY = "SET_ENERGY";
export const SET_SCHEMES = "SET_SCHEMES";
export const SET_CHECK_PROGRAMS = "SET_CHECK_PROGRAMS";
export const SET_MY_PROGRAMS = "SET_MY_PROGRAMS";
export const SET_NET_METER = "SET_NET_METER";
export const SET_NOTIFICATIONS = "SET_NOTIFICATIONS";
export const SET_ACCOUNT = "SET_ACCOUNT";
export const SET_MEMBER = "SET_MEMBER";
export const SET_INFO_SHOWN = "SET_INFO_SHOWN";

export const SET_MENU = "SET_MENU";
export const SET_APP_ACTIVE_COUNT = "SET_APP_ACTIVE_COUNT";

export const SET_HEADER_RIGHT = "SET_HEADER_RIGHT";
export const SET_HEADER_LEFT = "SET_HEADER_LEFT";

// BILLING HP

export const SET_OUTSTANDING_BALANCE = "SET_OUTSTANDING_BALANCE";
export const SET_PAYMENT_HISTORY = "SET_PAYMENT_HISTORY";

export const SET_DATEWISE_CONSUMPTION = "SET_DATEWISE_CONSUMPTION";
export const SET_TARIFF_DETAILS = "SET_TARIFF_DETAILS";
export const SET_IP_DATA = "SET_IP_DATA";
export const SET_REQUEST = "SET_REQUEST";
export const SET_REQUEST_TYPE = "SET_REQUEST_TYPE";
export const SET_RSA = "SET_RSA";
export const SET_FCM_TOKEN = "SET_FCM_TOKEN";

export const fcmToken = (data) => {
    return {
        type: SET_FCM_TOKEN,
        data
    }
}

export function setFcmToken(details) {
    console.log(details,"setFcmToken")
    return (dispatch, getState) => {
        dispatch(fcmToken(details));
    }
}




export function userDetails(data) {
    return {
        type: SET_USER_DETAILS,
        data
    }
}

export function setUserDetails(details) {
    console.log(details,"setUserDetails action")
    return (dispatch, getState) => {
        dispatch(userDetails(details));
    }
}

export function currentRoute(data) {
    return {
        type: SET_CURRENT_ROUTE,
        data
    }
}

export function setCurrentRoute(details) {
    return (dispatch, getState) => {
        dispatch(currentRoute(details));
    }
}


export function language(data) {
    return {
        type: SET_CURRENT_LANGUAGE,
        data
    }
}


export function setCurrentLanguage(details) {
    return (dispatch, getState) => {
        dispatch(language(details));
    }
}


export function mode(data) {
    return {
        type: SET_MODE,
        data
    }
}


export function setMode(details) {
    return (dispatch, getState) => {
        dispatch(mode(details));
    }
}


export function menu(data) {
    console.log(data,"sumitapi");
    return {
        type: SET_MENU,
        data
    }
}

export function setMenu(details) {
    return (dispatch, getState) => {
        dispatch(menu(details));
    }
}


export function activeCount(data) {
    return {
        type: SET_APP_ACTIVE_COUNT,
        data
    }
}

export function setActiveCount(details) {
    return (dispatch, getState) => {
        dispatch(activeCount(details));
    }
}


export function overview(data) {
    return {
        type: SET_OVERVIEW,
        data
    }
}

export function setOverview(details) {
    return (dispatch, getState) => {
        dispatch(overview(details));
    }
}

export function liveData(data) {
    return {
        type: SET_LIVEDATA,
        data
    }
}

export function setLiveData(details) {
    console.log("sumitdetails1",details);
    return (dispatch, getState) => {
        dispatch(liveData(details));
    }
}

export function setConsumptionLogHistory(details) {
    return (dispatch, getState) => {
        dispatch(consumptionLogHistory(details));
    }
}

export function consumptionLogHistory(data) {
    return {
        type: SET_CONSUMPTION_LOG_HISTORY,
        data
    }
}

export function setConsumptionLogDetails(details) {
    return (dispatch, getState) => {
        dispatch(consumptionLogDetails(details));
    }
}

export function consumptionLogDetails(data) {
    return {
        type: SET_CONSUMPTION_LOG_DETAILS,
        data
    }
}

export function setUnitComparison(details) {
    return (dispatch, getState) => {
        dispatch(unitComparison(details));
    }
}

export function unitComparison(data) {
    return {
        type: SET_UNIT_COMPARISON,
        data
    }
}
export function payMyBill(data) {
    return {
        type: SET_PAY_MY_BILL,
        data
    }
}

export function setPayMyBill(details) {
    return (dispatch, getState) => {
        dispatch(payMyBill(details));
    }
}

export function billingHistory(data) {
    return {
        type: SET_BILLING_HISTORY,
        data
    }
}

export function setBillingHistory(details) {
    return (dispatch, getState) => {
        dispatch(billingHistory(details));
    }
}

export function prepaidBalance(data) {
    return {
        type: SET_PREPAID_BALANCE,
        data
    }
}

export function setPrepaidBalance(details) {
    return (dispatch, getState) => {
        dispatch(prepaidBalance(details));
    }
}

export function postpaidBilling(data) {
    return {
        type: SET_POSTPAID_BILLING,
        data
    }
}

export function setPostpaidBilling(details) {
    return (dispatch, getState) => {
        dispatch(postpaidBilling(details));
    }
}

export function prepaidBilling(data) {
    return {
        type: SET_PREPAID_BILLING,
        data
    }
}

export function setPrepaidBilling(details) {
    return (dispatch, getState) => {
        dispatch(prepaidBilling(details));
    }
}

export function powerQuality(data) {
    return {
        type: SET_POWER_QUALITY,
        data
    }
}

export function setPowerQuality(details) {
    return (dispatch, getState) => {
        dispatch(powerQuality(details));
    }
}


export function setProfile(details) {
    return (dispatch, getState) => {
        dispatch(profile(details));
    }
}

export function profile(data) {
    return {
        type: SET_PROFILE,
        data
    }
}

export function setProfileUpdateHistory(details) {
    return (dispatch, getState) => {
        dispatch(profileUpdateHistory(details));
    }
}

export function profileUpdateHistory(data) {
    return {
        type: SET_PROFILE_UPDATE_HISTORY,
        data
    }
} 

export function setHeaderLeftDimensions(details) {
    return (dispatch, getState) => {
        dispatch(headerLeftDimensions(details));
    }
}

export function headerLeftDimensions(data) {
    return {
        type: SET_HEADER_LEFT,
        data
    }
}

export function setHeaderRightDimensions(details) {
    return (dispatch, getState) => {
        dispatch(headerRightDimensions(details));
    }
}

export function headerRightDimensions(data) {
    return {
        type: SET_HEADER_RIGHT,
        data
    }
}


export function setMdi(details) {
    return (dispatch, getState) => {
        dispatch(mdi(details));
    }
}

export function mdi(data) {
    return {
        type: SET_MDI,
        data
    }
}


export function eventAnalysis(data) {
    return {
        type: SET_EVENT_ANALYSIS,
        data
    }
}

export function setEventAnalysis(details) {
    return (dispatch, getState) => {
        dispatch(eventAnalysis(details));
    }
}

export function faq(data) {
    return {
        type: SET_FAQ,
        data
    }
}

export function setFaq(details) {
    return (dispatch, getState) => {
        dispatch(faq(details));
    }
}

export function feedback(data) {
    return {
        type: SET_FEEDBACK,
        data
    }
}

export function setFeedback(details) {
    return (dispatch, getState) => {
        dispatch(feedback(details));
    }
}

export function schemes(data) {
    return {
        type: SET_SCHEMES,
        data
    }
}

export function setSchemes(details) {
    return (dispatch, getState) => {
        dispatch(schemes(details));
    }
}

export function checkPrograms(data) {
    return {
        type: SET_CHECK_PROGRAMS,
        data
    }
}

export function setCheckPrograms(details) {
    return (dispatch, getState) => {
        dispatch(checkPrograms(details));
    }
}

export function myPrograms(data) {
    return {
        type: SET_MY_PROGRAMS,
        data
    }
}

export function setMyPrograms(details) {
    return (dispatch, getState) => {
        dispatch(myPrograms(details));
    }
}

export function netMeter(data) {
    return {
        type: SET_NET_METER,
        data
    }
}

export function setNetMeter(details) {
    return (dispatch, getState) => {
        dispatch(netMeter(details));
    }
}

export function notifications(data) {
    return {
        type: SET_NOTIFICATIONS,
        data
    }
}

export function setNotifications(details) {
    return (dispatch, getState) => {
        dispatch(notifications(details));
    }
}

export function energyTips(data) {
    return {
        type: SET_ENERGY,
        data
    }
}

export function setEnergyTips(details) {
    return (dispatch, getState) => {
        dispatch(energyTips(details));
    }
}

export function accountDetails(data) {
    return {
        type: SET_ACCOUNT,
        data
    }
}

export function setAccountDetails(details) {
    return (dispatch, getState) => {
        dispatch(accountDetails(details));
    }
}

export function memberAccountDetails(data) {
    return {
        type: SET_MEMBER,
        data
    }
}

export function setMemberAccountDetails(details) {
    return (dispatch, getState) => {
        dispatch(memberAccountDetails(details));
    }
}

export function infoShown(data) {
    return {
        type: SET_INFO_SHOWN,
        payload:data
    }
}

export function setInfoShown(details) {
    return (dispatch, getState) => {
        dispatch(infoShown(details));
    }
}
// HP Billing

export function outStandingBalance(data) {
    return {
        type: SET_OUTSTANDING_BALANCE,
        data
    }
}

export function setOutStandingBalance(details) {
    return (dispatch, getState) => {
        dispatch(outStandingBalance(details));
    }
}

export function paymentHistory(data) {
    return {
        type: SET_PAYMENT_HISTORY,
        data
    }
}

export function setPaymentHistory(details) {
    return (dispatch, getState) => {
        dispatch(paymentHistory(details));
    }
}


//IP_DATA
export function ipData(data) {
    return {
        type: SET_IP_DATA,
        data
    }
}

export function setIpData(details) {
    return (dispatch, getState) => {
        dispatch(ipData(details));
    }
}

//TariffDetails
export function tariffDetails(data) {
    return {
        type: SET_TARIFF_DETAILS,
        data
    }
}

export function setTariffDetails(details) {
    return (dispatch, getState) => {
        dispatch(tariffDetails(details));
    }
}

//DateWiseConsumption
export function dateWiseConsumption(data) {
    return {
        type: SET_DATEWISE_CONSUMPTION,
        data
    }
}

export function setDateWiseConsumption(details) {
    return (dispatch, getState) => {
        dispatch(dateWiseConsumption(details));
    }
}


//Request
export function request(data) {
    return {
        type: SET_REQUEST,
        data
    }
}

export function setRequest(details) {
    return (dispatch, getState) => {
        dispatch(request(details));
    }
}


//RequestType
export function requestType(data) {
    return {
        type: SET_REQUEST_TYPE,
        data
    }
}

export function setRequestType(details) {
    return (dispatch, getState) => {
        dispatch(requestType(details));
    }
}

//RSA
export function rsa(data) {
    return {
        type: SET_RSA,
        data
    }
}

export function setRsa(details) {
    return (dispatch, getState) => {
        dispatch(rsa(details));
    }
}