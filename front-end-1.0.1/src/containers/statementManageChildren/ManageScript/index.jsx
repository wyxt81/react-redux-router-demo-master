/**
 * Author：dengyu
 * Time：2017/10/11
 * Description：manage script
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addManageScript} from '../../../actions/manageScript';
import {Card, Button} from 'antd';

class ManageScript extends Component {
    addManageScript = () => {
        this.props.actions.addManageScript();
    };

    render() {
        const This = this;
        return <div className="manage">
            <Card
                title="脚本管理"
                bordered={false}
                extra={<Button
                    type="primary"
                    icon="plus"
                    size="default"
                    onClick={this.addManageScript}>添加脚本</Button>}>
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
        actions: bindActionCreators({addManageScript}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageScript);