/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage log
 */

import { MANAGELOGSEARCH, MANAGELOGSIZE } from '../constants/index';

const stateInit = {
    logList: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        rows: []
    }
};

const manageLog = (state = stateInit, action) => {
    switch (action.type) {
        case MANAGELOGSEARCH:
            return Object.assign({}, state, { logList: action.logList });
            break;
        case MANAGELOGSIZE:
            return Object.assign({}, state, { logList: Object.assign({}, state.logList, { pageSize: action.pageSize })});
            break;
        default:
            return state;
    }
};

export default manageLog;