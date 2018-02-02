/**
 * Author：dengyu
 * Time：2017/7/11
 * Description：configQuery
 */

import { CONFIGQUERYSEARCH, CONFIGQUERYADD, CONFIGQUERYGET, CONFIGQUERYEXE, CONFIGQUERYSIZE } from '../constants/index';

const stateInit = {
    dataList: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        rows: []
    },
    dataTable: {
        dataSource: [],
        columns: [],
    },
    dataEdit:{},
};

const configQuery = (state = stateInit, action) => {
    switch (action.type) {
        case CONFIGQUERYSEARCH:
            return Object.assign({}, state, { dataList: action.dataList });
            break;
        case CONFIGQUERYADD:
            return Object.assign({}, state, { dataEdit:{} });
            break;
        case CONFIGQUERYGET:
            return Object.assign({}, state, { dataEdit: action.dataEdit });
            break;
        case CONFIGQUERYEXE:
            return Object.assign({}, state, { dataTable: action.dataTable, dataEdit: action.dataEdit });
            break;
        case CONFIGQUERYSIZE:
            return Object.assign({}, state, { dataList: Object.assign({}, state.dataList, { pageSize: action.pageSize })});
            break;
        default:
            return state;
    }
};

export default configQuery;