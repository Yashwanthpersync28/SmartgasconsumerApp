import {SHOW_LOG_OUT} from "../constants";

const initialState = false;

export const showLogoutReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOG_OUT:
            console.log("SHOW_LOG_OUT", action);
            return action.payload;
        default:
            return state
    }
};
