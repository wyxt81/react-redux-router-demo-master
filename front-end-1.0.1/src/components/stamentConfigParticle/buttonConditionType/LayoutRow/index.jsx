/**
 * Author：zhoushuanglong
 * Time：2017/6/14
 * Description：layout row
 */

import React, {Component} from 'react';
import {Form, InputNumber, Tabs, Button} from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
class LayoutRow extends Component {
    state = {
        heightVal: 0
    };

    setHeight = () => {
        const This = this;
        This.props.currentHeight(function (height) {
            This.setState({
                heightVal: height
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
                    <h3 className="parameter-title">高度</h3>
                    <div className="parameter-content">
                        <FormItem>
                            {getFieldDecorator('height', {
                                initialValue: this.state.heightVal
                            })(<InputNumber style={{width: '100%'}} min={100}/>)}
                        </FormItem>
                    </div>
                    <div className="parameter-content reload-chart">
                        <Button onClick={() => {
                            this.props.setStyle(this.props.form.getFieldsValue().height);
                        }} type="primary" icon="reload">更新</Button>
                    </div>
                </Form>
            </TabPane>
        </Tabs>
    }
}

export default Form.create()(LayoutRow);