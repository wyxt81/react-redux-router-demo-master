/**
 * Author：zhoushuanglong
 * Time：5/28/2017
 * Description：config dataset list
 */

import React, {Component} from 'react';
import {Button, Modal, Input, Table} from 'antd';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchConfigData, delConfigData, sizeConfigData} from '../../../actions/configData';


import './index.scss';

const confirm = Modal.confirm;

class ConfigDataSetList extends Component {

    search = (page) => {
        this.props.actions.searchConfigData({
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
        this.props.actions.sizeConfigData(pageSize);
        this.props.actions.searchConfigData({
            pageIndex: 1,
            pageSize: pageSize,
            source: this.state.source,
        });
    };

    delConfirm = (id) => {
        let that = this;
        confirm({
            title: '删除提示',
            content: '确定要删除此条数据集吗？',
            onOk() {
                that.props.actions.delConfigData({
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
        this.props.actions.push('/config-dataset/eye/' + id);
    };

    edit = (id) =>{
        this.props.actions.push('/config-dataset/edit/' + id);
    };

    constructor(props){
        super(props);
        this.columns = [{
            title: '数据集名称',
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
        this.props.actions.searchConfigData({
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
        return <div className="config-dataset-list">
            <div className="config-dataset-search">
                <label>数据集名称</label>
                <Input placeholder="数据集名称" value={this.state.source} onChange={(e) => this.setState({source: e.target.value})} />
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
        dataList: state.configData.dataList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, searchConfigData, delConfigData, sizeConfigData}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ConfigDataSetList);