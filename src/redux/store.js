import { createStore, combineReducers, applyMiddleware } from 'redux';
import promise from 'redux-promise-middleware';
import authReducer from './reducer';
import postReducer from './postReducer';

const combinedReducers = combineReducers(
    {
        authReducer,
        postReducer
    }
);

export default createStore( combinedReducers, applyMiddleware(promise) )