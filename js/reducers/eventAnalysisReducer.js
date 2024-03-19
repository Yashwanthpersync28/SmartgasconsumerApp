import Immutable from 'immutable';

import {userDetailActions} from 'SmartgasConsumerApp/js/actions'

const initialState = Immutable.Map();

export const eventAnalysisReducer = (state = initialState, action) => {
    switch (action.type) {
        case userDetailActions.SET_EVENT_ANALYSIS:
            return action.data;
        default:

            return state
    }
};
