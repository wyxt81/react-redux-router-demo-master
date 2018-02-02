/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage func
 */

import { MANAGEFUNCSEARCH, MANAGEFUNCADD, MANAGEFUNCGET, MANAGEFUNCSIZE, MANAGEFUNCLINK, MANAGEFUNCMENU } from '../constants/index';

const stateInit = {
    funcList: [],
    funcEdit:{
        id: '',
        title: '',
        is_leaf: '0',
        link: '',
        parent_id: '',
    },
    linkList: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        rows: []
    },
    menus: [],
};

const manageFunc = (state = stateInit, action) => {
    switch (action.type) {
        case MANAGEFUNCSEARCH:
            return Object.assign({}, state, { funcList: action.funcList });
            break;
        case MANAGEFUNCADD:
            return Object.assign({}, state, { funcEdit:{
                id: '',
                title: '',
                is_leaf: '0',
                link: '',
                parent_id: '',
            } });
            break;
        case MANAGEFUNCGET:
            return Object.assign({}, state, { funcEdit: action.funcEdit });
            break;
        case MANAGEFUNCSIZE:
            return Object.assign({}, state, { funcList: Object.assign({}, state.funcList, { pageSize: action.pageSize })});
            break;
        case MANAGEFUNCLINK:
            return Object.assign({}, state, { linkList: action.linkList });
            break;
        case MANAGEFUNCMENU:
            return Object.assign({}, state, { menus: action.menus });
            break;
        default:
            return state;
    }
};

export default manageFunc;