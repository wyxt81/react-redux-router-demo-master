/**
 * Author：zhoushuanglong
 * Time：2017/6/26
 * Description：chart line
 */

import React, {Component} from 'react';

import ReactEcharts from '../../../ReactEcharts';

import {color, position} from '../../../../public/chartOption';

class ChartLine extends Component {
    constructor(props){
        super(props);
        let data = this.convertOption(this.props);
        this.state = {
            title: null,
            toolbox: null,
            color: color,
            grid: position,
            tooltip: {
                trigger: 'axis'
            },
            legend: data.legend,
            xAxis: data.xAxis,
            yAxis: data.yAxis,
            series: data.series
        };
    };

    convertOption = (props) => {
        let style = props.condition ? (props.condition.style ? props.condition.style : {}) : {};
        style = Object.assign({}, style);
        style.xAxisSplitLineShow = style.xAxisSplitLineShow == 'show';
        style.xAxisSplitLineColor = style.xAxisSplitLineColor || '#ccc';
        style.xAxisSplitLineWidth = style.xAxisSplitLineWidth || 1;
        style.xAxisSplitLineType = style.xAxisSplitLineType || 'solid';
        style.xAxisAxisLineColor = style.xAxisAxisLineColor || '#ccc';
        style.yAxisSplitLineShow = style.yAxisSplitLineShow == 'show';
        style.yAxisSplitLineColor = style.yAxisSplitLineColor || '#ccc';
        style.yAxisSplitLineWidth = style.yAxisSplitLineWidth || 1;
        style.yAxisSplitLineType = style.yAxisSplitLineType || 'solid';
        style.yAxisAxisLineColor = style.yAxisAxisLineColor || '#fff';
        style.legendShow = style.legendShow == 'show';
        style.labelNormalShow = style.labelNormalShow == 'show';
        let legend = {
            show: style.legendShow,
            data: (props.legend && props.legend.length !== 0) ? props.legend : ['最高气温', '最低气温'],
            top: '9',
        };
        let xAxis = {
            type: 'category',
            data: (props.xAxis && props.xAxis.length !== 0) ? props.xAxis : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
            boundaryGap: false,
            splitLine:{
                show: style.xAxisSplitLineShow,
                lineStyle: {
                    color: [style.xAxisSplitLineColor],
                    width: style.xAxisSplitLineWidth,
                    type: style.xAxisSplitLineType,
                }
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: style.xAxisAxisLineColor,
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#333',
                }
            }
        };
        let yAxis = {
            type: 'value',
            unit: style.unit,
            axisLabel: {
                formatter: function(value, index){
                    if(parseFloat(value) > 10000){
                        value = parseFloat(value / 10000) + "万" + (style.unit || "");
                    } else {
                        value = value + (style.unit || "");
                    }
                    return value;
                },
                textStyle: {
                    color: '#333',
                }
            },
            splitLine:{
                show: style.yAxisSplitLineShow,
                lineStyle: {
                    color: [style.yAxisSplitLineColor],
                    width: style.yAxisSplitLineWidth,
                    type: style.yAxisSplitLineType,
                }
            },
            axisTick: {
                show: false,
            },
            axisLine: {
                lineStyle: {
                    color: style.yAxisAxisLineColor,
                }
            }
        };
        let yAxisObject = {};
        if(style.yAxis && style.yAxis.length !== 0){
            yAxis = style.yAxis.map(function (item, index) {
                yAxisObject[item.name] = index;
                return {
                    type: 'value',
                    name: item.name,
                    position: item.position,
                    axisLabel: {
                        formatter: function(value, index){
                            if(parseFloat(value) > 10000){
                                value = parseFloat(value / 10000) + "万" + item.name.charAt(item.name.lastIndexOf("）") - 1);
                            } else {
                                value = value + item.name.charAt(item.name.lastIndexOf("）") - 1);
                            }
                            return value;
                        },
                        textStyle: {
                            color: '#333',
                        }
                    },
                    splitLine:{
                        show: style.yAxisSplitLineShow,
                        lineStyle: {
                            color: [style.yAxisSplitLineColor],
                            width: style.yAxisSplitLineWidth,
                            type: style.yAxisSplitLineType,
                        }
                    },
                    axisTick: {
                        show: false,
                    },
                    axisLine: {
                        lineStyle: {
                            color: style.yAxisAxisLineColor,
                        }
                    }
                }
            });
        }
        let series = [
            {
                name: '最高气温',
                type: 'line',
                data: [11, 11, 15, 13, 12, 13, 10],
                label: {
                    normal: {
                        show: style.labelNormalShow,
                        position: 'top'
                    }
                },
            },
            {
                name: '最低气温',
                type: 'line',
                data: [1, -2, 2, 5, 3, 2, 0],
                label: {
                    normal: {
                        show: style.labelNormalShow,
                        position: 'top'
                    }
                },
            }
        ];
        if(props.series && props.series.length !== 0){
            series = props.series.map(function (item, index) {
                return {
                    name: item.text,
                    type: 'line',
                    data: item.array,
                    yAxisIndex: yAxisObject[item.text] || 0,
                    label: {
                        normal: {
                            show: style.labelNormalShow,
                            position: 'top'
                        }
                    },
                }
            });
        }
        return {
            style,
            legend,
            xAxis,
            yAxis,
            series,
        }
    };

    componentWillReceiveProps(newProps){
        let data = this.convertOption(newProps);
        this.setState({
            legend: data.legend,
            xAxis: data.xAxis,
            yAxis: data.yAxis,
            series: data.series
        });
    };

    render() {
        return <ReactEcharts {...this.props} option={this.state}/>
    }
}

export default ChartLine;