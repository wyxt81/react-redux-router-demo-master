/**
 * Author：zhoushuanglong
 * Time：2017/6/6
 * Description：chart layout row
 */

import React from 'react';
import {connect} from 'react-redux';
import {Card, Button, Menu, Dropdown} from 'antd';

const ChartLayoutRow = (props) => <div
    className="chart-layout"
    onClick={() => {
        if(!props.showReport){
            props.layoutCurrent(props.id, 0)
        }
    }}>
    <Card title={props.title[0]}>{props.children[0]}</Card>
    <div className="chart-layout-btn">
        <Dropdown placement="bottomCenter" overlay={<Menu>
            <Menu.Item><Button type="primary" icon="eye" size="small" shape="circle" title="查看数据"/>
            </Menu.Item>
            {!props.showReport ? <Menu.Item><Button onClick={() => {
                props.layoutDelete(props.id)
            }} type="primary" icon="delete" size="small" shape="circle" title="删除"/>
            </Menu.Item> : ''}
        </Menu>}>
            <a className="chart-layout-btn-hover"><span/><span/><span/></a>
        </Dropdown>
    </div>
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

export default connect(mapStateToProps)(ChartLayoutRow);

