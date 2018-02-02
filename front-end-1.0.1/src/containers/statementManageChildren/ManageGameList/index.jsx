/**
 * Author：dengyu
 * Time：2017/9/7
 * Description：manage game list
 */

import React, {Component} from 'react';
import {Button, Modal, Input, Table} from 'antd';
import {push} from 'react-router-redux';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {searchManageGame, delManageGame, sizeManageGame} from '../../../actions/manageGame';

const confirm = Modal.confirm;

class ManageGameList extends Component {

    search = (page) => {
        this.props.actions.searchManageGame({
            pageIndex: page,
            pageSize: this.props.gameList.pageSize,
            name: this.state.name,
        });
    };

    reset = () => {
        this.setState({
            name: '',
        }, () => {
            this.search(1);
        });
    };

    onShowSizeChange = (current, pageSize) => {
        this.props.actions.sizeManageGame(pageSize);
        this.props.actions.searchManageGame({
            pageIndex: 1,
            pageSize: pageSize,
            name: this.state.name,
        });
    };

    delConfirm = (id) => {
        let that = this;
        confirm({
            title: '删除提示',
            content: '确定要删除这条记录吗？',
            onOk() {
                that.props.actions.delManageGame({
                    id: id,
                    pageIndex: 1,
                    pageSize: that.props.gameList.pageSize,
                    name: this.state.name,
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    edit = (id) =>{
        this.props.actions.push('/manage-game/edit/' + id);
    };

    constructor(props){
        super(props);
        this.columns = [{
            title: '游戏ID',
            dataIndex: 'id',
        }, {
            title: '游戏名称',
            dataIndex: 'name',
        }, {
            title: '游戏系列',
            dataIndex: 'series',
        }];
        this.state = {
            name: '',
        }
    };

    componentWillMount(){
        this.props.actions.searchManageGame({
            pageIndex: 1,
            pageSize: this.props.gameList.pageSize,
            name: '',
        });
    };

    render() {
        const columns = this.columns;
        let gameList = this.props.gameList;
        gameList.rows = gameList.rows.map((value, index) => {
            return {...value, key: value.id}
        });
        return <div className="manage-list">
            <div className="manage-search">
                <label>游戏名称</label>
                <Input placeholder="游戏名称" value={this.state.name} onChange={(e) => this.setState({name: e.target.value})} />
                <Button type="primary" icon="search" onClick={() => this.search(1)} >查询</Button>
                <Button type="primary" icon="reload" onClick={() => this.reset()} >重置</Button>
            </div>
            <Table
                bordered
                size="small"
                dataSource={gameList.rows}
                columns={columns}
                pagination={{
                    current:gameList.pageIndex,
                    pageSize:gameList.pageSize,
                    total:gameList.total,
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
        gameList: state.manageGame.gameList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, searchManageGame, delManageGame, sizeManageGame}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageGameList);