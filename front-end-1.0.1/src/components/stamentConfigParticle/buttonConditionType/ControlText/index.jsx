/**
 * Author：zhoushuanglong
 * Time：2017/6/14
 * Description：chart line
 */

import React from 'react';
import {connect} from 'react-redux';
 
const ControlText = (props) => <div className="no-config-content">编辑内容自动完成配置</div>;

const mapStateToProps = (state) => {
    return {
        currentSelectType: state.layoutConfig.currentType
    }
};

export default connect(mapStateToProps)(ControlText);