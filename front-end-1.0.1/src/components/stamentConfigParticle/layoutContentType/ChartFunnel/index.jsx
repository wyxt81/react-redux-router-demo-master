/**
 * Author：zhoushuanglong
 * Time：2017/6/26
 * Description：chart funnel
 */

import React, {Component} from 'react';

import ReactEcharts from '../../../ReactEcharts';

import {color, position} from '../../../../public/chartOption';
class ChartFunnel extends Component {
    constructor(props){
        super(props);
        let data = this.convertOption(this.props);
        this.state = {
            title: null,
            toolbox: null,
            color: color,
            grid: position,
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}%"
            },
            legend: {
                data: data.xAxis,
                top: '9',
            },
            calculable: true,
            series: data.series
        };
    };

    convertOption = (props) => {
        let xAxis = (props.xAxis && props.xAxis.length !== 0) ? props.xAxis.slice(0, 10) : ['展现', '点击', '访问', '咨询', '订单'];
        let series = [
            {
                name: '漏斗图',
                type: 'funnel',
                left: '10%',
                width: '80%',
                gap: 2,
                label: {
                    normal: {
                        show: true,
                        position: 'inside'
                    },
                    emphasis: {
                        textStyle: {
                            fontSize: 20
                        }
                    }
                },
                data: [
                    {value: 60, name: '访问'},
                    {value: 40, name: '咨询'},
                    {value: 20, name: '订单'},
                    {value: 80, name: '点击'},
                    {value: 100, name: '展现'}
                ]
            }
        ];
        if(props.series && props.series.length !== 0){
            series = [
                {
                    name: props.series[0].text,
                    type: 'funnel',
                    left: '10%',
                    width: '80%',
                    gap: 2,
                    label: {
                        normal: {
                            show: true,
                            position: 'inside'
                        },
                        emphasis: {
                            textStyle: {
                                fontSize: 20
                            }
                        }
                    },
                    data: props.series[0].array.slice(0, 10).map((item, index) => {
                        return {
                            name: xAxis[index],
                            value: item,
                        }
                    })
                }
            ];
        }
        return {
            xAxis,
            series,
        }
    };

    componentWillReceiveProps(newProps){
        let data = this.convertOption(newProps);
        this.setState({
            legend: {
                data: data.xAxis,
                top: '9',
            },
            series: data.series
        });
    };

    render() {
        return <ReactEcharts {...this.props} option={this.state}/>
    }
}

export default ChartFunnel;