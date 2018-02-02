/**
 * Author：zhoushuanglong
 * Time：2017/7/5
 * Description：react echarts
 */

import React, {Component} from 'react';
import echarts from 'echarts';

import {generateUUID, compareObject} from '../../public/index';

class ReactEcharts extends Component {
    state = {
        id: generateUUID(),
        chartsRender: null,
    };

    shouldComponentUpdate(nextProps, nextState) {
        return compareObject(this.props, nextProps) === false;
    }

    componentDidMount() {
        this.state.chartsRender = echarts.init(document.getElementById(this.state.id));
        this.state.chartsRender.setOption(this.props.option);
    }

    componentDidUpdate() {
        this.state.chartsRender.dispose();

        this.state.chartsRender = echarts.init(document.getElementById(this.state.id));
        this.state.chartsRender.setOption(this.props.option);
    }

    render() {
        const props = this.props;
        return <div className="echarts-content" id={this.state.id} style={{height: props.height + 'px'}}/>
    }
}

export default ReactEcharts;