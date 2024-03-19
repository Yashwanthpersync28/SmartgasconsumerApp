import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = [];

export const paymentHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_PAYMENT_HISTORY:
            return action.data;
        default:
            return state
    }
};
