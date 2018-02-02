/**
 * Author：dengyu
 * Time：2017/7/11
 * Description：config qeuery edit
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Input, Button, Table, Modal, Popover, Form, Tabs} from 'antd';
import {getConfigQuery, saveConfigQuery, exeConfigQuery} from '../../../actions/configQuery';
import './index.scss';

const confirm = Modal.confirm;
const FormItem = Form.Item;

class ConfigQueryEdit extends Component {
    handleChange = (e, input) => {
        this.setState({
            [input]: e.target.value,
            [input + 'Empty']: e.target.value ? true : false,
        });
    };

    clearConfirm = () => {
        let that = this;
        confirm({
            title: '清空提示',
            content: '确定要清空所填信息吗？',
            onOk() {
                that.setState({
                    source: '',
                    code: '',
                    text: '',
                    colcode: '',
                    coltext: '',
                    sql: '',
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    exe = () =>{
        let columns = [];
        this.setState({
            sourceEmpty: this.state.source ? true : false,
            codeEmpty: this.state.code ? true : false,
            textEmpty: this.state.text ? true : false,
            colcodeEmpty: this.state.colcode ? true : false,
            coltextEmpty: this.state.coltext ? true : false,
            sqlEmpty: this.state.sql ? true : false,
        });
        if(!this.state.source || !this.state.code || !this.state.text || !this.state.colcode || !this.state.coltext || !this.state.sql){
            return;
        }
        columns.push({
            dataIndex: this.state.colcode,
            title: '条件字段',
            type: "varchar",
        });
        columns.push({
            dataIndex: this.state.coltext,
            title: '条件名称',
            type: "varchar",
        });
        this.props.actions.exeConfigQuery({
            sql: this.state.sql,
            columns: columns,
            dataEdit: {
                id: this.state.id,
                source: this.state.source,
                code: this.state.code,
                text: this.state.text,
                colcode: this.state.colcode,
                coltext: this.state.coltext,
                sql: this.state.sql,
            }
        });
    };

    save = () =>{
        this.setState({
            sourceEmpty: this.state.source ? true : false,
            codeEmpty: this.state.code ? true : false,
            textEmpty: this.state.text ? true : false,
            colcodeEmpty: this.state.colcode ? true : false,
            coltextEmpty: this.state.coltext ? true : false,
            sqlEmpty: this.state.sql ? true : false,
        });
        if(!this.state.source || !this.state.code || !this.state.text || !this.state.colcode || !this.state.coltext || !this.state.sql){
            return;
        }
        this.props.actions.saveConfigQuery({
            id: this.state.id,
            source: this.state.source,
            code: this.state.code,
            text: this.state.text,
            colcode: this.state.colcode,
            coltext: this.state.coltext,
            sql: this.state.sql,
        });
    };

    constructor(props){
        super(props);
        this.state = {
            id: this.props.dataEdit.id || '',
            source: this.props.dataEdit.source || '',
            code: this.props.dataEdit.code || '',
            text: this.props.dataEdit.text || '',
            colcode: this.props.dataEdit.colcode || '',
            coltext: this.props.dataEdit.coltext || '',
            sql: this.props.dataEdit.sql || '',
            iseye: this.props.params.type == 'eye',
            sourceEmpty: true,
            codeEmpty: true,
            textEmpty: true,
            colcodeEmpty: true,
            coltextEmpty: true,
            sqlEmpty: true,
        };
    };

    componentWillMount(){
        if(this.props.params.type == 'eye'){
            this.setState({
                iseye: true,
            });
        } else {
            this.setState({
                iseye: false,
            });
        }
        if(this.props.params.type != 'add'){
            this.props.actions.getConfigQuery(this.props.params.id);
        }
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            id: newProps.dataEdit.id || '',
            source: newProps.dataEdit.source || '',
            code: newProps.dataEdit.code || '',
            text: newProps.dataEdit.text || '',
            colcode: newProps.dataEdit.colcode || '',
            coltext: newProps.dataEdit.coltext || '',
            sql: newProps.dataEdit.sql || '',
            iseye: newProps.params.type == 'eye',
            sourceEmpty: true,
            codeEmpty: true,
            textEmpty: true,
            colcodeEmpty: true,
            coltextEmpty: true,
            sqlEmpty: true,
        });
    };

    render() {
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        let dataTable = this.props.dataTable;
        dataTable.dataSource = dataTable.dataSource.map((value, index) => {
            return {...value, key: index}
        });
        return <div className="config-query-edit">
            <Link to="/config-query-list"><Button type="primary" icon="rollback">返回列表</Button></Link>
            <div className="write-sql">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="注释："
                    >
                        <span className="ant-form-text">开发者自己写SQL语句，获得相应的条件数据</span>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="条件集名称："
                    >
                        <Input placeholder="请输入条件集名称" value={this.state.source} onChange={(e) => this.handleChange(e, 'source')} disabled={this.state.iseye} />
                        <div className="ant-form-explain" style={this.state.sourceEmpty ? {'display': 'none'} : {}} >请输入条件集名称</div>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="条件字段："
                    >
                        <Input placeholder="请输入条件字段" value={this.state.code} onChange={(e) => this.handleChange(e, 'code')} disabled={this.state.iseye} />
                        <div className="ant-form-explain" style={this.state.codeEmpty ? {'display': 'none'} : {}} >请输入条件字段</div>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="条件名称："
                    >
                        <Input placeholder="请输入条件名称" value={this.state.text} onChange={(e) => this.handleChange(e, 'text')} disabled={this.state.iseye} />
                        <div className="ant-form-explain" style={this.state.textEmpty ? {'display': 'none'} : {}} >请输入条件名称</div>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="条件字段编码："
                    >
                        <Input placeholder="请输入条件字段编码" value={this.state.colcode} onChange={(e) => this.handleChange(e, 'colcode')} disabled={this.state.iseye} />
                        <div className="ant-form-explain" style={this.state.colcodeEmpty ? {'display': 'none'} : {}} >请输入条件字段编码</div>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="条件名称编码："
                    >
                        <Input placeholder="请输入条件名称编码" value={this.state.coltext} onChange={(e) => this.handleChange(e, 'coltext')} disabled={this.state.iseye} />
                        <div className="ant-form-explain" style={this.state.coltextEmpty ? {'display': 'none'} : {}} >请输入条件名称编码</div>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="SQL语句："
                    >
                        <textarea placeholder="请输入SQL语句" value={this.state.sql} onChange={(e) => this.handleChange(e, 'sql')} disabled={this.state.iseye} />
                        <div className="ant-form-explain" style={this.state.sqlEmpty ? {'display': 'none'} : {}} >请输入SQL语句</div>
                    </FormItem>
                </Form>
                <div className="run-sql" style={this.state.iseye ? {'display': 'none'} : {}}>
                    <Button type="primary" size="large" icon="play-circle-o" onClick={this.exe} >执行</Button>
                    <Button type="primary" size="large" icon="save" onClick={this.save} >保存</Button>
                    <Button type="default" size="large" icon="delete" onClick={this.clearConfirm}>清空</Button>
                </div>
            </div>
            <div className="check-result">
                <Table
                    bordered
                    size="middle"
                    title={() => '查询结果'}
                    dataSource={dataTable.dataSource}
                    columns={dataTable.columns}/>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        dataEdit: state.configQuery.dataEdit,
        dataTable: state.configQuery.dataTable
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getConfigQuery, saveConfigQuery, exeConfigQuery}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Form.create()(ConfigQueryEdit))