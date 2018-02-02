/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage game edit
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Input, Button, Modal, Form} from 'antd';
import {getManageGame, saveManageGame} from '../../../actions/manageGame';

const confirm = Modal.confirm;
const FormItem = Form.Item;
class ManageGameEdit extends Component {
    clear = () => {
        let that = this;
        confirm({
            title: '清空提示',
            content: '确定要清空所填信息吗？',
            onOk() {
                that.props.form.setFieldsValue({
                    name: '',
                    series: ''
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    save = () =>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const form = this.props.form.getFieldsValue();
                this.props.actions.saveManageGame({
                    id: this.state.id,
                    name: form.name,
                    series: form.series,
                });
            }
        });
    };

    constructor(props){
        super(props);
        this.state = {
            id: '',
            init: {
                name: '',
                series: ''
            },
        };
    };

    componentWillMount(){
        if(this.props.params.type != 'add'){
            this.props.actions.getManageGame(this.props.params.id);
        }
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            id: newProps.gameEdit.id,
        });
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        return <div className="manage-edit">
            <Link to="/manage-game-list"><Button type="primary" icon="rollback">返回列表</Button></Link>
            <div className="write-sql">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="游戏名称："
                    >
                        {getFieldDecorator('name', {
                            initialValue: this.state.init.name,
                            rules: [{required: true, message: '请输入游戏名称'}]
                        })(
                            <Input type="text" placeholder="请输入游戏名称"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="游戏系列："
                    >
                        {getFieldDecorator('series', {
                            initialValue: this.state.init.series,
                            rules: [{required: true, message: '请输入游戏系列'}]
                        })(
                            <Input type="text" placeholder="请输入游戏系列"/>
                        )}
                    </FormItem>
                </Form>
                <div className="run-sql" >
                    <Button type="primary" size="large" icon="save" onClick={this.save} >保存</Button>
                    <Button type="default" size="large" icon="delete" onClick={this.clear}>清空</Button>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        gameEdit: state.manageGame.gameEdit,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getManageGame, saveManageGame}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Form.create({
    mapPropsToFields(props) {
        return {
            name: {
                value: props.gameEdit.name
            },
            series: {
                value: props.gameEdit.series
            },
        };
    }
})(ManageGameEdit))