/**
 * Author：zhoushuanglong
 * Time：2017/6/9
 * Description：layout render
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Modal} from 'antd';

import {layoutDel, layoutSort, layoutReset, currentId, currentType} from '../../../actions/layout';
import {convertEchart} from '../../../public/index';
import {showReportReset, showReportSql} from '../../../actions/showReport';//展示

import LayoutSort from '../LayoutSort';
import LayoutContent from '../LayoutContent';

const confirm = Modal.confirm;
class LayoutRender extends Component {
    layoutDelete = (id) => {
        const This = this;
        confirm({
            title: '删除布局',
            content: '确定要删除此布局吗？',
            onOk() {
                This.props.actions.layoutDel(id);
            }
        });
    };

    layoutCurrent = (layoutId, layoutSection) => {
        this.props.actions.currentId(layoutId, layoutSection);
    };

    currentType = (currentType) => {
        this.props.actions.currentType(currentType);
    };

    moveLayout = (dragIndex, hoverIndex) => {
        let layoutConArr = this.props.layoutConfig.content,
            layoutTemp = layoutConArr[dragIndex];
        layoutConArr.insert(hoverIndex, layoutTemp);
        layoutConArr.delIndex(dragIndex + 1);

        this.props.actions.layoutSort(layoutConArr);
    };

    render() {
        const This = this;
        let echartIndex = 0;
        let content = Object.prototype.toString.call(this.props.layoutConfig.content) == "[object Array]" ? this.props.layoutConfig.content : [];
        let echarts = Object.prototype.toString.call(this.props.echarts) == "[object Array]" && this.props.echarts.length > 0 ? this.props.echarts : [[]];
        return <div>{content.map(function (d, i) {
            let title = [],
                children = [],
                titleL = d.title;
            d.children.map(function (data, index) {
                title.push(data.title);
                let legend = [];
                let ylegend = [];
                let xAxis = [];
                let yAxis = {};
                let series = [];
                if(d.layoutType != "control-query" && d.layoutType != "control-text" && data.condition){
                    ({legend, xAxis, series} = convertEchart({
                        legend,
                        ylegend,
                        xAxis,
                        yAxis,
                        series,
                        dimension: data.condition.data.dimension || [],
                        measurement: data.condition.data.measurement || [],
                        echartIndex,
                        echarts,
                    }));
                    echartIndex++;
                }
                children.push(<LayoutContent currentType={This.currentType} layoutType={d.layoutType} height={d.height} legend={legend} xAxis={xAxis} series={series} search={false} {...data}/>);
            });
            return <LayoutSort
                layoutType={d.layoutType}
                layoutDelete={This.layoutDelete}
                layoutCurrent={This.layoutCurrent}
                currentType={This.currentType}
                moveLayout={This.moveLayout}
                index={i}
                key={d.layoutId}
                id={d.layoutId}
                title={title}
                titleL={titleL}
                children={children}/>
        })}</div>
    }
}


const mapStateToProps = (state) => {
    return {
        layoutConfig: state.layoutConfig,
        echarts: state.showReport.echarts,
        sqls: state.showReport.sqls,
        querys: state.showReport.querys
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({
            layoutDel,
            layoutSort,
            layoutReset,
            currentId,
            currentType,
            showReportReset,
            showReportSql
        }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LayoutRender);