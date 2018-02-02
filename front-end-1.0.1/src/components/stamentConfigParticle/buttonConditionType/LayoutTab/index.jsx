/**
 * Author：zhoushuanglong
 * Time：2017/6/14
 * Description：layout tab
 */


import React, {Component} from 'react';
import {Form, InputNumber, Tabs, Button, Input} from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class LayoutTab extends Component {
    state = {
        title: '',
        heightVal: 0,
        tabsNumber: 0
    };

    setHeight = () => {
        const This = this;
        This.props.currentHeight(function (height, title, tabsNumber) {
            This.setState({
                heightVal: height,
                title: title,
                tabsNumber: tabsNumber,
            });
        });
    };

    componentWillMount() {
        this.setHeight();
    }

    componentWillReceiveProps(nextProps) {
        this.setHeight();
    }

    render() {
        const {getFieldDecorator} = this.props.form;
        return <Tabs size="small">
            <TabPane tab="样式" key="1">
                <Form>
                    <h3 className="parameter-title">标题</h3>
                    <div className="parameter-content">
                        <FormItem>
                            {getFieldDecorator('title', {
                                initialValue: this.state.title
                            })(<Input placeholder="标题" type="text"/>)}
                        </FormItem>
                    </div>
                    <h3 className="parameter-title">TAB数量</h3>
                    <div className="parameter-content">
                        <FormItem>
                            {getFieldDecorator('tabs', {
                                initialValue: this.state.tabsNumber
                            })(<InputNumber style={{width: '100%'}} min={1} max={5}/>)}
                        </FormItem>
                    </div>
                    <h3 className="parameter-title">高度</h3>
                    <div className="parameter-content">
                        <FormItem>
                            {getFieldDecorator('height', {
                                initialValue: this.state.heightVal
                            })(<InputNumber style={{width: '100%'}} min={1}/>)}
                        </FormItem>
                    </div>
                    <div className="parameter-content reload-chart">
                        <Button onClick={() => {
                            const formVal = this.props.form.getFieldsValue();
                            this.props.setStyle(formVal.height, formVal.title, formVal.tabs);
                        }} type="primary" icon="reload">更新</Button>
                    </div>
                </Form>
            </TabPane>
        </Tabs>
    }
}

export default Form.create()(LayoutTab);