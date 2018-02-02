/**
 * Author：dengyu
 * Time：2017/7/11
 * Description：configQuery
 */

import { CONFIGQUERYSEARCH, CONFIGQUERYADD, CONFIGQUERYGET, CONFIGQUERYEXE, CONFIGQUERYSIZE, NODEURL, JAVAURL } from '../constants/index';
import axios from 'axios';
import qs from 'qs';
import {hashHistory} from 'react-router';
import {Modal} from 'antd';
import {loginTimeOut} from '../public/index';

export const searchConfigQuery = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: NODEURL + '/querySearch',
            data: {
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                source: payload.source,
            }
        })
        .then(function(response){
            if(response.data.status == 'S'){
                dispatch({
                    type: CONFIGQUERYSEARCH,
                    dataList: response.data.data,
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const addConfigQuery = () => {
    hashHistory.push('/config-query/add');
    return {
        type: CONFIGQUERYADD,
    }
};

export const getConfigQuery = (id) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: NODEURL + '/query',
            params: {
                id: id,
            }
        })
        .then(function(response){
            let dataEdit = response.data.data;
            let columns = [];
            columns.push({
                dataIndex: dataEdit.colcode,
                title: '条件字段',
                type: "varchar",
            });
            columns.push({
                dataIndex: dataEdit.coltext,
                title: '条件名称',
                type: "varchar",
            });
            exeConfigQuery({
                sql: dataEdit.sql,
                columns: columns,
                dataEdit: dataEdit,
            })(dispatch);
            dispatch({
                type: CONFIGQUERYGET,
                dataEdit: dataEdit,
            });
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const delConfigQuery = (payload) => {
    return (dispatch) => {
        axios({
            method: "delete",
            url: NODEURL + '/query',
            data: {
                id: payload.id,
            }
        })
        .then(function(response){
            if(response.data.status == 'S'){
                searchConfigQuery({
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    source: payload.source,
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

export const saveConfigQuery = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: NODEURL + '/query',
            data: payload
        })
        .then(function(response){
            if(response.data.status == 'S'){
                hashHistory.push('/config-query');
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
};

export const exeConfigQuery = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/search/condition.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                sql: payload.sql,
                query: '',
                condition: '',
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: CONFIGQUERYEXE,
                    dataTable: {
                        dataSource: response.data.data,
                        columns: payload.columns,
                    },
                    dataEdit: payload.dataEdit,
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const sizeConfigQuery = (pageSize) => {
    return {
        type: CONFIGQUERYSIZE,
        pageSize
    }
};