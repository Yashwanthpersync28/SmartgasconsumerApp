import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const rsaReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_RSA:
            return action.data;
        default:

            return state
    }
};

