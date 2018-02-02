/**
 * Author：zhoushuanglong
 * Time：2017/6/16
 * Description：chart layout control
 */

import React from 'react';
import {connect} from 'react-redux';
import {Button, Menu, Dropdown} from 'antd';


const ChartLayoutText = (props) => <div
    className="chart-layout chart-layout-control"
    onClick={() => {
        if(!props.showReport){
            props.layoutCurrent(props.id, 0)
        }
    }}>


    <div className="chart-layout-background"
         onClick={() => {
             if(!props.showReport){
                props.currentType(props.layoutType)
             }
         }}/>
    <div className="layout-content-wrap">{props.children[0]}</div>


    {!props.showReport ? <div className="chart-layout-btn">
        <Dropdown placement="bottomCenter" overlay={<Menu>
            <Menu.Item><Button onClick={() => {
                props.layoutDelete(props.id)
            }} type="primary" icon="delete" size="small" shape="circle" title="删除"/>
            </Menu.Item>
        </Menu>}>
            <a className="chart-layout-btn-hover"><span/><span/><span/></a>
        </Dropdown>
    </div> : ''}
    <div className={"chart-layout-header " + (!props.showReport && props.id === props.currentLayId ? 'active' : '')}
         onClick={() => {
             if(!props.showReport){
                props.currentType(props.layoutType)
             }
         }}/>
</div>;

const mapStateToProps = (state) => {
    return {
        currentLayId: state.layoutConfig.currentId
    }
};

export default connect(mapStateToProps)(ChartLayoutText);
