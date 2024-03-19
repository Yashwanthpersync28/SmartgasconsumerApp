import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = "";

export const userDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_USER_DETAILS:
            return action.data;
        default:
            return state
    }
};
