/**
 * Author：zhoushuanglong
 * Time：2017/5/10
 * Description：menu collapsed
 */

import {MENUCOLLAPSED} from '../constants/index';

const menuCollapsed = (state = false, action) => {
    switch (action.type) {
        case MENUCOLLAPSED:
            return action.boolean;
            break;
        default:
            return state;
    }
};

export default menuCollapsed;