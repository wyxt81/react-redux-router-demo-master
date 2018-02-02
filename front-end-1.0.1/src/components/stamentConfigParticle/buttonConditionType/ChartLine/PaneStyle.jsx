/**
 * Author：zhoushuanglong
 * Time：2017/6/20
 * Description：line style
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, Input, Button, message, Select, InputNumber} from 'antd';
import ReactColor from '../../../ReactColor';
import {contentStyle} from '../../../../actions/layout';
import {colorPickerInit} from '../../../../actions/colorPickerAction';

const FormItem = Form.Item;
const SelectOption = Select.Option;
class PaneStyle extends Component {
    state = {
        title: '未命名',
        style: {
            unit: "",
            xAxisSplitLineShow: "hide",
            xAxisSplitLineColor: "#ccc",
            xAxisSplitLineWidth: 1,
            xAxisSplitLineType: "solid",
            xAxisAxisLineColor: "#ccc",
            yAxisSplitLineShow: "show",
            yAxisSplitLineColor: "#ccc",
            yAxisSplitLineWidth: 1,
            yAxisSplitLineType: "solid",
            yAxisAxisLineColor: "#fff",
            legendShow: "show",
            labelNormalShow: "hide",
            yAxis: [],
            doubleY: "hide",
            nameL: "",
            nameR: "",
        }
    };

    renderChart = () => {
        const form = this.props.form.getFieldsValue();
        if (!form.title) {
            message.warning('标题不能为空');
        } else {
            if(form.doubleY == "show"){
                form.yAxis = [
                    {
                        name : form.nameL,
                        position : "left"
                    },
                    {
                        name : form.nameR,
                        position : "right"
                    }
                ]
            } else {
                form.yAxis = [];
            }
            this.setState({
                title: form.title,
                style: Object.assign({}, this.state.style, {...form}, {...this.props.colors}),
            }, () => {
                this.props.actions.contentStyle(this.props.currentCurId, this.props.currentSection, this.state.title, this.state.style);
            });
        }
    };

    componentDidMount() {
        const This = this;
        This.props.content.map((d, i) => {
            if (d.layoutId === This.props.currentCurId) {
                let section = d.children[This.props.currentSection];
                This.setState({
                    title: section.title,
                    style: Object.assign({}, this.state.style, section.condition.style),
                });
                This.props.actions.colorPickerInit({
                    xAxisSplitLineColor: section.condition.style.xAxisSplitLineColor || "#ccc",
                    xAxisAxisLineColor: section.condition.style.xAxisAxisLineColor || "#ccc",
                    yAxisSplitLineColor: section.condition.style.yAxisSplitLineColor || "#ccc",
                    yAxisAxisLineColor: section.condition.style.yAxisAxisLineColor || "#fff",
                });
            }
        });
    }

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
        let doubleYItem = [<FormItem
            {...formItemLayout}
            label="左Y轴"
            key="nameL"
        >
            {getFieldDecorator('nameL', {
                initialValue: this.state.style.nameL
            })(<Input placeholder="名称（单位）" type="text"/>)}
        </FormItem>,
            <FormItem
                {...formItemLayout}
                label="右Y轴"
                key="nameR"
            >
                {getFieldDecorator('nameR', {
                    initialValue: this.state.style.nameR
                })(<Input placeholder="名称（单位" type="text"/>)}
            </FormItem>];
        let singleYItem = <FormItem
            {...formItemLayout}
            label="单位"
        >
            {getFieldDecorator('unit', {
                initialValue: this.state.style.unit
            })(<Input placeholder="单位" type="text"/>)}
        </FormItem>;
        return <Form>
            <h3 className="parameter-title">标题</h3>
            <div className="parameter-content">
                <FormItem>
                    {getFieldDecorator('title', {
                        initialValue: this.state.title
                    })(<Input placeholder="标题" type="text"/>)}
                </FormItem>
            </div>
            <h3 className="parameter-title">X轴配置</h3>
            <div className="parameter-content">
                <FormItem
                    {...formItemLayout}
                    label="展示网格线"
                >
                    {getFieldDecorator('xAxisSplitLineShow', {
                        initialValue: this.state.style.xAxisSplitLineShow
                    })(<Select>
                        <SelectOption value="show">展示</SelectOption>
                        <SelectOption value="hide">不展示</SelectOption>
                    </Select>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网格线颜色"
                >
                    <ReactColor name={"xAxisSplitLineColor"} />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网格线宽度"
                >
                    {getFieldDecorator('xAxisSplitLineWidth', {
                        initialValue: this.state.style.xAxisSplitLineWidth
                    })(<InputNumber min={1} max={10} />)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网格线类型"
                >
                    {getFieldDecorator('xAxisSplitLineType', {
                        initialValue: this.state.style.xAxisSplitLineType
                    })(<Select>
                        <SelectOption value="solid">实线</SelectOption>
                        <SelectOption value="dashed">短横线</SelectOption>
                        <SelectOption value="dotted">虚线</SelectOption>
                    </Select>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="刻度线颜色"
                >
                    <ReactColor name={"xAxisAxisLineColor"} />
                </FormItem>
            </div>
            <h3 className="parameter-title">Y轴配置</h3>
            <div className="parameter-content">
                <FormItem
                    {...formItemLayout}
                    label="单双Y轴"
                >
                    {getFieldDecorator('doubleY', {
                        initialValue: this.state.style.doubleY
                    })(<Select>
                        <SelectOption value="show">双Y轴</SelectOption>
                        <SelectOption value="hide">单Y轴</SelectOption>
                    </Select>)}
                </FormItem>
                {this.props.form.getFieldsValue().doubleY == 'show' ? doubleYItem : singleYItem}
                <FormItem
                    {...formItemLayout}
                    label="展示网格线"
                >
                    {getFieldDecorator('yAxisSplitLineShow', {
                        initialValue: this.state.style.yAxisSplitLineShow
                    })(<Select>
                        <SelectOption value="show">展示</SelectOption>
                        <SelectOption value="hide">不展示</SelectOption>
                    </Select>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网格线颜色"
                >
                    <ReactColor name={"yAxisSplitLineColor"} />
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网格线宽度"
                >
                    {getFieldDecorator('yAxisSplitLineWidth', {
                        initialValue: this.state.style.yAxisSplitLineWidth
                    })(<InputNumber min={1} max={10} />)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="网格线类型"
                >
                    {getFieldDecorator('yAxisSplitLineType', {
                        initialValue: this.state.style.yAxisSplitLineType
                    })(<Select>
                        <SelectOption value="solid">实线</SelectOption>
                        <SelectOption value="dashed">短横线</SelectOption>
                        <SelectOption value="dotted">虚线</SelectOption>
                    </Select>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="刻度线颜色"
                >
                    <ReactColor name={"yAxisAxisLineColor"} />
                </FormItem>
            </div>
            <h3 className="parameter-title">数据样式</h3>
            <div className="parameter-content">
                <FormItem
                    {...formItemLayout}
                    label="展示图例"
                >
                    {getFieldDecorator('legendShow', {
                        initialValue: this.state.style.legendShow
                    })(<Select>
                        <SelectOption value="show">展示</SelectOption>
                        <SelectOption value="hide">不展示</SelectOption>
                    </Select>)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="展示数据"
                >
                    {getFieldDecorator('labelNormalShow', {
                        initialValue: this.state.style.labelNormalShow
                    })(<Select>
                        <SelectOption value="show">展示</SelectOption>
                        <SelectOption value="hide">不展示</SelectOption>
                    </Select>)}
                </FormItem>
            </div>
            <div className="parameter-content reload-chart">
                <Button type="primary" icon="reload" onClick={this.renderChart}>更新</Button>
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
        colors: state.colorPicker.colors,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({contentStyle, colorPickerInit}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PaneStyle));