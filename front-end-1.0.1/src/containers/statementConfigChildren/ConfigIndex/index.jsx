/**
 * Author：zhoushuanglong
 * Time：2017/5/26
 * Description：config index
 */

import React, {Component} from 'react';
import {Card, Steps} from 'antd';

import './index.scss';


const Step = Steps.Step;
const intro = [
    {
        title: '数据',
        detail: '开发者写SQL查询语句，定义维度与度量，新建数据集'
    }, {
        title: '条件',
        detail: '开发者写SQL查询语句，定义下拉框或复选框所需数据的来源，建立条件集'
    }, {
        title: '图表',
        detail: '根据已建立数据集配置制作图表'
    }, {
        title: '作品',
        detail: '数据集与图表生成的作品'
    }, {
        title: '链接',
        detail: '与所需要展示的报表名称进行链接'
    }
];

class ConfigIndex extends Component {
    state = {
        cur: -1
    };

    introCurrent = (i) => {
        this.setState({
            cur: i
        })
    };

    introAll = () => {
        this.setState({
            cur: -1
        })
    };

    render() {
        const This = this;
        return <Card title="首页" bordered={false}>
            <Steps
                direction="vertical"
                current={this.state.cur}
                onMouseOut={() => This.introAll()}>
                {intro.map(function (d, i) {
                    return <Step onMouseOver={() => This.introCurrent(i)} key={d.title} title={d.title} description={d.detail}/>;
                })}
            </Steps>
        </Card>
    }
}

export default ConfigIndex;
