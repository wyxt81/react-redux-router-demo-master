/**
 * Author：zhoushuanglong
 * Time：2017/5/11
 * Description：logo
 */

import React from 'react';
import {connect} from 'react-redux';

import './index.scss';

import logoWirte from './img/logo-wirte.svg';
import logoBlack from './img/logo-black.svg';
import orca from './img/orca.svg';

const Logo = (props) => {
    return <div style={{background: props.theme === 'dark' ? '#333' : '#f2f2f2'}}
                className={`logo ${props.collapsed ? 'active' : ''}`}>
        <img className="logo" src={props.theme === 'dark' ? logoWirte : logoBlack}/>
        <img className="orca" src={orca}/>
    </div>
};

const mapStateToProps = (state) => {
    return {
        collapsed: state.menuCollapsed,
        theme: state.themeName
    }
};

export default connect(mapStateToProps)(Logo);