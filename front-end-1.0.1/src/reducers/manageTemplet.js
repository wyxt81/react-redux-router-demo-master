/**
 * Author：dengyu
 * Time：2017/10/9
 * Description：manage templet
 */

import { MANAGETEMPLETSEARCH, MANAGETEMPLETADD, MANAGETEMPLETGET, MANAGETEMPLETSIZE } from '../constants/index';

const stateInit = {
    templetList: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        rows: []
    },
    templetEdit:{
        id: '',
        templateName: '',
        templateType: 0,
        fileUrl: '',
    },
};

const manageTemplet = (state = stateInit, action) => {
    switch (action.type) {
        case MANAGETEMPLETSEARCH:
            return Object.assign({}, state, { templetList: action.templetList });
            break;
        case MANAGETEMPLETADD:
            return Object.assign({}, state, { templetEdit:{
                id: '',
                templateName: '',
                templateType: 0,
                fileUrl: '',
            } });
            break;
        case MANAGETEMPLETGET:
            return Object.assign({}, state, { templetEdit: action.templetEdit });
            break;
        case MANAGETEMPLETSIZE:
            return Object.assign({}, state, { templetList: Object.assign({}, state.templetList, { pageSize: action.pageSize })});
            break;
        default:
            return state;
    }
};

export default manageTemplet;