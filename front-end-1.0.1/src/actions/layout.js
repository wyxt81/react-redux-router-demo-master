/**
 * Author：zhoushuanglong
 * Time：2017/6/9
 * Description：layout action
 */

import axios from 'axios';

import {
    LAYOUTADD,
    LAYOUTCHANGE,
    LAYOUTDEL,
    LAYOUTSORT,
    LAYOUTCONTENT,
    LAYOUTRESET,
    DELETETAB,
    CONTENTDATA,
    CONTENTSTYLE,
    QUERYADD,
    QUERYDEL,
    CURRENTID,
    CURRENTTYPE,
    PRODUCTIONNAME,
    PRODUCTIONINIT,
    PRODUCTIONCLEAR
} from '../constants/layout';
import {SREPORTSQL, NODEURL} from '../constants/index';
import {showReportSearch} from './showReport';


export const layoutAdd = (layoutType, hoverIndex) => {
    return {
        type: LAYOUTADD,
        layoutType, hoverIndex
    }
};

export const layoutChange = (layoutId, height, title, tabsNumber) => {
    return {
        type: LAYOUTCHANGE,
        layoutId, height, title, tabsNumber
    }
};

export const deleteTab = (layoutId, index) => {
    return {
        type: DELETETAB,
        layoutId, index
    }
};

export const contentData = (layoutId, layoutSection, group, data, onlyTable) => {
    return {
        type: CONTENTDATA,
        layoutId, layoutSection, group, data, onlyTable
    }
};

export const contentStyle = (layoutId, layoutSection, title, style) => {
    return {
        type: CONTENTSTYLE,
        layoutId, layoutSection, title, style
    }
};


export const layoutDel = (layoutId) => {
    return {
        type: LAYOUTDEL,
        layoutId
    }
};

export const layoutSort = (layoutArr) => {
    return {
        type: LAYOUTSORT,
        layoutArr
    }
};

export const layoutContent = (layoutId, layoutSection, contentType) => {
    return {
        type: LAYOUTCONTENT,
        layoutId, layoutSection, contentType
    }
};

export const layoutReset = () => {
    return {
        type: LAYOUTRESET
    }
};

export const queryAdd = (layoutId, queryType) => {
    return {
        type: QUERYADD,
        layoutId, queryType
    }
};

export const queryDel = (layoutId, querySection) => {
    return {
        type: QUERYDEL,
        layoutId, querySection
    }
};

export const currentId = (layoutId, layoutSection) => {
    return {
        type: CURRENTID,
        layoutId, layoutSection
    }
};

export const currentType = (currentType) => {
    return {
        type: CURRENTTYPE,
        currentType
    }
};

export const productionName = (productionName) => {
    return {
        type: PRODUCTIONNAME,
        productionName
    }
};

export const productionClear = () => {
    return {
        type: PRODUCTIONCLEAR
    }
};

export const productionInit = (id) => {
    return (dispatch) => {
        axios({
            method: "get",
            url: NODEURL + '/production',
            params: {
                id: id,
            }
        })
        .then(function (response) {
            dispatch({
                type: PRODUCTIONINIT,
                dataEdit: response.data.data,
            });
            let config = Object.prototype.toString.call(response.data.data.config) == "[object Array]" ? response.data.data.config : [];
            let sqls = [];
            let dimensions = [];
            let measurements = [];
            config.forEach((row, index) => {
                row.children.forEach((echart, index) => {
                    if(echart.condition && echart.condition.data.sql){
                        sqls.push((echart.group == 'two' ? '&' : '') + echart.condition.data.sql.toLowerCase());
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
                type: SREPORTSQL,
                sqls: sqls,
            });
            if(sqls.length > 0){
                showReportSearch({sqls: sqls, querysOne: [], querysTwo: [], dimensions: dimensions, measurements: measurements})(dispatch);
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }
};


