/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage func
 */

import { MANAGEFUNCSEARCH, MANAGEFUNCADD, MANAGEFUNCGET, MANAGEFUNCSIZE, MANAGEFUNCLINK, MANAGEFUNCMENU, NODEURL, JAVAURL } from '../constants/index';
import axios from 'axios';
import qs from 'qs';
import {hashHistory} from 'react-router';
import {Modal} from 'antd';
import {convertPermissionToTable, loginTimeOut, convertPermissionToCascader} from '../public/index';

export const searchManageFunc = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/permission/tree_id.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                id: payload.id,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGEFUNCSEARCH,
                    funcList: convertPermissionToTable(response.data.data.permissionList),
                });
            } else {
                dispatch({
                    type: MANAGEFUNCSEARCH,
                    funcList: [],
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const addManageFunc = () => {
    hashHistory.push('/manage-func/add');
    return {
        type: MANAGEFUNCADD,
    }
};

export const getManageFunc = (id) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/permission/permission.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                id: id
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGEFUNCGET,
                    funcEdit: response.data.data,
                });
            } else {
                Modal.error({
                    title: response.data.msg,
                    content:  '',
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const delManageFunc = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/permission/delete.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                id: payload.id
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                searchManageFunc({
                    id: '2',
                })(dispatch);
            }
            Modal.success({
                title: response.data.msg,
                content: '',
            });
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const saveManageFunc = (payload) => {
    return (dispatch) => {
        if(payload.id){
            axios({
                method: "post",
                url: JAVAURL + '/permission/update.do',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify(payload)
            })
            .then(function(response){
                if(response.data.status == 'W'){
                    loginTimeOut();
                    return;
                }
                if(response.data.status == 'S'){
                    hashHistory.push('/manage-func');
                }
                Modal.success({
                    title: response.data.msg,
                    content:  '',
                });
            })
            .catch(function(error){
                console.log(error);
            });
        } else {
            axios({
                method: "post",
                url: JAVAURL + '/permission/add.do',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify(payload)
            })
            .then(function(response){
                if(response.data.status == 'W'){
                    loginTimeOut();
                    return;
                }
                if(response.data.status == 'S'){
                    hashHistory.push('/manage-func');
                }
                Modal.success({
                    title: response.data.msg,
                    content:  '',
                });
            })
            .catch(function(error){
                console.log(error);
            });
        }
    }
};

export const sizeManageFunc = (pageSize) => {
    return {
        type: MANAGEFUNCSIZE,
        pageSize
    }
};

export const linkManageFunc = (payload) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: NODEURL + '/productionSearch',
            params: {
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                name: payload.name,
            }
        })
        .then(function(response){
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGEFUNCLINK,
                    linkList: response.data.data,
                });
            } else {
                dispatch({
                    type: MANAGEFUNCLINK,
                    linkList: {
                        pageIndex: 1,
                        pageSize: 10,
                        total: 0,
                        rows: []
                    },
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const menuManageFunc = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/permission/tree_id.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                id: payload.id,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGEFUNCMENU,
                    menus: convertPermissionToCascader([response.data.data]),
                });
            } else {
                dispatch({
                    type: MANAGEFUNCMENU,
                    menus: [],
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const resetManageFunc = () => {
    return {
        type: MANAGEFUNCADD,
    }
};