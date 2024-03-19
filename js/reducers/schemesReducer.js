import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const schemesReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_SCHEMES:
            return action.data;
        default:

            return state
    }
};
