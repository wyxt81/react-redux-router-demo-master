/**
 * Author：dengyu
 * Time：2017/10/9
 * Description：manage templet edit
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Input, Button, Modal, Form, Radio, Icon, Upload} from 'antd';
import {getManageTemplet, saveManageTemplet} from '../../../actions/manageTemplet';
import { JAVAURL } from '../../../constants/index';
import {loginTimeOut} from '../../../public/index';
import {compareObject} from '../../../public/index';

const confirm = Modal.confirm;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
class ManageTempletEdit extends Component {
    clear = () => {
        let that = this;
        confirm({
            title: '清空提示',
            content: '确定要清空所填信息吗？',
            onOk() {
                that.props.form.setFieldsValue({
                    templateName: '',
                    templateType: 0,
                    uploadName: [],
                });
                that.setState({
                    fileUrl: '',
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    normFile = (e) => {
        if(Object.prototype.toString.call(e.fileList) == '[object Array]'){
            if(e.fileList.length == 0){
                return [];
            } else {
                let response = e.file.response;
                if(response){
                    if(response.status == 'W'){
                        loginTimeOut();
                        return;
                    } else if(response.status == 'S'){
                        this.setState({
                            fileUrl: response.data,
                        });
                        return [e.file];
                    } else {
                        Modal.error({
                            title: response.msg,
                            content:  '',
                        });
                        return [];
                    }
                } else {
                    return [e.file];
                }
            }
        } else {
            return [];
        }
    };

    save = () =>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const form = this.props.form.getFieldsValue();
                this.props.actions.saveManageTemplet({
                    id: this.state.id,
                    templateName: form.templateName,
                    templateType: form.templateType,
                    fileUrl: this.state.fileUrl,
                    fileName: form.uploadName[0].name
                });
            }
        });
    };

    constructor(props){
        super(props);
        this.state = {
            id: '',
            init: {
                templateName: '',
                templateType: 0,
                uploadName: [],
            },
            fileUrl: '',
        };
    };

    componentWillMount(){
        if(this.props.params.type != 'add'){
            this.props.actions.getManageTemplet(this.props.params.id);
        }
    };

    componentWillReceiveProps(newProps) {
        if(!compareObject(newProps.templetEdit, this.props.templetEdit)){
            this.setState({
                id: newProps.templetEdit.id,
                fileUrl: newProps.templetEdit.fileUrl,
            });
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        return <div className="manage-edit">
            <Link to="/manage-templet-list"><Button type="primary" icon="rollback">返回列表</Button></Link>
            <div className="write-sql">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="模板名称："
                    >
                        {getFieldDecorator('templateName', {
                            initialValue: this.state.init.templateName,
                            rules: [{required: true, message: '请输入模板名称'}]
                        })(
                            <Input type="text" placeholder="请输入模板名称"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="模板文件："
                    >
                        {getFieldDecorator('uploadName', {
                            valuePropName: 'fileList',
                            getValueFromEvent: this.normFile,
                            initialValue: this.state.init.uploadName,
                            rules: [{required: true, message: '请上传模板'}]
                        })(
                            <Upload action={JAVAURL + "/common/uploadFile.do"} >
                                <Button><Icon type="upload" />上传模板</Button>
                            </Upload>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="模板类型："
                    >
                        {getFieldDecorator('templateType', {
                            initialValue: this.state.init.templateType,
                            rules: [{required: true, message: '请输入模板类型'}]
                        })(
                            <RadioGroup>
                                <Radio value={0}>海外</Radio>
                                <Radio value={1}>国内</Radio>
                            </RadioGroup>
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
        templetEdit: state.manageTemplet.templetEdit,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getManageTemplet, saveManageTemplet}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Form.create({
    mapPropsToFields(props) {
        let fileUrl = props.templetEdit.fileUrl;
        return {
            templateName: {
                value: props.templetEdit.templateName
            },
            uploadName: {
                value: fileUrl ? [{
                    uid: -1,
                    name: props.templetEdit.fileName,
                    status: 'done',
                }] : [],
            },
            templateType: {
                value: props.templetEdit.templateType
            },
        };
    }
})(ManageTempletEdit))