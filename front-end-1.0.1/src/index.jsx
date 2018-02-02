/**
 * Author：zhoushuanglong
 * Time：2017/5/3
 * Description：outer jsx
 */


import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router, /*browserHistory*/ hashHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';

import 'babel-polyfill';//解决ie11不支持Object.assign等babel转码的一些es6的Api

import rootRoutes from './routes'
import store from './store/index';

import './public/index.scss';

const history = syncHistoryWithStore(/*browserHistory*/hashHistory, store);

$('body').append('<div id="root"></div>');
render(<Provider store={store}>
    <Router history={history}>
        {rootRoutes}
    </Router>
</Provider>, document.getElementById('root'));
