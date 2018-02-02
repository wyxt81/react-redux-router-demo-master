/**
 * Author：dengyu
 * Time：2017/9/21
 * Description：query select linkage
 */

import React, {Component} from 'react';
import {Select} from 'antd';
import {generateUUID} from '../../../../public/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showReportQuery, showReportGetGcgLinkage, showReportSetGcgLinkage} from '../../../../actions/showReport';
import {isEmpty} from '../../../../public/index';
import './index.scss';

const Option = Select.Option;
class QuerySelectLinkage extends Component {
    constructor(props) {
        super(props);
        let id = generateUUID();
        this.state = {
            id: id,
            selectGame:[],
            childrenGame: this.props.game[id] || [],
            selectChannel:[],
            childrenChannel: this.props.channel[id] || [],
            selectGateway:[],
            childrenGateway: this.props.gateway[id] || [],
            gcgLinkage: {
                game: "",
                channel: "",
                gateway: "",
            },
        };
    };

    onChangeGame = (value) => {
        let name = (this.props.condition && this.props.condition.data && this.props.condition.data.gcgLinkage && this.props.condition.data.gcgLinkage.game) ? this.props.condition.data.gcgLinkage.game : 'game_id';
        let game = name + ' = ' + value;
        this.setState({
            gcgLinkage: {
                game: game,
                channel: "",
                gateway: "",
            },
        });
        if (this.props.showReport) {
            if (value.length > 0 && this.props.condition) {
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + game);
            } else {
                this.props.actions.showReportQuery(this.state.id, '');
            }
        }
        this.setState({
            selectGame: value,
            selectChannel:[],
            selectGateway:[],
        });
        if(value.length > 0){
            this.props.actions.showReportGetGcgLinkage({
                id: this.state.id,
                type: "channel",
                sql: "select * from t_channel",
                query: game,
            });
        } else {
            this.props.actions.showReportSetGcgLinkage({
                id: this.state.id,
                type: "channel",
                data: [],
            });
        }
        this.props.actions.showReportSetGcgLinkage({
            id: this.state.id,
            type: "gateway",
            data: [],
        });
    };

    onChangeChannel = (value) => {
        let name = (this.props.condition && this.props.condition.data && this.props.condition.data.gcgLinkage && this.props.condition.data.gcgLinkage.channel) ? this.props.condition.data.gcgLinkage.channel : 'channel_id';
        let channel = name + ' = ' + value;
        this.setState({
            gcgLinkage: {
                game: this.state.gcgLinkage.game,
                channel: channel,
                gateway: "",
            },
        });
        if (this.props.showReport) {
            if (value.length > 0 && this.props.condition) {
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.state.gcgLinkage.game + " and " + channel);
            } else {
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.state.gcgLinkage.game);
            }
        }
        this.setState({
            selectChannel:value,
            selectGateway:[],
        });
        if(value.length > 0){
            this.props.actions.showReportGetGcgLinkage({
                id: this.state.id,
                type: "gateway",
                sql: "select * from sys_gateway",
                query: this.state.gcgLinkage.game + " and " + channel,
            });
        } else {
            this.props.actions.showReportSetGcgLinkage({
                id: this.state.id,
                type: "gateway",
                data: [],
            });
        }
    };

    onChangeGateway = (value) => {
        let name = (this.props.condition && this.props.condition.data && this.props.condition.data.gcgLinkage && this.props.condition.data.gcgLinkage.gateway) ? this.props.condition.data.gcgLinkage.gateway : 'gateway_id';
        let gateway = name + ' = ' + value;
        this.setState({
            gcgLinkage: {
                game: this.state.gcgLinkage.game,
                channel: this.state.gcgLinkage.channel,
                gateway: gateway,
            },
        });
        if (this.props.showReport) {
            if (value.length > 0 && this.props.condition) {
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.state.gcgLinkage.game + " and " + this.state.gcgLinkage.channel + " and " + gateway);
            } else {
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.state.gcgLinkage.game + " and " + this.state.gcgLinkage.channel);
            }
        }
        this.setState({
            selectGateway:value,
        });
    };

    componentWillMount() {
        this.props.actions.showReportGetGcgLinkage({
            id: this.state.id,
            type: "game",
            sql: "select * from t_game",
            query: "",
        });
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            childrenGame: newProps.game[this.state.id] || [],
            childrenChannel: newProps.channel[this.state.id] || [],
            childrenGateway: newProps.gateway[this.state.id] || [],
        });
        if(isEmpty(newProps.querys) && !newProps.game[this.state.id]){
            this.props.actions.showReportGetGcgLinkage({
                id: this.state.id,
                type: "game",
                sql: "select * from t_game",
                query: "",
            });
            this.setState({
                selectGame: [],
                selectChannel:[],
                selectGateway:[],
            });
        }
    };

    render() {
        let childrenGame = [];
        let childrenChannel = [];
        let childrenGateway = [];
        if (this.state.childrenGame.length > 0) {
            childrenGame = this.state.childrenGame.map((item, index) => {
                return <Option key={index}
                               value={item.id.toString()}>{item.g_name}</Option>;
            });
        }
        if (this.state.childrenChannel.length > 0) {
            childrenChannel = this.state.childrenChannel.map((item, index) => {
                return <Option key={index}
                               value={item.id.toString()}>{item.c_name}</Option>;
            });
        }
        if (this.state.childrenGateway.length > 0) {
            childrenGateway = this.state.childrenGateway.map((item, index) => {
                return <Option key={index}
                               value={item.gateway_id.toString()}>{item.gateway_name}</Option>;
            });
        }
        return <div className="query-select-linkage">
            <span>游戏</span>
            <Select
                style={{minWidth: '100px'}}
                placeholder={"游戏"}
                size="large"
                value={this.state.selectGame}
                onChange={this.onChangeGame}>
                {childrenGame}
            </Select>
            <span>渠道</span>
            <Select
                style={{minWidth: '100px'}}
                placeholder={"渠道"}
                size="large"
                value={this.state.selectChannel}
                onChange={this.onChangeChannel}>
                {childrenChannel}
            </Select>
            <span>网关</span>
            <Select
                style={{minWidth: '100px'}}
                placeholder={"网关"}
                size="large"
                value={this.state.selectGateway}
                onChange={this.onChangeGateway}>
                {childrenGateway}
            </Select>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        querys: state.showReport.querys,
        game: state.showReport.game,
        channel: state.showReport.channel,
        gateway: state.showReport.gateway,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({showReportQuery, showReportGetGcgLinkage, showReportSetGcgLinkage}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(QuerySelectLinkage);