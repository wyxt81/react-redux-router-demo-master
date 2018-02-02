/**
 * Author：dengyu
 * Time：2017/10/11
 * Description：manage script list
 */

import React, {Component} from 'react';
import {Button, Modal, Input, Table, Form} from 'antd';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchManageScript, sizeManageScript, nverifyManageScript, verifyManageScript, nexecuteManageScript, executeManageScript} from '../../../actions/manageScript';
import {formatDate} from '../../../public/index';
import { JAVAURL } from '../../../constants/index';

const FormItem = Form.Item;
class ManageScriptList extends Component {

    search = (page) => {
        this.props.actions.searchManageScript({
            pageIndex: page,
            pageSize: this.props.scriptList.pageSize,
            gameId: this.state.gameId,
            gameName: this.state.gameName,
            scriptNo: this.state.scriptNo,
        });
    };

    reset = () => {
        this.setState({
            gameId: '',
            gameName: '',
            scriptNo: '',
        }, () => {
            this.search(1);
        });
    };

    onShowSizeChange = (current, pageSize) => {
        this.props.actions.sizeManageScript(pageSize);
        this.props.actions.searchManageScript({
            pageIndex: 1,
            pageSize: pageSize,
            gameId: this.state.gameId,
            gameName: this.state.gameName,
            scriptNo: this.state.scriptNo,
        });
    };

    download = (id) =>{ //下载脚本文件
        let editFrom = $('<form></form>');
        editFrom.attr("target", "");
        editFrom.attr("method", "post");
        editFrom.attr("action", JAVAURL + '/oversea/downScript.do');
        editFrom.attr("style", "display:none");
        let input = $('<input name="scriptId"/>');
        input.attr("value", id);
        editFrom.append(input);
        $("body").append(editFrom);
        editFrom.submit();
        editFrom.remove();
    };

    eye = (id) =>{ //跳转详情页面
        this.props.actions.push('/manage-script/eye/' + id);
    };

    edit = (id) =>{ //跳转编辑页面
        this.props.actions.push('/manage-script/edit/' + id);
    };

    nverify = (id) =>{ //弹出通知审核对话框
        this.setState({
            scriptId: id,
            nverifyVisible: true,
            reviewerName: '',
            reviewerEmail: '',
            reviewerNameEmpty: true,
            reviewerEmailEmpty: true,
        });
    };

    nverifyHandleOk = () =>{ //进行通知审核操作
        this.setState({
            reviewerNameEmpty: !!this.state.reviewerName,
            reviewerEmailEmpty: !!this.state.reviewerEmail,
        });
        if(!this.state.reviewerName || !this.state.reviewerEmail){
            return;
        }
        this.props.actions.nverifyManageScript({
            scriptId: this.state.scriptId,
            reviewerName: this.state.reviewerName,
            reviewerEmail: this.state.reviewerEmail,
            gameId: this.state.gameId,
            gameName: this.state.gameName,
            scriptNo: this.state.scriptNo,
        });
        this.setState({
            nverifyVisible: false,
        });
    };

    nverifyHandleCancel = () =>{ //取消通知审核操作
        this.setState({
            nverifyVisible: false,
        });
    };

    verify = (id) =>{ //弹出审核对话框
        this.setState({
            scriptId: id,
            verifyVisible: true,
            refuseReason: '',
        });
    };

    verifyHandleOk = () =>{ //通过审核操作
        this.props.actions.verifyManageScript({
            scriptId: this.state.scriptId,
            result: 1,
            refuseReason: this.state.refuseReason,
            gameId: this.state.gameId,
            gameName: this.state.gameName,
            scriptNo: this.state.scriptNo,
        });
        this.setState({
            verifyVisible: false,
        });
    };

    verifyHandleCancel = () =>{ //拒绝审核操作
        this.props.actions.verifyManageScript({
            scriptId: this.state.scriptId,
            result: 0,
            refuseReason: this.state.refuseReason,
            gameId: this.state.gameId,
            gameName: this.state.gameName,
            scriptNo: this.state.scriptNo,
        });
        this.setState({
            verifyVisible: false,
        });
    };

    nexecute = (id) =>{ //弹出通知执行对话框
        this.setState({
            scriptId: id,
            nexecuteVisible: true,
            executorName: '',
            executorEmail: '',
            executorNameEmpty: true,
            executorEmailEmpty: true,
        });
    };

    nexecuteHandleOk = () =>{ //进行通知执行操作
        this.setState({
            executorNameEmpty: !!this.state.executorName,
            executorEmailEmpty: !!this.state.executorEmail,
        });
        if(!this.state.executorName || !this.state.executorEmail){
            return;
        }
        this.props.actions.nexecuteManageScript({
            scriptId: this.state.scriptId,
            executorName: this.state.executorName,
            executorEmail: this.state.executorEmail,
            gameId: this.state.gameId,
            gameName: this.state.gameName,
            scriptNo: this.state.scriptNo,
        });
        this.setState({
            nexecuteVisible: false,
        });
    };

    nexecuteHandleCancel = () =>{ //取消通知执行操作
        this.setState({
            nexecuteVisible: false,
        });
    };

    execute = (id) =>{ //发送执行的链接
        this.props.actions.executeManageScript({
            scriptId: id,
            gameId: this.state.gameId,
            gameName: this.state.gameName,
            scriptNo: this.state.scriptNo,
        });
        this.setState({
            scriptId: id,
        });
    };

    constructor(props){
        super(props);
        this.columns = [{
            title: '游戏id',
            dataIndex: 'gameId',
        }, {
            title: '游戏名称',
            dataIndex: 'gameName',
        }, {
            title: '编号',
            dataIndex: 'scriptNo',
        }, {
            title: 'ebi数据库名称',
            dataIndex: 'ebiDbName',
        }, {
            title: 'erating数据库名称',
            dataIndex: 'eratingDbName',
        }, {
            title: '币种',
            dataIndex: 'currencyType',
        }, {
            title: '汇率',
            dataIndex: 'exchangeRate',
        }, {
            title: '充值比率',
            dataIndex: 'rechargeRate',
        }, {
            title: '消耗比率',
            dataIndex: 'consumeRate',
        }, {
            title: '创建时间',
            dataIndex: 'create_time',
            render: (text) => {
                return formatDate(text, 'yyyy-MM-dd HH:mm:ss');
            }
        }, {
            title: '状态',
            dataIndex: 'status',
            render: (text) => {
                let status = '';
                switch(text){
                    case 0:
                        status = '待通知审核';
                        break;
                    case 1:
                        status = '待审核';
                        break;
                    case 2:
                        status = '待通知执行';
                        break;
                    case 3:
                        status = '审核失败';
                        break;
                    case 4:
                        status = '待执行';
                        break;
                    case 5:
                        status = '已执行';
                        break;
                    default:
                        status = '';
                }
                return status;
            }
        }, {
            title: '操作',
            dataIndex: 'operation',
            render: (text, record, index) => {
                let status = null;
                switch(record.status){
                    case 0:
                        status = <Button type="primary" size="small" onClick={() => this.nverify(record.id)} >通知审核</Button>;
                        break;
                    case 1:
                        status = <Button type="primary" size="small" onClick={() => this.verify(record.id)} >审核</Button>;
                        break;
                    case 2:
                        status = <Button type="primary" size="small" onClick={() => this.nexecute(record.id)} >通知执行</Button>;
                        break;
                    case 4:
                        status = <Button type="primary" size="small" onClick={() => this.execute(record.id)} >执行</Button>;
                        break;
                    default:
                        status = null;
                }
                return <span key={index} >
                    <Button type="primary" icon="download" shape="circle" size="small" onClick={() => this.download(record.id)} />
                    <Button type="primary" icon="eye" shape="circle" size="small" onClick={() => this.eye(record.id)} />
                    <Button type="primary" icon="edit" shape="circle" size="small" onClick={() => this.edit(record.id)} />
                    {status}
                </span>
            },
        }];
        this.state = {
            gameId: '',
            gameName: '',
            scriptNo: '',
            scriptId: '',
            nverifyVisible: false,
            verifyVisible: false,
            nexecuteVisible: false,
            reviewerName: '',
            reviewerEmail: '',
            refuseReason: '',
            executorName: '',
            executorEmail: '',
            reviewerNameEmpty: true,
            reviewerEmailEmpty: true,
            executorNameEmpty: true,
            executorEmailEmpty: true,
        }
    };

    componentWillMount(){
        this.props.actions.searchManageScript({
            pageIndex: 1,
            pageSize: this.props.scriptList.pageSize,
            gameId: '',
            gameName: '',
            scriptNo: '',
        });
    };

    render() {
        const columns = this.columns;
        let scriptList = this.props.scriptList;
        scriptList.rows = scriptList.rows.map((value, index) => {
            return {...value, key: value.id}
        });
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 15 },
        };
        return <div className="manage-list">
            <div className="manage-search">
                <label>游戏id</label>
                <Input placeholder="游戏id" value={this.state.gameId} onChange={(e) => this.setState({gameId: e.target.value})} />
                <label>游戏名称</label>
                <Input placeholder="游戏名称" value={this.state.gameName} onChange={(e) => this.setState({gameName: e.target.value})} />
                <label>脚本编号</label>
                <Input placeholder="脚本编号" value={this.state.scriptNo} onChange={(e) => this.setState({scriptNo: e.target.value})} />
                <Button type="primary" icon="search" onClick={() => this.search(1)} >查询</Button>
                <Button type="primary" icon="reload" onClick={() => this.reset()} >重置</Button>
            </div>
            <Table
                bordered
                size="small"
                dataSource={scriptList.rows}
                columns={columns}
                pagination={{
                    current:scriptList.pageIndex,
                    pageSize:scriptList.pageSize,
                    total:scriptList.total,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    pageSizeOptions: ['20', '40','60' , '80' , '100'],
                    onShowSizeChange: (current, pageSize) => this.onShowSizeChange(current, pageSize),
                    onChange:(page) => this.search(page)
                }} />
            <Modal
                title="通知审核"
                visible={this.state.nverifyVisible}
                onOk={this.nverifyHandleOk}
                onCancel={this.nverifyHandleCancel}
                okText="通知"
                cancelText="取消"
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="审核人姓名："
                    >
                        <Input type="text" value={this.state.reviewerName} onChange={(e) => this.setState({reviewerName: e.target.value, reviewerNameEmpty: !!e.target.value})} placeholder="请输入审核人姓名"/>
                        <div className="ant-form-explain" style={this.state.reviewerNameEmpty ? {'display': 'none'} : {}} >请输入审核人姓名</div>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="审核人邮件："
                    >
                        <Input type="text" value={this.state.reviewerEmail} onChange={(e) => this.setState({reviewerEmail: e.target.value, reviewerEmailEmpty: !!e.target.value})} placeholder="请输入审核人邮件"/>
                        <div className="ant-form-explain" style={this.state.reviewerEmailEmpty ? {'display': 'none'} : {}} >请输入审核人邮件</div>
                    </FormItem>
                </Form>
            </Modal>
            <Modal
                title="审核"
                visible={this.state.verifyVisible}
                onCancel={() => this.setState({verifyVisible: false})}
                footer={[
                    <Button key={"verifyHandleCancel"} type="default" onClick={this.verifyHandleCancel}>拒绝审核</Button>,
                    <Button key={"verifyHandleOk"} type="primary" onClick={this.verifyHandleOk}>通过审核</Button>,
                ]}
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="拒绝理由："
                    >
                        <textarea value={this.state.refuseReason} onChange={(e) => this.setState({refuseReason: e.target.value})} maxLength={100} placeholder="请输入拒绝理由"/>
                    </FormItem>
                </Form>
            </Modal>
            <Modal
                title="通知执行"
                visible={this.state.nexecuteVisible}
                onOk={this.nexecuteHandleOk}
                onCancel={this.nexecuteHandleCancel}
                okText="通知"
                cancelText="取消"
            >
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="执行人姓名："
                    >
                        <Input type="text" value={this.state.executorName} onChange={(e) => this.setState({executorName: e.target.value, executorNameEmpty: !!e.target.value})} placeholder="请输入执行人姓名"/>
                        <div className="ant-form-explain" style={this.state.executorNameEmpty ? {'display': 'none'} : {}} >请输入执行人姓名</div>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="执行人邮件："
                    >
                        <Input type="text" value={this.state.executorEmail} onChange={(e) => this.setState({executorEmail: e.target.value, executorEmailEmpty: !!e.target.value})} placeholder="请输入执行人邮件"/>
                        <div className="ant-form-explain" style={this.state.executorEmailEmpty ? {'display': 'none'} : {}} >请输入执行人邮件</div>
                    </FormItem>
                </Form>
            </Modal>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        scriptList: state.manageScript.scriptList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, searchManageScript, sizeManageScript, nverifyManageScript, verifyManageScript, nexecuteManageScript, executeManageScript}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Form.create()(ManageScriptList));