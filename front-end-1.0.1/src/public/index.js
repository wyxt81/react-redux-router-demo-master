/**
 * Author：zhoushuanglong
 * Time：2017/5/5
 * Description：public function
 */

import {hashHistory} from 'react-router';
import {message} from 'antd';

//生成全局唯一标识符
export const generateUUID = () => {
    let d = new Date().getTime();
    let uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
};

//格式化日期
export const formatDate = (date, format) => {
    if (!date) return;
    if (!format) format = "yyyy-MM-dd";
    switch (typeof date) {
        case "string":
            date = new Date(date.replace(/-/, "/"));
            break;
        case "number":
            date = new Date(date);
            break;
    }
    if (!date instanceof Date) return;
    let dict = {
        "yyyy": date.getFullYear(),
        "M": date.getMonth() + 1,
        "d": date.getDate(),
        "H": date.getHours(),
        "m": date.getMinutes(),
        "s": date.getSeconds(),
        "MM": ("" + (date.getMonth() + 101)).substr(1),
        "dd": ("" + (date.getDate() + 100)).substr(1),
        "HH": ("" + (date.getHours() + 100)).substr(1),
        "mm": ("" + (date.getMinutes() + 100)).substr(1),
        "ss": ("" + (date.getSeconds() + 100)).substr(1)
    };
    return format.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function () {
        return dict[arguments[0]];
    });
};

//数组添加制定位置添加元素方法
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
Array.prototype.delIndex = function (index) {
    this.splice(index, 1);
};

export const PageModel = (pageIndex, pageSize) => {
    return {
        pageIndex : pageIndex || 1,
        pageSize : pageSize || 10,
        total : 0,
        rows : [],
        getIndex : function(){//数据库对应每页的起始下标值
            let index = 0;
            if (this.pageIndex >= 1 && this.pageSize >= 1){
                index = (this.pageIndex - 1) * this.pageSize;
            }
            return index;
        },
    }
};

export const convertEchart = (obj) => {
    obj.dimension.forEach((item, index) => {//获得所有维度的编码
        obj.ylegend.push(item.code);
    });
    obj.measurement.forEach((item, index) => {
        obj.legend.push(item.text);//获得所有图例
        obj.series.push({//获得所有数据的数组
            text: item.text,
            code: item.code,
            array: [],
        });
        obj.yAxis[item.code] = [];//设置度量编码与数据对应关系的对象
    });
    if(obj.echarts[obj.echartIndex] && obj.echarts[obj.echartIndex].length > 0){
        obj.echarts[obj.echartIndex].forEach((item, index) => {
            if(item[obj.ylegend[0]] !== undefined){
                obj.xAxis.push(item[obj.ylegend[0]]);//获得所有度量的文本
            }
            for(let j in obj.yAxis){//获得度量编码对应的数据
                obj.yAxis[j].push(item[j]);
            }
        });
        obj.series.forEach((item, index) => {//设置数据数组中度量对应数据
            item.array = obj.yAxis[item.code];
        });
    }
    return obj;
};

export const isEmpty = (obj) => {
    for (let key in obj) {
        return false;
    }
    return true;
};

//判断两个对象是否相等
export const compareObject = function (x, y) {
    if (x === y) {
        return true;
    }

    if (!( x instanceof Object ) || !( y instanceof Object )) {
        return false;
    }

    if (x.constructor !== y.constructor) {
        return false;
    }

    let p;
    for (p in x) {
        if (x.hasOwnProperty(p)) {
            if (!y.hasOwnProperty(p)) {
                return false;
            }
            if (x[p] === y[p]) {
                continue;
            }
            if(typeof( x[p] ) === "function" && x[p].toString() === y[p].toString()){
                continue;
            }
            if (typeof( x[p] ) !== "object") {
                return false;
            }
            if (!compareObject(x[p], y[p])) {
                return false;
            }
        }
    }

    for (p in y) {
        if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) {
            return false;
        }
    }
    return true;
};

//转化分页对象
export const convertResponseToPage = (data) => {
    return {
        pageIndex: data.pageNum || 1,
        pageSize: data.pageSize || 20,
        total: data.total || 0,
        rows: data.list || [],
    };
};

//登录
export const loginTimeOut = () => {
    if(hashHistory.getCurrentLocation().pathname != '/'){
        message.warning('登录超时，请重新登录');
    }
    hashHistory.push('/');
};

//转化资源对象为级联
export const convertPermissionToCascader = (data) => {
    let cascader = [];
    if(Object.prototype.toString.call(data) == '[object Array]' && data.length > 0){
        for(let i = 0; i < data.length; i++){
            if(Object.prototype.toString.call(data[i].permissionList) == '[object Array]' && data[i].permissionList.length > 0){
                let children = convertPermissionToCascader(data[i].permissionList);
                if(children.length > 0){
                    cascader.push({
                        value: data[i].id.toString(),
                        label: data[i].title,
                        children: children,
                    });
                } else {
                    cascader.push({
                        value: data[i].id.toString(),
                        label: data[i].title,
                    });
                }
            } else {
                if(!data[i].is_leaf){
                    cascader.push({
                        value: data[i].id.toString(),
                        label: data[i].title,
                    });
                }
            }
        }
    }
    return cascader;
};

//转化资源对象为树型
export const convertPermissionToTree = (data) => {
    let tree = [];
    if(Object.prototype.toString.call(data) == '[object Array]' && data.length > 0){
        for(let i = 0; i < data.length; i++){
            if(Object.prototype.toString.call(data[i].permissionList) == '[object Array]' && data[i].permissionList.length > 0){
                tree.push({
                    key: data[i].id.toString(),
                    title: data[i].title,
                    is_leaf: data[i].is_leaf,
                    children: convertPermissionToTree(data[i].permissionList),
                });
            } else {
                tree.push({
                    key: data[i].id.toString(),
                    title: data[i].title,
                    is_leaf: data[i].is_leaf,
                });
            }
        }
    }
    return tree;
};

//转化资源对象为表格
export const convertPermissionToTable = (data) => {
    let table = [];
    if(Object.prototype.toString.call(data) == '[object Array]' && data.length > 0){
        for(let i = 0; i < data.length; i++){
            if(Object.prototype.toString.call(data[i].permissionList) == '[object Array]' && data[i].permissionList.length > 0){
                table.push({
                    key: generateUUID(),
                    id: data[i].id.toString(),
                    is_leaf: data[i].is_leaf,
                    link: data[i].link,
                    parent_id: data[i].parent_id,
                    title: data[i].title,
                    children: convertPermissionToTable(data[i].permissionList),
                });
            } else {
                table.push({
                    key: generateUUID(),
                    id: data[i].id.toString(),
                    is_leaf: data[i].is_leaf,
                    link: data[i].link,
                    parent_id: data[i].parent_id,
                    title: data[i].title
                });
            }
        }
    }
    return table;
};

//转化资源对象为菜单
export const convertPermissionToMenu = (data) => {
    let menu = [];
    if(Object.prototype.toString.call(data) == '[object Array]' && data.length > 0){
        for(let i = 0; i < data.length; i++){
            if(Object.prototype.toString.call(data[i].permissionList) == '[object Array]' && data[i].permissionList.length > 0){
                menu.push({
                    id: data[i].id.toString(),
                    link: data[i].link,
                    title: data[i].title,
                    icon: data[i].icon,
                    children: convertPermissionToMenu(data[i].permissionList),
                });
            } else {
                menu.push({
                    id: data[i].id.toString(),
                    link: data[i].link,
                    title: data[i].title,
                    icon: data[i].icon,
                    children: [],
                });
            }
        }
    }
    return menu;
};

//获取资源对象的链接
export const convertPermissionToLink = (data) => {
    let link = [];
    if(Object.prototype.toString.call(data) == '[object Array]' && data.length > 0){
        for(let i = 0; i < data.length; i++){
            if(Object.prototype.toString.call(data[i].permissionList) == '[object Array]' && data[i].permissionList.length > 0){
                if(data[i].link){
                    link.push(data[i].link);
                }
                link = link.concat(convertPermissionToLink(data[i].permissionList));
            } else {
                if(data[i].link){
                    link.push(data[i].link);
                }
            }
        }
    }
    return link;
};

export const getElementTop = (elem) => {
    let elemTop=elem.offsetTop;//获得elem元素距相对定位的父元素的top
    elem=elem.offsetParent;//将elem换成起相对定位的父元素
    while(elem!=null){//只要还有相对定位的父元素
        //获得父元素 距他父元素的top值,累加到结果中
        elemTop+=elem.offsetTop;
        //再次将elem换成他相对定位的父元素上;
        elem=elem.offsetParent;
    }
    return elemTop;
};