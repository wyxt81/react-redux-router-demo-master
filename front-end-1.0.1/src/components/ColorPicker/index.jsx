/**
 * Author：zhoushuanglong
 * Time：2017-09-15 10:57
 * Description：color picker
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {ChromePicker} from 'react-color';

import {colorPickerSet} from '../../actions/colorPickerAction';
import './index.scss';

class ColorPicker extends Component {
    handleChange = (color) => {
        let rgba = "rgba(" + color.rgb.r + ", " + color.rgb.g + ", " + color.rgb.b + ", " + color.rgb.a + ")";
        this.props.actions.colorPickerSet(rgba);
    };

    render() {
        return <div style={{display: this.props.show ? 'block' : 'none', top: this.props.top}} className="picker-chrome" >
            <ChromePicker
                color={this.props.colors[this.props.pickerName]}
                onChange={this.handleChange}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        colors: state.colorPicker.colors,
        show: state.colorPicker.show,
        pickerName: state.colorPicker.pickerName,
        top: state.colorPicker.top,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({colorPickerSet}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ColorPicker);