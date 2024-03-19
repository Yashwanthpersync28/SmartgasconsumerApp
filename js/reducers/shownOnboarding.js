import { SHOWN_ONBOARDING} from "../constants";

const initialState = false;

export const shownOnboardingReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOWN_ONBOARDING:
            return action.payload;
        default:
            return state
    }
};
