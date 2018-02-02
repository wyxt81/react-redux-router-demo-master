/**
 * Author：dengyu
 * Time：2017/7/11
 * Description：config query
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addConfigQuery} from '../../../actions/configQuery';
import {Card, Button} from 'antd';

import './index.scss';

class ConfigQuery extends Component {
    addQuery = () => {
        this.props.actions.addConfigQuery()
    };

    render() {
        const This = this;
        return <div className="config-query">
            <Card
                title="条件集"
                bordered={false}
                extra={<Button
                    type="primary"
                    icon="plus"
                    size="default"
                    onClick={this.addQuery}>添加条件集</Button>}>
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
        actions: bindActionCreators({addConfigQuery}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ConfigQuery);