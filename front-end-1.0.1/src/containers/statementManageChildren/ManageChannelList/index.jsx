/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage channel list
 */

import React, {Component} from 'react';
import {Button, Modal, Input, Table} from 'antd';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchManageChannel, delManageChannel, sizeManageChannel} from '../../../actions/manageChannel';
import {formatDate} from '../../../public/index';

const confirm = Modal.confirm;

class ManageChannelList extends Component {

    search = (page) => {
        this.props.actions.searchManageChannel({
            pageIndex: page,
            pageSize: this.props.channelList.pageSize,
            id: this.state.id,
            name: this.state.name,
            series: this.state.series,
        });
    };

    reset = () => {
        this.setState({
            id: '',
            name: '',
            series: '',
        }, () => {
            this.search(1);
        });
    };

    onShowSizeChange = (current, pageSize) => {
        this.props.actions.sizeManageChannel(pageSize);
        this.props.actions.searchManageChannel({
            pageIndex: 1,
            pageSize: pageSize,
            id: this.state.id,
            name: this.state.name,
            series: this.state.series,
        });
    };

    delConfirm = (id) => {
        let that = this;
        confirm({
            title: '删除提示',
            content: '确定要删除这条记录吗？',
            onOk() {
                that.props.actions.delManageChannel({
                    id: id,
                    pageIndex: 1,
                    pageSize: that.props.channelList.pageSize,
                    name: that.state.name,
                    series: that.state.series,
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    edit = (id) =>{
        this.props.actions.push('/manage-channel/edit/' + id);
    };

    constructor(props){
        super(props);
        this.columns = [{
            title: '渠道ID',
            dataIndex: 'id',
        }, {
            title: '渠道名称',
            dataIndex: 'name',
        }, {
            title: '渠道系列',
            dataIndex: 'series',
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
            id: '',
            name: '',
            series: '',
        }
    };

    componentWillMount(){
        this.props.actions.searchManageChannel({
            pageIndex: 1,
            pageSize: this.props.channelList.pageSize,
            id: '',
            name: '',
            series: '',
        });
    };

    render() {
        const columns = this.columns;
        let channelList = this.props.channelList;
        channelList.rows = channelList.rows.map((value, index) => {
            return {...value, key: value.id}
        });
        return <div className="manage-list">
            <div className="manage-search">
                {/*<label>渠道ID</label>*/}
                {/*<Input placeholder="渠道ID" value={this.state.id} onChange={(e) => this.setState({id: e.target.value})} />*/}
                <label>渠道名称</label>
                <Input placeholder="渠道名称" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                {/*<label>渠道系列</label>*/}
                {/*<Input placeholder="渠道系列" value={this.state.series} onChange={(e) => this.setState({series: e.target.value})} />*/}
                <Button type="primary" icon="search" onClick={() => this.search(1)} >查询</Button>
                <Button type="primary" icon="reload" onClick={() => this.reset()} >重置</Button>
            </div>
            <Table
                bordered
                size="small"
                dataSource={channelList.rows}
                columns={columns}
                pagination={{
                    current:channelList.pageIndex,
                    pageSize:channelList.pageSize,
                    total:channelList.total,
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
        channelList: state.manageChannel.channelList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, searchManageChannel, delManageChannel, sizeManageChannel}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageChannelList);