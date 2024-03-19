import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const unitComparisonReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_UNIT_COMPARISON:
            return action.data;
        default:
            return state
    }
};