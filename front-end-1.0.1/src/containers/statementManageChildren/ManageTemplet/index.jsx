/**
 * Author：dengyu
 * Time：2017/10/9
 * Description：manage templet
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addManageTemplet} from '../../../actions/manageTemplet';
import {Card, Button} from 'antd';

class ManageTemplet extends Component {
    addManageTemplet = () => {
        this.props.actions.addManageTemplet();
    };

    render() {
        const This = this;
        return <div className="manage">
            <Card
                title="模板管理"
                bordered={false}
                extra={<Button
                    type="primary"
                    icon="plus"
                    size="default"
                    onClick={this.addManageTemplet}>添加模板</Button>}>
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
        actions: bindActionCreators({addManageTemplet}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageTemplet);