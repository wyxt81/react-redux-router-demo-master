/**
 * Author：dengyu
 * Time：2017/9/6
 * Description：manage role
 */

import { MANAGEROLESEARCH, MANAGEROLEADD, MANAGEROLEGET, MANAGEROLESIZE, MANAGEROLEFUNC, MANAGEROLEGAME, MANAGEROLECHANNEL, MANAGEROLESEARCHCHANNEL } from '../constants/index';

const stateInit = {
    roleList: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        rows: []
    },
    roleEdit:{
        id: '',
        name: '',
        desc: '',
        permissionIds: '',
        gameInfoList: [],
        channelList: [],
    },
    permissions: [],
    gameList: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        rows: []
    },
    channelList: {
        pageIndex: 1,
        pageSize: 10,
        total: 0,
        rows: []
    },
    channels: [],
};

const manageRole = (state = stateInit, action) => {
    switch (action.type) {
        case MANAGEROLESEARCH:
            return Object.assign({}, state, { roleList: action.roleList });
            break;
        case MANAGEROLEADD:
            return Object.assign({}, state, { roleEdit:{
                id: '',
                name: '',
                desc: '',
                permissionIds: '',
                gameInfoList: [],
                channelList: [],
            }, gameList: {
                pageIndex: 1,
                pageSize: 10,
                total: 0,
                rows: []
            }, channelList: {
                pageIndex: 1,
                pageSize: 10,
                total: 0,
                rows: []
            } });
            break;
        case MANAGEROLEGET:
            return Object.assign({}, state, { roleEdit: action.roleEdit });
            break;
        case MANAGEROLESIZE:
            return Object.assign({}, state, { roleList: Object.assign({}, state.roleList, { pageSize: action.pageSize })});
            break;
        case MANAGEROLEFUNC:
            return Object.assign({}, state, { permissions: action.permissions });
            break;
        case MANAGEROLEGAME:
            return Object.assign({}, state, { gameList: action.gameList });
            break;
        case MANAGEROLECHANNEL:
            return Object.assign({}, state, { channelList: action.channelList });
            break;
        case MANAGEROLESEARCHCHANNEL:
            return Object.assign({}, state, { channels: action.channels });
            break;
        default:
            return state;
    }
};

export default manageRole;