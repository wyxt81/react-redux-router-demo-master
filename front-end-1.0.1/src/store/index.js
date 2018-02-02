/**
 * Author：zhoushuanglong
 * Time：2017/5/4
 * Description：store
 */

import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {routerMiddleware} from 'react-router-redux';
import {/*browserHistory*/hashHistory} from 'react-router'

import rootReducer from '../reducers/index';

const router = routerMiddleware(/*browserHistory*/hashHistory);
export default createStore(rootReducer, composeWithDevTools(
    applyMiddleware(thunk, router)
));

