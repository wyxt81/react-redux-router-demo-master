/**
 * Author：zhoushuanglong
 * Time：2017/6/26
 * Description：chart pie
 */

import React, {Component} from 'react';

import ReactEcharts from '../../../ReactEcharts';

import {color, position} from '../../../../public/chartOption';

class ChartPie extends Component {
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
                formatter: "{a} <br/>{b} : {d}%"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: data.xAxis,
                top: '9',
            },
            series: data.series
        };
    };

    convertOption = (props) => {
        let series = {
            name: '访问来源',
            type: 'pie',
            radius: '55%',
            center: ['50%', '60%'],
            data: [
                {value: 335, name: '直接访问'},
                {value: 310, name: '邮件营销'},
                {value: 234, name: '联盟广告'},
                {value: 135, name: '视频广告'},
                {value: 1548, name: '搜索引擎'}
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        };
        let xAxis = (props.xAxis && props.xAxis.length !== 0) ? props.xAxis.slice(0, 10) : ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎']
        if(props.series && props.series.length !== 0){
            series = {
                name: props.series[0].text,
                type: 'pie',
                radius: '55%',
                center: ['50%', '50%'],
                data: props.series[0].array.slice(0, 10).map(function(item, index){
                    xAxis[index] = xAxis[index] + "\n" + item;
                    return {
                        name: xAxis[index],
                        value: item,
                    }
                }),
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            };
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
                orient: 'vertical',
                left: 'left',
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

export default ChartPie;