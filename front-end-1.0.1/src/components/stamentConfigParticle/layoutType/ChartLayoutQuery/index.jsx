/**
 * Author：zhoushuanglong
 * Time：2017/6/16
 * Description：chart layout query
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Button, Form, Row, Col, Menu, Dropdown, Modal} from 'antd';

import {queryDel} from '../../../../actions/layout';
import ContentDefault from '../../layoutContentType/ContentDefault';


const FormItem = Form.Item;
const confirm = Modal.confirm;
class ChartLayoutQuery extends Component {
    currentSection = (props) => {
        let layoutSection;
        props.layoutConArr.map(function (d, i) {
            if (d.layoutId === props.id) {
                layoutSection = d.layoutSection;
                return false;
            }
        });
        return layoutSection;
    };

    handleSearch = () => {
        if (typeof(this.props.handleSearch) == 'function') {
            this.props.handleSearch();
        }
    };

    render() {
        const props = this.props;
        return <div
            className="chart-layout chart-layout-control"
            onClick={() => {
                if (!props.showReport) {
                    props.layoutCurrent(props.id, this.currentSection(props));
                }
            }}>

            <div className="chart-layout-background"
                 onClick={() => {
                     if (!props.showReport) {
                         props.currentType(props.layoutType);
                     }
                 }}/>
            <Form className="layout-content-wrap">
                <Row>
                    <Col span={22}>
                        <div className="chart-layout-background"
                             onClick={() => {
                                 if (!props.showReport) {
                                     props.currentType(props.layoutType);
                                 }
                             }}/>
                        {props.children.length === 0 ?
                            <div onClick={() => {
                                if (!props.showReport) {
                                    props.currentType(props.layoutType);
                                    props.layoutCurrent(props.id, 0);
                                }
                            }}><ContentDefault layoutType={props.layoutType}/></div> :
                            props.children.map(function (d, i) {
                                let curSec = 0;
                                props.layoutConArr.map(function (d, i) {
                                    if (d.layoutId === props.id) {
                                        curSec = d.layoutSection
                                    }
                                });
                                return <div
                                    className={'query-item ' + (!props.showReport && curSec === i ? 'active' : '')}
                                    key={i}
                                    onClick={() => {
                                        if (!props.showReport) {
                                            props.layoutCurrent(props.id, i);
                                        }
                                    }}><FormItem>
                                    {d}
                                    {!props.showReport ? <Button
                                        className="query-del" type="primary" icon="delete" size="small" shape="circle"
                                        title="删除"
                                        onClick={() => {
                                            confirm({
                                                title: '删除提示',
                                                content: '确定删除查询条件？',
                                                onOk() {
                                                    props.actions.queryDel(props.currentLayId, i);
                                                    props.currentType(props.layoutType);
                                                }
                                            });
                                        }}/> : ''}
                                </FormItem></div>
                            })}
                    </Col>
                    <Col className="layout-query-btn" span={2}
                         onClick={() => {
                             if (!props.showReport) {
                                 props.currentType(props.layoutType);
                             }
                         }}>
                        <div className="chart-layout-background"/>
                        <Button size="large" type="primary" onClick={this.handleSearch}>查询</Button>
                    </Col>
                </Row>
            </Form>


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
            <div
                className={"chart-layout-header " + (!props.showReport && props.id === props.currentLayId ? 'active' : '')}
                onClick={() => {
                    if (!props.showReport) {
                        props.currentType(props.layoutType)
                    }
                }}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        currentLayId: state.layoutConfig.currentId,
        layoutConArr: state.layoutConfig.content
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({queryDel}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartLayoutQuery);
