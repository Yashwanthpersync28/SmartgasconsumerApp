import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = "";

export const outStandingBalanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_OUTSTANDING_BALANCE:
            return action.data;
        default:
            return state
    }
};
