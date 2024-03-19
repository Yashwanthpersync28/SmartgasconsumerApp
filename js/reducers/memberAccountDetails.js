import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const memberAccountDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_MEMBER:
            return action.data;
        default:
            return state
    }
};
