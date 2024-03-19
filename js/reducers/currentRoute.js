import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = "Dashboard";

export const currentRouteReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_CURRENT_ROUTE:
            return action.data;
        default:
            return state
    }
};
