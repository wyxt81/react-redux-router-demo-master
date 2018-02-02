/**
 * Author：zhoushuanglong
 * Time：2017/5/5
 * Description：index actions
 */

import {
    MENUCOLLAPSED,
    MENUPANDECT,
    MENUCONFIG,
    MENUMANAGE,
    THEMESWITCH,
    BREADCRUMB,
    JAVAURL,
} from '../constants/index';
import axios from 'axios';
import qs from 'qs';
import {hashHistory} from 'react-router';
import {Modal} from 'antd';
import {convertPermissionToMenu, convertPermissionToLink} from '../public/index';

export const breadcrumbActive = (arr) => {
    return {
        type: BREADCRUMB,
        arr
    }
};

export const menuToggle = (boolean) => {
    return {
        type: MENUCOLLAPSED,
        boolean
    }
};

export const menuPandect = () => {
    return {
        type: MENUPANDECT,
        pandect: JSON.parse(sessionStorage.getItem("pandect")),
    }
};

export const menuConfig = () => {
    return {
        type: MENUCONFIG,
        configuration: JSON.parse(sessionStorage.getItem("configuration")),
    }
};

export const menuManage = () => {
    return {
        type: MENUMANAGE,
        management: JSON.parse(sessionStorage.getItem("management")),
    }
};

export const themeSwitch = (theme) => {
    return {
        type: THEMESWITCH,
        theme
    }
};

export const login = (u_id, pwd) => {
    return (dispatch) => {
        let promise = new Promise(function(resolve, reject) {
            axios({
                method: "post",
                url: JAVAURL + '/login/login.do',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify({
                    u_id: u_id,
                    pwd: pwd
                })
            })
            .then(function(response){
                if(response.data.status == 'S'){
                    sessionStorage.setItem("user", JSON.stringify(response.data.data));
                    resolve();
                } else {
                    reject(response.data.msg);
                }
            })
            .catch(function(error){
                console.log(error);
            });
        });
        promise.then(() => {
            axios({
                method: "post",
                url: JAVAURL + '/login/author.do',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify({})
            })
            .then(function(response){
                let link = convertPermissionToLink(response.data.data);
                sessionStorage.setItem("link", JSON.stringify(convertPermissionToLink(response.data.data)));
                let menu = convertPermissionToMenu(response.data.data);
                let author = {
                    pandect: [],
                    configuration: [],
                    management: [],
                };
                menu.forEach((item, index) => {
                    if(item.link == '/show'){
                        author.pandect = item.children;
                    }
                    if(item.link == '/config'){
                        author.configuration = item.children;
                    }
                    if(item.link == '/manage'){
                        author.management = item.children;
                    }
                });
                sessionStorage.setItem("pandect", JSON.stringify(author.pandect));
                sessionStorage.setItem("configuration", JSON.stringify(author.configuration));
                sessionStorage.setItem("management", JSON.stringify(author.management));
                hashHistory.push(link.length > 0 ? link[0] : '/');
            })
            .catch(function(error){
                console.log(error);
            });
        }).catch(function (error) {
            Modal.warning({
                title: error,
                content:  '',
            });
        });

    }
};

export const loginout = () => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/login/loginout.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({})
        })
        .then(function(response){
            console.log(response.data)
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

