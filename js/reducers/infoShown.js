import {SET_INFO_SHOWN} from "../actions/userDetailsActions";

const initialState = false;

export const infoShownReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INFO_SHOWN:
            return action.payload;
        default:
            return state
    }
};
