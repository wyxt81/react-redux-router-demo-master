/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage game
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addManageGame} from '../../../actions/manageGame';
import {Card, Button} from 'antd';

class ManageGame extends Component {
    addManageGame = () => {
        this.props.actions.addManageGame();
    };

    render() {
        const This = this;
        return <div className="manage">
            <Card
                title="游戏管理"
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
    return {
        actions: bindActionCreators({addManageGame}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageGame);