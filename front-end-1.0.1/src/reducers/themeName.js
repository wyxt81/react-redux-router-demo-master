/**
 * Author：zhoushuanglong
 * Time：2017/5/15
 * Description：theme name
 */


import {THEMESWITCH} from '../constants/index';

const themeName = (state = 'dark', action) => {
    switch (action.type) {
        case THEMESWITCH:
            return action.theme;
            break;
        default:
            return state;
    }
};

export default themeName;