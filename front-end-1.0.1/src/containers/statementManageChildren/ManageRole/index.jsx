/**
 * Author：dengyu
 * Time：2017/9/6
 * Description：manage role
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addManageRole} from '../../../actions/manageRole';
import {Card, Button} from 'antd';

class ManageRole extends Component {
    addManageRole = () => {
        this.props.actions.addManageRole();
    };

    render() {
        const This = this;
        return <div className="manage">
            <Card
                title="角色管理"
                bordered={false}
                extra={<Button
                    type="primary"
                    icon="plus"
                    size="default"
                    onClick={this.addManageRole}>添加角色</Button>}>
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
        actions: bindActionCreators({addManageRole}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageRole);