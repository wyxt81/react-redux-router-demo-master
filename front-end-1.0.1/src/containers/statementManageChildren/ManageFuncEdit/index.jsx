/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage func edit
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Input, Button, Modal, Form, Select, Cascader, Table} from 'antd';
import {getManageFunc, saveManageFunc, linkManageFunc, menuManageFunc, resetManageFunc} from '../../../actions/manageFunc';
import {compareObject} from '../../../public/index';

const confirm = Modal.confirm;
const FormItem = Form.Item;
const SelectOption = Select.Option;
class ManageFuncEdit extends Component {
    clear = () => {
        let that = this;
        confirm({
            title: '清空提示',
            content: '确定要清空所填信息吗？',
            onOk() {
                that.props.form.setFieldsValue({
                    title: '',
                    is_leaf: '0',
                    config: [],
                });
                that.setState({
                    selectedKey: [],
                    selectedLink: '',
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    linkSearch = (page) => { //查询配置的作品
        this.props.actions.linkManageFunc({
            pageIndex: page,
            pageSize: this.props.linkList.pageSize,
            name: this.state.linkName,
        });
        this.setState({
            selectedKey: [],
            selectedLink: '',
        });
    };

    linkReset = () => {
        this.setState({
            linkName: '',
        }, () => {
            this.linkSearch(1);
        });
    };

    onSelectLinkChange = (selectedRowKeys, selectedRows) => { //选择配置的作品
        this.setState({
            selectedKey: selectedRowKeys,
            selectedLink: selectedRows[0].link,
        });
    };

    save = () =>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const form = this.props.form.getFieldsValue();
                if(form.config.length == 3 && form.is_leaf == '0'){
                    Modal.warn({
                        title: '菜单项最大支持三层，请选择叶子节点',
                        content:  '',
                    });
                    return;
                }
                if(form.is_leaf == '1' && this.state.selectedKey.length == 0 ){
                    Modal.warn({
                        title: '如果资源类型为叶子节点，请选择作品',
                        content:  '',
                    });
                    return;
                }
                this.props.actions.saveManageFunc({
                    id: this.state.id,
                    title: form.title,
                    is_leaf: form.is_leaf,
                    link: this.state.selectedLink,
                    parent_id: form.config[form.config.length - 1],
                    config: form.config.join(','),
                    key: this.state.selectedKey.length > 0 ? this.state.selectedKey[0] : '',
                    icon: form.is_leaf == '0' ? 'folder' : 'file-text',
                    order: 1,
                });
            }
        });
    };

    leafChange = (value) => {
        if(value == '0'){
            this.setState({
                selectedKey: [],
                selectedLink: '',
            });
        }
    };

    constructor(props){
        super(props);
        this.state = {
            id: '',
            init: {
                title: '',
                is_leaf: '0',
                config: [],
            },
            menuOption: [],
            linkColumns: [{
                title: '作品名称',
                dataIndex: 'name',
            }, {
                title: '作品链接',
                dataIndex: 'link',
                render: (text) => {
                    let link = "";
                    if(text){
                        link = text.length > 50 ? (text.substring(0, 50) + '...') : text;
                    }
                    return link;
                }
            }],
            selectedLink: '', //已选择的作品
            linkName: '', //搜索条件，作品名称
            selectedKey: [],
        };
    };

    componentWillMount(){
        this.props.actions.linkManageFunc({
            pageIndex: 1,
            pageSize: this.props.linkList.pageSize,
            name: '',
        });
        this.props.actions.menuManageFunc({
            id: '2',
        });
        if(this.props.params.type != 'add'){
            this.props.actions.getManageFunc(this.props.params.id);
        }
    };

    componentWillReceiveProps(newProps) {
        if(!compareObject(newProps.funcEdit, this.props.funcEdit)){
            let key = newProps.funcEdit.key ? [newProps.funcEdit.key] : [];
            let link = newProps.funcEdit.link || '';
            this.setState({
                selectedKey: key,
                selectedLink: link,
            });
        }
        this.setState({
            id: newProps.funcEdit.id,
            menuOption: newProps.menus,
        });
    };

    componentWillUnmount(){
        this.props.actions.resetManageFunc();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        const is_leaf = this.props.form.getFieldsValue().is_leaf == '0';
        const linkColumns = this.state.linkColumns;
        let linkList = this.props.linkList;
        const rowSelectionLink = {
            type: 'radio',
            selectedRowKeys: this.state.selectedKey,
            onChange: this.onSelectLinkChange,
            getCheckboxProps: (record) => ({
                disabled: is_leaf,
            }),
        };
        return <div className="manage-edit">
            <Link to="/manage-func-list"><Button type="primary" icon="rollback">返回列表</Button></Link>
            <div className="write-sql">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="资源名称："
                    >
                        {getFieldDecorator('title', {
                            initialValue: this.state.init.title,
                            rules: [{required: true, message: '请输入资源名称'}]
                        })(
                            <Input type="text" placeholder="请输入资源名称"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="节点类型："
                    >
                        {getFieldDecorator('is_leaf', {
                            initialValue: this.state.init.is_leaf,
                            rules: [{required: true, message: '请选择节点类型'}]
                        })(
                            <Select onChange={this.leafChange} >
                                <SelectOption value="0">非叶子结点</SelectOption>
                                <SelectOption value="1">叶子结点</SelectOption>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="父级菜单："
                    >
                        {getFieldDecorator('config', {
                            initialValue: this.state.init.config,
                            rules: [{required: true, message: '请选择父级菜单'}]
                        })(
                            <Cascader options={this.state.menuOption} changeOnSelect placeholder="请选择父级菜单" />
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="作品："
                    >
                        <div className="manage-setting">
                            <label>作品名称</label>
                            <Input placeholder="作品名称" value={this.state.linkName} onChange={(e) => this.setState({linkName: e.target.value})} disabled={is_leaf} />
                            <Button type="primary" icon="search" onClick={() => this.linkSearch(1)} disabled={is_leaf} >查询</Button>
                            <Button type="primary" icon="reload" onClick={() => this.linkReset()} disabled={is_leaf} >重置</Button>
                        </div>
                        <Table
                            bordered
                            size="small"
                            dataSource={linkList.rows}
                            columns={linkColumns}
                            rowSelection={rowSelectionLink}
                            pagination={{
                                current:linkList.pageIndex,
                                pageSize:linkList.pageSize,
                                total:linkList.total,
                                showQuickJumper: true,
                                onChange:(page) => this.linkSearch(page)
                            }} />
                    </FormItem>
                </Form>
                <div className="run-sql" >
                    <Button type="primary" size="large" icon="save" onClick={this.save} >保存</Button>
                    <Button type="default" size="large" icon="delete" onClick={this.clear}>清空</Button>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        funcEdit: state.manageFunc.funcEdit,
        linkList: state.manageFunc.linkList,
        menus: state.manageFunc.menus,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getManageFunc, saveManageFunc, linkManageFunc, menuManageFunc, resetManageFunc}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Form.create({
    mapPropsToFields(props) {
        return {
            title: {
                value: props.funcEdit.title
            },
            is_leaf: {
                value: props.funcEdit.is_leaf ? props.funcEdit.is_leaf.toString() : '0'
            },
            config: {
                value: (props.funcEdit.config && props.funcEdit.config.length > 0) ? props.funcEdit.config.split(",") : []
            },
        };
    }
})(ManageFuncEdit))