/**
 * Author：dengyu
 * Time：2017/6/29
 * Description：production reducers
 */

import { PRODUCTIONSEARCH, PRODUCTIONADD, PRODUCTIONGET, PRODUCTIONSIZE } from '../constants/index';

const stateInit = {
    dataList: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        rows: []
    },
    dataEdit:{},
};

const production = (state = stateInit, action) => {
    switch (action.type) {
        case PRODUCTIONSEARCH:
            return Object.assign({}, state, { dataList: action.dataList });
            break;
        case PRODUCTIONADD:
            return Object.assign({}, state, { dataEdit:{} });
            break;
        case PRODUCTIONGET:
            return Object.assign({}, state, { dataEdit: action.dataEdit });
            break;
        case PRODUCTIONSIZE:
            return Object.assign({}, state, { dataList: Object.assign({}, state.dataList, { pageSize: action.pageSize })});
            break;
        default:
            return state;
    }
};

export default production;