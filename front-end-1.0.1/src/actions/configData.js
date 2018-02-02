/**
 * Author：dengyu
 * Time：2017/6/9
 * Description：configData actions
 */

import { CONFIGDATASEARCH, CONFIGDATAADD, CONFIGDATAGET, CONFIGDATAEXE, CONFIGDATASIZE, NODEURL, JAVAURL } from '../constants/index';
import axios from 'axios';
import qs from 'qs';
import {hashHistory} from 'react-router';
import {Modal} from 'antd';
import {loginTimeOut} from '../public/index';

export const searchConfigData = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: NODEURL + '/datasetSearch',
            data: {
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                source: payload.source,
            }
        })
        .then(function(response){
            if(response.data.status == 'S'){
                dispatch({
                    type: CONFIGDATASEARCH,
                    dataList: response.data.data,
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const addConfigData = () => {
    hashHistory.push('/config-dataset/add');
    return {
        type: CONFIGDATAADD,
    }
};

export const getConfigData = (id) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: NODEURL + '/dataset',
            params: {
                id: id,
            }
        })
        .then(function(response){
            let dataEdit = response.data.data;
            let columns = [];
            if(dataEdit.datasetType != 'redis'){
                let dimension = Object.prototype.toString.call(dataEdit.dimension) == "[object Array]" ? dataEdit.dimension : [];
                let measurement = Object.prototype.toString.call(dataEdit.measurement) == "[object Array]" ? dataEdit.measurement : [];
                dimension.forEach(function(item, index){
                    columns.push({
                        dataIndex: item.code,
                        title: item.text,
                        type: item.type,
                    });
                });
                measurement.forEach(function(item, index){
                    columns.push({
                        dataIndex: item.code,
                        title: item.text,
                        type: item.type,
                    });
                });
            } else {
                columns.push({
                    dataIndex: dataEdit.key,
                    title: dataEdit.keyName,
                    type: "varchar",
                });
                columns.push({
                    dataIndex: 'value',
                    title: '数据',
                    type: "varchar",
                });
            }
            exeConfigData({
                sql: dataEdit.sql,
                columns: columns,
                dataEdit: dataEdit,
            })(dispatch);
            dispatch({
                type: CONFIGDATAGET,
                dataEdit: dataEdit,
            });
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const delConfigData = (payload) => {
    return (dispatch) => {
        axios({
            method: "delete",
            url: NODEURL + '/dataset',
            data: {
                id: payload.id,
            }
        })
        .then(function(response){
            if(response.data.status == 'S'){
                searchConfigData({
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

export const saveConfigData = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: NODEURL + '/dataset',
            data: payload
        })
        .then(function(response){
            if(response.data.status == 'S'){
                hashHistory.push('/config-dataset');
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

export const exeConfigData = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/search/data.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                sql: payload.sql,
                query: ''
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: CONFIGDATAEXE,
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

export const sizeConfigData = (pageSize) => {
    return {
        type: CONFIGDATASIZE,
        pageSize
    }
};