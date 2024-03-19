import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const billingHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_BILLING_HISTORY:
            return action.data;
        default:
            return state
    }
};
