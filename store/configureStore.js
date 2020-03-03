import { createStore, combineReducers } from 'redux';
import { applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import activationReducer from './reducers/activationReducer';

const rootReducer = combineReducers(
    { response: activationReducer }
);

const configureStore = () => {
    return createStore(rootReducer, applyMiddleware(thunk));
}

export default configureStore;