/**
 * Author：dengyu
 * Time：2017/9/6
 * Description：manage role list
 */

import React, {Component} from 'react';
import {Button, Modal, Input, Table} from 'antd';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchManageRole, delManageRole, sizeManageRole} from '../../../actions/manageRole';
import {formatDate} from '../../../public/index';

const confirm = Modal.confirm;

class ManageRoleList extends Component {

    search = (page) => {
        this.props.actions.searchManageRole({
            pageIndex: page,
            pageSize: this.props.roleList.pageSize,
            name: this.state.name,
            desc: this.state.desc,
        });
    };

    reset = () => {
        this.setState({
            name: '',
            desc: '',
        }, () => {
            this.search(1);
        });
    };

    onShowSizeChange = (current, pageSize) => {
        this.props.actions.sizeManageRole(pageSize);
        this.props.actions.searchManageRole({
            pageIndex: 1,
            pageSize: pageSize,
            name: this.state.name,
            desc: this.state.desc,
        });
    };

    delConfirm = (id) => {
        let that = this;
        confirm({
            title: '删除提示',
            content: '确定要删除这条记录吗？',
            onOk() {
                that.props.actions.delManageRole({
                    id: id,
                    pageIndex: 1,
                    pageSize: that.props.roleList.pageSize,
                    name: that.state.name,
                    desc: that.state.desc,
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    edit = (id) =>{
        this.props.actions.push('/manage-role/edit/' + id);
    };

    constructor(props){
        super(props);
        this.columns = [{
            title: '角色ID',
            dataIndex: 'id',
        }, {
            title: '角色名称',
            dataIndex: 'name',
        }, {
            title: '角色描述',
            dataIndex: 'desc',
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            render: (text) => {
                return formatDate(text, 'yyyy-MM-dd HH:mm:ss');
            }
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
            name: '',
            desc: '',
        }
    };

    componentWillMount(){
        this.props.actions.searchManageRole({
            pageIndex: 1,
            pageSize: this.props.roleList.pageSize,
            name: '',
            desc: '',
        });
    };

    render() {
        const columns = this.columns;
        let roleList = this.props.roleList;
        roleList.rows = roleList.rows.map((value, index) => {
            return {...value, key: value.id}
        });
        return <div className="manage-list">
            <div className="manage-search">
                <label>角色名称</label>
                <Input placeholder="角色名称" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                <label>角色描述</label>
                <Input placeholder="角色描述" value={this.state.desc} onChange={(e) => this.setState({desc: e.target.value})} />
                <Button type="primary" icon="search" onClick={() => this.search(1)} >查询</Button>
                <Button type="primary" icon="reload" onClick={() => this.reset()} >重置</Button>
            </div>
            <Table
                bordered
                size="small"
                dataSource={roleList.rows}
                columns={columns}
                pagination={{
                    current:roleList.pageIndex,
                    pageSize:roleList.pageSize,
                    total:roleList.total,
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
        roleList: state.manageRole.roleList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, searchManageRole, delManageRole, sizeManageRole}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageRoleList);