/**
 * Author：zhoushuanglong
 * Time：2017/6/20
 * Description：line data
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Input, Button, message, Select} from 'antd';
import {contentData} from '../../../../actions/layout';

const FormItem = Form.Item;
const SelectOption = Select.Option;
class PaneData extends Component {
    state = {
        config: {
            text: '',
            fieldName: '',
            group: 'one',
        }
    };

    renderQuery = () => {
        const form = this.props.form.getFieldsValue();
        if(!form.text){
            message.warning('请输入条件名称');
        } else if (!form.fieldName) {
            message.warning('请输入日期字段');
        } else {
            this.setState({
                config: {...form},
            }, () => {
                this.props.actions.contentData(this.props.currentCurId, this.props.currentSection, form.group, this.state.config);
            });
            message.info('日期配置成功');
        }
    };

    componentWillMount() {
        const This = this;
        This.props.content.map((d, i) => {
            if (d.layoutId === This.props.currentCurId) {
                This.setState({
                    config: {
                        text: d.children[This.props.currentSection].condition.data.text,
                        fieldName: d.children[This.props.currentSection].condition.data.fieldName,
                        group: d.children[This.props.currentSection].group,
                    }
                });
            }
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 10 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 14 },
            },
        };
        return <Form>
            <h3 className="parameter-title">配置</h3>
            <div className="parameter-content">
                <FormItem
                    {...formItemLayout}
                    label="条件名称"
                >
                    {getFieldDecorator('text', {
                        initialValue: this.state.config.text
                    })(<Input placeholder="条件名称" type="text"/>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="日期字段"
                >
                    {getFieldDecorator('fieldName', {
                        initialValue: this.state.config.fieldName
                    })(<Input placeholder="日期字段" type="text"/>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="对比分组"
                >
                    {getFieldDecorator('group', {
                        initialValue: this.state.config.group
                    })(<Select>
                        <SelectOption value="one">第一组</SelectOption>
                        <SelectOption value="two">第二组</SelectOption>
                    </Select>)}
                </FormItem>
            </div>
            <div className="parameter-content reload-chart">
                <Button type="primary" icon="reload" onClick={this.renderQuery}>更新</Button>
            </div>
        </Form>
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.configData.dataList.rows,
        currentSection: state.layoutConfig.currentSection,
        currentCurId: state.layoutConfig.currentId,
        content: state.layoutConfig.content,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({contentData}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PaneData));