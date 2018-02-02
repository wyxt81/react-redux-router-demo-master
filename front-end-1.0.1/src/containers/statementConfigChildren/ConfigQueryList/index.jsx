/**
 * Author：dengyu
 * Time：2017/7/11
 * Description：config qeuery list
 */

import React, {Component} from 'react';
import {Button, Modal, Input, Table} from 'antd';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchConfigQuery, delConfigQuery, sizeConfigQuery} from '../../../actions/configQuery';


import './index.scss';

const confirm = Modal.confirm;

class ConfigQuerySetList extends Component {

    search = (page) => {
        this.props.actions.searchConfigQuery({
            pageIndex: page,
            pageSize: this.props.dataList.pageSize,
            source: this.state.source,
        });
    };

    reset = () => {
        this.setState({
            source: ''
        }, () => {
            this.search(1);
        });
    };

    onShowSizeChange = (current, pageSize) => {
        this.props.actions.sizeConfigQuery(pageSize);
        this.props.actions.searchConfigQuery({
            pageIndex: 1,
            pageSize: pageSize,
            source: this.state.source,
        });
    };

    delConfirm = (id) => {
        let that = this;
        confirm({
            title: '删除提示',
            content: '确定要删除此条件集吗？',
            onOk() {
                that.props.actions.delConfigQuery({
                    id: id,
                    pageIndex: 1,
                    pageSize: that.props.dataList.pageSize,
                    source: that.state.source,
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    eye = (id) =>{
        this.props.actions.push('/config-query/eye/' + id);
    };

    edit = (id) =>{
        this.props.actions.push('/config-query/edit/' + id);
    };

    constructor(props){
        super(props);
        this.columns = [{
            title: '条件集名称',
            dataIndex: 'source',
            width: '80%',
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: '20%',
            render: (text, record, index) => (
                <span key={index} >
                    <Button type="primary" icon="eye" shape="circle" size="small" onClick={() => this.eye(record.id)} />
                    <Button type="primary" icon="edit" shape="circle" size="small" onClick={() => this.edit(record.id)} />
                    <Button type="default" icon="delete" shape="circle" size="small" onClick={() => this.delConfirm(record.id)}/>
                </span>
            ),
        }];
        this.state = {
            source: '',
        }
    };

    componentWillMount(){
        this.props.actions.searchConfigQuery({
            pageIndex: 1,
            pageSize: this.props.dataList.pageSize,
            source: '',
        });
    };

    render() {
        const columns = this.columns;
        let dataList = this.props.dataList;
        dataList.rows = dataList.rows.map((value, index) => {
            return {...value, key: value.id}
        });
        return <div className="config-query-list">
            <div className="config-query-search">
                <label>条件集名称</label>
                <Input placeholder="条件集名称" value={this.state.source} onChange={(e) => this.setState({source: e.target.value})} />
                <Button type="primary" icon="search" onClick={() => this.search(1)} >查询</Button>
                <Button type="primary" icon="reload" onClick={() => this.reset()} >重置</Button>
            </div>
            <Table
                bordered
                size="small"
                dataSource={dataList.rows}
                columns={columns}
                pagination={{
                    current:dataList.pageIndex,
                    pageSize:dataList.pageSize,
                    total:dataList.total,
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
        dataList: state.configQuery.dataList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, searchConfigQuery, delConfigQuery, sizeConfigQuery}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ConfigQuerySetList);