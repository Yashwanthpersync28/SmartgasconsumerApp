import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const mdiReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_MDI:
            return action.data;
        default:
            return state
    }
};
