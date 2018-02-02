/**
 * Author：zhoushuanglong
 * Time：2017/5/26
 * Description：config production
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Card, Button} from 'antd';

import {addProduction} from '../../../actions/production';
import {productionClear} from '../../../actions/layout';
import './index.scss';

class ConfigProduction extends Component {
    addProduction = () => {
        this.props.actions.addProduction();
        this.props.actions.productionClear();
    };

    render() {
        const This = this;
        return <div className="config-production">
            <Card
                title="作品"
                bordered={false}
                extra={<Button
                    type="primary"
                    icon="plus"
                    size="default"
                    onClick={this.addProduction}>添加作品</Button>}>
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
        actions: bindActionCreators({addProduction, productionClear}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ConfigProduction);