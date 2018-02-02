/**
 * Author：dengyu
 * Time：2017/7/4
 * Description：showReport actions
 */

import { SREPORTINIT, SREPORTSEARCH, SREPORTTABLE, SREPORTQUERY, SREPORTRESET, SREPORTSQL, SREPORTSELECT, SREPORTRANGE, SREPORTDISTRICT, SREPORTCOMPARE, SREPORTLINKAGE, CONFIGSHOWINIT, NODEURL, JAVAURL } from '../constants/index';
import axios from 'axios';
import qs from 'qs';
import {PageModel} from '../public/index';
import {loginTimeOut} from '../public/index';

export const configShowInit = (config) => {
    return (dispatch) => {
        let sqls = [];
        config.forEach((row, index) => {
            row.children.forEach((echart, index) => {
                if (echart.condition && echart.condition.data.sql) {
                    sqls.push(echart.condition.data.sql.toLowerCase());
                }
            });
        });
        dispatch({
            type: CONFIGSHOWINIT,
            config: config,
            sqls: sqls,
        });
        if (sqls.length > 0) {
            // showReportSearch({sqls: sqls, querysOne: [], querysTwo: []})(dispatch);
        }
    }
};

export const showReportInit = (id) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: NODEURL + '/production',
            params: {
                id: id,
            }
        })
        .then(function(response){
            let config = Object.prototype.toString.call(response.data.data.config) == "[object Array]" ? response.data.data.config : [];
            let sqls = [];
            let dimensions = [];
            let measurements = [];
            let groups = [];
            config.forEach((row, index) => {
                row.children.forEach((echart, index) => {
                    if(echart.condition && echart.condition.data.sql){
                        sqls.push((echart.group == 'two' ? '&' : '') + echart.condition.data.sql.toLowerCase());
                        groups.push(echart.group ? echart.group : 'one');
                        let dimension = [];
                        if(Object.prototype.toString.call(echart.condition.data.dimension) == '[object Array]' && echart.condition.data.dimension.length > 0){
                            echart.condition.data.dimension.forEach((d, i) => {
                                dimension.push(d.code);
                            });
                        }
                        dimensions.push(dimension.join("&"));
                        let measurement = [];
                        if(Object.prototype.toString.call(echart.condition.data.measurement) == '[object Array]' && echart.condition.data.measurement.length > 0){
                            echart.condition.data.measurement.forEach((m, j) => {
                                measurement.push(m.code);
                            });
                        }
                        measurements.push(measurement.join("&"));
                    }
                });
            });
            dispatch({
                type: SREPORTINIT,
                config: config,
                sqls: sqls,
                dimensions: dimensions,
                measurements: measurements,
            });
            if(sqls.length > 0){
                let sqlt = [];
                sqls.forEach((item, index) => {
                    if(groups[index] != 'two'){
                        sqlt.push(item);
                    }
                });
                showReportSearch({sqls: sqlt, querysOne: [], querysTwo: [], dimensions: dimensions, measurements: measurements})(dispatch);
            }
        })
        .catch(function(error){
            console.log(error);
        });
    }
};

export const showReportSearch = (payload) => {
    return (dispatch) => {
        let promises = payload.sqls.map((item, index) => {
            return new Promise(function(resolve, reject) {
                axios({
                    method: "post",
                    url: JAVAURL + '/search/data.do',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data: qs.stringify({
                        sql: item.startsWith("&") ? item.substring(1) : item,
                        query: item.startsWith("&") ? payload.querysTwo.join("&") : payload.querysOne.join("&"),
                        dimension: payload.dimensions[index],
                        measurement: payload.measurements[index],
                    })
                })
                .then(function(response){
                    if(response.data.status == 'W'){
                        loginTimeOut();
                        return;
                    }
                    resolve(response.data.data);
                })
                .catch(function(error){
                    reject(error);
                });
            });
        });
        Promise.all(promises).then(values => {
            dispatch({
                type: SREPORTSEARCH,
                echarts: values,
            });
        }).catch(function (error) {
            console.error(error);
        });
    }
};

export const showReportTable = (payload) => {
    let pageModel = new PageModel(payload.pageIndex, payload.pageSize);
    let sql = '';
    let sqlc = '';
    if(payload.sql){
        sql = payload.sql.toLowerCase();
        if(sql.indexOf('limit') > 0){
            sql = sql.substring(0, sql.indexOf('limit') - 1);
        }
        sqlc = sql;
        sql = sql + " limit " + pageModel.getIndex() + "," + payload.pageSize;
    }
    let columns = payload.columns.map((item, index) => {
        return {
            title: item.text,
            dataIndex: item.code,
        }
    });
    return (dispatch) => {
        if(sql){
            let promise = new Promise(function(resolve, reject) {
                axios({
                    method: "post",
                    url: JAVAURL + '/search/data.do',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data: qs.stringify({
                        sql: sql.startsWith("&") ? sql.substring(1) : sql,
                        query: sql.startsWith("&") ? payload.querysTwo.join("&") : payload.querysOne.join("&"),
                    })
                })
                .then(function(response){
                    if(response.data.status == 'W'){
                        loginTimeOut();
                        return;
                    }
                    if(response.data.status == 'S'){
                        resolve(response.data.data);
                    }
                })
                .catch(function(error){
                    reject(error);
                });
            });
            promise.then(function(value) {
                pageModel.rows = value;
                axios({
                    method: "post",
                    url: JAVAURL + '/search/data.do',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    data: qs.stringify({
                        sql: sqlc.startsWith("&") ? sqlc.substring(1) : sqlc,
                        query: sqlc.startsWith("&") ? payload.querysTwo.join("&") : payload.querysOne.join("&"),
                    })
                })
                .then(function(response){
                    if(response.data.status == 'W'){
                        loginTimeOut();
                        return;
                    }
                    if(response.data.status == 'S'){
                        pageModel.total = response.data.data.length;
                        dispatch({
                            type: SREPORTTABLE,
                            tables: {
                                [payload.id]: {
                                    ...pageModel,
                                    columns,
                                    columnsOld: columns,
                                },
                            },
                        });
                    }
                })
                .catch(function(error){
                    console.log(error);
                });
            })
            .catch(function(error) {
                console.log(error);
            });
        }
    }
};

export const showReportQuery = (id, query) => {
    return (dispatch) => {
        dispatch({
            type: SREPORTQUERY,
            querys: {
                [id]: query
            },
        });
    }
};

export const showReportReset = () => {
    return (dispatch) => {
        dispatch({
            type: SREPORTRESET,
        });
    }
};

export const showReportSql = (sqls) => {
    return (dispatch) => {
        dispatch({
            type: SREPORTSQL,
            sqls: sqls,
        });
    }
};

export const showReportSelect = (id, selectSql) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/search/condition.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                sql: selectSql,
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
                        type: SREPORTSELECT,
                        selects: {
                            [id]: response.data.data
                        },
                    });
                }
            })
            .catch(function(error){
                console.log(error);
            });
    }
};

export const showReportRange = (range) => {
    return (dispatch) => {
        dispatch({
            type: SREPORTRANGE,
            range: range,
        });
    }
};

export const showReportGetDistrict = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/search/condition.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                sql: payload.sql,
                query: payload.query,
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
                        type: SREPORTDISTRICT,
                        dtype: payload.type,
                        ddata: {
                            [payload.id]: response.data.data
                        },
                    });
                }
            })
            .catch(function(error){
                console.log(error);
            });
    }
};

export const showReportSetDistrict = (payload) => {
    return (dispatch) => {
        dispatch({
            type: SREPORTDISTRICT,
            dtype: payload.type,
            ddata: {
                [payload.id]: payload.data
            },
        });
    }
};

export const showReportSetTables = (payload) => {
    return (dispatch) => {
        dispatch({
            type: SREPORTTABLE,
            tables: {
                [payload.id]: payload.table,
            },
        });
    }
};

export const showReportCompare = (compare) => {
    return (dispatch) => {
        dispatch({
            type: SREPORTCOMPARE,
            compare: compare,
        });
    }
};

export const showReportGetGcgLinkage = (payload) => {
    return (dispatch) => {
        axios({
            method: "post",
            url: JAVAURL + '/search/condition.do',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            data: qs.stringify({
                sql: payload.sql,
                query: payload.query,
                condition: payload.type,
            })
        })
            .then(function(response){
                if(response.data.status == 'W'){
                    loginTimeOut();
                    return;
                }
                if(response.data.status == 'S'){
                    dispatch({
                        type: SREPORTLINKAGE,
                        dtype: payload.type,
                        ddata: {
                            [payload.id]: response.data.data
                        },
                    });
                }
            })
            .catch(function(error){
                console.log(error);
            });
    }
};

export const showReportSetGcgLinkage = (payload) => {
    return (dispatch) => {
        dispatch({
            type: SREPORTLINKAGE,
            dtype: payload.type,
            ddata: {
                [payload.id]: payload.data
            },
        });
    }
};