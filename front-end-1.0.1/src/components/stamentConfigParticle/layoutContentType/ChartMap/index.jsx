/**
 * Author：zhoushuanglong
 * Time：2017/6/26
 * Description：chart map
 */

import React, {Component} from 'react';

import ReactEcharts from '../../../ReactEcharts';

import '../../../../../node_modules/echarts/map/js/china';

class ChartMap extends Component {
    state = {
        tooltip: {},
        visualMap: {
            min: 0,
            max: 1000,
            left: 'left',
            top: 'bottom',
            text: ['高','低'],
            inRange: {
                color: ['#e0ffff', '#006ede']
            },
            calculable : true
        },
        geo: {
            map: 'china',
            label: {
                normal: {
                    show: true,
                    textStyle: {
                        color: 'rgba(0,0,0,0.4)'
                    }
                }
            },
            itemStyle: {
                normal:{
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis:{
                    areaColor: null,
                    shadowOffsetX: 0,
                    shadowOffsetY: 0,
                    shadowBlur: 20,
                    borderWidth: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        series : [
            {
                name: '测试',
                type: 'map',
                geoIndex: 0,
                data:[
                    {name: '北京', value: 989},
                    {name: '天津', value: 898},
                    {name: '上海', value: 798},
                    {name: '重庆', value: 698},
                    {name: '河北', value: 198},
                    {name: '河南', value: 298},
                    {name: '云南', value: 398},
                    {name: '辽宁', value: 498},
                    {name: '黑龙江', value: 598},
                    {name: '湖南', value: 698},
                    {name: '安徽', value: 98},
                    {name: '山东', value: 968},
                    {name: '新疆', value: 98},
                    {name: '江苏', value: 98},
                    {name: '浙江', value: 198},
                    {name: '江西', value: 298},
                    {name: '湖北', value: 398},
                    {name: '广西', value: 498},
                    {name: '甘肃', value: 598},
                    {name: '山西', value: 698},
                    {name: '内蒙古', value: 198},
                    {name: '陕西', value: 298},
                    {name: '吉林', value: 398},
                    {name: '福建', value: 498},
                    {name: '贵州', value: 98},
                    {name: '广东', value: 598},
                    {name: '青海', value: 98},
                    {name: '西藏', value: 98},
                    {name: '四川', value: 198},
                    {name: '宁夏', value: 298},
                    {name: '海南', value: 98},
                    {name: '台湾', value: 98},
                    {name: '香港', value: 98},
                    {name: '澳门', value: 98}
                ]
            }
        ]
    };

    componentWillReceiveProps(newProps){
        this.setState({
            series: newProps.series ? [
                {
                    name: '测试',
                    type: 'map',
                    geoIndex: 0,
                    data:[
                        {name: '北京', value: 989},
                        {name: '天津', value: 898},
                        {name: '上海', value: 798},
                        {name: '重庆', value: 698},
                        {name: '河北', value: 198},
                        {name: '河南', value: 298},
                        {name: '云南', value: 398},
                        {name: '辽宁', value: 498},
                        {name: '黑龙江', value: 598},
                        {name: '湖南', value: 698},
                        {name: '安徽', value: 98},
                        {name: '山东', value: 968},
                        {name: '新疆', value: 98},
                        {name: '江苏', value: 98},
                        {name: '浙江', value: 198},
                        {name: '江西', value: 298},
                        {name: '湖北', value: 398},
                        {name: '广西', value: 498},
                        {name: '甘肃', value: 598},
                        {name: '山西', value: 698},
                        {name: '内蒙古', value: 198},
                        {name: '陕西', value: 298},
                        {name: '吉林', value: 398},
                        {name: '福建', value: 498},
                        {name: '贵州', value: 98},
                        {name: '广东', value: 598},
                        {name: '青海', value: 98},
                        {name: '西藏', value: 98},
                        {name: '四川', value: 198},
                        {name: '宁夏', value: 298},
                        {name: '海南', value: 98},
                        {name: '台湾', value: 98},
                        {name: '香港', value: 98},
                        {name: '澳门', value: 98}
                    ]
                }
            ] : [
                {
                    name: '测试',
                    type: 'map',
                    geoIndex: 0,
                    data:[
                        {name: '北京', value: 989},
                        {name: '天津', value: 898},
                        {name: '上海', value: 798},
                        {name: '重庆', value: 698},
                        {name: '河北', value: 198},
                        {name: '河南', value: 298},
                        {name: '云南', value: 398},
                        {name: '辽宁', value: 498},
                        {name: '黑龙江', value: 598},
                        {name: '湖南', value: 698},
                        {name: '安徽', value: 98},
                        {name: '山东', value: 968},
                        {name: '新疆', value: 98},
                        {name: '江苏', value: 98},
                        {name: '浙江', value: 198},
                        {name: '江西', value: 298},
                        {name: '湖北', value: 398},
                        {name: '广西', value: 498},
                        {name: '甘肃', value: 598},
                        {name: '山西', value: 698},
                        {name: '内蒙古', value: 198},
                        {name: '陕西', value: 298},
                        {name: '吉林', value: 398},
                        {name: '福建', value: 498},
                        {name: '贵州', value: 98},
                        {name: '广东', value: 598},
                        {name: '青海', value: 98},
                        {name: '西藏', value: 98},
                        {name: '四川', value: 198},
                        {name: '宁夏', value: 298},
                        {name: '海南', value: 98},
                        {name: '台湾', value: 98},
                        {name: '香港', value: 98},
                        {name: '澳门', value: 98}
                    ]
                }
            ]
        })
    };

    render() {
        return <ReactEcharts {...this.props} option={this.state}/>
    }
}

export default ChartMap;