/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage game
 */

import { MANAGEGAMESEARCH, MANAGEGAMEADD, MANAGEGAMEGET, MANAGEGAMESIZE} from '../constants/index';

const stateInit = {
    gameList: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        rows: []
    },
    gameEdit:{
        id: '',
        u_id: '',
        u_name: '',
        u_nikename: '',
        u_email: '',
        roleIds: [],
    },
};

const manageGame = (state = stateInit, action) => {
    switch (action.type) {
        case MANAGEGAMESEARCH:
            return Object.assign({}, state, { gameList: action.gameList });
            break;
        case MANAGEGAMEADD:
            return Object.assign({}, state, { gameEdit:{
                Id: '',
                u_id: '',
                u_name: '',
                u_nikename: '',
                u_email: '',
                roleIds: [],
            } });
            break;
        case MANAGEGAMEGET:
            return Object.assign({}, state, { gameEdit: action.gameEdit });
            break;
        case MANAGEGAMESIZE:
            return Object.assign({}, state, { gameList: Object.assign({}, state.gameList, { pageSize: action.pageSize })});
            break;
        default:
            return state;
    }
};

export default manageGame;