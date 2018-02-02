/**
 * Author：dengyu
 * Time：2017/10/9
 * Description：manage templet list
 */

import React, {Component} from 'react';
import {Button, Modal, Input, Table} from 'antd';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchManageTemplet, delManageTemplet, sizeManageTemplet} from '../../../actions/manageTemplet';
import {formatDate} from '../../../public/index';

const confirm = Modal.confirm;

class ManageTempletList extends Component {

    search = (page) => {
        this.props.actions.searchManageTemplet({
            pageIndex: page,
            pageSize: this.props.templetList.pageSize,
            templateName: this.state.templateName,
        });
    };

    reset = () => {
        this.setState({
            templateName: '',
        }, () => {
            this.search(1);
        });
    };

    onShowSizeChange = (current, pageSize) => {
        this.props.actions.sizeManageTemplet(pageSize);
        this.props.actions.searchManageTemplet({
            pageIndex: 1,
            pageSize: pageSize,
            templateName: this.state.templateName,
        });
    };

    delConfirm = (id) => {
        let that = this;
        confirm({
            title: '删除提示',
            content: '确定要删除这条记录吗？',
            onOk() {
                that.props.actions.delManageTemplet({
                    id: id,
                    pageIndex: 1,
                    pageSize: that.props.templetList.pageSize,
                    templateName: that.state.templateName,
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    edit = (id) =>{
        this.props.actions.push('/manage-templet/edit/' + id);
    };

    constructor(props){
        super(props);
        this.columns = [{
            title: '模板名称',
            dataIndex: 'templateName',
        }, {
            title: '版本号',
            dataIndex: 'version',
        }, {
            title: '模板类型',
            dataIndex: 'templateType',
            render: (text) => {
                return text == '0' ? '海外游戏' : '国内游戏';
            }
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
            templateName: '',
        }
    };

    componentWillMount(){
        this.props.actions.searchManageTemplet({
            pageIndex: 1,
            pageSize: this.props.templetList.pageSize,
            templateName: '',
        });
    };

    render() {
        const columns = this.columns;
        let templetList = this.props.templetList;
        templetList.rows = templetList.rows.map((value, index) => {
            return {...value, key: value.id}
        });
        return <div className="manage-list">
            <div className="manage-search">
                <label>模板名称</label>
                <Input placeholder="模板名称" value={this.state.templateName} onChange={(e) => this.setState({templateName: e.target.value})} />
                <Button type="primary" icon="search" onClick={() => this.search(1)} >查询</Button>
                <Button type="primary" icon="reload" onClick={() => this.reset()} >重置</Button>
            </div>
            <Table
                bordered
                size="small"
                dataSource={templetList.rows}
                columns={columns}
                pagination={{
                    current:templetList.pageIndex,
                    pageSize:templetList.pageSize,
                    total:templetList.total,
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
        templetList: state.manageTemplet.templetList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, searchManageTemplet, delManageTemplet, sizeManageTemplet}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageTempletList);