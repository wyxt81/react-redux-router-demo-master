/**
 * Author：zhoushuanglong
 * Time：2017/6/20
 * Description：line data
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Select, Button, message} from 'antd';

import {contentData} from '../../../../actions/layout';

const FormItem = Form.Item;
const SelectOption = Select.Option;
class PaneData extends Component {
    state = {
        config: {
            source: '',
            fieldName: '',
            text: '',
            colcode: '',
            coltext: '',
            selectSql: '',
            group: 'one',
        }
    };

    sourceChange = (val) => {
        this.props.searchConfigQuery({
            pageIndex: 1,
            pageSize: 20,
            source: val
        });
    };

    sourceSelect = (val) => {
        const This = this;
        const form = this.props.form.getFieldsValue();
        This.props.dataList.map((d, i) => {
            if (d.source.toString() === val.toString()) {
                This.setState({
                    config: {
                        colcode: d.colcode,
                        coltext: d.coltext,
                        source: d.source,
                        fieldName: d.code,
                        text: d.text,
                        selectSql: d.sql,
                        group: this.state.config.group
                    }
                });
            }
        });
    };

    renderQuery = () => {
        const form = this.props.form.getFieldsValue();
        if (!form.source) {
            message.warning('请选择查询条件');
        } else {
            this.setState({
                config: {
                    ...this.state.config,
                    group: form.group
                }
            }, () => {
                this.props.actions.contentData(this.props.currentCurId, this.props.currentSection, form.group, this.state.config);
            });
            message.info('条件配置成功');
        }
    };

    componentWillMount() {
        this.props.searchConfigQuery({
            pageIndex: 1,
            pageSize: 20,
            source: '',
        });
        const This = this;
        This.props.content.map((d, i) => {
            if (d.layoutId === This.props.currentCurId) {
                This.setState({
                    config: {
                        ...d.children[This.props.currentSection].condition.data,
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
                    label="查询条件"
                >
                    {getFieldDecorator('source', {
                        initialValue: this.state.config.source
                    })(<Select
                        mode="combobox"
                        placeholder="查询条件"
                        onSearch={this.sourceChange}
                        onSelect={this.sourceSelect}>
                        {this.props.dataList.map((d, i) => <SelectOption
                            value={d.source.toString()}
                            key={d.id}>
                            {d.source}</SelectOption>)}
                    </Select>)}
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
        dataList: state.configQuery.dataList.rows,
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