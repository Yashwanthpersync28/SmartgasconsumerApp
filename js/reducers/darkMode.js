import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = false;

export const darkMode = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_MODE:
            return action.data;
        default:
            return state
    }
};
