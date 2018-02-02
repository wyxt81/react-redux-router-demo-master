/**
 * Author：zhoushuanglong
 * Time：2017/5/12
 * Description：menu data
 */

import {
    MENUPANDECT,
    MENUCONFIG,
    MENUMANAGE,
} from '../constants/index';


const menuInit = {
    pandect: [],
    management: [
        {
            id: 0,
            title: '用户管理',
            link: '/manage-user',
            icon: 'user',
            config: {},
            children: []
        },{
            id: 1,
            title: '角色管理',
            link: '/manage-role',
            icon: 'team',
            config: {},
            children: []
        },{
            id: 2,
            title: '游戏管理',
            link: '/manage-game',
            icon: 'gift',
            config: {},
            children: []
        },{
            id: 3,
            title: '渠道管理',
            link: 'manage-channel',
            icon: 'fork',
            config: {},
            children: []
        },{
            id: 4,
            title: '资源管理',
            link: 'manage-func',
            icon: 'appstore-o',
            config: {},
            children: []
        },{
            id: 5,
            title: '操作管理',
            link: 'manage-log',
            icon: 'tool',
            config: {},
            children: []
        }
    ],
    configuration:[
        {
            id: 'a',
            title: '首页',
            link: '/config-index',
            icon: 'home',
            config: {},
            children: []
        },{
            id: 'b',
            title: '数据',
            link: '/config-dataset',
            icon: 'hdd',
            config: {},
            children: []
        },{
            id: 'e',
            title: '条件',
            link: '/config-query',
            icon: 'search',
            config: {},
            children: []
        },{
            id: 'c',
            title: '图表',
            link: '/config-content',
            icon: 'area-chart',
            config: {},
            children: []
        },{
            id: 'd',
            title: '作品',
            link: '/config-production',
            icon: 'file',
            config: {},
            children: []
        }
    ]
};
const menuData = (state = menuInit, action) => {
    switch (action.type) {
        case MENUPANDECT:
            return Object.assign({}, state, {pandect: action.pandect});
            break;
        case MENUCONFIG:
            return Object.assign({}, state, {configuration: action.configuration});
            break;
        case MENUMANAGE:
            return Object.assign({}, state, {management: action.management});
            break;
        default:
            return state
    }
};

export default menuData;