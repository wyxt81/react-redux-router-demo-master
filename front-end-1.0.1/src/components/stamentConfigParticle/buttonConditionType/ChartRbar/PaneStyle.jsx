/**
 * Author：dengyu
 * Time：2017/8/14
 * Description：pane style
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
            xAxisAxisLineColor: "#ccc",//配置y轴的颜色
            yAxisSplitLineShow: "show",
            yAxisSplitLineColor: "#ccc",
            yAxisSplitLineWidth: 1,
            yAxisSplitLineType: "solid",
            yAxisAxisLineColor: "#fff",//配置x轴的颜色
            seriesBarCategoryGap : 40,
            seriesBarGap: 10,
            legendShow: "show",
            labelNormalShow: "hide",
            xAxis: [],
            doubleX: "hide",
            nameT: "",
            nameB: "",
        },
    };

    renderChart = () => {
        const form = this.props.form.getFieldsValue();
        if (!form.title) {
            message.warning('标题不能为空');
        } else {
            if(form.doubleX == "show"){
                form.xAxis = [
                    {
                        name : form.nameT,
                        position : "top"
                    },
                    {
                        name : form.nameB,
                        position : "bottom"
                    }
                ]
            } else {
                form.xAxis = [];
            }
            this.setState({
                title: form.title,
                style: Object.assign({}, this.state.style, {...form}, {...this.props.colors}),
            }, () => {
                this.props.actions.contentStyle(this.props.currentCurId, this.props.currentSection, this.state.title, this.state.style);
            });
        }
    };

    componentWillMount() {
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
        let doubleXItem = [<FormItem
            {...formItemLayout}
            label="上X轴"
            key="nameT"
        >
            {getFieldDecorator('nameT', {
                initialValue: this.state.style.nameT
            })(<Input placeholder="名称（单位）" type="text"/>)}
        </FormItem>,
            <FormItem
                {...formItemLayout}
                label="下X轴"
                key="nameB"
            >
                {getFieldDecorator('nameB', {
                    initialValue: this.state.style.nameB
                })(<Input placeholder="名称（单位" type="text"/>)}
            </FormItem>];
        let singleXItem = <FormItem
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
            <h3 className="parameter-title">间距</h3>
            <div className="parameter-content">
                <FormItem
                    {...formItemLayout}
                    label="类目间距离"
                >
                    {getFieldDecorator('seriesBarCategoryGap', {
                        initialValue: this.state.style.seriesBarCategoryGap
                    })(<InputNumber min={0} max={100} />)}
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="柱间距离"
                >
                    {getFieldDecorator('seriesBarGap', {
                        initialValue: this.state.style.seriesBarGap
                    })(<InputNumber min={0} max={100} />)}
                </FormItem>
            </div>
            <h3 className="parameter-title">X轴配置</h3>
            <div className="parameter-content">
                <FormItem
                    {...formItemLayout}
                    label="单双X轴"
                >
                    {getFieldDecorator('doubleX', {
                        initialValue: this.state.style.doubleX
                    })(<Select>
                        <SelectOption value="show">双X轴</SelectOption>
                        <SelectOption value="hide">单X轴</SelectOption>
                    </Select>)}
                </FormItem>
                {this.props.form.getFieldsValue().doubleX == 'show' ? doubleXItem : singleXItem}
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
                    <ReactColor name={"yAxisAxisLineColor"} />
                </FormItem>
            </div>
            <h3 className="parameter-title">Y轴配置</h3>
            <div className="parameter-content">
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
                    <ReactColor name={"xAxisAxisLineColor"} />
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