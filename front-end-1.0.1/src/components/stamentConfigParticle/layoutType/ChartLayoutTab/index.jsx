/**
 * Author：zhoushuanglong
 * Time：2017/6/6
 * Description：chart layout tabs
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Tabs, Button, Menu, Dropdown, Modal} from 'antd';

import {deleteTab} from '../../../../actions/layout';

const TabPane = Tabs.TabPane;
const confirm = Modal.confirm;
class ChartLayoutTab extends Component {
    state = {
        curTabPane: '0',
        visible: false
    };

    calculateBtnWidth = () => {
        const $comRoot = $('#' + this.props.id);
        $comRoot.find('.ant-tabs-tab').each(function () {
            let index = $(this).index(),
                curWidth = parseInt($(this).width()) + 24 + 20 * 2;
            if (index !== 0) {
                $comRoot.find('a.chart-layout-header-btn').eq(index - 1).width(curWidth);
            }
        });
    };

    componentWillReceiveProps(nextProps) {
        if (this.props.children.length !== nextProps.children.length) {
            this.setState({
                curTabPane: '0'
            });
            if(!this.props.showReport){
                this.props.layoutCurrent(this.props.id, 0);
            }
        }
    }

    componentDidMount() {
        this.calculateBtnWidth();

        const This = this;
        $(document).on('click', '#' + this.props.id + ' .ant-tabs-tabpane', function () {
            let index = $(this).index();
            if (!This.props.showReport) {
                This.props.layoutCurrent(This.props.id, index);
            }
            return false;
        });
    }

    componentDidUpdate() {
        this.calculateBtnWidth();
    }

    componentWillUnmount() {
        $(document).off('click', '#' + this.props.id + ' .ant-tabs-tabpane');
    }

    render() {
        const This = this;
        const props = this.props;
        return <div
            className="chart-layout chart-layout-tabs"
            id={props.id}>
            <Tabs
                activeKey={this.state.curTabPane}
                onClick={() => {
                    if (!props.showReport) {
                        props.layoutCurrent(props.id, this.state.curTabPane);
                    }
                }}>
                {props.children.map(function (d, i) {
                    return <TabPane tab={props.title[i]} key={i}>{d}</TabPane>
                })}
            </Tabs>
            <div
                className="chart-layout-btn"
                onClick={() => {
                    if (!props.showReport) {
                        props.layoutCurrent(props.id, this.state.curTabPane);
                    }
                }}>
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
                className="chart-layout-header"
                onClick={() => {
                    if (!props.showReport) {
                        props.currentType(props.layoutType);
                    }
                }}>
                <div
                    className={"chart-layout-header-background " + (!props.showReport && props.currentLayId === props.id ? 'active' : '')}
                    onClick={() => {
                        if (!props.showReport) {
                            props.layoutCurrent(props.id, this.state.curTabPane);
                        }
                    }}/>
                <div className="chart-layout-header-btn-wrap">{props.children.map(function (d, i) {
                    return <a className="chart-layout-header-btn" key={i} onClick={() => {
                        if (!props.showReport) {
                            props.layoutCurrent(props.id, i);
                        }
                        This.setState({
                            curTabPane: i.toString()
                        })
                    }}>
                        {!props.showReport ? <Button onClick={() => {
                            confirm({
                                title: '删除提示',
                                content: '确定要删除此TAB吗？',
                                onOk() {
                                    props.actions.deleteTab(props.currentLayId, i);
                                }
                            });
                        }} className="tab-del-btn" icon="delete" size="small" shape="circle" title="删除此TAB"/> : ''}
                    </a>
                })}</div>
            </div>
            <div className="chart-layout-title">
                {props.titleL}
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        currentLayId: state.layoutConfig.currentId
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({deleteTab}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ChartLayoutTab);