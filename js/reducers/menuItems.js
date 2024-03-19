import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const menuReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_MENU:
            return action.data;
        default:
            return state
    }
};
