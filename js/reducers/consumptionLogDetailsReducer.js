import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const consumptionLogDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_CONSUMPTION_LOG_DETAILS:
            return action.data;
        default:

            return state
    }
};
