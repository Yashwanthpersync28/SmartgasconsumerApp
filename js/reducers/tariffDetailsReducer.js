import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const tariffDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_TARIFF_DETAILS:
            return action.data;
        default:
            return state
    }
};
