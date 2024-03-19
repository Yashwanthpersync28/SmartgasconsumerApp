import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const payMyBillReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_PAY_MY_BILL:
            return action.data;
        default:
            return state
    }
};
