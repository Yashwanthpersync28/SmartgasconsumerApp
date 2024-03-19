import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const energyTipsReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_ENERGY:
            return action.data;
        default:

            return state
    }
};
