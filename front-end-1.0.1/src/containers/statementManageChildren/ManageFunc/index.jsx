/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage func
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addManageFunc} from '../../../actions/manageFunc';
import {Card, Button} from 'antd';

class ManageFunc extends Component {
    addManageFunc = () => {
        this.props.actions.addManageFunc();
    };

    render() {
        const This = this;
        return <div className="manage">
            <Card
                title="资源管理"
                bordered={false}
                extra={<Button
                    type="primary"
                    icon="plus"
                    size="default"
                    onClick={this.addManageFunc}>添加资源</Button>}>
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
        actions: bindActionCreators({addManageFunc}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageFunc);