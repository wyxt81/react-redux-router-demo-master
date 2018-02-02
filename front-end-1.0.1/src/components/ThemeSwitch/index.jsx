/**
 * Author：zhoushuanglong
 * Time：2017/5/15
 * Description：theme switch
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {Switch} from 'antd';

import {themeSwitch} from '../../actions/index';

import './index.scss';

class ThemeSwitch extends Component {
    changeTheme = () => {
        this.props.actions.themeSwitch(this.props.theme === 'dark' ? 'light' : 'dark');
    };

    render() {
        const props = this.props;
        return <div className="theme-switch"
                    style={{left: props.collapsed ? '8px' : '24px'}}>
            <Switch
                size={props.collapsed ? 'small' : 'default'}
                checked={props.theme === 'dark'}
                onChange={this.changeTheme}
                checkedChildren="深色"
                unCheckedChildren="浅色"
            />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        collapsed: state.menuCollapsed,
        theme: state.themeName
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({themeSwitch}, dispatch)
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(ThemeSwitch);