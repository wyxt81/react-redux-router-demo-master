/**
 * Author：dengyu
 * Time：2017/8/10
 * Description：react color
 */

import React, {Component} from 'react'
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {colorPickerShow, colorPickerName} from '../../actions/colorPickerAction';

class ReactColor extends Component {
    constructor(props){
        super(props);
        this.state = {
            color: props.colors[props.name],
        };
    };

    componentWillReceiveProps(newProps){
        this.setState({
            color: newProps.colors[newProps.name],
        });
    };

    handleClick = () => {
        let top = this.refs.areaColor.getBoundingClientRect().top - 322;
        this.props.actions.colorPickerName(this.props.name);
        this.props.actions.colorPickerShow(!this.props.show, top > 0 ? top : 0);
    };

    handleClose = () => {
        this.props.actions.colorPickerShow(false);
    };

    render() {
        const wrap = {
            height: '32px',
        };
        const swatch = {
            padding: '6px',
            background: '#fff',
            borderRadius: '4px',
            border: '1px solid #d9d9d9',
            display: 'inline-block',
            cursor: 'pointer',
        };
        let color = {
            width: '94px',
            height: '18px',
            borderRadius: '4px',
            background: this.state.color,
        };
        const popover = {
            position: 'absolute',
            zIndex: '2',
            top: '-252px',
        };
        const cover = {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        };
        return (
            <div style={wrap} ref="areaColor" >
                <div style={swatch} onClick={this.handleClick}>
                    <div style={color}/>
                </div>
                {this.props.show ? <div style={popover}>
                    <div style={cover} onClick={this.handleClose}/>
                </div> : null}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        colors: state.colorPicker.colors,
        show: state.colorPicker.show,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({colorPickerShow, colorPickerName}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactColor);