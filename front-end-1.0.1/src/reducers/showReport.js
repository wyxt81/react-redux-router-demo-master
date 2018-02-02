/**
 * Author：dengyu
 * Time：2017/7/4
 * Description：reoprt reducers
 */

import { SREPORTINIT, SREPORTSEARCH, SREPORTTABLE, SREPORTQUERY, SREPORTRESET, SREPORTSQL, SREPORTSELECT, SREPORTRANGE, SREPORTDISTRICT, SREPORTCOMPARE, SREPORTLINKAGE, CONFIGSHOWINIT } from '../constants/index';

const stateInit = {
    config: [], //每个区域的配置项数组
    echarts: [], //图表的数据数组
    sqls: [], //每个图表或表格的sql语句数组
    tables: {}, //每个表格的数据对象
    querys: {}, //每个查询条件的数据对象
    selects: {}, //每个下拉框或复选框查询条件的数据对象
    range: 'day', //日期范围选择
    country: {}, //国家列表
    province: {}, //省份列表
    city: {}, //城市列表
    compare: false, //是否对比
    dimensions: [], //每个图表或表格的维度数组
    measurements: [], //每个图表或表格的度量数组
    game: {}, //游戏列表
    channel: {}, //渠道列表
    gateway: {}, //网关列表
};

const showReport = (state = stateInit, action) => {
    switch (action.type) {
        case SREPORTINIT:
            return Object.assign({}, state, { config: action.config, sqls: action.sqls, dimensions: action.dimensions, measurements: action.measurements });
            break;
        case SREPORTSEARCH:
            return Object.assign({}, state, { echarts: action.echarts });
            break;
        case SREPORTTABLE:
            return Object.assign({}, state, { tables: Object.assign({}, state.tables, { ...action.tables }) });
            break;
        case SREPORTQUERY:
            return Object.assign({}, state, { querys: Object.assign({}, state.querys, { ...action.querys }) });
            break;
        case SREPORTRESET:
            return Object.assign({}, state, { config: [], tables: {}, querys: {},selects: {}, echarts: [], range: 'day', country: {}, province: {}, city: {}, compare: false, dimensions: [], measurements: [] });
            break;
        case SREPORTSQL:
            return Object.assign({}, state, { sqls: action.sqls });
            break;
        case SREPORTSELECT:
            return Object.assign({}, state, { selects: Object.assign({}, state.selects, { ...action.selects }) });
            break;
        case SREPORTRANGE:
            return Object.assign({}, state, { range: action.range });
            break;
        case SREPORTDISTRICT:
            return Object.assign({}, state, { [action.dtype]: Object.assign({}, [action.dtype], { ...action.ddata }) });
            break;
        case SREPORTCOMPARE:
            return Object.assign({}, state, { compare: action.compare });
            break;
        case CONFIGSHOWINIT:
            return Object.assign({}, state, {config: action.config, sqls: action.sqls});
            break;
        case SREPORTLINKAGE:
            return Object.assign({}, state, { [action.dtype]: Object.assign({}, [action.dtype], { ...action.ddata }) });
            break;
        default:
            return state;
    }
};

export default showReport;