import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer/index';
import promiseMiddleware from 'redux-promise-middleware';

const store = createStore(rootReducer, {}, composeWithDevTools(applyMiddleware(thunkMiddleware, promiseMiddleware)));

export default store;
