import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import planet from './modules/planet';

const store = createStore(combineReducers({ planet }), applyMiddleware(thunk));

export default store;
