import {REHYDRATION_COMPLETE} from "../constants";

const initialState = false;

export const rehydrated = (state = initialState, action) => {
    switch (action.type) {
        case REHYDRATION_COMPLETE:
            return true;
        default:
            return state
    }
};
