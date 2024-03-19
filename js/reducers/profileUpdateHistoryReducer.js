import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const profileUpdateHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_PROFILE_UPDATE_HISTORY:
            return action.data;
        default:
            return state
    }
};

