import { combineReducers} from 'redux';
import { persistReducer } from 'redux-persist';
import immutableTransform from 'redux-persist-transform-immutable';
 import AsyncStorage from "@react-native-async-storage/async-storage";

import {authReducer} from "./authReducer";
import {userDetailsReducer} from "./userDetails";
import {rehydrated} from "./rehydrated";
import {overviewReducer} from "./overview";
import {liveDataReducer} from "./liveDataReducer";
import {showLogoutReducer} from "./showLogout";
import {shownOnboardingReducer} from "./shownOnboarding";
import {currentRouteReducer} from "./currentRoute";
import {menuReducer} from "./menuItems";
import {activeStateCountReducer} from "./appActiveCount";
import {darkMode} from "./darkMode";
import {currentLanguage} from "./language";
import {unitComparisonReducer} from "./unitComparisonReducer"
import {consumptionLogHistoryReducer} from "./consumptionLogHistoryReducer"
import {consumptionLogDetailsReducer} from "./consumptionLogDetailsReducer"
import {payMyBillReducer} from "./payMyBill";
import {billingHistoryReducer} from "./billingHistory";
import {prepaidBalanceReducer} from "./prepaidBalanceReducer";
import {postpaidBillingReducer} from "./postpaidBillingReducer";
import {prepaidBillingReducer} from "./prepaidBilling";
import {powerQualityReducer} from "./powerQuality";
import {profileReducer} from "./profile";
import { profileUpdateHistoryReducer } from './profileUpdateHistoryReducer';
import {mdiReducer} from "./mdiReducer";
import {notificationsReducer} from "./notificationsReducer";
import {eventAnalysisReducer} from "./eventAnalysisReducer";
import {energyTipsReducer} from "./energyTips";
import {faqReducer} from "./faqReducer";
import {schemesReducer} from "./schemesReducer";
import {checkProgramsReducer} from "./checkProgramsReducer";
import {myProgramsReducer} from "./myProgramsReducer";
import {netMeterReducer} from "./netMeterReducer";
import {accountDetailsReducer} from "./accountDetails";
import {memberAccountDetailsReducer} from "./memberAccountDetails";
import {infoShownReducer} from "./infoShown";
import {headerLeftReducer} from "./headerLeftReducer";
import {headerRightReducer} from "./headerRightReducer";
import {outStandingBalanceReducer} from "./outStandingBalanceReducer";
import {paymentHistoryReducer} from "./paymentHistoryReducer";
import { tariffDetailsReducer } from './tariffDetailsReducer';
import { ipDataReducer } from './ipDataReducer';
import { dateWiseConsumptionReducer } from './dateWiseConsumptionReducer';
import { requestReducer } from './requestReducer';
import { requestTypeReducer } from './requestTypeReducer';
import { rsaReducer } from './rsaReducer';
import { fcmTokenReducer } from './fcmTokenReducer';



const config = {
    transforms: [immutableTransform()],
    key: 'HPSEBConfig',
    keyPrefix: '',
    whitelist: [ 'auth', 'user', 'overview', 'accountDetails', 'shownOnboarding', 'menu', 'language', 'darkMode', 'profile', 'infoShown'],
    storage: AsyncStorage
};
const reducers = {
    auth: authReducer,
    user: userDetailsReducer,
    shownOnboarding: shownOnboardingReducer,
    showLogout: showLogoutReducer,
    currentRoute: currentRouteReducer,
    darkMode: darkMode,
    language: currentLanguage,
    menu: menuReducer,
    activeCount: activeStateCountReducer,
    rehydrated: rehydrated,
    overview: overviewReducer,
    liveData: liveDataReducer,
    unitComparison: unitComparisonReducer,
    consumptionLogHistory: consumptionLogHistoryReducer,
    consumptionLogDetails: consumptionLogDetailsReducer,
    payMyBill: payMyBillReducer,
    billingHistory: billingHistoryReducer,
    prepaidBalance: prepaidBalanceReducer,
    postpaidBilling: postpaidBillingReducer,
    prepaidBilling: prepaidBillingReducer,
    mdi: mdiReducer,
    powerQuality: powerQualityReducer,
    profile: profileReducer,
    profileUpdateHistory: profileUpdateHistoryReducer,
    notifications: notificationsReducer,
    faq: faqReducer,
    energy: energyTipsReducer,
    eventAnalysis: eventAnalysisReducer,
    accountDetails: accountDetailsReducer,
    memberAccountDetails: memberAccountDetailsReducer,
    infoShown: infoShownReducer,
    schemes: schemesReducer,
    checkPrograms: checkProgramsReducer,
    myPrograms: myProgramsReducer,
    netMeter: netMeterReducer,
    headerLeft: headerLeftReducer,
    headerRight: headerRightReducer,
    outStandingBalance: outStandingBalanceReducer,
    paymentHistory: paymentHistoryReducer,
    tariffDetails: tariffDetailsReducer,
    ipData: ipDataReducer,
    dateWiseConsumption: dateWiseConsumptionReducer,
    request: requestReducer,
    requestType: requestTypeReducer,
    rsa: rsaReducer,
    fcmToken :fcmTokenReducer,

};
const reducer = combineReducers(reducers);
const persistedReducer = persistReducer(config, reducer);
export default persistedReducer;
