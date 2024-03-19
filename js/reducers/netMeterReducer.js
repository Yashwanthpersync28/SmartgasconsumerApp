import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const netMeterReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_NET_METER:
            return action.data;
        default:
            return state
    }
};
