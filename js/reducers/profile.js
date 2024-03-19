import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_PROFILE:
            return action.data;
        default:

            return state
    }
};

