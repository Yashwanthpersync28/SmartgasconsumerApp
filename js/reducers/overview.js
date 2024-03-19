import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const overviewReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_OVERVIEW:
            return action.data;
        default:

            return state
    }
};
