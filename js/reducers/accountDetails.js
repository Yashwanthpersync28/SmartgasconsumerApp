import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const accountDetailsReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_ACCOUNT:
            return action.data;
        default:
            return state
    }
};
