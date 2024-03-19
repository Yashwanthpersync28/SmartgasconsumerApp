import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = "english";

export const currentLanguage = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_CURRENT_LANGUAGE:
            return action.data;
        default:
            return state
    }
};
