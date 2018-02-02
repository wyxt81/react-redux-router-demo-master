/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage func list
 */

import React, {Component} from 'react';
import {Button, Modal, Input, Table} from 'antd';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchManageFunc, delManageFunc, sizeManageFunc} from '../../../actions/manageFunc';

const confirm = Modal.confirm;

class ManageFuncList extends Component {

    delConfirm = (id) => {
        let that = this;
        confirm({
            title: '删除提示',
            content: '确定要删除这条记录吗？',
            onOk() {
                that.props.actions.delManageFunc({
                    id: id,
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    edit = (id) =>{
        this.props.actions.push('/manage-func/edit/' + id);
    };

    constructor(props){
        super(props);
        this.columns = [{
            title: '资源名称',
            dataIndex: 'title',
        }, {
            title: '资源URL',
            dataIndex: 'link',
            render: (text) => {
                let link = "";
                if(text){
                    link = text.length > 50 ? (text.substring(0, 50) + '...') : text;
                }
                return link;
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                if(record.link != '/show'){
                    return (<span key={index} >
                        <Button type="primary" icon="edit" shape="circle" size="small" onClick={() => this.edit(record.id)} />
                        <Button type="default" icon="delete" shape="circle" size="small" onClick={() => this.delConfirm(record.id)}/>
                    </span>);
                }
            },
        }];
    };

    componentWillMount(){
        this.props.actions.searchManageFunc({
            id: '2',
        });
    };

    render() {
        const columns = this.columns;
        let funcList = this.props.funcList;
        funcList = funcList.map((value, index) => {
            return {...value, key: value.id}
        });
        return <div className="manage-list">
            <Table
                bordered
                size="small"
                dataSource={funcList}
                columns={columns} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        funcList: state.manageFunc.funcList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, searchManageFunc, delManageFunc, sizeManageFunc}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageFuncList);