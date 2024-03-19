import {createSelector} from "reselect";

const outStandingBalanceSelector = (state) => (state.outStandingBalance);
export const outStandingBalance = createSelector(
    [outStandingBalanceSelector],
    (details) => details
);

const paymentHistorySelector = (state) => (state.paymentHistory);
export const paymentHistory = createSelector(
    [paymentHistorySelector],
    (details) => details
);

const userDetailsSelector = (state) => (state.user);
export const userDetails = createSelector(
    [userDetailsSelector],
    (details) => details
);

const currentRouteSelector = (state) => (state.currentRoute);
export const currentRoute = createSelector(
    [currentRouteSelector],
    (details) => details
);

const menuSelector = (state) => (state.menu);
export const menu = createSelector(
    [menuSelector],
    (details) => details
);

const activeCountSelector = (state) => (state.activeCount);
export const activeCount = createSelector(
    [activeCountSelector],
    (details) => details
);


const languageSelector = (state) => (state.language);
export const language = createSelector(
    [languageSelector],
    (details) => details
);

const darkModeSelector = (state) => (state.darkMode);
export const darkMode = createSelector(
    [darkModeSelector],
    (details) => details
);

const overviewSelector = (state) => (state.overview);
export const overview = createSelector(
    [overviewSelector],
    (details) => details
);

const liveDataSelector = (state) => (state.liveData);
export const liveData = createSelector(
    [liveDataSelector],
    (details) => details
);

const unitComparisonSelector = (state) => (state.unitComparison);
export const unitComparison = createSelector(
    [unitComparisonSelector],
    (details) => details
);

const consumptionLogHistorySelector = (state) => (state.consumptionLogHistory);
export const consumptionLogHistory = createSelector(
    [consumptionLogHistorySelector],
    (details) => details
);

const consumptionLogDetailsSelector = (state) => (state.consumptionLogDetails);
export const consumptionLogDetails = createSelector(
    [consumptionLogDetailsSelector],
    (details) => details
);

const payMyBillSelector = (state) => (state.payMyBill);
export const payMyBill = createSelector(
    [payMyBillSelector],
    (details) => details
);

const billingHistorySelector = (state) => (state.billingHistory);
export const billingHistory = createSelector(
    [billingHistorySelector],
    (details) => details
);

const prepaidBalanceSelector = (state) => (state.prepaidBalance);
export const prepaidBalance = createSelector(
    [prepaidBalanceSelector],
    (details) => details
);

const postpaidBillingSelector = (state) => (state.postpaidBilling);
export const postpaidBilling = createSelector(
    [postpaidBillingSelector],
    (details) => details
);

const prepaidBillingSelector = (state) => (state.prepaidBilling);
export const prepaidBilling = createSelector(
    [prepaidBillingSelector],
    (details) => details
);

const powerQualitySelector = (state) => (state.powerQuality);
export const powerQuality = createSelector(
    [powerQualitySelector],
    (details) => details
);

const profileSelector = (state) => (state.profile);
export const profile = createSelector(
    [profileSelector],
    (details) => details
);

const profileUpdateHistorySelector = (state) => (state.profileUpdateHistory);
export const profileUpdateHistory = createSelector(
    [profileUpdateHistorySelector],
    (details) => details
);



const eventAnalysisSelector = (state) => (state.eventAnalysis);
export const eventAnalysis = createSelector(
    [eventAnalysisSelector],
    (details) => details
);

const faqSelector = (state) => (state.faq);
export const faq = createSelector(
    [faqSelector],
    (details) => details
);

const feedbackSelector = (state) => (state.feedback);
export const feedback = createSelector(
    [feedbackSelector],
    (details) => details
);

const energyTipsSelector = (state) => (state.energy);
export const energyTips = createSelector(
    [energyTipsSelector],
    (details) => details
);

const notificationsSelector = (state) => (state.notifications);
export const notifications = createSelector(
    [notificationsSelector],
    (details) => details
);

const mdiSelector = (state) => (state.mdi);
export const mdi = createSelector(
    [mdiSelector],
    (details) => details
);

const accountDetailsSelector = (state) => (state.accountDetails);
export const accountDetails = createSelector(
    [accountDetailsSelector],
    (details) => details
);

const memberAccountDetailsSelector = (state) => (state.memberAccountDetails);
export const memberAccountDetails = createSelector(
    [memberAccountDetailsSelector],
    (details) => details
);

const infoShownSelector = (state) => (state.infoShown);
export const infoShown = createSelector(
    [infoShownSelector],
    (details) => details
);

const schemesSelector = (state) => (state.schemes);
export const schemes = createSelector(
    [schemesSelector],
    (details) => details
);

const checkProgramsSelector = (state) => (state.checkPrograms);
export const checkPrograms = createSelector(
    [checkProgramsSelector],
    (details) => details
);

const myProgramsSelector = (state) => (state.myPrograms);
export const myPrograms = createSelector(
    [myProgramsSelector],
    (details) => details
);

const netMeterSelector = (state) => (state.netMeter);
export const netMeter = createSelector(
    [netMeterSelector],
    (details) => details
);

const headerLeftSelector = (state) => (state.headerLeft);
export const headerLeft = createSelector(
    [headerLeftSelector],
    (details) => details
);
const headerRightSelector = (state) => (state.headerRight);
export const headerRight = createSelector(
    [headerRightSelector],
    (details) => details
);

const tariffDetailsSelector = (state) => (state.tariffDetails);
export const tariffDetails = createSelector(
    [tariffDetailsSelector],
    (details) => details
);

const dateWiseConsumptionSelector = (state) => (state.dateWiseConsumption);
export const dateWiseConsumption = createSelector(
    [dateWiseConsumptionSelector],
    (details) => details
);

const ipDataSelector = (state) => (state.ipData);
export const ipData = createSelector(
    [ipDataSelector],
    (details) => details
);


const requestSelector = (state) => (state.request);
export const request = createSelector(
    [requestSelector],
    (details) => details
);


const requestTypeSelector = (state) => (state.requestType);
export const requestType = createSelector(
    [requestTypeSelector],
    (details) => details
);

const rsaSelector = (state) => (state.rsa);
export const rsa = createSelector(
    [rsaSelector],
    (details) => details
);
