/**
 * Author：dengyu
 * Time：2017/9/5
 * Description：manage use list
 */

import React, {Component} from 'react';
import {Button, Modal, Input, Table} from 'antd';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {currentUser, searchManageUser, delManageUser, sizeManageUser, author} from '../../../actions/manageUser';
import {formatDate} from '../../../public/index';

const confirm = Modal.confirm;

class ManageUserList extends Component {

    search = (page) => {
        this.props.actions.searchManageUser({
            pageIndex: page,
            pageSize: this.props.userList.pageSize,
            u_id: this.state.u_id,
            name: this.state.name,
            nikeName: this.state.nikeName,
            email: this.state.email,
        });
    };

    reset = () => {
        this.setState({
            u_id: '',
            name: '',
            nikeName: '',
            email: '',
        }, () => {
            this.search(1);
        });
    };

    onShowSizeChange = (current, pageSize) => {
        this.props.actions.sizeManageUser(pageSize);
        this.props.actions.searchManageUser({
            pageIndex: 1,
            pageSize: pageSize,
            u_id: this.state.u_id,
            name: this.state.name,
            nikeName: this.state.nikeName,
            email: this.state.email,
        });
    };

    currentUser = () => {
        this.props.actions.currentUser();
    };

    author = () => {
        this.props.actions.author();
    };

    delConfirm = (id) => {
        let that = this;
        confirm({
            title: '删除提示',
            content: '确定要删除这条记录吗？',
            onOk() {
                that.props.actions.delManageUser({
                    id: id,
                    pageIndex: 1,
                    pageSize: that.props.userList.pageSize,
                    u_id: that.state.u_id,
                    name: that.state.name,
                    nikeName: that.state.nikeName,
                    email: that.state.email,
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    edit = (id) =>{
        this.props.actions.push('/manage-user/edit/' + id);
    };

    constructor(props){
        super(props);
        this.columns = [{
            title: '用户名称',
            dataIndex: 'u_id',
        }, {
            title: '真实姓名',
            dataIndex: 'name',
        }, {
            title: '用户别名',
            dataIndex: 'nikeName',
        }, {
            title: '邮箱',
            dataIndex: 'email',
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            render: (text) => {
                return formatDate(text, 'yyyy-MM-dd HH:mm:ss');
            }
        }, {
            title: '末次登录时间',
            dataIndex: 'last_login_time',
            render: (text) => {
                return formatDate(text, 'yyyy-MM-dd HH:mm:ss');
            }
        }, {
            title: '末次登录IP',
            dataIndex: 'ip',
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => (
                <span key={index} >
                    <Button type="primary" icon="edit" shape="circle" size="small" onClick={() => this.edit(record.id)} />
                    <Button type="default" icon="delete" shape="circle" size="small" onClick={() => this.delConfirm(record.id)}/>
                </span>
            ),
        }];
        this.state = {
            u_id: '',
            name: '',
            nikeName: '',
            email: '',
        }
    };

    componentWillMount(){
        this.props.actions.searchManageUser({
            pageIndex: 1,
            pageSize: this.props.userList.pageSize,
            u_id: '',
            name: '',
            nikeName: '',
            email: '',
        });
    };

    render() {
        const columns = this.columns;
        let userList = this.props.userList;
        userList.rows = userList.rows.map((value, index) => {
            return {...value, key: value.id}
        });
        return <div className="manage-list">
            <div className="manage-search">
                <label>用户名称</label>
                <Input placeholder="用户名称" value={this.state.u_id} onChange={(e) => this.setState({u_id: e.target.value})} />
                <label>真实姓名</label>
                <Input placeholder="真实姓名" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                <label>用户别名</label>
                <Input placeholder="用户别名" value={this.state.nikeName} onChange={(e) => this.setState({nikeName: e.target.value})} />
                <label>邮箱</label>
                <Input placeholder="邮箱" value={this.state.email} onChange={(e) => this.setState({email: e.target.value})} />
                <Button type="primary" icon="search" onClick={() => this.search(1)} >查询</Button>
                <Button type="primary" icon="reload" onClick={() => this.reset()} >重置</Button>
                {/*<Button type="primary" icon="reload" onClick={() => this.currentUser()} >查看当前用户</Button>*/}
                {/*<Button type="primary" icon="reload" onClick={() => this.author()} >权限</Button>*/}
            </div>
            <Table
                bordered
                size="small"
                dataSource={userList.rows}
                columns={columns}
                pagination={{
                    current:userList.pageIndex,
                    pageSize:userList.pageSize,
                    total:userList.total,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    pageSizeOptions: ['20', '40','60' , '80' , '100'],
                    onShowSizeChange: (current, pageSize) => this.onShowSizeChange(current, pageSize),
                    onChange:(page) => this.search(page)
                }} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        userList: state.manageUser.userList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, searchManageUser, delManageUser, currentUser, sizeManageUser, author}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageUserList);