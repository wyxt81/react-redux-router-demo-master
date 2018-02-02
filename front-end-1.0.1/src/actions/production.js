/**
 * Author：dengyu
 * Time：2017/6/29
 * Description：production actions
 */

import { PRODUCTIONSEARCH, PRODUCTIONADD, PRODUCTIONGET, PRODUCTIONSIZE, NODEURL } from '../constants/index';
import axios from 'axios';
import {hashHistory} from 'react-router';
import {Modal} from 'antd';

export const searchProduction = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: NODEURL + '/productionSearch',
            data: {
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                name: payload.name,
            }
        })
        .then(function(response){
            if(response.data.status == 'S'){
                dispatch({
                    type: PRODUCTIONSEARCH,
                    dataList: response.data.data,
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const addProduction = () => {
    hashHistory.push('/config-content');
    return {
        type: PRODUCTIONADD,
    }
};

export const getProduction = (id) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: NODEURL + '/production',
            params: {
                id: id,
            }
        })
        .then(function(response){
            dispatch({
                type: PRODUCTIONGET,
                dataEdit: response.data.data,
            });
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const delProduction = (payload) => {
    return (dispatch) => {
        axios({
            method: "delete",
            url: NODEURL + '/production',
            data: {
                id: payload.id,
            }
        })
            .then(function(response){
                if(response.data.status == 'S'){
                    searchProduction({
                        pageIndex: payload.pageIndex,
                        pageSize: payload.pageSize,
                        name: payload.name,
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

export const saveProduction = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: NODEURL + '/production',
            data: payload
        })
        .then(function(response){
            if(response.data.status == 'S'){
                hashHistory.push('/config-production');
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

export const sizeProduction = (pageSize) => {
    return {
        type: PRODUCTIONSIZE,
        pageSize
    }
};