/**
 * Author：dengyu
 * Time：2017/10/12
 * Description：manage script eye
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Row, Col, Button, Table} from 'antd';
import {getManageScript, logManageScript} from '../../../actions/manageScript';
import {formatDate} from '../../../public/index';

class ManageScriptEye extends Component {
    convertGameType = (code) => {
        let value = '';
        switch(code){
            case 1:
                value = '自研手游';
                break;
            case 2:
                value = '代理手游';
                break;
            case 3:
                value = '端游';
                break;
            case 4:
                value = '页游';
                break;
            case 5:
                value = 'H5';
                break;
            default:
                value = '';
        }
        return value;
    };

    convertUnionType = (code) => {
        let value = '';
        switch(code){
            case 1:
                value = '国内自营';
                break;
            case 2:
                value = '安卓联运国内';
                break;
            case 3:
                value = 'ios联运国内';
                break;
            case 4:
                value = '海外分成';
                break;
            case 5:
                value = '韩国自营';
                break;
            case 6:
                value = '韩国安卓联运';
                break;
            case 7:
                value = '韩国ios联运';
                break;
            case 8:
                value = '台湾自营';
                break;
            case 9:
                value = '台湾安卓联运';
                break;
            case 10:
                value = '台湾ios联运';
                break;
            default:
                value = '';
        }
        return value;
    };

    convertCurrencyType = (code) => {
        let value = '';
        switch(code){
            case 'CNY':
                value = '人民币(CNY)';
                break;
            case 'TWD':
                value = '台币(TWD)';
                break;
            case 'HKD':
                value = '港币(HKD)';
                break;
            case 'USD':
                value = '美元(USD)';
                break;
            case 'JPY':
                value = '日元(JPY)';
                break;
            case 'VND':
                value = '越南盾(VND)';
                break;
            case 'SGD':
                value = '新加坡元(SGD)';
                break;
            case 'KRW':
                value = '韩国元(KRW)';
                break;
            case 'THB':
                value = '泰铢(THB)';
                break;
            case 'MYR':
                value = '马来西亚元(MYR)';
                break;
            case 'EUR':
                value = '欧元(EUR)';
                break;
            case 'GBP':
                value = '英镑(GBP)<';
                break;
            case 'PHP':
                value = '菲律宾比索(PHP)';
                break;
            case 'SUR':
                value = '俄罗斯卢布(SUR)';
                break;
            case 'DEM':
                value = '德国马克(DEM)';
                break;
            case 'CHF':
                value = '瑞士法郎(CHF)';
                break;
            case 'FRF':
                value = '法国法郎(FRF)';
                break;
            case 'CAD':
                value = '加拿大元(CAD)';
                break;
            case 'AUD':
                value = '澳大利亚(AUD)';
                break;
            case 'ATS':
                value = '奥地利先令(ATS)';
                break;
            case 'FIM':
                value = '芬兰马克(FIM)';
                break;
            case 'BEF':
                value = '比利时法郎(BEF)';
                break;
            case 'NZD':
                value = '新西兰元(NZD)';
                break;
            default:
                value = '';
        }
        return value;
    };

    convertStatus = (code) => {
        let value = '';
        switch(code){
            case 0:
                value = '待通知审核';
                break;
            case 1:
                value = '待审核';
                break;
            case 2:
                value = '待通知执行';
                break;
            case 3:
                value = '审核失败';
                break;
            case 4:
                value = '待执行';
                break;
            case 5:
                value = '已执行';
                break;
            default:
                value = '';
        }
        return value;
    };

    search = (page) => {
        this.props.actions.logManageScript({
            pageIndex: page,
            pageSize: this.props.logList.pageSize,
            scriptId: this.props.params.id,
        });
    };

    constructor(props){
        super(props);
        this.state = {
            levelColumns: [{
                title: '区间最小值',
                dataIndex: 'minLevel',
            }, {
                title: '区间最大值',
                dataIndex: 'maxLevel',
            }],
            rateColumns: [{
                title: '渠道ID',
                dataIndex: 'channelId',
            }, {
                title: '充值数量',
                dataIndex: 'chargeAmount',
            }, {
                title: '充值金额',
                dataIndex: 'chargeMoney',
            }],
            logColumns: [{
                title: '日期',
                dataIndex: 'create_time',
                render: (text) => {
                    return formatDate(text, 'yyyy-MM-dd HH:mm:ss');
                }
            }, {
                title: '操作类型',
                dataIndex: 'operateType',
                render: (text) => {
                    let status = '';
                    switch(text){
                        case 0:
                            status = '创建';
                            break;
                        case 1:
                            status = '修改内容';
                            break;
                        case 2:
                            status = '审核通过';
                            break;
                        case 3:
                            status = '审核不通过';
                            break;
                        case 4:
                            status = '已执行';
                            break;
                        default:
                            status = '';
                    }
                    return status;
                }
            }, {
                title: '操作人id',
                dataIndex: 'passportId',
            }, {
                title: '备注',
                dataIndex: 'content',
            }],
        };
    };

    componentWillMount(){
        this.props.actions.getManageScript(this.props.params.id);
        this.props.actions.logManageScript({
            pageIndex: 1,
            pageSize: this.props.logList.pageSize,
            scriptId: this.props.params.id,
        });
    };

    render() {
        let scriptEdit = this.props.scriptEdit;
        let logList = this.props.logList;
        const levelColumns = this.state.levelColumns;
        const rateColumns = this.state.rateColumns;
        const logColumns = this.state.logColumns;
        let levelIntervalList = scriptEdit.levelIntervalList;
        levelIntervalList = levelIntervalList.map((value, index) => {
            return {...value, key: index}
        });
        let fixedChargeRateList = scriptEdit.fixedChargeRateList;
        fixedChargeRateList = fixedChargeRateList.map((value, index) => {
            return {...value, key: index}
        });
        logList.rows = logList.rows.map((value, index) => {
            return {...value, key: value.id}
        });
        return <div className="manage-edit">
            <Link to="/manage-script-list"><Button type="primary" icon="rollback">返回列表</Button></Link>
            <div className="write-sql">
                <div className="title" >基本信息</div>
                <div className="detail-table" >
                    <Row className="detail-tr" >
                        <Col span={4} className="detail-cell cell-th" >游戏id</Col>
                        <Col span={4} className="detail-cell cell-th" >游戏名称</Col>
                        <Col span={4} className="detail-cell cell-th" >脚本编号</Col>
                        <Col span={4} className="detail-cell cell-th" >币种</Col>
                        <Col span={4} className="detail-cell cell-th" >ebi数据库名称</Col>
                        <Col span={4} className="detail-cell cell-th" >状态</Col>
                    </Row>
                    <Row className="detail-tr" >
                        <Col span={4} className="detail-cell cell-td" >{scriptEdit.gameId}</Col>
                        <Col span={4} className="detail-cell cell-td" >{scriptEdit.gameName}</Col>
                        <Col span={4} className="detail-cell cell-td" >{scriptEdit.scriptNo}</Col>
                        <Col span={4} className="detail-cell cell-td" >{this.convertCurrencyType(scriptEdit.currencyType)}</Col>
                        <Col span={4} className="detail-cell cell-td" >{scriptEdit.ebiDbName}</Col>
                        <Col span={4} className="detail-cell cell-td" >{this.convertStatus(scriptEdit.status)}</Col>
                    </Row>
                    <Row className="detail-tr" >
                        <Col span={4} className="detail-cell cell-th" >erating数据库名称</Col>
                        <Col span={4} className="detail-cell cell-th" >汇率</Col>
                        <Col span={4} className="detail-cell cell-th" >充值比率</Col>
                        <Col span={4} className="detail-cell cell-th" >消费比率</Col>
                        <Col span={4} className="detail-cell cell-th" >创建日期</Col>
                        <Col span={4} className="detail-cell cell-th" >兑换率</Col>
                    </Row>
                    <Row className="detail-tr" >
                        <Col span={4} className="detail-cell cell-td" >{scriptEdit.eratingDbName}</Col>
                        <Col span={4} className="detail-cell cell-td" >{scriptEdit.exchangeRate}</Col>
                        <Col span={4} className="detail-cell cell-td" >{scriptEdit.rechargeRate}</Col>
                        <Col span={4} className="detail-cell cell-td" >{scriptEdit.consumeRate}</Col>
                        <Col span={4} className="detail-cell cell-td" >{formatDate(scriptEdit.create_time, 'yyyy-MM-dd HH:mm:ss')}</Col>
                        <Col span={4} className="detail-cell cell-td" >{scriptEdit.exchangeScale}</Col>
                    </Row>
                    <Row className="detail-tr" >
                        <Col span={4} className="detail-cell cell-th" >渠道名称</Col>
                        <Col span={4} className="detail-cell cell-th" >游戏类型</Col>
                        <Col span={4} className="detail-cell cell-th" >运营类型</Col>
                        <Col span={4} className="detail-cell cell-th" >系列名称</Col>
                        <Col span={4} className="detail-cell cell-th" >&nbsp;</Col>
                        <Col span={4} className="detail-cell cell-th" >&nbsp;</Col>
                    </Row>
                    <Row className="detail-tr" >
                        <Col span={4} className="detail-cell cell-td" >{scriptEdit.channelName}</Col>
                        <Col span={4} className="detail-cell cell-td" >{this.convertGameType(scriptEdit.gameType)}</Col>
                        <Col span={4} className="detail-cell cell-td" >{this.convertUnionType(scriptEdit.unionType)}</Col>
                        <Col span={4} className="detail-cell cell-td" >{scriptEdit.queryName}</Col>
                        <Col span={4} className="detail-cell cell-td" >&nbsp;</Col>
                        <Col span={4} className="detail-cell cell-td" >&nbsp;</Col>
                    </Row>
                </div>
                <div className="title" >等级数据</div>
                <div>
                    <Table
                        bordered
                        size="small"
                        dataSource={levelIntervalList}
                        columns={levelColumns}
                        pagination={{
                            showQuickJumper: true,
                            pageSize: 5,
                        }} />
                </div>
                <div className="title" >档位数据</div>
                <div>
                    <Table
                        bordered
                        size="small"
                        dataSource={fixedChargeRateList}
                        columns={rateColumns}
                        pagination={{
                            showQuickJumper: true,
                            pageSize: 5,
                        }} />
                </div>
                {scriptEdit.reviewer ? <div>
                    <div className="title" >审核人信息</div>
                    <div className="detail-table" >
                        <Row className="detail-tr" >
                            <Col span={6} className="detail-cell cell-th" >审核人姓名</Col>
                            <Col span={6} className="detail-cell cell-th" >审核邮件</Col>
                            <Col span={6} className="detail-cell cell-th" >审核状态</Col>
                            <Col span={6} className="detail-cell cell-th" >审核时间</Col>
                        </Row>
                        <Row className="detail-tr" >
                            <Col span={6} className="detail-cell cell-td" >{scriptEdit.reviewer.name}</Col>
                            <Col span={6} className="detail-cell cell-td" >{scriptEdit.reviewer.reviewerEmail}</Col>
                            <Col span={6} className="detail-cell cell-td" >{scriptEdit.status > 1 ? '是' : '否'}</Col>
                            <Col span={6} className="detail-cell cell-td" >{formatDate(scriptEdit.reviewer.reviewTime, 'yyyy-MM-dd HH:mm:ss')}</Col>
                        </Row>
                    </div>
                </div> : null}
                {scriptEdit.executor ? <div>
                    <div className="title" >执行人信息</div>
                    <div className="detail-table" >
                        <Row className="detail-tr" >
                            <Col span={6} className="detail-cell cell-th" >执行人姓名</Col>
                            <Col span={6} className="detail-cell cell-th" >执行邮件</Col>
                            <Col span={6} className="detail-cell cell-th" >执行状态</Col>
                            <Col span={6} className="detail-cell cell-th" >执行时间</Col>
                        </Row>
                        <Row className="detail-tr" >
                            <Col span={6} className="detail-cell cell-td" >{scriptEdit.executor.executorName}</Col>
                            <Col span={6} className="detail-cell cell-td" >{scriptEdit.executor.executorEmail}</Col>
                            <Col span={6} className="detail-cell cell-td" >{scriptEdit.status > 4 ? '是' : '否'}</Col>
                            <Col span={6} className="detail-cell cell-td" >{formatDate(scriptEdit.executor.executeTime, 'yyyy-MM-dd HH:mm:ss')}</Col>
                        </Row>
                    </div>
                </div> : null}
                <div className="title" >日志</div>
                <div>
                    <Table
                        bordered
                        size="small"
                        dataSource={logList.rows}
                        columns={logColumns}
                        pagination={{
                            current:logList.pageIndex,
                            pageSize:logList.pageSize,
                            total:logList.total,
                            showQuickJumper: true,
                            onChange:(page) => this.search(page)
                        }} />
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        scriptEdit: state.manageScript.scriptEdit,
        logList: state.manageScript.logList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getManageScript, logManageScript}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ManageScriptEye)