/**
 * Author：zhoushuanglong
 * Time：2017/6/6
 * Description：chart layout column
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Card, Button, Menu, Dropdown} from 'antd';

class ChartLayoutColumn extends Component {
    headerActive = (index) => {
        const props = this.props;
        return !props.showReport && props.currentLayId === props.id && props.currentLaySection === index ? 'active' : '';
    };

    render() {
        const props = this.props;
        return <div className="chart-layout clearfix chart-layout-column">
            <div
                className="chart-layout-content left"
                onClick={() => {
                    if(!props.showReport){
                        props.layoutCurrent(props.id, 0)
                    }
                }}>
                <div className="chart-layout-padding">
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
                    <div
                        className={"chart-layout-header " + this.headerActive(0)}
                        onClick={() => {
                            if(!props.showReport){
                                props.currentType(props.layoutType)
                            }
                        }}/>
                </div>
            </div>
            <div
                className="chart-layout-content right"
                onClick={() => {
                    if(!props.showReport){
                        props.layoutCurrent(props.id, 1);
                    }
                }}>
                <div className="chart-layout-padding">
                    <Card title={props.title[1]}>{props.children[1]}</Card>
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
                    <div
                        className={"chart-layout-header " + this.headerActive(1)}
                        onClick={() => {
                            if(!props.showReport){
                                props.currentType(props.layoutType)
                            }
                        }}/>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        currentLayId: state.layoutConfig.currentId,
        currentLaySection: state.layoutConfig.currentSection
    }
};

export default connect(mapStateToProps)(ChartLayoutColumn);