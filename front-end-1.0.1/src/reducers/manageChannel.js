/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage channel
 */

import { MANAGECHANNELSEARCH, MANAGECHANNELADD, MANAGECHANNELGET, MANAGECHANNELSIZE } from '../constants/index';

const stateInit = {
    channelList: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        rows: []
    },
    channelEdit:{
        id: '',
        name: '',
        series: '',
    },
};

const manageChannel = (state = stateInit, action) => {
    switch (action.type) {
        case MANAGECHANNELSEARCH:
            return Object.assign({}, state, { channelList: action.channelList });
            break;
        case MANAGECHANNELADD:
            return Object.assign({}, state, { channelEdit:{
                id: '',
                name: '',
                series: '',
            } });
            break;
        case MANAGECHANNELGET:
            return Object.assign({}, state, { channelEdit: action.channelEdit });
            break;
        case MANAGECHANNELSIZE:
            return Object.assign({}, state, { channelList: Object.assign({}, state.channelList, { pageSize: action.pageSize })});
            break;
        default:
            return state;
    }
};

export default manageChannel;