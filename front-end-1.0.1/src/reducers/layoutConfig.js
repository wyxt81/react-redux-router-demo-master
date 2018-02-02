/**
 * Author：zhoushuanglong
 * Time：2017/6/9
 * Description：layout config reducer
 */

import {
    CONTENTDATA,
    CONTENTSTYLE,
    CURRENTID,
    CURRENTTYPE,
    DELETETAB,
    LAYOUTADD,
    LAYOUTCHANGE,
    LAYOUTCONTENT,
    LAYOUTDEL,
    LAYOUTSORT,
    LAYOUTRESET,
    QUERYADD,
    QUERYDEL,
    PRODUCTIONNAME,
    PRODUCTIONINIT,
    PRODUCTIONCLEAR
} from "../constants/layout";
import {CHARTLINE, CONTROLQUERY, CONTROLTEXT, LAYOUTCOLUMN, LAYOUTROW, LAYOUTTAB} from "../constants/layoutBtnType";


import {generateUUID} from "../public/index";

const defaultLayoutId = generateUUID();
const defaultLayoutSection = 0;
const defaultHeight = '300';
const defaultContent = (contentType) => {
    return {
        contentType: contentType,
        title: '未命名',
        group: 'one',
        condition: {
            data: {
                sql: '',
                source: '',
                dimension: [],
                measurement: [],
            },
            style: {
                unit: "",
                xunit : "",
                xAxisSplitLineShow: "hide",
                xAxisSplitLineColor: "#ccc",
                xAxisSplitLineWidth: 1,
                xAxisSplitLineType: "solid",
                xAxisAxisLineColor: "#ccc",
                yAxisSplitLineShow: "show",
                yAxisSplitLineColor: "#ccc",
                yAxisSplitLineWidth: 1,
                yAxisSplitLineType: "solid",
                yAxisAxisLineColor: "#fff",
                seriesBarCategoryGap : 40,
                seriesBarGap: 10,
                legendShow: "show",
                labelNormalShow: "hide",
                yAxis: [],
                xAxis: [],
            }
        }
    }
};
const defaultQuery = (queryType) => {
    return {
        contentType: queryType,
        group: 'one',
        condition: {
            data: {
                sql: '',
                source: '',
                fieldName: '',
                text: '',
                colcode: '',
                coltext: '',
                selectSql: '',
                prop : {
                    "day" : "日",
                    "week" : "周",
                    "month" : "月",
                    "year" : "年"
                },//时间范围对象
                radios : [
                    {
                        "code" : "a",
                        "text" : "beijing"
                    },
                    {
                        "code" : "b",
                        "text" : "shanghai"
                    }
                ],//单选按钮选项数组
                selects : [
                    {
                        "code" : "optone",
                        "text" : "选项一"
                    },
                    {
                        "code" : "opttwo",
                        "text" : "选项二"
                    }
                ],//配置型下拉框数组
                checkboxs : [
                    {
                        code: '复选框',
                        text: '复选框'
                    }
                ],//复选框数组
                single: false,//下拉框是否是单选
                district: {
                    country: "country",
                    province: "province",
                    city: "city",
                },//地区对象
                gcgLinkage: {
                    game: "game_id",
                    channel: "channel_id",
                    gateway: "gateway_id",
                },//游戏渠道网关对象
            },
            style: {}
        }
    }
};
const configInit = {
    productionId: '',
    productionName: '未命名',
    currentId: defaultLayoutId,
    currentSection: defaultLayoutSection,
    currentType: LAYOUTROW,
    content: [
        {
            layoutId: defaultLayoutId,
            layoutType: LAYOUTROW,
            layoutSection: 0,
            height: defaultHeight,
            children: [
                defaultContent(CHARTLINE)
            ]
        }
    ]
};

const layoutConfig = (state = configInit, action) => {
    switch (action.type) {
        case LAYOUTADD:
            const layoutId = generateUUID();
            let children = [];
            switch (action.layoutType) {
                case LAYOUTROW:
                    children = [defaultContent('')];
                    break;
                case CONTROLQUERY:
                    children = [];
                    break;
                case CONTROLTEXT:
                    children = [defaultContent(CONTROLTEXT)];//文本控件默认添加
                    break;
                case LAYOUTTAB:
                    children = [defaultContent(''), defaultContent(''), defaultContent('')];
                    break;
                case LAYOUTCOLUMN:
                    children = [defaultContent(''), defaultContent('')];
            }
            let arrAdd = state.content,
                objAdd = {
                    layoutId: layoutId,
                    layoutType: action.layoutType,
                    layoutSection: 0,
                    height: defaultHeight,
                    children: children
                };
            if (arrAdd.length === 0) {
                arrAdd.push(objAdd);
            } else {
                arrAdd.insert(action.hoverIndex + 1, objAdd);
            }

            return Object.assign({}, state, {
                currentId: layoutId,
                currentSection: 0,
                content: arrAdd
            });
            break;
        case LAYOUTCHANGE:
            let arrChange = state.content;
            arrChange.map(function (d, i) {
                if (d.layoutId === action.layoutId) {
                    arrChange[i].height = action.height;
                    arrChange[i].title = action.title;
                    if (action.tabsNumber) {
                        let anNum = parseInt(action.tabsNumber),
                            cni = arrChange[i].children,
                            cniNum = cni.length;
                        if (anNum <= cniNum) {
                            cni.splice(anNum, cniNum - anNum);
                        } else {
                            for (let i = 0; i < anNum - cniNum; i++) {
                                cni.push(defaultContent(''))
                            }
                        }
                    }
                    return false;
                }
            });
            return Object.assign({}, state, {content: arrChange});
            break;
        case DELETETAB:
            let arrTab = state.content;
            arrTab.map(function (d, i) {
                if (d.layoutId === action.layoutId) {
                    arrTab[i].children.delIndex(action.index);
                    return false;
                }
            });
            return Object.assign({}, state, {content: arrTab});
            break;
        case CONTENTDATA:
            let arrData = state.content;
            arrData.map(function (d, i) {
                if (d.layoutId === action.layoutId) {
                    let section = arrData[i].children[action.layoutSection];
                    section.group = action.group;
                    section.condition.data = action.data;
                    if(action.onlyTable){
                        section.onlyTable = action.onlyTable;
                    }
                    return false;
                }
            });
            return Object.assign({}, state, {content: arrData});
            break;
        case CONTENTSTYLE:
            let arrStyle = state.content;
            arrStyle.map(function (d, i) {
                if (d.layoutId === action.layoutId) {
                    let section = arrStyle[i].children[action.layoutSection];
                    section.title = action.title;
                    section.condition.style = action.style;
                    return false;
                }
            });
            return Object.assign({}, state, {content: arrStyle});
            break;
        case LAYOUTDEL:
            let arrDel = state.content.filter((d) => d.layoutId !== action.layoutId);
            return Object.assign({}, state, {content: arrDel});
            break;
        case LAYOUTSORT:
            let arrSort = action.layoutArr;
            return Object.assign({}, state, {content: arrSort});
            break;
        case LAYOUTCONTENT:
        let arrContent = state.content;
        arrContent.map(function (d, i) {
            if (d.layoutId === action.layoutId) {
                arrContent[i].children[action.layoutSection] = defaultContent(action.contentType);
                return false;
            }
        });
        return Object.assign({}, state, {content: arrContent});
        break;
        case LAYOUTRESET:
            return {
                productionId: '',
                productionName: '未命名',
                currentId: defaultLayoutId,
                currentSection: defaultLayoutSection,
                currentType: LAYOUTROW,
                content: [
                    {
                        layoutId: defaultLayoutId,
                        layoutType: LAYOUTROW,
                        layoutSection: 0,
                        height: defaultHeight,
                        children: [
                            defaultContent(CHARTLINE)
                        ]
                    }
                ]
            };
            break;
        case QUERYADD:
            let arrQueryAdd = state.content;
            arrQueryAdd.map(function (d, i) {
                if (d.layoutId === action.layoutId) {
                    arrQueryAdd[i].children.push(defaultQuery(action.queryType));
                    return false;
                }
            });
            return Object.assign({}, state, {content: arrQueryAdd});
            break;
        case QUERYDEL:
            let arrQueryDel = state.content;
            arrQueryDel.map(function (d, i) {
                if (d.layoutId === action.layoutId) {
                    arrQueryDel[i].children.delIndex(action.querySection);
                    return false;
                }
            });
            return Object.assign({}, state, {content: arrQueryDel});
            break;
        case CURRENTID:
            let arrCurrent = state.content;
            arrCurrent.map(function (d, i) {
                if (d.layoutId === action.layoutId) {
                    arrCurrent[i].layoutSection = action.layoutSection;
                    return false;
                }
            });
            return Object.assign({}, state, {
                currentId: action.layoutId,
                currentSection: action.layoutSection,
                content: arrCurrent
            });
            break;
        case CURRENTTYPE:
            return Object.assign({}, state, {currentType: action.currentType});
            break;
        case PRODUCTIONNAME:
            return Object.assign({}, state, {productionName: action.productionName});
            break;
        case PRODUCTIONCLEAR:
            return Object.assign({}, state, {
                productionId: '',
                productionName: '',
                currentId: '',
                currentSection: '',
                currentType: '',
                content: []
            });
            break;
        case PRODUCTIONINIT:
            let production = action.dataEdit;
            let curId = '',
                curType = '';
            if (production.config.length !== 0) {
                curId = production.config[0].layoutId;
                if (production.config[0].children.length !== 0) {
                    curType = production.config[0].children[0].contentType;
                }
            }

            return Object.assign({}, state, {
                productionId: production.id,
                productionName: production.name,
                currentId: curId,
                currentSection: 0,
                currentType: curType,
                content: production.config
            });
            break;
        default:
            return state;
    }
};

export default layoutConfig;