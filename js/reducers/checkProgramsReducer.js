import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const checkProgramsReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_CHECK_PROGRAMS:
            return action.data;
        default:
            return state
    }
};
