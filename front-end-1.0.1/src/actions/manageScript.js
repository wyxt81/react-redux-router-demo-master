/**
 * Author：dengyu
 * Time：2017/10/11
 * Description：manage script
 */

import { MANAGESCRIPTSEARCH, MANAGESCRIPTADD, MANAGESCRIPTGET, MANAGESCRIPTSIZE, MANAGESCRIPTTEMPLET, MANAGESCRIPTRATE, MANAGESCRIPTLEVEL, MANAGESCRIPTLOG, JAVAURL } from '../constants/index';
import axios from 'axios';
import qs from 'qs';
import {hashHistory} from 'react-router';
import {Modal} from 'antd';
import {convertResponseToPage, loginTimeOut} from '../public/index';

export const searchManageScript = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/oversea/listOverseaScript.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                gameId: payload.gameId,
                gameName: payload.gameName,
                scriptNo: payload.scriptNo,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGESCRIPTSEARCH,
                    scriptList: convertResponseToPage(response.data.data),
                });
            } else {
                dispatch({
                    type: MANAGESCRIPTSEARCH,
                    scriptList: {
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

export const addManageScript = () => {
    hashHistory.push('/manage-script/add');
    return {
        type: MANAGESCRIPTADD,
    }
};

export const getManageScript = (id) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/oversea/getOverseaScript.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                scriptId: id
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGESCRIPTGET,
                    scriptEdit: response.data.data,
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

export const saveManageScript = (payload) => {
    return (dispatch) => {
        if(payload.scriptId){
            axios({
                method: "post",
                url: JAVAURL + '/oversea/updateOverseaSqlScript.do',
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
                        hashHistory.push('/manage-script');
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
                url: JAVAURL + '/oversea/addOverseaSqlScript.do',
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
                        hashHistory.push('/manage-script');
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

export const sizeManageScript = (pageSize) => {
    return {
        type: MANAGESCRIPTSIZE,
        pageSize
    }
};

export const nverifyManageScript = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/review/notifyReviewer.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                scriptId: payload.scriptId,
                reviewerName: payload.reviewerName,
                reviewerEmail: payload.reviewerEmail,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                searchManageScript({
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    gameId: payload.gameId,
                    gameName: payload.gameName,
                    scriptNo: payload.scriptNo,
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

export const verifyManageScript = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/review/reviewScript.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                scriptId: payload.scriptId,
                result: payload.result,
                refuseReason: payload.refuseReason,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                searchManageScript({
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    gameId: payload.gameId,
                    gameName: payload.gameName,
                    scriptNo: payload.scriptNo,
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

export const nexecuteManageScript = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/executor/notifyExecutor.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                scriptId: payload.scriptId,
                executorName: payload.executorName,
                executorEmail: payload.executorEmail,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                searchManageScript({
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    gameId: payload.gameId,
                    gameName: payload.gameName,
                    scriptNo: payload.scriptNo,
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

export const executeManageScript = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/executor/executeScript.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                scriptId: payload.scriptId,
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                searchManageScript({
                    pageIndex: payload.pageIndex,
                    pageSize: payload.pageSize,
                    gameId: payload.gameId,
                    gameName: payload.gameName,
                    scriptNo: payload.scriptNo,
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

export const templetManageScript = () => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/template/listTemplate.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                pageIndex: 1,
                pageSize: 1000,
                templateName: '',
            })
        })
        .then(function(response){
            if(response.data.status == 'W'){
                loginTimeOut();
                return;
            }
            if(response.data.status == 'S'){
                dispatch({
                    type: MANAGESCRIPTTEMPLET,
                    templetList: convertResponseToPage(response.data.data).rows,
                });
            } else {
                dispatch({
                    type: MANAGESCRIPTTEMPLET,
                    templetList: [],
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const rateManageScript = () => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/oversea/listDefaultRate.do',
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
                    type: MANAGESCRIPTRATE,
                    rateList: response.data.data,
                });
            } else {
                dispatch({
                    type: MANAGESCRIPTRATE,
                    rateList: [],
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const levelManageScript = () => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/oversea/listDefaultLevel.do',
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
                    type: MANAGESCRIPTLEVEL,
                    levelList: response.data.data,
                });
            } else {
                dispatch({
                    type: MANAGESCRIPTLEVEL,
                    levelList: [],
                });
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const resetManageScript = () => {
    return {
        type: MANAGESCRIPTADD,
    }
};

export const logManageScript = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/scriptlog/listLog.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                pageIndex: payload.pageIndex,
                pageSize: payload.pageSize,
                scriptId: payload.scriptId,
            })
        })
            .then(function(response){
                if(response.data.status == 'W'){
                    loginTimeOut();
                    return;
                }
                if(response.data.status == 'S'){
                    dispatch({
                        type: MANAGESCRIPTLOG,
                        logList: convertResponseToPage(response.data.data),
                    });
                } else {
                    dispatch({
                        type: MANAGESCRIPTLOG,
                        logList: {
                            pageIndex: 1,
                            pageSize: 5,
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
