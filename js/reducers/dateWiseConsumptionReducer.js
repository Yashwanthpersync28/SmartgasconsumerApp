import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = [];

export const dateWiseConsumptionReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_DATEWISE_CONSUMPTION:
            return action.data;
        default:
            return state
    }
};
