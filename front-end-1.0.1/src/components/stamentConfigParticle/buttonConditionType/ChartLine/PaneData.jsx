/**
 * Author：zhoushuanglong
 * Time：2017/6/20
 * Description：line data
 */
import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Form, InputNumber, Select, Button, message} from 'antd';
import {showReportSearch, showReportSql} from '../../../../actions/showReport';
import {contentData} from '../../../../actions/layout';
import {compareObject} from '../../../../public/index';

const FormItem = Form.Item;
const SelectOption = Select.Option;
class PaneData extends Component {
    state = {
        init: {
            limit: 100,
            source: '',
            dimension: [],
            measurement: [],
            group: 'one',
        },
        option: {
            sql: '',
            source: '',
            dimension: [],
            measurement: []
        },
        config: {
            sql: '',
            source: '',
            dimension: [],
            measurement: []
        }
    };

    sourceChange = (val) => {
        this.props.searchConfigData({
            pageIndex: 1,
            pageSize: 20,
            source: val
        });
    };

    sourceSelect = (val) => {
        const This = this;
        This.props.dataList.map((d, i) => {
            if (d.source.toString() === val.toString()) {
                let sql = d.sql;
                let limitIndex = sql.toLowerCase().indexOf('limit');
                if (limitIndex == -1) {
                    sql = sql + " limit " + this.state.init.limit;
                }
                This.setState({
                    option: {
                        sql: sql,
                        source: d.source,
                        dimension: d.dimension,
                        measurement: d.measurement
                    },
                    config: {
                        sql: sql,
                        source: d.source,
                        dimension: [],
                        measurement: []
                    }
                });
                This.props.form.setFieldsValue({ dimension: [], measurement: [] });
            }
        });
    };

    dimensionSelect = (val) => {
        const This = this;
        let option = This.state.option.dimension;
        option.map(d => {
            if (d.code.toString() === val.toString()) {
                This.setState({
                    config: Object.assign({}, This.state.config, {dimension: [d]})
                })
            }
        });
    };

    dimensionDeselect = (val) => {
        const This = this;
        let config = This.state.config.dimension;
        config.map((d, i) => {
            if (d.code.toString() === val.toString()) {
                config.delIndex(i);
                This.setState({
                    config: Object.assign({}, This.state.config, {dimension: config})
                })
            }
        });
    };

    measurementSelect = (val) => {
        const This = this;
        let option = This.state.option.measurement,
            config = This.state.config.measurement;
        option.map(d => {
            if (d.code.toString() === val.toString()) {
                if (config.indexOf(d) === -1) {
                    config.push(d);
                    This.setState({
                        config: Object.assign({}, This.state.config, {measurement: config})
                    })
                }
            }
        });
    };

    measurementDeselect = (val) => {
        const This = this;
        let config = This.state.config.measurement;
        config.map((d, i) => {
            if (d.code.toString() === val.toString()) {
                config.delIndex(i);
                This.setState({
                    config: Object.assign({}, This.state.config, {measurement: config})
                })
            }
        });
    };

    limitChange = (val) => {
        const This = this;
        let sql = This.state.config.sql;
        let limitIndex = sql.toLowerCase().indexOf('limit');

        if (limitIndex > -1) {
            sql = sql.substring(0, limitIndex).trim();
        }
        sql += ' LIMIT ' + val;

        This.setState({
            config: Object.assign({}, This.state.config, {sql: sql})
        })
    };

    renderChart = () => {
        const form = this.props.form.getFieldsValue();
        if (!form.source) {
            message.warning('请选择数据集');
        } else if (!form.dimension || form.dimension.length == 0) {
            message.warning('请选择维度');
        } else if (!form.measurement || form.measurement.length == 0) {
            message.warning('请选择度量');
        } else {
            let content = Object.prototype.toString.call(this.props.content) == "[object Array]" ? this.props.content : [];
            let sqls = [];
            let dimensions = [];
            let measurements = [];
            content.forEach((layout, icontent)  => {
                if (layout.layoutId === this.props.currentCurId) {
                    layout.children.forEach((echart, ichildren) => {
                        if(ichildren === this.props.currentSection){
                            sqls.push((form.group == 'two' ? '&' : '') + this.state.config.sql);
                            let dimension = [];
                            if(Object.prototype.toString.call(this.state.config.dimension) == '[object Array]' && this.state.config.dimension.length > 0){
                                this.state.config.dimension.forEach((d, i) => {
                                    dimension.push(d.code);
                                });
                            }
                            dimensions.push(dimension.join("&"));
                            let measurement = [];
                            if(Object.prototype.toString.call(this.state.config.measurement) == '[object Array]' && this.state.config.measurement.length > 0){
                                this.state.config.measurement.forEach((m, j) => {
                                    measurement.push(m.code);
                                });
                            }
                            measurements.push(measurement.join("&"));
                        } else {
                            if(echart.condition && echart.condition.data.sql){
                                sqls.push(echart.condition.data.sql);
                                let dimension = [];
                                if(Object.prototype.toString.call(echart.condition.data.dimension) == '[object Array]' && echart.condition.data.dimension.length > 0){
                                    echart.condition.data.dimension.forEach((d, i) => {
                                        dimension.push(d.code);
                                    });
                                }
                                dimensions.push(dimension.join("&"));
                                let measurement = [];
                                if(Object.prototype.toString.call(echart.condition.data.measurement) == '[object Array]' && echart.condition.data.measurement.length > 0){
                                    echart.condition.data.measurement.forEach((m, j) => {
                                        measurement.push(m.code);
                                    });
                                }
                                measurements.push(measurement.join("&"));
                            }
                        }
                    });
                } else {
                    layout.children.forEach((echart, ichildren) => {
                        if(echart.condition && echart.condition.data.sql){
                            sqls.push(echart.condition.data.sql);
                            let dimension = [];
                            if(Object.prototype.toString.call(echart.condition.data.dimension) == '[object Array]' && echart.condition.data.dimension.length > 0){
                                echart.condition.data.dimension.forEach((d, i) => {
                                    dimension.push(d.code);
                                });
                            }
                            dimensions.push(dimension.join("&"));
                            let measurement = [];
                            if(Object.prototype.toString.call(echart.condition.data.measurement) == '[object Array]' && echart.condition.data.measurement.length > 0){
                                echart.condition.data.measurement.forEach((m, j) => {
                                    measurement.push(m.code);
                                });
                            }
                            measurements.push(measurement.join("&"));
                        }
                    });
                }
            });
            this.props.actions.showReportSql(sqls);
            this.props.actions.showReportSearch({sqls: sqls, querysOne: [], querysTwo: [], dimensions: dimensions, measurements: measurements});
            this.props.actions.contentData(this.props.currentCurId, this.props.currentSection, form.group, this.state.config);
        }
    };

    componentWillMount() {
        this.props.searchConfigData({
            pageIndex: 1,
            pageSize: 20,
            source: '',
        });
        const This = this;
        let initDimension = [],
            initMeasurement = [];
        This.props.content.map((d, i) => {
            if (d.layoutId === This.props.currentCurId) {
                let data = d.children[This.props.currentSection].condition.data;
                data.dimension.map(d => {
                    initDimension.push(d.code);
                });
                data.measurement.map(d => {
                    initMeasurement.push(d.code);
                });

                let sql = data.sql.toLowerCase(),
                    limitIndex = sql.indexOf('limit');
                let limit = 100;
                if (limitIndex > -1) {
                    limit = sql.substring(limitIndex + 1, sql.length).split(' ')[1];
                }

                let option = {
                    sql: sql,
                    source: data.source,
                    dimension: [],
                    measurement: []
                };
                This.props.dataList.map((item, index) => {
                    if(item.source == data.source){
                        option.dimension = item.dimension;
                        option.measurement = item.measurement;
                    }
                });

                This.setState({
                    init: {
                        limit: limit,
                        source: data.source,
                        dimension: initDimension,
                        measurement: initMeasurement,
                        group: d.children[This.props.currentSection].group,
                    },
                    config: data,
                    option: option,
                });
            }
        });
    };

    componentWillReceiveProps(newProps){
        let This = this;
        if(!compareObject(This.props.dataList, newProps.dataList)){
            newProps.dataList.map((item, index) => {
                if(item.source == this.props.form.getFieldsValue().source){
                    This.setState({
                        option: Object.assign({}, This.state.option, {dimension: item.dimension, measurement: item.measurement})
                    });
                }
            });
        }
    };

    render() {
        const {getFieldDecorator} = this.props.form;
        return <Form>
            <h3 className="parameter-title">数据集</h3>
            <div className="parameter-content">
                <FormItem>
                    {getFieldDecorator('source', {
                        initialValue: this.state.init.source
                    })(<Select
                        mode="combobox"
                        placeholder="请选数据集"
                        onSearch={this.sourceChange}
                        onSelect={this.sourceSelect}>
                        {this.props.dataList.map((d, i) => <SelectOption
                            value={d.source.toString()}
                            key={d.id}>
                            {d.source}</SelectOption>)}
                    </Select>)}
                </FormItem>
            </div>
            <h3 className="parameter-title">维度</h3>
            <div className="parameter-content">
                <FormItem>
                    {getFieldDecorator('dimension', {
                        initialValue: this.state.init.dimension
                    })(<Select
                        placeholder="请选择维度"
                        onSelect={this.dimensionSelect}
                        onDeselect={this.dimensionDeselect}>
                        {this.state.option.dimension.map((d, i) => <SelectOption
                            value={d.code.toString()}
                            key={i}>
                            {d.text}</SelectOption>)}
                    </Select>)}
                </FormItem>
            </div>
            <h3 className="parameter-title">度量</h3>
            <div className="parameter-content">
                <FormItem>
                    {getFieldDecorator('measurement', {
                        initialValue: this.state.init.measurement
                    })(<Select
                        mode="multiple"
                        placeholder="请选择度量"
                        onSelect={this.measurementSelect}
                        onDeselect={this.measurementDeselect}>
                        {this.state.option.measurement.map((d, i) => <SelectOption
                            value={d.code.toString()}
                            key={i}>
                            {d.text}</SelectOption>)}
                    </Select>)}
                </FormItem>
            </div>
            <h3 className="parameter-title">预览行数</h3>
            <div className="parameter-content">
                <FormItem>
                    {getFieldDecorator('limit', {
                        initialValue: this.state.init.limit
                    })(<InputNumber
                        style={{width: '100%'}}
                        min={1}
                        max={1000}
                        placeholder="最大1000行" onChange={this.limitChange}/>)}
                </FormItem>
            </div>
            <h3 className="parameter-title">对比分组</h3>
            <div className="parameter-content">
                <FormItem>
                    {getFieldDecorator('group', {
                        initialValue: this.state.init.group
                    })(<Select>
                        <SelectOption value="one">第一组</SelectOption>
                        <SelectOption value="two">第二组</SelectOption>
                    </Select>)}
                </FormItem>
            </div>
            <div className="parameter-content reload-chart">
                <Button type="primary" icon="reload" onClick={this.renderChart}>更新</Button>
            </div>
        </Form>
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.configData.dataList.rows,
        currentSection: state.layoutConfig.currentSection,
        currentCurId: state.layoutConfig.currentId,
        content: state.layoutConfig.content,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ contentData, showReportSearch, showReportSql }, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Form.create()(PaneData));