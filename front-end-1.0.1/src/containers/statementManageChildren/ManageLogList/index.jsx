/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage log list
 */

import React, {Component} from 'react';
import {Button, Input, Table} from 'antd';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchManageLog, sizeManageLog} from '../../../actions/manageLog';
import {formatDate} from '../../../public/index';
import Datetime from 'react-datetime';
import '../../../../node_modules/react-datetime/css/react-datetime.css';

class ManageLogList extends Component {

    search = (page) => {
        this.props.actions.searchManageLog({
            pageIndex: page,
            pageSize: this.props.logList.pageSize,
            name: this.state.name,
            content: this.state.content,
            time: this.state.time,
        });
    };

    reset = () => {
        this.setState({
            name: '',
            content: '',
            time: '',
        }, () => {
            this.search(1);
        });
    };

    onChange = (date) => {
        this.setState({
            time: date.format('YYYY-MM-DD'),
        });
    };

    onShowSizeChange = (current, pageSize) => {
        this.props.actions.sizeManageLog(pageSize);
        this.props.actions.searchManageLog({
            pageIndex: 1,
            pageSize: pageSize,
            name: this.state.name,
            content: this.state.content,
            time: this.state.time,
        });
    };

    constructor(props){
        super(props);
        this.columns = [{
            title: '用户名称',
            dataIndex: 'userName',
        }, {
            title: '操作类型',
            dataIndex: 'content',
        }, {
            title: '操作时间',
            dataIndex: 'create_time',
            render: (text) => {
                return formatDate(text, 'yyyy-MM-dd HH:mm:ss');
            }
        }];
        this.state = {
            name: '',
            content: '',
            time: '',
        }
    };

    componentWillMount(){
        this.props.actions.searchManageLog({
            pageIndex: 1,
            pageSize: this.props.logList.pageSize,
            name: '',
            content: '',
            time: '',
        });
    };

    render() {
        const columns = this.columns;
        let logList = this.props.logList;
        logList.rows = logList.rows.map((value, index) => {
            return {...value, key: value.id}
        });
        return <div className="manage-list">
            <div className="manage-search">
                <label>用户名称</label>
                <Input placeholder="用户名称" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                <label>操作类型</label>
                <Input placeholder="操作类型" value={this.state.content} onChange={(e) => this.setState({content: e.target.value})} />
                <label>操作时间</label>
                <Datetime closeOnSelect={true} value={this.state.time} dateFormat={"YYYY-MM-DD"} viewMode={"days"} timeFormat={false} onChange={this.onChange} inputProps={{placeholder: '时间'}} locale={window.navigator.language} />
                <Button type="primary" icon="search" onClick={() => this.search(1)} >查询</Button>
                <Button type="primary" icon="reload" onClick={() => this.reset()} >重置</Button>
            </div>
            <Table
                bordered
                size="small"
                dataSource={logList.rows}
                columns={columns}
                pagination={{
                    current:logList.pageIndex,
                    pageSize:logList.pageSize,
                    total:logList.total,
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
        logList: state.manageLog.logList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({searchManageLog, sizeManageLog}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageLogList);