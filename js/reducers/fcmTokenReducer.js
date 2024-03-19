import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = null;

export const fcmTokenReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_FCM_TOKEN:
            return action.data;
        default:
            return state
    }
};
