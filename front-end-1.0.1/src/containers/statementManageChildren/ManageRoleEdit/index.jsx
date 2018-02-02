/**
 * Author：dengyu
 * Time：2017/9/6
 * Description：manage role edit
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Input, Button, Modal, Form, Select, Tree, Table, Tabs } from 'antd';
import {getManageRole, saveManageRole, funcManageRole, gameManageRole, channelManageRole, channelSearchManageRole, resetManageRole} from '../../../actions/manageRole';
import {compareObject} from '../../../public/index';

const confirm = Modal.confirm;
const FormItem = Form.Item;
const SelectOption = Select.Option;
const TreeNode = Tree.TreeNode;
class ManageRoleEdit extends Component {
    clear = () => {
        let that = this;
        confirm({
            title: '清空提示',
            content: '确定要清空所填信息吗？',
            onOk() {
                that.props.form.setFieldsValue({
                    name: '',
                    desc: '',
                });
                that.setState({
                    permissionIds: '',
                    checkedKeys: [],
                    expandedKeys: [],
                    selectedGames: [],
                    selectedChannels: [],
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    save = () =>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                if(!this.state.permissionIds){
                    Modal.warn({
                        title: '请勾选资源',
                        content:  '',
                    });
                    return;
                }
                const form = this.props.form.getFieldsValue();
                let gameChannelO = {};
                let gameChannels = [];
                let channelGameO = {};
                if(this.state.type == '1'){
                    this.state.selectedGames.forEach((item, index) => {
                        if(item.indexOf('&') > -1){ //选择的是渠道，将游戏放到其数组中
                            if(!gameChannelO[item.split('&')[0]]){ //如果游戏没有初始化，就置为空数组
                                gameChannelO[item.split('&')[0]] = [];
                            }
                            gameChannelO[item.split('&')[0]].push(item.split('&')[1]);
                        } else if(!gameChannelO[item]){ //选择的是游戏且没有初始化，就置为空数组
                            gameChannelO[item] = [];
                        }
                    });
                    for(let key in gameChannelO){
                        if(Object.prototype.toString.call(gameChannelO[key]) == '[object Array]' && gameChannelO[key].length > 0){
                            gameChannels.push({
                                g_id: key,
                                c_id: gameChannelO[key],
                            });
                        }
                    }
                } else if(this.state.type == '2'){
                    channelGameO = {
                        c_id: this.state.channelId,
                        g_id: this.state.channelId ? this.state.selectedChannels : []
                    }
                }
                this.props.actions.saveManageRole({
                    id: this.state.id,
                    name: form.name,
                    desc: form.desc,
                    permissionIds: this.state.permissionIds,
                    gameChannel: JSON.stringify(gameChannels),
                    channelGame: JSON.stringify(channelGameO),
                });
            }
        });
    };

    onExpand = (expandedKeys) => { //权限树展开
        this.setState({
            expandedKeys: expandedKeys,
            autoExpandParent: false,
        });
    };

    onCheck = (checkedKeys, info) => { //选择权限
        let that = this;
        let author = checkedKeys.filter((value, index) => {
            return !that.state.nocheck.includes(value);
        });
        this.setState({
            checkedKeys: author,
            permissionIds: author.concat(info.halfCheckedKeys).join(','),
        });
    };

    noLeafs = (tree) => { //取出所有的其下作品的非叶子节点
        let datas = [];
        if(Object.prototype.toString.call(tree) == '[object Array]' && tree.length > 0){
            for(let i = 0; i < tree.length; i++){
                if(tree[i].is_leaf == 0){
                    if(Object.prototype.toString.call(tree[i].children) != '[object Array]' || tree[i].children.length == 0){//非叶子节点没有子节点
                        datas.push(tree[i].key);
                    } else {
                        let leaf = this.noLeafs(tree[i].children);
                        if(leaf.length == tree[i].children.length){//非叶子节点的所有子节点都没有子节点
                            datas.push(tree[i].key);
                        }
                        datas = datas.concat(leaf);
                    }
                }
            }
        }
        return datas;
    };

    tabsChange = (type) => { //切换渠道游戏配置
        this.setState({
            type: type,
        });
    };

    gameSearch = (page) => { //查询游戏关联渠道
        this.props.actions.gameManageRole({
            pageIndex: page,
            pageSize: this.props.gameList.pageSize,
            id: this.state.gameId,
            name: this.state.gameName,
        });
        this.setState({
            selectedGames: [],
        });
    };

    gameReset = () => {
        this.setState({
            gameId: '',
            gameName: '',
        }, () => {
            this.gameSearch(1);
        });
    };

    channelSearch = (page) => { //查询渠道关联游戏
        this.props.actions.channelManageRole({
            pageIndex: page,
            pageSize: this.props.channelList.pageSize,
            id: this.state.channelId,
        });
        this.setState({
            selectedChannels: [],
        });
    };

    channelReset = () => {
        this.setState({
            channelId: '',
            channelName: '',
        }, () => {
            this.channelSearch(1);
        });
    };

    onSelectGameChange = (selectedRowKeys, selectedRows) => { //选择游戏关联渠道
        this.setState({
            selectedGames: selectedRowKeys,
        });
        let key = selectedRowKeys[selectedRowKeys.length - 1];
        if(key && key.indexOf('&') > -1){
            selectedRowKeys.push(key.split('&')[0]);
            this.setState({
                selectedGames: selectedRowKeys,
            });
        }
    };

    onSelectChannelChange = (selectedRowKeys, selectedRows) => { //选择渠道关联游戏
        this.setState({
            selectedChannels: selectedRowKeys,
        });
    };

    channelChange = (value) => { //下拉搜索渠道列表
        this.props.actions.channelSearchManageRole({ name: value });
        this.setState({
            channelId: '',
            channelName: value,
        });
    };

    channelSelect = (value, option) => { //选择某个渠道
        let selectChannel = this.state.channelOption[option.props.index];
        this.setState({
            channelId: selectChannel.id,
            channelName: selectChannel.name,
        });
    };

    constructor(props){
        super(props);
        this.state = {
            id: '',
            init: {
                name: '',
                desc: '',
            },
            permissionIds: '', //已选择的权限
            permissionOption: [], //展示的权限树
            autoExpandParent: true,
            checkedKeys: [], //已选择节点
            expandedKeys: [], //已展开节点
            nocheck: [], //没有叶子节点，被禁止勾选的节点
            type: '1', //渠道游戏配置的类型
            gameColumns: [{
                title: 'ID',
                dataIndex: 'id',
            }, {
                title: '名称',
                dataIndex: 'name',
            }],
            channelColumns: [{
                title: '游戏ID',
                dataIndex: 'id',
            }, {
                title: '游戏名称',
                dataIndex: 'name',
            }],
            selectedGames: [], //已选择的游戏关联渠道
            selectedChannels: [], //已选择的渠道关联游戏
            gameId: '', //搜索条件，游戏id
            gameName: '', //搜索条件，游戏系列
            channelId: '', //搜索条件，渠道id
            channelName: '', //搜索条件，渠道名称
            channelOption: [], //展示的搜索渠道列表
        };
    };

    componentWillMount(){
        this.props.actions.funcManageRole();
        this.props.actions.gameManageRole({
            pageIndex: 1,
            pageSize: this.props.gameList.pageSize,
            id: '',
            name: '', });
        this.props.actions.channelSearchManageRole({ name: '' });
        if(this.props.params.type != 'add'){
            this.props.actions.getManageRole(this.props.params.id);
        }
    };

    componentWillReceiveProps(newProps) {
        if(!compareObject(newProps.roleEdit.permissionList, this.props.roleEdit.permissionList)){
            let permissionIds = [];
            if(Object.prototype.toString.call(newProps.roleEdit.permissionList) == '[object Array]' && newProps.roleEdit.permissionList.length > 0){
                newProps.roleEdit.permissionList.forEach((item, index) => {
                    if(item.is_leaf){
                        permissionIds.push(item.id.toString());
                    }
                });
            }
            this.setState({
                permissionIds: newProps.roleEdit.permissionIds,
                checkedKeys: permissionIds,
                expandedKeys: permissionIds,
            });
        }
        if(!compareObject(newProps.roleEdit.gameInfoList, this.props.roleEdit.gameInfoList)){
            let gameInfoList = (Object.prototype.toString.call(newProps.roleEdit.gameInfoList) == '[object Array]' && newProps.roleEdit.gameInfoList.length > 0) ? newProps.roleEdit.gameInfoList : [];
            let selectedGames = [];
            gameInfoList.forEach((game, index) => {
                selectedGames.push(game.id.toString());
                if(Object.prototype.toString.call(game.channels) == '[object Array]' && game.channels.length > 0){
                    game.channels.forEach((channel, index) => {
                        selectedGames.push(game.id + '&' + channel.id);
                    });
                }
            });
            this.setState({
                type: '1',
                selectedGames: selectedGames,
            });
        }
        if(!compareObject(newProps.roleEdit.channelList, this.props.roleEdit.channelList)){
            let channelInfo = (Object.prototype.toString.call(newProps.roleEdit.channelList) == '[object Array]' && newProps.roleEdit.channelList.length > 0) ? newProps.roleEdit.channelList[0] : {
                id: '',
                name: '',
                gameInfos: [],
            };
            this.setState({
                type: '2',
                selectedChannels: channelInfo.gameInfos.map((item, index) => {
                    return item.id;
                }),
                channelId: channelInfo.id,
                channelName: channelInfo.name,
            });
            this.props.actions.channelManageRole({
                pageIndex: 1,
                pageSize: this.props.channelList.pageSize,
                id: channelInfo.id,
            });
        }
        if(this.props.params.type == 'add'){
            this.setState({
                permissionIds: '',
                checkedKeys: [],
                expandedKeys: [],
            });
        }
        this.setState({
            id: newProps.roleEdit.id,
            permissionOption: newProps.permissions,
            nocheck: this.noLeafs(newProps.permissions),
            channelOption: newProps.channels,
        });
    };

    componentWillUnmount(){
        this.props.actions.resetManageRole();
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        const loop = (data) => data.map((item) => {
            if(item.children) {
                return (
                    <TreeNode key={item.key} title={item.title} disableCheckbox={this.state.nocheck.includes(item.key)} >
                        {loop(item.children)}
                    </TreeNode>
                );
            }
            return <TreeNode key={item.key} title={item.title} disableCheckbox={this.state.nocheck.includes(item.key)} />;
        });
        const gameColumns = this.state.gameColumns;
        const channelColumns = this.state.channelColumns;
        let gameList = this.props.gameList;
        let channelList = this.props.channelList;
        channelList.rows = channelList.rows.map((value, index) => {
            return {...value, key: value.id}
        });
        const { selectedGames, selectedChannels } = this.state;
        const rowSelectionGame = {
            selectedRowKeys: selectedGames,
            onChange: this.onSelectGameChange,
        };
        const rowSelectionChannel = {
            selectedRowKeys: selectedChannels,
            onChange: this.onSelectChannelChange,
        };
        return <div className="manage-edit">
            <Link to="/manage-role-list"><Button type="primary" icon="rollback">返回列表</Button></Link>
            <div className="write-sql">
                <Form>
                    <FormItem
                        {...formItemLayout}
                        label="角色名称："
                    >
                        {getFieldDecorator('name', {
                            initialValue: this.state.init.name,
                            rules: [{required: true, message: '请输入角色名称'}]
                        })(
                            <Input type="text" placeholder="请输入角色名称"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="角色描述："
                    >
                        {getFieldDecorator('desc', {
                            initialValue: this.state.init.desc,
                        })(
                            <Input type="text" placeholder="请输入角色描述"/>
                        )}
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="资源："
                    >
                        <Tree
                            checkable
                            expandedKeys={this.state.expandedKeys}
                            checkedKeys={this.state.checkedKeys}
                            autoExpandParent={this.state.autoExpandParent}
                            onExpand={this.onExpand}
                            onCheck={this.onCheck}
                        >
                            {loop(this.state.permissionOption)}
                        </Tree>
                    </FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="渠道游戏配置："
                    >
                        <Tabs activeKey={this.state.type} onChange={this.tabsChange} >
                            <Tabs.TabPane tab="游戏关联渠道" key="1">
                                <div className="manage-setting">
                                    <label>游戏ID</label>
                                    <Input placeholder="游戏ID" value={this.state.gameId} onChange={(e) => this.setState({gameId: e.target.value})} />
                                    <label>游戏名称</label>
                                    <Input placeholder="游戏名称" value={this.state.gameName} onChange={(e) => this.setState({gameName: e.target.value})} />
                                    <Button type="primary" icon="search" onClick={() => this.gameSearch(1)} >查询</Button>
                                    <Button type="primary" icon="reload" onClick={() => this.gameReset()} >重置</Button>
                                </div>
                                <Table
                                    bordered
                                    size="small"
                                    dataSource={gameList.rows}
                                    columns={gameColumns}
                                    rowSelection={rowSelectionGame}
                                    pagination={{
                                        current:gameList.pageIndex,
                                        pageSize:gameList.pageSize,
                                        total:gameList.total,
                                        showQuickJumper: true,
                                        onChange:(page) => this.gameSearch(page)
                                    }} />
                            </Tabs.TabPane>
                            <Tabs.TabPane tab="渠道关联游戏" key="2">
                                <div className="manage-setting">
                                    <label>渠道名称</label>
                                    <Select
                                        mode="combobox"
                                        placeholder="请选择渠道"
                                        value={this.state.channelName}
                                        onSearch={this.channelChange}
                                        onSelect={this.channelSelect}>
                                        {this.state.channelOption.map((d, i) => <SelectOption
                                            value={d.name.toLowerCase()}
                                            key={d.id}>
                                            {d.name}</SelectOption>)}
                                    </Select>
                                    <Button type="primary" icon="search" onClick={() => this.channelSearch(1)} >查询</Button>
                                    <Button type="primary" icon="reload" onClick={() => this.channelReset()} >重置</Button>
                                </div>
                                <Table
                                    bordered
                                    size="small"
                                    dataSource={channelList.rows}
                                    columns={channelColumns}
                                    rowSelection={rowSelectionChannel}
                                    pagination={{
                                        current:channelList.pageIndex,
                                        pageSize:channelList.pageSize,
                                        total:channelList.total,
                                        showQuickJumper: true,
                                        onChange:(page) => this.channelSearch(page)
                                    }} />
                            </Tabs.TabPane>
                        </Tabs>
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
        roleEdit: state.manageRole.roleEdit,
        permissions: state.manageRole.permissions,
        gameList: state.manageRole.gameList,
        channelList: state.manageRole.channelList,
        channels: state.manageRole.channels,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getManageRole, saveManageRole, funcManageRole, channelManageRole, gameManageRole, channelSearchManageRole, resetManageRole}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Form.create({
    mapPropsToFields(props) {
        return {
            name: {
                value: props.roleEdit.name
            },
            desc: {
                value: props.roleEdit.desc
            },
        };
    }
})(ManageRoleEdit))