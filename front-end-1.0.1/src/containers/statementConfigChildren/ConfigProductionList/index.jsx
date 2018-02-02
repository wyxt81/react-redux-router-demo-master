/**
 * Author：dengyu
 * Time：2017/6/29
 * Description：config production list
 */

import React, {Component} from 'react';
import {Button, Modal, Input, Table} from 'antd';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {searchProduction, delProduction, sizeProduction} from '../../../actions/production';
import './index.scss';

const confirm = Modal.confirm;

class ConfigProductionList extends Component {

    search = (page) => {
        this.props.actions.searchProduction({
            pageIndex: page,
            pageSize: this.props.dataList.pageSize,
            name: this.state.name,
        });
    };

    reset = () => {
        this.setState({
            name: ''
        }, () => {
            this.search(1);
        });
    };

    onShowSizeChange = (current, pageSize) => {
        this.props.actions.sizeProduction(pageSize);
        this.props.actions.searchProduction({
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
            content: '确定要删除此作品吗？',
            onOk() {
                that.props.actions.delProduction({
                    id: id,
                    pageIndex: 1,
                    pageSize: that.props.dataList.pageSize,
                    name: that.state.name,
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    edit = (id) => {
        this.props.actions.push('/config-content/' + id);
    };

    constructor(props) {
        super(props);
        this.columns = [{
            title: '作品名称',
            dataIndex: 'name',
            width: '85%',
        }, {
            title: '操作',
            dataIndex: 'operation',
            width: '15%',
            render: (text, record, index) => (
                <span key={index}>
                    <Button type="primary" icon="edit" shape="circle" size="small"
                            onClick={() => this.edit(record.id)}/>
                    <Button type="default" icon="delete" shape="circle" size="small"
                            onClick={() => this.delConfirm(record.id)}/>
                </span>
            ),
        }];
        this.state = {
            name: '',
        }
    };

    componentWillMount() {
        this.props.actions.searchProduction({
            pageIndex: 1,
            pageSize: this.props.dataList.pageSize,
            name: '',
        });
    };

    render() {
        const columns = this.columns;
        let dataList = this.props.dataList;
        dataList.rows = dataList.rows.map((value, index) => {
            return {...value, key: value.id}
        });
        return <div className="config-production-list">
            <div className="config-production-search">
                <label>作品名称</label>
                <Input placeholder="作品名称" value={this.state.name}
                       onChange={(e) => this.setState({name: e.target.value})}/>
                <Button type="primary" icon="search" onClick={() => this.search(1)}>查询</Button>
                <Button type="primary" icon="reload" onClick={() => this.reset()}>重置</Button>
            </div>
            <Table
                bordered
                size="small"
                dataSource={dataList.rows}
                columns={columns}
                pagination={{
                    current: dataList.pageIndex,
                    pageSize: dataList.pageSize,
                    total: dataList.total,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    pageSizeOptions: ['20', '40','60' , '80' , '100'],
                    onShowSizeChange: (current, pageSize) => this.onShowSizeChange(current, pageSize),
                    onChange: (page) => this.search(page)
                }}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.production.dataList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, searchProduction, delProduction, sizeProduction}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ConfigProductionList);