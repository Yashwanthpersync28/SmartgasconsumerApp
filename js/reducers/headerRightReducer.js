import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = null;

export const headerRightReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_HEADER_RIGHT:
            return action.data;
        default:
            return state
    }
};
