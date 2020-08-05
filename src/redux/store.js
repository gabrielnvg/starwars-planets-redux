import { createStore, combineReducers } from 'redux';
import planet from './modules/planet';

const store = createStore(combineReducers({ planet }));

export default store;
