/**
 * Author：dengyu
 * Time：2017/10/11
 * Description：manage script edit
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Input, Button, Modal, Form, Select, Steps, Tabs, Table} from 'antd';
import {getManageScript, saveManageScript, templetManageScript, rateManageScript, levelManageScript, resetManageScript} from '../../../actions/manageScript';
import {compareObject} from '../../../public/index';
import DynamicField from '../../../components/DynamicField'

const confirm = Modal.confirm;
const FormItem = Form.Item;
const Step = Steps.Step;
const SelectOption = Select.Option;
const steps = [{
    title: '游戏信息',
    content: 'First-content',
}, {
    title: '初始化信息',
    content: 'Second-content',
}, {
    title: '其他信息',
    content: 'Last-content',
}];
class ManageScriptEdit extends Component {
    clear = () => {
        let that = this;
        confirm({
            title: '清空提示',
            content: '确定要清空所填信息吗？',
            onOk() {
                that.props.form.setFieldsValue({
                    templateId: '',
                    gameId: '',
                    gameName: '',
                    gamePinYin: '',
                    gameType: '1',
                    queryType: '',
                    queryName: '',
                    unionType: '1',
                    chargeStatus: '2',
                    consumeStatus: '2',
                    trial: '2',
                    passportType: '1',
                    channelName: '',
                    groupType: '1',
                    currencyType: 'CNY',
                    ebiDbName: '',
                    eratingDbName: '',
                    exchangeRate: '',
                    rechargeRate: '',
                    consumeRate: '',
                    exchangeScale: '',
                    exchangeDesc: '',
                });
                that.setState({
                    fixedChargeRateList: [],
                    levelIntervalList: [],
                });
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    next = () => {
        this.setState({
            current: this.state.current + 1,
        });
    };

    prev() {
        this.setState({
            current: this.state.current - 1,
        });
    };

    rateChange = (type) => { //切换档位信息
        this.setState({
            rate: type,
        });
    };

    levelChange = (type) => { //切换等级信息
        this.setState({
            level: type,
        });
    };

    dynamicChange = (name, value) => {
        if(Object.prototype.toString.call(value) == '[object Array]' && value.length > 0){
            try{
                value = value.map((item, index) => {
                    for(let key in item){
                        item[key] = Number(item[key]);
                        if(isNaN(item[key])){
                            throw "error";
                        }
                    }
                    return item;
                });
                this.setState({
                    [name]: value,
                });
                Modal.success({
                    title: "确认信息成功",
                    content:  '',
                });
            } catch(e){
                Modal.error({
                    title: "所填项应都为整数",
                    content:  '',
                });
            }
        }
    };

    save = () =>{
        this.props.form.validateFields((err, values) => {
            if (!err) {
                const form = this.props.form.getFieldsValue();
                let fixedChargeRateList = (this.props.route.pathname.indexOf('add') > -1 && this.state.rate == '1') ? this.props.rateList : this.state.fixedChargeRateList;
                let levelIntervalList = (this.props.route.pathname.indexOf('add') > -1 && this.state.level == '1') ? this.props.levelList : this.state.levelIntervalList;
                this.props.actions.saveManageScript({
                    scriptId: this.state.scriptId,
                    templateId: form.templateId,
                    gameId: form.gameId,
                    gameName: form.gameName,
                    gamePinYin: form.gamePinYin,
                    gameType: form.gameType,
                    queryType: form.queryType,
                    queryName: form.queryName,
                    unionType: form.unionType,
                    chargeStatus: form.chargeStatus,
                    consumeStatus: form.consumeStatus,
                    trial: form.trial,
                    passportType: form.passportType,
                    channelName: form.channelName,
                    groupType: form.groupType,
                    currencyType: form.currencyType,
                    ebiDbName: form.ebiDbName,
                    eratingDbName: form.eratingDbName,
                    exchangeRate: form.exchangeRate,
                    rechargeRate: form.rechargeRate,
                    consumeRate: form.consumeRate,
                    exchangeScale: form.exchangeScale,
                    exchangeDesc: form.exchangeDesc,
                    fixedChargeRateList: JSON.stringify(fixedChargeRateList),
                    levelIntervalList: JSON.stringify(levelIntervalList),
                });
            }
        });
    };

    constructor(props){
        super(props);
        this.state = {
            scriptId: '',
            fixedChargeRateList: [],
            levelIntervalList: [],
            init: {
                templateId: '',
                gameId: '',
                gameName: '',
                gamePinYin: '',
                gameType: '1',
                queryType: '',
                queryName: '',
                unionType: '1',
                chargeStatus: '2',
                consumeStatus: '2',
                trial: '2',
                passportType: '1',
                channelName: '',
                groupType: '1',
                currencyType: 'CNY',
                ebiDbName: '',
                eratingDbName: '',
                exchangeRate: '',
                rechargeRate: '',
                consumeRate: '',
                exchangeScale: '',
                exchangeDesc: '',
            },
            current: 0,
            rate: '1', //档位信息的类型
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
            level: '1', //等级信息的类型
            levelColumns: [{
                title: '区间最小值',
                dataIndex: 'minLevel',
            }, {
                title: '区间最大值',
                dataIndex: 'maxLevel',
            }],
        };
    };

    componentWillMount(){
        if(this.props.route.pathname.indexOf('edit') > -1){
            this.props.actions.getManageScript(this.props.params.id);
        } else if(this.props.route.pathname.indexOf('add') > -1){
            this.props.actions.rateManageScript();
            this.props.actions.levelManageScript();
        }
        this.props.actions.templetManageScript();
    };

    componentWillUnmount(){
        this.props.actions.resetManageScript();
    };

    componentWillReceiveProps(newProps) {
        if(!compareObject(newProps.scriptEdit, this.props.scriptEdit)){
            this.setState({
                scriptId: newProps.scriptEdit.scriptId,
                fixedChargeRateList: newProps.scriptEdit.fixedChargeRateList,
                levelIntervalList: newProps.scriptEdit.levelIntervalList,
            });
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 15 },
        };
        const rateColumns = this.state.rateColumns;
        const levelColumns = this.state.levelColumns;
        let rateList = this.props.rateList;
        rateList = rateList.map((value, index) => {
            return {...value, key: value.id}
        });
        let levelList = this.props.levelList;
        levelList = levelList.map((value, index) => {
            return {...value, key: value.id}
        });
        return <div className="manage-edit">
            <Link to="/manage-script-list"><Button type="primary" icon="rollback">返回列表</Button></Link>
            <div className="write-sql">
                <Steps current={this.state.current}>
                    {steps.map(item => <Step key={item.title} title={item.title} />)}
                </Steps>
                {<Form>
                    <div style={this.state.current != 0 ? {'display': 'none'} : {}} >
                        <FormItem
                            {...formItemLayout}
                            label="模板："
                        >
                            {getFieldDecorator('templateId', {
                                initialValue: this.state.init.templateId,
                                rules: [{required: true, message: '请选择模板'}]
                            })(
                                <Select>
                                    <SelectOption value="">请选择</SelectOption>
                                    {this.props.templetList.map((item, index) => {
                                        return <SelectOption key={index} value={item.id.toString()}>{item.templateName}</SelectOption>
                                    })}
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="游戏ID："
                        >
                            {getFieldDecorator('gameId', {
                                initialValue: this.state.init.gameId,
                                rules: [{required: true, message: '请输入游戏ID'},
                                    {pattern: /^\d*$/, message: '请输入整数'}]
                            })(
                                <Input type="text" placeholder="请输入游戏ID"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="游戏名称："
                        >
                            {getFieldDecorator('gameName', {
                                initialValue: this.state.init.gameName,
                                rules: [{required: true, message: '请输入游戏名称'}]
                            })(
                                <Input type="text" placeholder="请输入游戏名称"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="游戏简写："
                        >
                            {getFieldDecorator('gamePinYin', {
                                initialValue: this.state.init.gamePinYin,
                                rules: [{required: true, message: '请输入游戏简写'}]
                            })(
                                <Input type="text" placeholder="请输入游戏简写"/>
                            )}
                            <div className="form-explain" >游戏首字母</div>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="游戏类型："
                        >
                            {getFieldDecorator('gameType', {
                                initialValue: this.state.init.gameType,
                                rules: [{required: true, message: '请选择游戏类型'}]
                            })(
                                <Select>
                                    <SelectOption value="1">自研手游</SelectOption>
                                    <SelectOption value="2">代理手游</SelectOption>
                                    <SelectOption value="3">端游</SelectOption>
                                    <SelectOption value="4">页游</SelectOption>
                                    <SelectOption value="5">H5</SelectOption>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="查询系列："
                        >
                            {getFieldDecorator('queryType', {
                                initialValue: this.state.init.queryType,
                                rules: [{required: true, message: '请输入查询系列'},
                                    {pattern: /^\d*$/, message: '请输入整数'}]
                            })(
                                <Input type="text" placeholder="请输入查询系列"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="系列名称："
                        >
                            {getFieldDecorator('queryName', {
                                initialValue: this.state.init.queryName,
                                rules: [{required: true, message: '请输入系列名称'}]
                            })(
                                <Input type="text" placeholder="请输入系列名称"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="运营类型："
                        >
                            {getFieldDecorator('unionType', {
                                initialValue: this.state.init.unionType,
                                rules: [{required: true, message: '请输入运营类型'}]
                            })(
                                <Select>
                                    <SelectOption value="1">国内自营</SelectOption>
                                    <SelectOption value="2">安卓联运国内</SelectOption>
                                    <SelectOption value="3">ios联运国内</SelectOption>
                                    <SelectOption value="4">海外分成</SelectOption>
                                    <SelectOption value="5">韩国自营</SelectOption>
                                    <SelectOption value="6">韩国安卓联运</SelectOption>
                                    <SelectOption value="7">韩国ios联运</SelectOption>
                                    <SelectOption value="8">台湾自营</SelectOption>
                                    <SelectOption value="9">台湾安卓联运</SelectOption>
                                    <SelectOption value="10">台湾ios联运</SelectOption>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="充值状态："
                        >
                            {getFieldDecorator('chargeStatus', {
                                initialValue: this.state.init.chargeStatus,
                                rules: [{required: true, message: '请选择充值状态'}]
                            })(
                                <Select>
                                    <SelectOption value="1">可充值</SelectOption>
                                    <SelectOption value="2">不可充值</SelectOption>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="消耗状态："
                        >
                            {getFieldDecorator('consumeStatus', {
                                initialValue: this.state.init.consumeStatus,
                                rules: [{required: true, message: '请选择消耗状态'}]
                            })(
                                <Select>
                                    <SelectOption value="1">有消耗</SelectOption>
                                    <SelectOption value="2">不可消耗</SelectOption>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="是否是体验区："
                        >
                            {getFieldDecorator('trial', {
                                initialValue: this.state.init.trial,
                                rules: [{required: true, message: '请选择是否是体验区'}]
                            })(
                                <Select>
                                    <SelectOption value="1">体验区</SelectOption>
                                    <SelectOption value="2">正式区</SelectOption>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="登录通行证类型："
                        >
                            {getFieldDecorator('passportType', {
                                initialValue: this.state.init.passportType,
                                rules: [{required: true, message: '请选择登录通行证类型'}]
                                })(
                                <Select>
                                    <SelectOption value="1">蓝港通行证</SelectOption>
                                    <SelectOption value="2">非蓝港通行证</SelectOption>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="渠道名称："
                        >
                            {getFieldDecorator('channelName', {
                                initialValue: this.state.init.channelName,
                                rules: [{required: true, message: '请输入渠道名称'}]
                            })(
                                <Input type="text" placeholder="请输入渠道名称"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="分组类型："
                        >
                            {getFieldDecorator('groupType', {
                                initialValue: this.state.init.groupType,
                                rules: [{required: true, message: '请选择分组类型'}]
                            })(
                                <Select>
                                    <SelectOption value="1">系列全</SelectOption>
                                    <SelectOption value="2">系列系统分类</SelectOption>
                                </Select>
                            )}
                        </FormItem>
                    </div>
                    <div style={this.state.current != 1 ? {'display': 'none'} : {}} >
                        <FormItem
                            {...formItemLayout}
                            label="货币类型："
                        >
                            {getFieldDecorator('currencyType', {
                                initialValue: this.state.init.currencyType,
                                rules: [{required: true, message: '请选择货币类型'}]
                            })(
                                <Select>
                                    <SelectOption value="CNY">人民币(CNY)</SelectOption>
                                    <SelectOption value="TWD">台币(TWD)</SelectOption>
                                    <SelectOption value="HKD">港币(HKD)</SelectOption>
                                    <SelectOption value="USD">美元(USD)</SelectOption>
                                    <SelectOption value="JPY">日元(JPY)</SelectOption>
                                    <SelectOption value="VND">越南盾(VND)</SelectOption>
                                    <SelectOption value="SGD">新加坡元(SGD)</SelectOption>
                                    <SelectOption value="KRW">韩国元(KRW)</SelectOption>
                                    <SelectOption value="THB">泰铢(THB)</SelectOption>
                                    <SelectOption value="MYR">马来西亚元(MYR)</SelectOption>
                                    <SelectOption value="EUR">欧元(EUR)</SelectOption>
                                    <SelectOption value="GBP">英镑(GBP)</SelectOption>
                                    <SelectOption value="PHP">菲律宾比索(PHP)</SelectOption>
                                    <SelectOption value="SUR">俄罗斯卢布(SUR)</SelectOption>
                                    <SelectOption value="DEM">德国马克(DEM)</SelectOption>
                                    <SelectOption value="CHF">瑞士法郎(CHF)</SelectOption>
                                    <SelectOption value="FRF">法国法郎(FRF)</SelectOption>
                                    <SelectOption value="CAD">加拿大元(CAD)</SelectOption>
                                    <SelectOption value="AUD">澳大利亚(AUD)</SelectOption>
                                    <SelectOption value="ATS">奥地利先令(ATS)</SelectOption>
                                    <SelectOption value="FIM">芬兰马克(FIM)</SelectOption>
                                    <SelectOption value="BEF">比利时法郎(BEF)</SelectOption>
                                    <SelectOption value="NZD">新西兰元(NZD)</SelectOption>
                                </Select>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="ebi数据库名称："
                        >
                            {getFieldDecorator('ebiDbName', {
                                initialValue: this.state.init.ebiDbName,
                                rules: [{required: true, message: '请输入ebi数据库名称'}]
                            })(
                                <Input type="text" placeholder="请输入ebi数据库名称"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="erating数据库名称："
                        >
                            {getFieldDecorator('eratingDbName', {
                                initialValue: this.state.init.eratingDbName,
                                rules: [{required: true, message: '请输入erating数据库名称'}]
                            })(
                                <Input type="text" placeholder="请输入erating数据库名称"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="汇率："
                        >
                            {getFieldDecorator('exchangeRate', {
                                initialValue: this.state.init.exchangeRate,
                                rules: [{required: true, message: '请输入汇率'},
                                    {pattern: /^(0|([1-9]\d*))(\.\d+)?$/, message: '请输入数字'}]
                            })(
                                <Input type="text" placeholder="请输入汇率"/>
                            )}
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="充值比率："
                        >
                            {getFieldDecorator('rechargeRate', {
                                initialValue: this.state.init.rechargeRate,
                                rules: [{required: true, message: '请输入充值比率'},
                                    {pattern: /^(0|([1-9]\d*))(\.\d+)?$/, message: '请输入数字'}]
                            })(
                                <Input type="text" placeholder="请输入充值比率"/>
                            )}
                            <div className="form-explain" >人民币对元宝的比率</div>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="消耗比率："
                        >
                            {getFieldDecorator('consumeRate', {
                                initialValue: this.state.init.consumeRate,
                                rules: [{required: true, message: '请输入消耗比率'},
                                    {pattern: /^(0|([1-9]\d*))(\.\d+)?$/, message: '请输入数字'}]
                            })(
                                <Input type="text" placeholder="请输入消耗比率"/>
                            )}
                            <div className="form-explain" >元宝对人民币的比率</div>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="兑换率："
                        >
                            {getFieldDecorator('exchangeScale', {
                                initialValue: this.state.init.exchangeScale,
                                rules: [{required: true, message: '请输入兑换率'},
                                    {pattern: /^\d*$/, message: '请输入整数'}]
                            })(
                                <Input type="text" placeholder="请输入兑换率"/>
                            )}
                            <div className="form-explain" >每100元宝兑换当地多少货币</div>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="兑换描述："
                        >
                            {getFieldDecorator('exchangeDesc', {
                                initialValue: this.state.init.exchangeDesc,
                                rules: [{required: true, message: '请输入兑换描述'}]
                            })(
                                <Input type="text" placeholder="请输入兑换描述"/>
                            )}
                        </FormItem>
                    </div>
                    <div style={this.state.current != 2 ? {'display': 'none'} : {}} >
                        <FormItem
                            {...formItemLayout}
                            label="档位信息："
                        >
                            <Tabs activeKey={this.state.rate} onChange={this.rateChange} style={this.props.route.pathname.indexOf('edit') > -1 ? {'display': 'none'} : {}} >
                                <Tabs.TabPane tab="默认值" key="1">
                                    <Table
                                        bordered
                                        size="small"
                                        dataSource={rateList}
                                        columns={rateColumns}
                                        pagination={{
                                            pageSize: 5,
                                        }} />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="自定义" key="2">
                                    <DynamicField height="343px" item={rateColumns} span="7" dynamicChange={this.dynamicChange} list="fixedChargeRateList" />
                                </Tabs.TabPane>
                            </Tabs>
                            <div style={this.props.route.pathname.indexOf('edit') == -1 ? {'display': 'none'} : {}} >
                                <DynamicField height="343px" item={rateColumns} span="7" dynamicChange={this.dynamicChange} list="fixedChargeRateList" data={this.state.fixedChargeRateList} />
                            </div>
                        </FormItem>
                        <FormItem
                            {...formItemLayout}
                            label="等级信息："
                        >
                            <Tabs activeKey={this.state.level} onChange={this.levelChange} style={this.props.route.pathname.indexOf('edit') > -1 ? {'display': 'none'} : {}} >
                                <Tabs.TabPane tab="默认值" key="1">
                                    <Table
                                        bordered
                                        size="small"
                                        dataSource={levelList}
                                        columns={levelColumns}
                                        pagination={{
                                            pageSize: 5,
                                        }} />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="自定义" key="2">
                                    <DynamicField height="343px" item={levelColumns} span="11" dynamicChange={this.dynamicChange} list="levelIntervalList" />
                                </Tabs.TabPane>
                            </Tabs>
                            <div style={this.props.route.pathname.indexOf('edit') == -1 ? {'display': 'none'} : {}} >
                                <DynamicField height="343px" item={levelColumns} span="11" dynamicChange={this.dynamicChange} list="levelIntervalList" data={this.state.levelIntervalList} />
                            </div>
                        </FormItem>
                    </div>
                </Form>}
                <div className="run-sql" >
                    { this.state.current > 0 && <Button type="primary" size="large" onClick={() => this.prev()}>上一步</Button> }
                    { this.state.current < steps.length - 1 && <Button type="primary" size="large" onClick={() => this.next()}>下一步</Button> }
                    { this.state.current === steps.length - 1 && <Button type="primary" size="large" icon="save" onClick={this.save} >保存</Button> }
                    <Button type="default" size="large" icon="delete" onClick={this.clear}>清空</Button>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        route: state.routing.locationBeforeTransitions,
        scriptEdit: state.manageScript.scriptEdit,
        templetList: state.manageScript.templetList,
        rateList: state.manageScript.rateList,
        levelList: state.manageScript.levelList,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getManageScript, saveManageScript, templetManageScript, rateManageScript, levelManageScript, resetManageScript}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Form.create({
    mapPropsToFields(props) {
        return {
            templateId: {
                value: props.scriptEdit.templateId.toString()
            },
            gameId: {
                value: props.scriptEdit.gameId
            },
            gameName: {
                value: props.scriptEdit.gameName
            },
            gamePinYin: {
                value: props.scriptEdit.gamePinYin
            },
            gameType: {
                value: props.scriptEdit.gameType.toString()
            },
            queryType: {
                value: props.scriptEdit.queryType
            },
            queryName: {
                value: props.scriptEdit.queryName
            },
            unionType: {
                value: props.scriptEdit.unionType.toString()
            },
            chargeStatus: {
                value: props.scriptEdit.chargeStatus.toString()
            },
            consumeStatus: {
                value: props.scriptEdit.consumeStatus.toString()
            },
            trial: {
                value: props.scriptEdit.trial.toString()
            },
            passportType: {
                value: props.scriptEdit.passportType.toString()
            },
            channelName: {
                value: props.scriptEdit.channelName
            },
            groupType: {
                value: props.scriptEdit.groupType.toString()
            },
            currencyType: {
                value: props.scriptEdit.currencyType
            },
            ebiDbName: {
                value: props.scriptEdit.ebiDbName
            },
            eratingDbName: {
                value: props.scriptEdit.eratingDbName
            },
            exchangeRate: {
                value: props.scriptEdit.exchangeRate
            },
            rechargeRate: {
                value: props.scriptEdit.rechargeRate
            },
            consumeRate: {
                value: props.scriptEdit.consumeRate
            },
            exchangeScale: {
                value: props.scriptEdit.gameId
            },
            exchangeDesc: {
                value: props.scriptEdit.exchangeDesc
            },
        };
    }
})(ManageScriptEdit))