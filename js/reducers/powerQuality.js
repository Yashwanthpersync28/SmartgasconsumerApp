import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const powerQualityReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_POWER_QUALITY:
            return action.data;
        default:

            return state
    }
};

