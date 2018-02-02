/**
 * Author：dengyu
 * Time：2017/10/9
 * Description：manage templet
 */

import { MANAGETEMPLETSEARCH, MANAGETEMPLETADD, MANAGETEMPLETGET, MANAGETEMPLETSIZE, JAVAURL } from '../constants/index';
import axios from 'axios';
import qs from 'qs';
import {hashHistory} from 'react-router';
import {Modal} from 'antd';
import {convertResponseToPage, loginTimeOut} from '../public/index';

export const searchManageTemplet = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/template/listTemplate.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                templateName: payload.templateName,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGETEMPLETSEARCH,
                    templetList: convertResponseToPage(response.data.data),
                });
            } else {
                dispatch({
                    type: MANAGETEMPLETSEARCH,
                    templetList: {
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

export const addManageTemplet = () => {
    hashHistory.push('/manage-templet/add');
    return {
        type: MANAGETEMPLETADD,
    }
};

export const getManageTemplet = (id) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/template/getScriptTemplate.do',
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
                        type: MANAGETEMPLETGET,
                        templetEdit: response.data.data,
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

export const delManageTemplet = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/template/delTemplate.do',
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
                searchManageTemplet({
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    templateName: payload.templateName,
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

export const saveManageTemplet = (payload) => {
    return (dispatch) => {
        if(payload.id){
            axios({
                method: "post",
                url: JAVAURL + '/template/mergeTemplate.do',
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
                    hashHistory.push('/manage-templet');
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
                url: JAVAURL + '/template/mergeTemplate.do',
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
                    hashHistory.push('/manage-templet');
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

export const sizeManageTemplet = (pageSize) => {
    return {
        type: MANAGETEMPLETSIZE,
        pageSize
    }
};