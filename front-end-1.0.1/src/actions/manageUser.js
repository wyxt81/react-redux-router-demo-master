/**
 * Author：dengyu
 * Time：2017/9/5
 * Description：manage user
 */

import { MANAGEUSERSEARCH, MANAGEUSERADD, MANAGEUSERGET, MANAGEUSERSIZE, MANAGEUSERROLES, JAVAURL } from '../constants/index';
import axios from 'axios';
import qs from 'qs';
import {hashHistory} from 'react-router';
import {Modal} from 'antd';
import {convertResponseToPage, loginTimeOut} from '../public/index';

export const searchManageUser = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/user/all.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                u_id: payload.u_id,
                name: payload.name,
                nikeName: payload.nikeName,
                email: payload.email,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGEUSERSEARCH,
                    userList: convertResponseToPage(response.data.data),
                });
            } else {
                dispatch({
                    type: MANAGEUSERSEARCH,
                    userList: {
                        pageIndex: 1,
                        pageSize: 20,
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

export const addManageUser = () => {
    hashHistory.push('/manage-user/add');
    return {
        type: MANAGEUSERADD,
    }
};

export const getManageUser = (id) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/user/user.do',
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
                    type: MANAGEUSERGET,
                    userEdit: response.data.data,
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

export const delManageUser = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/user/delete.do',
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
                searchManageUser({
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    u_id: payload.u_id,
                    name: payload.name,
                    nikeName: payload.nikeName,
                    email: payload.email,
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

export const saveManageUser = (payload) => {
    return (dispatch) => {
        if(payload.Id){
            axios({
                method: "post",
                url: JAVAURL + '/user/update.do',
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
                    hashHistory.push('/manage-user');
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
                url: JAVAURL + '/user/add.do',
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
                    hashHistory.push('/manage-user');
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

export const currentUser = () => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/user/info.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({})
        })
        .then(function(response){
            console.info(response.data);
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const author = () => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/login/author.do',
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

export const sizeManageUser = (pageSize) => {
    return {
        type: MANAGEUSERSIZE,
        pageSize
    }
};

export const roleManageUser = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/role/all.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                name: payload.name,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGEUSERROLES,
                    roles: convertResponseToPage(response.data.data),
                });
            } else {
                dispatch({
                    type: MANAGEROLECHANNEL,
                    roles: {
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

export const resetManageUser = () => {
    return {
        type: MANAGEUSERADD,
    }
};
