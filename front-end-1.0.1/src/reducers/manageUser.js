/**
 * Author：dengyu
 * Time：2017/9/5
 * Description：manage user
 */

import { MANAGEUSERSEARCH, MANAGEUSERADD, MANAGEUSERGET, MANAGEUSERSIZE, MANAGEUSERROLES } from '../constants/index';

const stateInit = {
    userList: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        rows: []
    },
    userEdit:{
        Id: '',
        u_id: '',
        u_name: '',
        u_nikename: '',
        u_email: '',
        roleIds: [],
    },
    roleList: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        rows: []
    },
};

const manageUser = (state = stateInit, action) => {
    switch (action.type) {
        case MANAGEUSERSEARCH:
            return Object.assign({}, state, { userList: action.userList });
            break;
        case MANAGEUSERADD:
            return Object.assign({}, state, { userEdit:{
                Id: '',
                u_id: '',
                u_name: '',
                u_nikename: '',
                u_email: '',
                roleIds: [],
            } });
            break;
        case MANAGEUSERGET:
            return Object.assign({}, state, { userEdit: action.userEdit });
            break;
        case MANAGEUSERSIZE:
            return Object.assign({}, state, { userList: Object.assign({}, state.userList, { pageSize: action.pageSize })});
            break;
        case MANAGEUSERROLES:
            return Object.assign({}, state, { roleList: action.roles });
            break;
        default:
            return state;
    }
};

export default manageUser;