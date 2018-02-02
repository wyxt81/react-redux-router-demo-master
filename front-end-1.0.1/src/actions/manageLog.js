/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage log
 */

import { MANAGELOGSEARCH, MANAGELOGSIZE, JAVAURL } from '../constants/index';
import axios from 'axios';
import qs from 'qs';
import {convertResponseToPage, loginTimeOut} from '../public/index';

export const searchManageLog = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/operation/list.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                name: payload.name,
                content: payload.content,
                time: payload.time,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGELOGSEARCH,
                    logList: convertResponseToPage(response.data.data),
                });
            } else {
                dispatch({
                    type: MANAGELOGSEARCH,
                    logList: {
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

export const sizeManageLog = (pageSize) => {
    return {
        type: MANAGELOGSIZE,
        pageSize
    }
};