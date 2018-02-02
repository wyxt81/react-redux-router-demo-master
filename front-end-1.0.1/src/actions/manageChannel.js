/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage channel
 */

import { MANAGECHANNELSEARCH, MANAGECHANNELADD, MANAGECHANNELGET, MANAGECHANNELSIZE, JAVAURL } from '../constants/index';
import axios from 'axios';
import qs from 'qs';
import {hashHistory} from 'react-router';
import {Modal} from 'antd';
import {convertResponseToPage, loginTimeOut} from '../public/index';

export const searchManageChannel = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/channel/all.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                id: payload.id,
                name: payload.name,
                series: payload.series,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGECHANNELSEARCH,
                    channelList: convertResponseToPage(response.data.data),
                });
            } else {
                dispatch({
                    type: MANAGECHANNELSEARCH,
                    channelList: {
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

export const addManageChannel = () => {
    hashHistory.push('/manage-channel/add');
    return {
        type: MANAGECHANNELADD,
    }
};

export const getManageChannel = (id) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/channel/channel.do',
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
                    type: MANAGECHANNELGET,
                    channelEdit: response.data.data,
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

export const delManageChannel = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/channel/delete.do',
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
                searchManageChannel({
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    id: payload.id,
                    name: payload.name,
                    series: payload.series,
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

export const saveManageChannel = (payload) => {
    return (dispatch) => {
        if(payload.id){
            axios({
                method: "post",
                url: JAVAURL + '/channel/update.do',
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
                    hashHistory.push('/manage-channel');
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
                url: JAVAURL + '/channel/add.do',
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
                    hashHistory.push('/manage-channel');
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

export const sizeManageChannel = (pageSize) => {
    return {
        type: MANAGECHANNELSIZE,
        pageSize
    }
};