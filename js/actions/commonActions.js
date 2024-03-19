import {REHYDRATION_COMPLETE, SHOW_LOG_OUT, SHOWN_ONBOARDING} from "../constants";

export function rehydrationComplete() {
    return {
        type: REHYDRATION_COMPLETE
    }
}


export function showLogout(data) {
    console.log("data", data);
    return {
        type: SHOW_LOG_OUT,
        payload: data
    }
}


export function shownOnboarding(data) {
    return {
        type: SHOWN_ONBOARDING,
        payload: data
    }
}
