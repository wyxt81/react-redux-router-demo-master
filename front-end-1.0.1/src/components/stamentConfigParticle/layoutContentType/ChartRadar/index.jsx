/**
 * Author：zhoushuanglong
 * Time：2017/7/19
 * Description：chart radar
 */

import React, {Component} from 'react';

import ReactEcharts from '../../../ReactEcharts';

import {color, position} from '../../../../public/chartOption';

class ChartRadar extends Component {
    constructor(props){
        super(props);
        let data = this.convertOption(this.props);
        this.state = {
            title: null,
            toolbox: null,
            color: color,
            grid: position,
            tooltip: {},
            legend: {
                data: data.legend,
                top: '9',
            },
            radar: {
                indicator: data.xAxis
            },
            series: data.series
        };
    };

    convertOption = (props) => {
        let legend = (props.legend && props.xAxis.length !== 0) ? props.legend : ['预算分配（Allocated Budget）', '实际开销（Actual Spending）'];
        let xAxis = (props.xAxis && props.xAxis.length !== 0) ? props.xAxis.slice(0, 10).map((item, index) => {
            return {
                name: item.text,
                max: 100,
            }
        }) : [
            { name: '销售（sales）', max: 6500},
            { name: '管理（Administration）', max: 16000},
            { name: '信息技术（Information Techology）', max: 30000},
            { name: '客服（Customer Support）', max: 38000},
            { name: '研发（Development）', max: 52000},
            { name: '市场（Marketing）', max: 25000}
        ];
        let series = [
            {
                type: 'radar',
                data : [
                    {
                        value : [4300, 10000, 28000, 35000, 50000, 19000],
                        name : '预算分配（Allocated Budget）'
                    },
                    {
                        value : [5000, 14000, 28000, 31000, 42000, 21000],
                        name : '实际开销（Actual Spending）'
                    }
                ]
            }
        ];
        if(props.series && props.series.length !== 0){
            series = [
                {
                    type: 'radar',
                    data: props.series.map((item, index) => {
                        return {
                            name: legend[index],
                            value: item.array,
                        }
                    })
                }
            ];
        }
        return {
            legend,
            xAxis,
            series,
        }
    };

    componentWillReceiveProps(newProps){
        let data = this.convertOption(newProps);
        this.setState({
            legend: {
                data: data.legend,
                top: '9',
            },
            radar: {
                indicator: data.xAxis
            },
            series: data.series
        });
    };

    render() {
        return <ReactEcharts {...this.props} option={this.state}/>
    }
}

export default ChartRadar;