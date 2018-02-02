/**
 * Author：zhoushuanglong
 * Time：2017-09-15 10:41
 * Description：Description
 */

import {COLORPICKERSET, COLORPICKERSHOW, COLORPICKERNAME, COLORPICKERINIT} from '../constants/index';

export const colorPickerSet = (color) => {
    return {
        type: COLORPICKERSET,
        color
    }
};

export const colorPickerShow = (show, top) => {
    return {
        type: COLORPICKERSHOW,
        show,
        top
    }
};

export const colorPickerName = (pickerName) => {
    return {
        type: COLORPICKERNAME,
        pickerName
    }
};

export const colorPickerInit = (colors) => {
    return {
        type: COLORPICKERINIT,
        colors
    }
};