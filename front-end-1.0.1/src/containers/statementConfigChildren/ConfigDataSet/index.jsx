/**
 * Author：zhoushuanglong
 * Time：2017/5/26
 * Description：config data set
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {addConfigData} from '../../../actions/configData';
import {Card, Button} from 'antd';

import './index.scss';

class ConfigDataSet extends Component {
    addDataset = () => {
        this.props.actions.addConfigData()
    };

    render() {
        const This = this;
        return <div className="config-dataset">
            <Card
                title="数据集"
                bordered={false}
                extra={<Button
                    type="primary"
                    icon="plus"
                    size="default"
                    onClick={this.addDataset}>添加数据集</Button>}>
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
        actions: bindActionCreators({addConfigData}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ConfigDataSet);