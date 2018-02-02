/**
 * Author：dengyu
 * Time：2017/6/9
 * Description：configData reducers
 */

import { CONFIGDATASEARCH, CONFIGDATAADD, CONFIGDATAGET, CONFIGDATAEXE, CONFIGDATASIZE } from '../constants/index';

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

const configData = (state = stateInit, action) => {
    switch (action.type) {
        case CONFIGDATASEARCH:
            return Object.assign({}, state, { dataList: action.dataList });
            break;
        case CONFIGDATAADD:
            return Object.assign({}, state, { dataEdit:{} });
            break;
        case CONFIGDATAGET:
            return Object.assign({}, state, { dataEdit: action.dataEdit });
            break;
        case CONFIGDATAEXE:
            return Object.assign({}, state, { dataTable: action.dataTable, dataEdit: action.dataEdit });
            break;
        case CONFIGDATASIZE:
            return Object.assign({}, state, { dataList: Object.assign({}, state.dataList, { pageSize: action.pageSize })});
            break;
        default:
            return state;
    }
};

export default configData;