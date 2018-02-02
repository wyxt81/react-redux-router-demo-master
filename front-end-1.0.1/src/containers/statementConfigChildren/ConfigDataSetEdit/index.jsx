/**
 * Author：zhoushuanglong
 * Time：5/28/2017
 * Description：config dataset edit
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {Input, Button, Table, Modal, Popover, Form, Tabs} from 'antd';
import {getConfigData, saveConfigData, exeConfigData} from '../../../actions/configData';
import './index.scss';

const confirm = Modal.confirm;
const FormItem = Form.Item;

class ConfigDataSetEdit extends Component {
    handleChange = (e, input) => {
        if((!input.startsWith('dimension') && !input.startsWith('measurement')) || (!e.target.value.startsWith(';') && (!e.target.value.endsWith(';') || !this.state[input].endsWith(';')))){//当前输入框不是维度与度量，或者不能以分号开始且不能连续两个分号
            if(input == 'dimension' || input == 'measurement'){
                if(this.state[input].endsWith(';') && e.target.value.length < this.state[input].length){//删除分号减少维度类型
                    let typeS = this.state[input + 'Type'];
                    let typeA = typeS.substring(0, typeS.length - 1).split(";");
                    typeA.pop();
                    typeS = typeA.join(";");
                    this.setState({
                        [input + 'Type']: typeS ? typeS + ";" : typeS,
                    });
                } else if(e.target.value.endsWith(';') && e.target.value.length > this.state[input].length){//输入分号弹出类型选择框
                    this.setState({
                        select: input,
                        [input + 'Show']: true,
                    });
                }
            }
            this.setState({
                [input]: e.target.value,
                [input + 'Empty']: e.target.value ? true : false,
            });
        }
    };

    // selectType = (value) => {
    //     if(this.state.select == 'dimension'){
    //         this.setState({
    //             dimensionType: this.state.dimensionType + value,
    //             dimensionShow: false,
    //         });
    //     }
    //     if(this.state.select == 'measurement'){
    //         this.setState({
    //             measurementType: this.state.measurementType + value,
    //             measurementShow: false,
    //         });
    //     }
    // };

    clearConfirm = () => {
        let that = this;
        confirm({
            title: '清空提示',
            content: '确定要清空所填信息吗？',
            onOk() {
                that.setState({
                    source: '',
                    dimension: '',
                    dimensionName: '',
                    // dimensionType: '',
                    measurement: '',
                    measurementName: '',
                    // measurementType: '',
                    key: '',
                    keyName: '',
                    datasetType: '',
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
            dimensionEmpty: this.state.dimension ? true : false,
            dimensionNameEmpty: this.state.dimensionName ? true : false,
            measurementEmpty: this.state.measurement ? true : false,
            measurementNameEmpty: this.state.measurementName ? true : false,
            keyEmpty: this.state.key ? true : false,
            keyNameEmpty: this.state.keyName ? true : false,
            sqlEmpty: this.state.sql ? true : false,
        });
        if(!this.state.source || (this.state.datasetType != 'redis' && (!this.state.dimension || !this.state.dimensionName || !this.state.measurement || !this.state.measurementName || !this.state.sql)) || (this.state.datasetType == 'redis' && (!this.state.key || !this.state.keyName ))){
            return;
        }
        let dimensionObjects = [];
        let measurementObjects = [];
        if(this.state.datasetType != 'redis'){
            let dimensionArray = this.state.dimension.match(/;/g);
            let dimensionNameArray = this.state.dimensionName.match(/;/g);
            if(!this.state.dimension.endsWith(';') || !this.state.dimensionName.endsWith(';') || !dimensionArray || !dimensionNameArray || dimensionArray.length != dimensionNameArray.length){
                Modal.error({
                    title: '请输入相同数量的维度与维度名称',
                    content: '维度与维度名称均以;结尾',
                });
                return;
            }
            let measurementArray = this.state.measurement.match(/;/g);
            let measurementNameArray = this.state.measurementName.match(/;/g);
            if(!this.state.measurement.endsWith(';') || !this.state.measurementName.endsWith(';') || !measurementArray || !measurementNameArray || measurementArray.length != measurementNameArray.length){
                Modal.error({
                    title: '请输入相同数量的度量与度量名称',
                    content: '度量与度量名称均以;结尾',
                });
                return;
            }
            let dimensions = this.state.dimension.substring(0, this.state.dimension.length - 1).split(";");
            let dimensionNames = this.state.dimensionName.substring(0, this.state.dimensionName.length - 1).split(";");
            // let dimensionTypes = this.state.dimensionType.substring(0, this.state.dimensionType.length - 1).split(";");
            let measurements = this.state.measurement.substring(0, this.state.measurement.length - 1).split(";");
            let measurementNames = this.state.measurementName.substring(0, this.state.measurementName.length - 1).split(";");
            // let measurementTypes = this.state.measurementType.substring(0, this.state.measurementType.length - 1).split(";");
            dimensions.forEach(function(item, index){
                dimensionObjects.push({
                    code: dimensions[index],
                    text: dimensionNames[index],
                    // type: dimensionTypes[index],
                });
                columns.push({
                    dataIndex: dimensions[index],
                    title: dimensionNames[index],
                    // type: dimensionTypes[index],
                });
            });
            measurements.forEach(function(item, index){
                measurementObjects.push({
                    code: measurements[index],
                    text: measurementNames[index],
                    // type: measurementTypes[index],
                });
                columns.push({
                    dataIndex: measurements[index],
                    title: measurementNames[index],
                    // type: measurementTypes[index],
                });
            });
        } else {
            columns.push({
                dataIndex: this.state.key,
                title: this.state.keyName,
                type: "varchar",
            });
            columns.push({
                dataIndex: 'value',
                title: '数据',
                type: "varchar",
            });
        }
        this.props.actions.exeConfigData({
            sql: this.state.sql,
            columns: columns,
            dataEdit: {
                id: this.state.id,
                source: this.state.source,
                dimension: dimensionObjects,
                measurement: measurementObjects,
                key: '',
                keyName: '',
                datasetType: this.state.datasetType,
                sql: this.state.sql,
            }
        });
    };

    save = () =>{
        this.setState({
            sourceEmpty: this.state.source ? true : false,
            dimensionEmpty: this.state.dimension ? true : false,
            dimensionNameEmpty: this.state.dimensionName ? true : false,
            measurementEmpty: this.state.measurement ? true : false,
            measurementNameEmpty: this.state.measurementName ? true : false,
            keyEmpty: this.state.key ? true : false,
            keyNameEmpty: this.state.keyName ? true : false,
            sqlEmpty: this.state.sql ? true : false,
        });
        if(!this.state.source || (this.state.datasetType != 'redis' && (!this.state.dimension || !this.state.dimensionName || !this.state.measurement || !this.state.measurementName || !this.state.sql)) || (this.state.datasetType == 'redis' && (!this.state.key || !this.state.keyName ))){
            return;
        }
        if(this.state.datasetType != 'redis'){
            let dimensionArray = this.state.dimension.match(/;/g);
            let dimensionNameArray = this.state.dimensionName.match(/;/g);
            if(!this.state.dimension.endsWith(';') || !this.state.dimensionName.endsWith(';') || !dimensionArray || !dimensionNameArray || dimensionArray.length != dimensionNameArray.length){
                Modal.error({
                    title: '请输入相同数量的维度与维度名称',
                    content: '维度与维度名称均以;结尾',
                });
                return;
            }
            let measurementArray = this.state.measurement.match(/;/g);
            let measurementNameArray = this.state.measurementName.match(/;/g);
            if(!this.state.measurement.endsWith(';') || !this.state.measurementName.endsWith(';') || !measurementArray || !measurementNameArray || measurementArray.length != measurementNameArray.length){
                Modal.error({
                    title: '请输入相同数量的度量与度量名称',
                    content: '度量与度量名称均以;结尾',
                });
                return;
            }
            let dimensions = this.state.dimension.substring(0, this.state.dimension.length - 1).split(";");
            let dimensionNames = this.state.dimensionName.substring(0, this.state.dimensionName.length - 1).split(";");
            // let dimensionTypes = this.state.dimensionType.substring(0, this.state.dimensionType.length - 1).split(";");
            let measurements = this.state.measurement.substring(0, this.state.measurement.length - 1).split(";");
            let measurementNames = this.state.measurementName.substring(0, this.state.measurementName.length - 1).split(";");
            // let measurementTypes = this.state.measurementType.substring(0, this.state.measurementType.length - 1).split(";");
            let dimensionObjects = [];
            let measurementObjects = [];
            dimensions.forEach(function(item, index){
                dimensionObjects.push({
                    code: dimensions[index],
                    text: dimensionNames[index],
                    // type: dimensionTypes[index],
                });
            });
            measurements.forEach(function(item, index){
                measurementObjects.push({
                    code: measurements[index],
                    text: measurementNames[index],
                    // type: measurementTypes[index],
                });
            });
            this.props.actions.saveConfigData({
                id: this.state.id,
                source: this.state.source,
                dimension: dimensionObjects,
                measurement: measurementObjects,
                key: '',
                keyName: '',
                datasetType: this.state.datasetType,
                sql: this.state.sql,
            });
        } else {
            this.props.actions.saveConfigData({
                id: this.state.id,
                source: this.state.source,
                dimension: [],
                measurement: [],
                key: this.state.key,
                keyName: this.state.keyName,
                datasetType: this.state.datasetType,
                sql: '',
            });
        }
    };

    tabsChange = (datasetType) => {
        this.setState({
            datasetType: datasetType
        });
    };

    constructor(props){
        super(props);
        let dimensions = Object.prototype.toString.call(this.props.dataEdit.dimension) == "[object Array]" ? this.props.dataEdit.dimension : [];
        let dimension = "";
        let dimensionName = "";
        // let dimensionType = "";
        dimensions.forEach(function(item, index){
            if(dimensions[index].code){
                dimension += dimensions[index].code + ";";
                dimensionName += dimensions[index].text + ";";
                // dimensionType += dimensions[index].type + ";";
            }
        });
        let measurements = Object.prototype.toString.call(this.props.dataEdit.measurement) == "[object Array]" ? this.props.dataEdit.measurement : [];
        let measurement = "";
        let measurementName = "";
        // let measurementType = "";
        measurements.forEach(function(item, index){
            if(measurements[index].code){
                measurement += measurements[index].code + ";";
                measurementName += measurements[index].text + ";";
                // measurementType += measurements[index].type + ";";
            }
        });
        this.state = {
            id: this.props.dataEdit.id || '',
            source: this.props.dataEdit.source || '',
            dimension: dimension,
            dimensionName: dimensionName,
            // dimensionType: dimensionType,
            measurement: measurement,
            measurementName: measurementName,
            // measurementType: measurementType,
            key: this.props.dataEdit.key || '',
            keyName: this.props.dataEdit.keyName || '',
            datasetType: this.props.dataEdit.datasetType || 'mysql',
            sql: this.props.dataEdit.sql || '',
            iseye: false,
            select: '',
            dimensionShow: false,
            measurementShow: false,
            sourceEmpty: true,
            dimensionEmpty: true,
            dimensionNameEmpty: true,
            measurementEmpty: true,
            measurementNameEmpty: true,
            keyEmpty: true,
            keyNameEmpty: true,
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
            this.props.actions.getConfigData(this.props.params.id);
        }
    };

    componentWillReceiveProps(newProps) {
        let dimensions = Object.prototype.toString.call(newProps.dataEdit.dimension) == "[object Array]" ? newProps.dataEdit.dimension : [];
        let dimension = "";
        let dimensionName = "";
        // let dimensionType = "";
        dimensions.forEach(function(item, index){
            if(dimensions[index].code){
                dimension += dimensions[index].code + ";";
                dimensionName += dimensions[index].text + ";";
                // dimensionType += dimensions[index].type + ";";
            }
        });
        let measurements = Object.prototype.toString.call(newProps.dataEdit.measurement) == "[object Array]" ? newProps.dataEdit.measurement : [];
        let measurement = "";
        let measurementName = "";
        // let measurementType = "";
        measurements.forEach(function(item, index){
            if(measurements[index].code){
                measurement += measurements[index].code + ";";
                measurementName += measurements[index].text + ";";
                // measurementType += measurements[index].type + ";";
            }
        });
        this.setState({
            id: newProps.dataEdit.id || '',
            source: newProps.dataEdit.source || '',
            dimension: dimension,
            dimensionName: dimensionName,
            // dimensionType: dimensionType,
            measurement: measurement,
            measurementName: measurementName,
            // measurementType: measurementType,
            key: newProps.dataEdit.key || '',
            keyName: newProps.dataEdit.keyName || '',
            datasetType: newProps.dataEdit.datasetType || 'mysql',
            sql: newProps.dataEdit.sql || '',
            iseye: newProps.params.type == 'eye',
            dimensionShow: false,
            measurementShow: false,
            sourceEmpty: true,
            dimensionEmpty: true,
            dimensionNameEmpty: true,
            measurementEmpty: true,
            measurementNameEmpty: true,
            keyEmpty: true,
            keyNameEmpty: true,
            sqlEmpty: true,
        });
    };

    render() {
        // let content = (
        //     <div>
        //         <div className="type-item" onClick={() => this.selectType('int;')} >int</div>
        //         <div className="type-item" onClick={() => this.selectType('decimal;')} >decimal</div>
        //         <div className="type-item" onClick={() => this.selectType('varchar;')} >varchar</div>
        //         <div className="type-item" onClick={() => this.selectType('date;')} >date</div>
        //     </div>
        // );
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 19 },
        };
        let dataTable = this.props.dataTable;
        dataTable.dataSource = dataTable.dataSource.map((value, index) => {
            return {...value, key: index}
        });
        return <div className="config-dataset-edit">
            <Link to="/config-dataset-list"><Button type="primary" icon="rollback">返回列表</Button></Link>
            <div className="write-sql">
                <Tabs activeKey={this.state.datasetType} onChange={this.tabsChange} tabPosition="left" >
                    <Tabs.TabPane tab="MySQL" key="mysql">
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label="注释："
                            >
                                <span className="ant-form-text">开发者自己写SQL语句，从该语句中定义出维度/度量，每一个维度/度量都有对应的名称，维度/维度名称、度量/度量名称以分号隔开成一一对应关系</span>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="数据集名称："
                            >
                                <Input placeholder="请输入数据集名称" value={this.state.source} onChange={(e) => this.handleChange(e, 'source')} disabled={this.state.iseye} />
                                <div className="ant-form-explain" style={this.state.sourceEmpty ? {'display': 'none'} : {}} >请输入数据集名称</div>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="维度："
                            >
                                <Input placeholder="请输入维度" value={this.state.dimension} onChange={(e) => this.handleChange(e, 'dimension')} disabled={this.state.iseye} />
                                <div className="ant-form-explain" style={this.state.dimensionEmpty ? {'display': 'none'} : {}} >请输入维度</div>
                            </FormItem>
                            {/*<FormItem*/}
                                {/*{...formItemLayout}*/}
                                {/*label="数据类型："*/}
                            {/*>*/}
                                {/*<Popover content={content} title="数据类型" trigger="focus" placement="topLeft" visible={this.state.dimensionShow} >*/}
                                    {/*<Input value={this.state.dimensionType} disabled={true} />*/}
                                {/*</Popover>*/}
                            {/*</FormItem>*/}
                            <FormItem
                                {...formItemLayout}
                                label="维度名称："
                            >
                                <Input placeholder="请输入维度名称" value={this.state.dimensionName} onChange={(e) => this.handleChange(e, 'dimensionName')} disabled={this.state.iseye} />
                                <div className="ant-form-explain" style={this.state.dimensionNameEmpty ? {'display': 'none'} : {}} >请输入维度名称</div>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="度量："
                            >
                                <Input placeholder="请输入度量" value={this.state.measurement} onChange={(e) => this.handleChange(e, 'measurement')} disabled={this.state.iseye} />
                                <div className="ant-form-explain" style={this.state.measurementEmpty ? {'display': 'none'} : {}} >请输入度量</div>
                            </FormItem>
                            {/*<FormItem*/}
                                {/*{...formItemLayout}*/}
                                {/*label="度量类型："*/}
                            {/*>*/}
                                {/*<Popover content={content} title="度量类型" trigger="focus" placement="topLeft" visible={this.state.measurementShow} >*/}
                                    {/*<Input value={this.state.measurementType} disabled={true} />*/}
                                {/*</Popover>*/}
                            {/*</FormItem>*/}
                            <FormItem
                                {...formItemLayout}
                                label="度量名称："
                            >
                                <Input placeholder="请输入度量名称" value={this.state.measurementName} onChange={(e) => this.handleChange(e, 'measurementName')} disabled={this.state.iseye} />
                                <div className="ant-form-explain" style={this.state.measurementNameEmpty ? {'display': 'none'} : {}} >请输入度量名称</div>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="SQL语句："
                            >
                                <textarea placeholder="请输入SQL语句" value={this.state.sql} onChange={(e) => this.handleChange(e, 'sql')} disabled={this.state.iseye} />
                                <div className="ant-form-explain" style={this.state.sqlEmpty ? {'display': 'none'} : {}} >请输入SQL语句</div>
                            </FormItem>
                        </Form>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Redis" key="redis">
                        <Form>
                            <FormItem
                                {...formItemLayout}
                                label="注释："
                            >
                                <span className="ant-form-text">开发者自己输入键名称（有且只有一个），获得相应的值</span>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="数据集名称："
                            >
                                <Input placeholder="请输入数据集名称" value={this.state.source} onChange={(e) => this.handleChange(e, 'source')} disabled={this.state.iseye} />
                                <div className="ant-form-explain" style={this.state.sourceEmpty ? {'display': 'none'} : {}} >请输入数据集名称</div>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="键："
                            >
                                <Input placeholder="请输入键" value={this.state.key} onChange={(e) => this.handleChange(e, 'key')} disabled={this.state.iseye} />
                                <div className="ant-form-explain" style={this.state.keyEmpty ? {'display': 'none'} : {}} >请输入键</div>
                            </FormItem>
                            <FormItem
                                {...formItemLayout}
                                label="键名称："
                            >
                                <Input placeholder="请输入键名称" value={this.state.keyName} onChange={(e) => this.handleChange(e, 'keyName')} disabled={this.state.iseye} />
                                <div className="ant-form-explain" style={this.state.keyNameEmpty ? {'display': 'none'} : {}} >请输入键名称</div>
                            </FormItem>
                        </Form>
                    </Tabs.TabPane>
                </Tabs>
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
        dataEdit: state.configData.dataEdit,
        dataTable: state.configData.dataTable
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({getConfigData, saveConfigData, exeConfigData}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(Form.create()(ConfigDataSetEdit))