/**
 * Author：zhoushuanglong
 * Time：2017/5/5
 * Description：root reducer
 */

import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux'

import menuCollapsed from './menuCollapsed';
import menuData from './menuData';
import themeName from './themeName';
import breadcrumb from './breadcrumb';
import layoutConfig from './layoutConfig';
import configData from './configData';
import production from './production';
import showReport from './showReport';
import configQuery from './configQuery';
import manageUser from './manageUser';
import manageRole from './manageRole';
import manageGame from './manageGame';
import manageChannel from './manageChannel';
import manageFunc from './manageFunc';
import manageLog from './manageLog';
import manageTemplet from './manageTemplet';
import manageScript from './manageScript';
import colorPicker from './colorPicker';

const reducers = Object.assign({
    menuCollapsed,
    menuData,
    themeName,
    breadcrumb,
    layoutConfig,
    configData,
    production,
    showReport,
    configQuery,
    manageUser,
    manageRole,
    manageGame,
    manageChannel,
    manageFunc,
    manageLog,
    manageTemplet,
    manageScript,
    colorPicker,
    routing: routerReducer
});

const rootReducer = combineReducers(reducers);
export default rootReducer;