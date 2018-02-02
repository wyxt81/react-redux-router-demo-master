/**
 * Author：dengyu
 * Time：2017/9/5
 * Description：manage user
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addManageUser} from '../../../actions/manageUser';
import {Card, Button} from 'antd';

class ManageUser extends Component {
    addManageUser = () => {
        this.props.actions.addManageUser();
    };

    render() {
        const This = this;
        return <div className="manage">
            <Card
                title="用户管理"
                bordered={false}
                extra={<Button
                    type="primary"
                    icon="plus"
                    size="default"
                    onClick={this.addManageUser}>添加用户</Button>}>
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
        actions: bindActionCreators({addManageUser}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageUser);