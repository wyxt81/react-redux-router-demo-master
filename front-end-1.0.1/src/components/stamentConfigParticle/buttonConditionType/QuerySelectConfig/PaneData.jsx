/**
 * Author：dengyu
 * Time：2017/8/21
 * Description：query select config
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
            title: '',
            code: '',
            text: '',
            group: 'one',
        }
    };

    renderQuery = () => {
        const form = this.props.form.getFieldsValue();
        if(!form.title){
            message.warning('请输入条件名称');
        } else if(!form.code || !form.code.trim()){
            message.warning('请输入选项名称');
        } else if (!form.text || !form.text.trim()) {
            message.warning('请输入选项编码');
        } else {
            let code = form.code.trim().split(' ');
            let text = form.text.trim().split(' ');
            if(code.length == text.length){
                let selects = [];
                code.forEach((item, index) => {
                    selects.push({
                        code: item,
                        text: text[index],
                    });
                });
                this.props.actions.contentData(this.props.currentCurId, this.props.currentSection, form.group, { selects: selects, text: form.title });
                message.info('下拉框配置成功');
            } else {
                message.warning('选项名称和选项编码的数量没有匹配');
            }
        }
    };

    componentWillMount() {
        const This = this;
        This.props.content.map((d, i) => {
            if (d.layoutId === This.props.currentCurId) {
                let selects = d.children[This.props.currentSection].condition.data.selects;
                let text = '';
                let code = '';
                if(Object.prototype.toString.call(selects) == "[object Array]" && selects.length > 0){
                    selects.forEach((item, index) => {
                        text += item.text + ' ';
                        code += item.code + ' ';
                    });
                }
                This.setState({
                    config: {
                        title: d.children[This.props.currentSection].condition.data.text,
                        text: text,
                        code: code,
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
                    {getFieldDecorator('title', {
                        initialValue: this.state.config.title
                    })(<Input placeholder="条件名称" type="text"/>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="选项名称"
                >
                    {getFieldDecorator('text', {
                        initialValue: this.state.config.text
                    })(<textarea placeholder="选项名称" />)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="选项编码"
                >
                    {getFieldDecorator('code', {
                        initialValue: this.state.config.code
                    })(<textarea placeholder="选项编码" />)}
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