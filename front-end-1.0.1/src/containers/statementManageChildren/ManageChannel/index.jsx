/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage channel
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addManageChannel} from '../../../actions/manageChannel';
import {Card, Button} from 'antd';

class ManageChannel extends Component {
    addManageChannel = () => {
        this.props.actions.addManageChannel();
    };

    render() {
        const This = this;
        return <div className="manage">
            <Card
                title="渠道管理"
                bordered={false}
                extra={<Button
                    type="primary"
                    icon="plus"
                    size="default"
                    onClick={this.addManageChannel}>添加渠道</Button>}>
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
    return {
        actions: bindActionCreators({addManageChannel}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageChannel);