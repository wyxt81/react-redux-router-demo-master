/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage log
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card} from 'antd';

class ManageLog extends Component {
    render() {
        const This = this;
        return <div className="manage">
            <Card
                title="操作管理"
                bordered={false}>
                {This.props.children}
            </Card>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        route: state.routing.locationBeforeTransitions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {}
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageLog);