/**
 * Author：zhoushuanglong
 * Time：2017-09-15 10:40
 * Description：Description
 */

import {COLORPICKERSET, COLORPICKERSHOW, COLORPICKERNAME, COLORPICKERINIT} from '../constants/index';

const stateInit = {
    colors: {
        xAxisSplitLineColor: "#ccc",
        xAxisAxisLineColor: "#ccc",
        yAxisSplitLineColor: "#ccc",
        yAxisAxisLineColor: "#fff",
    },
    show: false,
    pickerName: '',
    top: 0,
};

const colorPicker = (state = stateInit, action) => {
    switch (action.type) {
        case COLORPICKERSET:
            return Object.assign({}, state, {colors: Object.assign({}, state.colors, { [state.pickerName]: action.color })});
            break;
        case COLORPICKERSHOW:
            return Object.assign({}, state, {show: action.show, top: action.top});
            break;
        case COLORPICKERNAME:
            return Object.assign({}, state, {pickerName: action.pickerName});
            break;
        case COLORPICKERINIT:
            return Object.assign({}, state, {colors: action.colors});
            break;
        default:
            return state;
    }
};

export default colorPicker;