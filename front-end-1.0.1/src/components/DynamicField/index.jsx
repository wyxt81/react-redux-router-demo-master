/**
 * Author：dengyu
 * Time：2017/10/18
 * Description：dynamic field
 */

import React, {Component} from 'react';
import { Form, Input, Icon, Button, Row, Col, Modal } from 'antd';
const FormItem = Form.Item;
import {compareObject} from '../../public/index';
import './index.scss';

class DynamicField extends Component {
    remove = (k) => {
        const keys = this.state.keys;
        if (keys.length === 1) {
            return;
        }
        this.setState({
            keys: keys.filter(key => key !== k),
        });
    };

    add = () => {
        const keys = this.state.keys;
        const nextKeys = keys.concat(this.state.uuid);
        this.setState({
            keys: nextKeys,
            uuid: this.state.uuid + 1,
        });
    };

    onChange(e, name){
        this.setState({
            [name]: e.target.value,
        });
    };

    ensure = () => {
        const item = this.props.item;
        const keys = this.state.keys;
        let vailate = true;
        let list = [];
        for(let i = 0; i < keys.length; i++){
            if(vailate){
                let row = {};
                for(let j = 0; j < item.length; j++){
                    if(this.state[item[j].dataIndex + '-' + keys[i]]){
                        row[item[j].dataIndex] = this.state[item[j].dataIndex + '-' + keys[i]]; //每个输入框的值赋给数据某行的一个属性
                    } else {
                        vailate = false;
                        break;
                    }
                }
                list.push(row);
            } else {
                break;
            }
        }
        if(!vailate){
            Modal.error({
                title: "请填写所有的文本框",
                content:  '',
            });
            return;
        }
        if(list.length == 0){
            Modal.error({
                title: "请至少填写一行数据",
                content:  '',
            });
            return;
        }
        if(typeof this.props.dynamicChange === "function"){
            this.props.dynamicChange(this.props.list, list);
        }
    };

    constructor(props){
        super(props);
        this.state = {
            keys: [],
            uuid: 0,
        };
    };

    componentWillMount(){
        if(Object.prototype.toString.call(this.props.data) == '[object Array]' && this.props.data.length > 0){
            let keys = [];
            let uuid = 0;
            this.props.data.forEach((row, rown) => {
                keys.push(rown);
                uuid++;
                this.props.item.forEach((col, coln) => {
                    this.setState({
                        [col.dataIndex + '-' + rown]: row[col.dataIndex], //数据某行的一个属性给每个输入框赋值
                    });
                });
            });
            this.setState({
                keys: keys,
                uuid: uuid,
            });
        }
    };

    componentWillReceiveProps(newProps){
        if(!compareObject(newProps.data, this.props.data) && Object.prototype.toString.call(newProps.data) == '[object Array]' && newProps.data.length > 0){
            let keys = [];
            let uuid = 0;
            newProps.data.forEach((row, rown) => {
                keys.push(rown);
                uuid++;
                newProps.item.forEach((col, coln) => {
                    this.setState({
                        [col.dataIndex + '-' + rown]: row[col.dataIndex], //数据某行的一个属性给每个输入框赋值
                    });
                });
            });
            this.setState({
                keys: keys,
                uuid: uuid,
            });
        }
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 9 },
            wrapperCol: { span: 15 },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: { span: 24 },
        };
        const keys = this.state.keys;
        const formItems = keys.map((k, index) => {
            let row = this.props.item.map((value, indexr) => {
                return <Col span={this.props.span} key={index + '-' + indexr} >
                    <FormItem
                        {...formItemLayout}
                        label={value.title}
                    >
                        <Input placeholder={"请输入" + value.title} value={this.state[value.dataIndex + '-' + k]} onChange={(e) => this.onChange(e, value.dataIndex + '-' + k)} />
                    </FormItem>
                </Col>
            });
            return (
                <Row gutter={9} key={index} >
                    {row}
                    {keys.length > 1 ? (
                        <Col span={1} >
                            <Icon
                            className="dynamic-delete-button"
                            type="minus-circle-o"
                            disabled={keys.length === 1}
                            onClick={() => this.remove(k)}
                            />
                        </Col>
                    ) : null}
                </Row>
            );
        });
        return <div className="dynamic-field" style={{height: this.props.height}}>
            <Form>
                {formItems}
                <FormItem {...formItemLayoutWithOutLabel} style={{ textAlign: 'center' }} >
                    <Button type="dashed" onClick={this.add} style={{ width: '25%' }}>
                        <Icon type="plus" />添加
                    </Button>
                    <span style={{ width: '9px', display: 'inline-block' }}> </span>
                    <Button type="default" onClick={this.ensure} style={{ width: '25%' }}>
                        <Icon type="check" />确定
                    </Button>
                </FormItem>
            </Form>
        </div>;
    }
}

export default Form.create()(DynamicField);