import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = "0";

export const activeStateCountReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_APP_ACTIVE_COUNT:
            return action.data;
        default:
            return state
    }
};
