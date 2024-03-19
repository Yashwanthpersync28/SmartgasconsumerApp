import { Platform} from 'react-native';
export const isDebug = false;


// https://periproxy.herokuapp.com/
// Debug URL With Proxy
// export const debugBaseUrl = "https://periproxy.herokuapp.com/http://103.216.94.178:8014/api/";
// export const releaseBaseUrl = isDebug ? "https://periproxy.herokuapp.com/http://103.216.94.178:8014/api/" : "https://periproxy.herokuapp.com/http://103.216.94.178:8014/api/";

//TND URL

// http://103.216.94.178:8014
// export const debugBaseUrl = "http://103.216.94.178:8014/api/";
// export const releaseBaseUrl = isDebug ? "http://103.216.94.178:8014/api/" : "http://103.216.94.178:8014/api/";
// https://pstproxy.herokuapp.com/http://103.216.94.178:8014/api/

// Producation URL
// https://cpapi.smbgp-sbpdcl.co.in

// export const debugBaseUrl = "https://cpapi.smbgp-sbpdcl.co.in:8014/api/";
// export const releaseBaseUrl = isDebug ? "https://cpapi.smbgp-sbpdcl.co.in:8014/api/" : "https://cpapi.smbgp-sbpdcl.co.in:8014/api/";

// Test URL
// http://103.216.94.178:8014/index.html

// export const debugBaseUrl = "http://103.216.94.178:8014/api/";
// export const releaseBaseUrl = "http://103.216.94.178:8014/api/";


// Release URL
// export const debugBaseUrl = "https://smbgp-sbpdcl.co.in:8014/api/";
// export const releaseBaseUrl = isDebug ? "https://smbgp-sbpdcl.co.in:8014/api/" : "https://smbgp-sbpdcl.co.in:8014/api/";

export const debugBaseUrl = "http://40.123.236.176:4012/";
export const releaseBaseUrl = isDebug ? "http://40.123.236.176:4012/" : "https://cportalgasapi.esyasoft.com/";
// "https://cportalapi.smartgasconnect.ai/";
// "http://5.191.246.83:4012/";
// export const debugBaseUrl = "";
// export const releaseBaseUrl ="";
// https://amihpseb.in:8214/api/
// https://smbgp-sbpdcl.co.in:8014/api/

// AUTH Key URL
// export const autKeyDebugBaseUrl = "https://apdclrms.com/cbs/RestAPI/";
// export const autKeyReleaseBaseUrl = isDebug ? "https://apdclrms.com/cbs/RestAPI/" : "https://apdclrms.com/cbs/RestAPI/";

// export const ccavenueURL = "https://secure.ccavenue.com/transaction/getRSAKey"

// API constants

export const verifyOtpTypes = {
  register: 1,
  other: 2,
  forgotPassword: 4
};

export const verifyCIDApiConstant = "v1.1/Account/CAVerification"
export const registrationGetOtpApiConstant = "v1/Account/GetOTP"
export const registrationVerifyOtpApiConstant = "v1/Account/VerifyOTP"
export const registrationApiConstant = "v1.1/Account/Registration"

export const resetPasswordApiConstant = "v1/Account/ResetPassword";
export const changePasswordApiConstant = "v1/Account/ChangePassword";
export const changeLanguageApiConstant = "v1/ContactUS/ChangeLanguage";

export const loginApiConstant = "api/Login/Authenticate/Mobile";
// export const loginApiConstant = "v1/Account/Login";
export const loginWithOtpApiConstant = "v1/Account/VerifyOTP";
export const checkBalanceApiConstant = "v1/Account/CheckBalance";

export const verifyMPINApiConstant = "api/Login/Authenticate/Mobile/Mpin";
export const createMPINApiConstant = "v1.1/Dashboard/CreateMPIN";
export const validateMPINApiConstant = "v1.1/Account/ValidateMPIN";

export const overviewApiConstant = "api/Dashboard/Mobile?msn=";
export const liveDataApiConstant = "api/Consumer/HourlyLiveData?MSN=";
export const meterDetailsApiConstant = "v1/Dashboard/MeterDetails";
export const meterSequenceListApiConstant = "v1/Dashboard/MeterSequenceList";


export const unitComparisonApiConstant = "api/Dashboard/mobile/ConsumptionLogComparison?msn=";
export const consumptionLogHistoryApiConstant = "api/Dashboard/mobile/ConsumptionLogHistory?msn=";
export const consumptionLogDetailsApiConstant = "api/Dashboard/mobile/ConsumptionLogHistory?msn=";
export const payMyBillApiConstant = "v1/Dashboard/PayMyBill";
export const billingHistoryApiConstant = "v1.1/Dashboard/BillingHistory";
export const prepaidBillingConstant = "v1/Dashboard/PrepaidBilling";
export const powerQualityApiConstant = "v1.1/Dashboard/PowerQuality";
export const mdiApiConstant = "v1.1/Dashboard/MDI";
export const drawerApiConstant = "v1/Account/SideMenu";

export const getProfileApiConstant = "v1/Dashboard/ProfileInformation";
export const eventAnalysisApiConstant = "v1.1/Dashboard/EventAnalysis";
export const eventCategoriesApiConstant = "v1.1/Dashboard/EventCategories";
export const faqApiConstant = "v1/ContactUS/FAQ";
export const feedbackApiConstant = "v1/ContactUS/SendFeedback";
export const energyTipsApiConstant = "api/Consumer/GasTipInstructions";
export const notificationApiConstant = "v1/ContactUS/Notification";
export const deleteNotificationApiConstant = "v1/ContactUS/ClearNotification";
export const schemesApiConstant = "v1/ContactUS/Schemes";
export const netMeterApiConstant = "v1/ContactUS/NetMetering";
export const checkProgramsApiConstant = "v1/ContactUS/PLM_DR_Programs";
export const eventEnrollmentApiConstant = "v1/ContactUS/PLMDREventEnrollment";
export const myProgramsApiConstant = "v1/ContactUS/PLMDRMyPrograms";

export const energyCostCalculationApiConstant = "v1/ContactUS/EnergyCostCalculation";
export const energyCostCalculationConsumptionApiConstant = "v1/ContactUS/EnergyCostCalculationConsumption";
export const energyCostCalculationForecastApiConstant = "v1/ContactUS/EnergyCostCalculationForecast";
export const appVersionApiConstant = "v1/ContactUS/APKVersion";

// Billing SmartMeter APi
export const smartMeterBillDetailsConstant = "smartmeter/SmartMeterBillDetails";
export const smartMeterPaymentHistoryConstant = "smartmeter/SmartMeterPaymentHistory";
export const smartMeterPostpaidBillingConstant = "smartmeter/SmartPostPaidBillDetails";
// Unknown Links
export const mobileSendOtpApiConstant = "v1/send/otp"; // not in swagger
export const verifyOtpApiConstant = "v1/verify/otp"; // not in swagger // Already
export const verifyCANumberApiConstant = "v1/Account/CANumberVerification"; // no in swagger // Already
export const updateProfileApiConstant = "v1/ContactUs/ContactUpdate"; 
export const profileUpdateHistoryApiConstant = "v1/ContactUs/ContactUpdateHistory"; 

export const updateImageApiConstant = "v1/Dashboard/UpdateProfileInformation"; // not in swagger
export const notificationsApiConstant = "v1/user/notification/get"; // not in swagger
export const refreshTokenApiConstant = "v1/Account/GetToken"; // not in swgger

export const accountDetailsApiConstant = "v1/Dashboard/AccountDetails";
export const deleteAccountApiConstant = "v1/Dashboard/DeleteAccount";
export const saveAccoutDetailsApiConstant = "v1/Dashboard/SaveAccountDetails";
export const accountOtpVerifyApiConstant = "v1/Dashboard/AccountOTPVerify";
export const memberAccountDetailsApiConstant = "v1/Dashboard/MemberDetails";
export const relationshipsApiConstant = "v1/Dashboard/Relationships";
export const switchAccountpiConstant = "v1/Dashboard/SwitchAccount";

export const deleteMemberApiConstant = "v1/Dashboard/DeleteMember";
export const addMemberAccountDetailsApiConstant = "v1/Dashboard/SaveMemberDetails";
export const dateWiseConsumptionApiConstant = "v1/Dashboard/DayWiseConsumptionBalance";
export const tariffDetailsApiConstant = "v1/Dashboard/TarrifDetails";
export const ipDataApiConstant = "v1/Dashboard/LatestIPData";
export const requestApiConstant = "v1/Dashboard/CustomRequest";
export const customRequestHistoryConstant = "v1/Dashboard/CustomRequestHistory";
export const requestTypeApiConstant = "v1/Dashboard/RequestType";
// Recharge
export const paymentDetails = "api/Consumer/PaymentDetails";
export const createOrderIdApiConstant = "api/Consumer/Payment/Order";
export const paymentHistoryApiConstant = "api/Consumer/PaymentData";

// UI Constants
export const REHYDRATION_COMPLETE= "REHYDRATION_COMPLETE";
export const SHOW_LOG_OUT= "SHOW_LOG_OUT";
export const SHOWN_ONBOARDING= "SHOWN_ONBOARDING";


//dashboard info API for recharge update.
export const dashboardInfo = "api/Dashboard/mobile/RechargeDetails?msn=" 
