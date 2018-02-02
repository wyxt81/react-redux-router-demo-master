/**
 * Author：dengyu
 * Time：2017/9/5
 * Description：manage use edit
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Input, Button, Modal, Form, Table} from 'antd';
import {getManageUser, saveManageUser, roleManageUser, resetManageUser} from '../../../actions/manageUser';
import {compareObject} from '../../../public/index';

const confirm = Modal.confirm;
const FormItem = Form.Item;
class ManageUserEdit extends Component {
    clear = () => {
        let that = this;
        confirm({
            title: '清空提示',
            content: '确定要清空所填信息吗？',
            onOk() {
                that.props.form.setFieldsValue({
                    u_id: '',
                    name: '',
                    nikeName: '',
                    email: '',
                });
                that.setState({
                    selectedRoles: [],
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    roleSearch = (page) => { //查询配置的角色
        this.props.actions.roleManageUser({
            pageIndex: page,
            pageSize: this.props.roleList.pageSize,
            name: this.state.roleName,
        });
        this.setState({
            selectedRoles: [],
        });
    };

    roleReset = () => {
        this.setState({
            roleName: '',
        }, () => {
            this.roleSearch(1);
        });
    };

    onSelectRoleChange = (selectedRowKeys, selectedRows) => { //选择配置的角色
        this.setState({
            selectedRoles: selectedRowKeys,
        });
    };

    save = () =>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const form = this.props.form.getFieldsValue();
                this.props.actions.saveManageUser({
                    Id: this.state.id,
                    u_id: form.u_id,
                    name: form.name,
                    nikeName: form.nikeName,
                    email: form.email,
                    roleIds: this.state.selectedRoles.join(','),
                });
            }
        });
    };

    constructor(props){
        super(props);
        this.state = {
            id: '',
            init: {
                u_id: '',
                name: '',
                nikeName: '',
                email: '',
                roleIds: [],
            },
            roleColumns: [{
                title: '角色名称',
                dataIndex: 'name',
            }, {
                title: '角色描述',
                dataIndex: 'desc',
            }],
            selectedRoles: [], //已选择的角色
            roleName: '', //搜索条件，角色名称
        };
    };

    componentWillMount(){
        this.props.actions.roleManageUser({
            pageIndex: 1,
            pageSize: this.props.roleList.pageSize,
            name: '',
        });
        if(this.props.params.type != 'add'){
            this.props.actions.getManageUser(this.props.params.id);
        }
    };

    componentWillReceiveProps(newProps) {
        if(!compareObject(newProps.userEdit, this.props.userEdit)){
            let roleList = (newProps.userEdit.roleIds && newProps.userEdit.roleIds.length > 0) ? newProps.userEdit.roleIds.split(",") : [];
            this.setState({
                selectedRoles: roleList,
            });
        }
        this.setState({
            id: newProps.userEdit.id,
        });
    };

    componentWillUnmount(){
        this.props.actions.resetManageUser();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        const roleColumns = this.state.roleColumns;
        let roleList = this.props.roleList;
        roleList.rows = roleList.rows.map((value, index) => {
            return {...value, key: value.id.toString()}
        });
        const rowSelectionRole = {
            selectedRowKeys: this.state.selectedRoles,
            onChange: this.onSelectRoleChange,
        };
        return <div className="manage-edit">
            <Link to="/manage-user-list"><Button type="primary" icon="rollback">返回列表</Button></Link>
            <div className="write-sql">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="用户名称："
                    >
                        {getFieldDecorator('u_id', {
                            initialValue: this.state.init.u_id,
                            rules: [{required: true, message: '请输入用户名称'}]
                        })(
                            <Input type="text" placeholder="请输入用户名称"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="真实姓名："
                    >
                        {getFieldDecorator('name', {
                            initialValue: this.state.init.name,
                            rules: [{required: true, message: '请输入真实姓名'}]
                        })(
                            <Input type="text" placeholder="请输入真实姓名"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="用户别名："
                    >
                        {getFieldDecorator('nikeName', {
                            initialValue: this.state.init.nikeName,
                            rules: [{required: true, message: '请输入用户别名'}]
                        })(
                            <Input type="text" placeholder="请输入用户别名"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="邮箱："
                    >
                        {getFieldDecorator('email', {
                            initialValue: this.state.init.email,
                            rules: [{required: true, message: '请输入邮箱'},
                                {type: 'email', message: '请输入正确的邮箱格式'}]
                        })(
                            <Input type="text" placeholder="请输入邮箱"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="角色："
                    >
                        <div className="manage-setting">
                            <label>角色名称</label>
                            <Input placeholder="角色名称" value={this.state.roleName} onChange={(e) => this.setState({roleName: e.target.value})} />
                            <Button type="primary" icon="search" onClick={() => this.roleSearch(1)} >查询</Button>
                            <Button type="primary" icon="reload" onClick={() => this.roleReset()} >重置</Button>
                        </div>
                        <Table
                            bordered
                            size="small"
                            dataSource={roleList.rows}
                            columns={roleColumns}
                            rowSelection={rowSelectionRole}
                            pagination={{
                                current:roleList.pageIndex,
                                pageSize:roleList.pageSize,
                                total:roleList.total,
                                showQuickJumper: true,
                                onChange:(page) => this.roleSearch(page)
                            }} />
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
        userEdit: state.manageUser.userEdit,
        roleList: state.manageUser.roleList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getManageUser, saveManageUser, roleManageUser, resetManageUser}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Form.create({
    mapPropsToFields(props) {
        return {
            u_id: {
                value: props.userEdit.u_id
            },
            name: {
                value: props.userEdit.name
            },
            nikeName: {
                value: props.userEdit.nikeName
            },
            email: {
                value: props.userEdit.email
            },
        };
    }
})(ManageUserEdit))