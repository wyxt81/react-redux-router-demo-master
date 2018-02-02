/**
 * Author：dengyu
 * Time：2017/10/11
 * Description：manage script
 */

import { MANAGESCRIPTSEARCH, MANAGESCRIPTADD, MANAGESCRIPTGET, MANAGESCRIPTSIZE, MANAGESCRIPTTEMPLET, MANAGESCRIPTRATE, MANAGESCRIPTLEVEL, MANAGESCRIPTLOG } from '../constants/index';

const stateInit = {
    scriptList: {
        pageIndex: 1,
        pageSize: 20,
        total: 0,
        rows: []
    },
    scriptEdit:{
        scriptId: '',
        templateId: '',
        gameId: '',
        gameName: '',
        gamePinYin: '',
        gameType: '1',
        queryType: '',
        queryName: '',
        unionType: '1',
        chargeStatus: '2',
        consumeStatus: '2',
        trial: '2',
        passportType: '1',
        channelName: '',
        groupType: '1',
        currencyType: 'CNY',
        ebiDbName: '',
        eratingDbName: '',
        exchangeRate: '',
        rechargeRate: '',
        consumeRate: '',
        exchangeScale: '',
        exchangeDesc: '',
        fixedChargeRateList: [],
        levelIntervalList: [],
    },
    templetList: [],
    rateList: [],
    levelList: [],
    logList: {
        pageIndex: 1,
        pageSize: 5,
        total: 0,
        rows: []
    },
};

const manageScript = (state = stateInit, action) => {
    switch (action.type) {
        case MANAGESCRIPTSEARCH:
            return Object.assign({}, state, { scriptList: action.scriptList });
            break;
        case MANAGESCRIPTADD:
            return Object.assign({}, state, { scriptEdit:{
                scriptId: '',
                templateId: '',
                gameId: '',
                gameName: '',
                gamePinYin: '',
                gameType: '1',
                queryType: '',
                queryName: '',
                unionType: '1',
                chargeStatus: '2',
                consumeStatus: '2',
                trial: '2',
                passportType: '1',
                channelName: '',
                groupType: '1',
                currencyType: 'CNY',
                ebiDbName: '',
                eratingDbName: '',
                exchangeRate: '',
                rechargeRate: '',
                consumeRate: '',
                exchangeScale: '',
                exchangeDesc: '',
                fixedChargeRateList: [],
                levelIntervalList: [],
            } });
            break;
        case MANAGESCRIPTGET:
            return Object.assign({}, state, { scriptEdit: action.scriptEdit });
            break;
        case MANAGESCRIPTSIZE:
            return Object.assign({}, state, { scriptList: Object.assign({}, state.scriptList, { pageSize: action.pageSize })});
            break;
        case MANAGESCRIPTTEMPLET:
            return Object.assign({}, state, { templetList: action.templetList });
            break;
        case MANAGESCRIPTRATE:
            return Object.assign({}, state, { rateList: action.rateList });
            break;
        case MANAGESCRIPTLEVEL:
            return Object.assign({}, state, { levelList: action.levelList });
            break;
        case MANAGESCRIPTLOG:
            return Object.assign({}, state, { logList: action.logList });
            break;
        default:
            return state;
    }
};

export default manageScript;