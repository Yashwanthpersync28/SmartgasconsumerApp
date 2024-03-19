import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const prepaidBalanceReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_PREPAID_BALANCE:
            return action.data;
        default:
            return state
    }
};
