/**
 * Author：dengyu
 * Time：2017/8/14
 * Description：chart rbar
 */

import React, {Component} from 'react';

import ReactEcharts from '../../../ReactEcharts';

import {color, position} from '../../../../public/chartOption';

class ChartRbar extends Component {
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
            data: (props.legend && props.legend.length !== 0) ? props.legend : ['蒸发量', '降水量'],
            top: '9',
        };
        let yAxis = {
            type: 'category',
            data: (props.xAxis && props.xAxis.length !== 0) ? props.xAxis : ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
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
                    color: style.xAxisAxisLineColor,
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#333',
                }
            }
        };
        let xAxis = {
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
                    color: style.yAxisAxisLineColor,
                }
            }
        };
        let xAxisObject = {};
        if(style.xAxis && style.xAxis.length !== 0){
            xAxis = style.xAxis.map(function (item, index) {
                xAxisObject[item.name] = index;
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
                            color: style.yAxisAxisLineColor,
                        }
                    }
                }
            });
        }
        let series = [
            {
                name: '蒸发量',
                type: 'bar',
                data: [2.0, 4.9, 7.0, 23.2, 25.6, 76.7, 135.6, 162.2, 32.6, 20.0, 6.4, 3.3],
                barCategoryGap : typeof(style.seriesBarCategoryGap) == 'number' ? style.seriesBarCategoryGap + '%' : '40%',
                barGap : typeof(style.seriesBarGap) == 'number' ? style.seriesBarGap + '%' : '10%',
                label: {
                    normal: {
                        show: style.labelNormalShow,
                        position: 'right'
                    }
                },
            },
            {
                name: '降水量',
                type: 'bar',
                data: [2.6, 5.9, 9.0, 26.4, 28.7, 70.7, 175.6, 182.2, 48.7, 18.8, 6.0, 2.3],
                barCategoryGap : typeof(style.seriesBarCategoryGap) == 'number' ? style.seriesBarCategoryGap + '%' : '40%',
                barGap : typeof(style.seriesBarGap) == 'number' ? style.seriesBarGap + '%' : '10%',
                label: {
                    normal: {
                        show: style.labelNormalShow,
                        position: 'right'
                    }
                },
            }
        ];
        if(props.series && props.series.length !== 0){
            series = props.series.map(function (item, index) {
                return {
                    name: item.text,
                    type: 'bar',
                    data: item.array,
                    xAxisIndex: xAxisObject[item.text] || 0,
                    barCategoryGap : typeof(style.seriesBarCategoryGap) == 'number' ? style.seriesBarCategoryGap + '%' : '40%',
                    barGap : typeof(style.seriesBarGap) == 'number' ? style.seriesBarGap + '%' : '10%',
                    label: {
                        normal: {
                            show: style.labelNormalShow,
                            position: 'right'
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

export default ChartRbar;