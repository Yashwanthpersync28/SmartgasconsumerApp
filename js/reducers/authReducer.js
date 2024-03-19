import {loginActions} from 'SmartgasConsumerApp/js/actions'
import Immutable from "immutable";
const initialState = Immutable.Map({
    token: '',
    user: '',
    // refreshToken: '',
});

export const authReducer = (state = initialState, action) => {
    console.log(action,"auth action")
    switch (action.type) {

        case loginActions.SET_AUTH:
            state = state.set('token', action.payload.token);
            state = state.set('user', action.payload.user);
            // state = state.set('refreshToken', action.payload.refreshToken);
            state = state.set('msn', action.payload.msn);
            state = state.set('Phase', action.payload.Phase);
            state = state.set('username', action.payload.user);
            state = state.set('password', action.payload.password);
            console.log("loginAction",state);
            return state;
        case loginActions.LOG_OUT:
            state = state.set('token', '');
            state = state.set('user', '');
            // state = state.set('refreshToken', '');
            state = state.set('msn', '');
            state = state.set('Phase', '');
            return state;
        case loginActions.CLEAR_PASSWORD:
            state = state.set('username', "");
            state = state.set('password', "");
            return state;
        default:
            return state
    }
};
