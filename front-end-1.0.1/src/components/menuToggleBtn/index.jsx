/**
 * Author：zhoushuanglong
 * Time：2017/5/15
 * Description：menu toggle btn
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Icon} from 'antd';

import './index.scss';

import {menuToggle} from '../../actions/index';

class MenuToggleBtn extends Component {
    toggle = () => {
        this.props.actions.menuToggle(!this.props.collapsed);
    };

    render() {
        return <Icon
            className="menu-toggle-btn"
            type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}/>
    }
}

const mapStateToProps = (state) => {
    return {
        collapsed: state.menuCollapsed
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({menuToggle}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuToggleBtn);