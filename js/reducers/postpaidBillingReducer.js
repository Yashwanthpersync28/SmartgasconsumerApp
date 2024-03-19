import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const postpaidBillingReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_POSTPAID_BILLING:
            return action.data;
        default:
            return state
    }
};
