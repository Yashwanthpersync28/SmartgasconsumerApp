import {
    applyMiddleware,
    compose
} from 'redux';
import thunk from 'redux-thunk';
import {commonActions} from "../actions";

let middleware = [];
middleware.push(thunk);
const middlewares =  compose(
        applyMiddleware(...middleware)
);
export {middlewares}



let hasRehydrated = false;

const onRehydrationMiddleware = store => next => action => {
    // if this Action happens to be 'persist/REHYDRATE' then follow it up with your
    // desired Action
    if (!hasRehydrated && action.type === 'persist/REHYDRATE') {
        hasRehydrated = true;
        next(action); // this is to make sure you get the Rehydrated State before making
                      // the store.dispatch(API_CALL()) call
        store.dispatch(commonActions.rehydrationComplete());
    } else {
        // make a call to the next action
        next(action);
    }
};
