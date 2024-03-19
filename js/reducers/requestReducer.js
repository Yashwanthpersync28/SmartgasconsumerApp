import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const requestReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_REQUEST:
            return action.data;
        default:
            return state
    }
};
