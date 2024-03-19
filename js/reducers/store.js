import { persistStore } from 'redux-persist';
import rootReducer from './index';
import {middlewares} from 'SmartgasConsumerApp/js/middlewares';
import { createStore, compose } from 'redux';
import {commonActions} from "../actions";

const initialState = {};
const store = createStore(rootReducer, initialState, middlewares);
persistStore(store);

let reHydratedResolver = null;
const reHydratedStore = new Promise(resolve => {
    reHydratedResolver = resolve;
});

persistStore(store, null, () => {

    store.dispatch(commonActions.rehydrationComplete())
    reHydratedResolver();
    console.log("wwww")
});

export { reHydratedStore };
export {store};
