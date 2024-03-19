import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const liveDataReducer = (state = initialState, action) => {
    console.log("insumit",action)
    switch (action.type) {
        case userDetailActions.SET_LIVEDATA:
            return action.data;
        default:
            return state
    }
};
