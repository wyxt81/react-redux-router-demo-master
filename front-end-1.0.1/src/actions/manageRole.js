/**
 * Author：dengyu
 * Time：2017/9/6
 * Description：manage role
 */

import { MANAGEROLESEARCH, MANAGEROLEADD, MANAGEROLEGET, MANAGEROLESIZE, MANAGEROLEFUNC, MANAGEROLEGAME, MANAGEROLECHANNEL, MANAGEROLESEARCHCHANNEL, JAVAURL } from '../constants/index';
import axios from 'axios';
import qs from 'qs';
import {hashHistory} from 'react-router';
import {Modal} from 'antd';
import {convertResponseToPage, loginTimeOut, convertPermissionToTree} from '../public/index';

export const searchManageRole = (payload) => {
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
                desc: payload.desc,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGEROLESEARCH,
                    roleList: convertResponseToPage(response.data.data),
                });
            } else {
                dispatch({
                    type: MANAGEROLESEARCH,
                    roleList: {
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

export const addManageRole = () => {
    hashHistory.push('/manage-role/add');
    return {
        type: MANAGEROLEADD,
    }
};

export const getManageRole = (id) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/role/role.do',
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
                    type: MANAGEROLEGET,
                    roleEdit: response.data.data,
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

export const delManageRole = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/role/delete.do',
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
                searchManageRole({
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

export const saveManageRole = (payload) => {
    return (dispatch) => {
        if(payload.id){
            axios({
                method: "post",
                url: JAVAURL + '/role/update.do',
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
                    hashHistory.push('/manage-role');
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
                url: JAVAURL + '/role/add.do',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                data: qs.stringify(payload)
            })
            .then(function(response){
                if(response.data.status == 'W'){
                    hashHistory.push('/');
                    return;
                }
                if(response.data.status == 'S'){
                    hashHistory.push('/manage-role');
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

export const sizeManageRole = (pageSize) => {
    return {
        type: MANAGEROLESIZE,
        pageSize
    }
};

export const funcManageRole = () => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/permission/all.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({})
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGEROLEFUNC,
                    permissions: convertPermissionToTree(response.data.data),
                });
            } else {
                dispatch({
                    type: MANAGEROLEFUNC,
                    permissions: [],
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const resetManageRole = () => {
    return {
        type: MANAGEROLEADD,
    }
};

export const gameManageRole = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/game/gc.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                id: payload.id,
                name: payload.name,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                let games = convertResponseToPage(response.data.data);
                games.rows = games.rows.map((game, index) => {
                    let channelIds = [];
                    return {
                        id: game.id,
                        name: game.name,
                        key: game.id.toString(),
                        children: (Object.prototype.toString.call(game.channels) == '[object Array]' && game.channels.length > 0) ? game.channels.map((channel, index) => {
                            channelIds.push(game.id + '&' + channel.id);
                            return {
                                id: channel.id,
                                name: channel.name,
                                key: game.id + '&' + channel.id,
                            };
                        }) : null,
                        channelIds: channelIds
                    }
                });
                dispatch({
                    type: MANAGEROLEGAME,
                    gameList: games,
                });
            } else {
                dispatch({
                    type: MANAGEROLEGAME,
                    gameList: {
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

export const channelManageRole = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/channel/cg.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
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
                    type: MANAGEROLECHANNEL,
                    channelList: convertResponseToPage(response.data.data),
                });
            } else {
                dispatch({
                    type: MANAGEROLECHANNEL,
                    channelList: {
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

export const channelSearchManageRole = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/channel/all.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                name: payload.name
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGEROLESEARCHCHANNEL,
                    channels: convertResponseToPage(response.data.data).rows,
                });
            } else {
                dispatch({
                    type: MANAGEROLESEARCHCHANNEL,
                    channels: [],
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};