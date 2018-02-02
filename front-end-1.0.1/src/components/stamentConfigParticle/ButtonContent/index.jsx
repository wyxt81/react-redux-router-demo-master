/**
 * Author：zhoushuanglong
 * Time：2017/6/14
 * Description：button content
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Collapse} from 'antd';

import DragSource from '../DragSource';
import {
    LAYOUTROW,
    LAYOUTTAB,
    LAYOUTCOLUMN,
    CHARTLINE,
    CHARTPIE,
    CHARTBAR,
    CHARTRBAR,
    CHARTTABLE,
    CHARTMAP,
    CHARTSCATTER,
    CHARTRADAR,
    CHARTFUNNEL,
    CONTROLQUERY,
    CONTROLTEXT
} from '../../../constants/layoutBtnType';


const Panel = Collapse.Panel;
class ButtonContent extends Component {
    render() {
        const props = this.props;
        return <Collapse bordered={false} defaultActiveKey={'1'}>
            <Panel header="布局" key="1">
                <div className="button-wraper">
                    <DragSource title="通栏布局" currentSelectType={props.currentSelectType} type={LAYOUTROW}/>
                    <DragSource title="TAB切换布局" currentSelectType={props.currentSelectType} type={LAYOUTTAB}/>
                    <DragSource title="列布局" currentSelectType={props.currentSelectType} type={LAYOUTCOLUMN}/>
                    <a className="placeholder"/>
                </div>
            </Panel>
            <Panel header="图表" key="2">
                <div className="button-wraper">
                    <DragSource title="折线图" currentSelectType={props.currentSelectType} type={CHARTLINE}/>
                    <DragSource title="饼图" currentSelectType={props.currentSelectType} type={CHARTPIE}/>
                    <DragSource title="柱状图" currentSelectType={props.currentSelectType} type={CHARTBAR}/>
                    <DragSource title="条形图" currentSelectType={props.currentSelectType} type={CHARTRBAR}/>
                </div>
                <div className="button-wraper">
                    <DragSource title="表格" currentSelectType={props.currentSelectType} type={CHARTTABLE}/>
                    {/*<DragSource title="地图" currentSelectType={props.currentSelectType} type={CHARTMAP}/>*/}
                    {/*<DragSource title="散点图" currentSelectType={props.currentSelectType} type={CHARTSCATTER}/>*/}
                    {/*<DragSource title="雷达图" currentSelectType={props.currentSelectType} type={CHARTRADAR}/>*/}
                </div>
                {/*<div className="button-wraper">*/}
                    {/*<DragSource title="漏斗图" currentSelectType={props.currentSelectType} type={CHARTFUNNEL}/>*/}
                    {/*<a className="placeholder"/>*/}
                    {/*<a className="placeholder"/>*/}
                    {/*<a className="placeholder"/>*/}
                {/*</div>*/}
            </Panel>
            <Panel header="控件" key="3">
                <div className="button-wraper">
                    <DragSource title="查询条件" currentSelectType={props.currentSelectType} type={CONTROLQUERY}/>
                    <DragSource title="文本" currentSelectType={props.currentSelectType} type={CONTROLTEXT}/>
                    <a className="placeholder"/>
                    <a className="placeholder"/>
                </div>
            </Panel>
        </Collapse>
    }
}

const mapStateToPoprs = (state) => {
    return {
        currentSelectType: state.layoutConfig.currentType
    }
};

export default connect(mapStateToPoprs)(ButtonContent);