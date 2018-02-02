/**
 * Author：zhoushuanglong
 * Time：2017/5/22
 * Description：breadcrumb
 */

import {BREADCRUMB} from '../constants/index';

const stateInit = [
    {
        id: '',
        title: '首页',
        link: '/'
    }, {
        id: '0',
        title: '首页总表',
        link: ''
    }
];

const breadcrumb = (state = stateInit, action) => {
    switch (action.type) {
        case BREADCRUMB:
            return action.arr;
            break;
        default:
            return state;
    }
};

export default breadcrumb;