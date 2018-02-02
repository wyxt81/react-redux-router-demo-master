/**
 * Author：zhoushuanglong
 * Time：2017/6/20
 * Description：line data
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Select, Button, Row, Col, message} from 'antd';

import {QUERYRANGE, QUERYDATE, QUERYDATEONE, QUERYSELECT, QUERYSELECTLINKAGE, QUERYSELECTCONFIG, QUERYRADIO, QUERYCHECKBOX, QUERYDISTRICT, QUERYCOMPARE} from '../../../../constants/layoutBtnType';
import {queryAdd, queryDel, currentId, currentType} from '../../../../actions/layout';

const FormItem = Form.Item;
const Option = Select.Option;
class PaneData extends Component {
    queryAddFuc = () => {
        const type = this.props.form.getFieldsValue().queryType;
        let canAdd = true;
        switch (type) {
            case QUERYDATE:
            case QUERYDATEONE:
            case QUERYSELECT:
            case QUERYSELECTLINKAGE:
            case QUERYSELECTCONFIG:
            case QUERYRADIO:
            case QUERYCHECKBOX:
            case QUERYDISTRICT:
                break;
            case QUERYRANGE:
            case QUERYCOMPARE:
                this.props.content.forEach((layout, ilayout) => {
                    if (layout.layoutId === this.props.currentId) {
                        layout.children.forEach((item, index) => {
                            if (item.contentType === type) {
                                message.warning('该类型条件只能添加一个');
                                canAdd = false;
                            }
                        });
                    }
                });
                break;
            default:
                canAdd = false;
                break;
        }
        if(canAdd){
            this.props.actions.queryAdd(this.props.currentId, type);
            let queryLength = 0;
            this.props.content.forEach(d => {
                if (d.layoutId === this.props.currentId) {
                    queryLength = d.children.length;
                }
            });
            this.props.actions.currentId(this.props.currentId, queryLength - 1);
            this.props.actions.currentType(type);
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return <Form>
            <h3 className="parameter-title">添加查询类型</h3>
            <div className="parameter-content">
                <Row>
                    <Col span={18}>
                        <FormItem>
                            {getFieldDecorator('queryType', {
                                initialValue: '请选择查询类型'
                            })(<Select placeholder="查询类型">
                                <Option value={QUERYRANGE}>时间范围</Option>
                                <Option value={QUERYDATE}>时间段</Option>
                                <Option value={QUERYDATEONE}>时间点</Option>
                                <Option value={QUERYSELECT}>条件型下拉框</Option>
                                <Option value={QUERYSELECTCONFIG}>配置型下拉框</Option>
                                <Option value={QUERYRADIO}>单选按钮</Option>
                                <Option value={QUERYCHECKBOX}>复选框</Option>
                                <Option value={QUERYDISTRICT}>地区</Option>
                                <Option value={QUERYSELECTLINKAGE}>游戏渠道网关</Option>
                                <Option value={QUERYCOMPARE}>对比按钮</Option>
                            </Select>)}
                        </FormItem>
                    </Col>
                    <Col span={6}>
                        <FormItem>
                            <Button onClick={this.queryAddFuc} style={{float: 'right'}} type="primary" icon="plus"/>
                        </FormItem>
                    </Col>
                </Row>
            </div>
        </Form>
    }
}

const mapStateToProps = (state) => {
    return {
        currentId: state.layoutConfig.currentId,
        content: state.layoutConfig.content,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({queryAdd, queryDel, currentId, currentType}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PaneData));