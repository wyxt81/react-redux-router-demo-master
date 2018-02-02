/**
 * Author：zhoushuanglong
 * Time：2017/6/26
 * Description：control select
 */

import React, {Component} from 'react';
import {Checkbox} from 'antd';
import {generateUUID, compareObject} from '../../../../public/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showReportQuery, showReportSetTables} from '../../../../actions/showReport';
import './index.scss';

const CheckboxGroup = Checkbox.Group;
class QueryCheckbox extends Component {
    constructor(props) {
        super(props);
        let id = generateUUID();
        let condition = this.props.condition;
        let checkboxs = (condition && condition.data && condition.data.checkboxs && Object.prototype.toString.call(condition.data.checkboxs) == "[object Array]") ? condition.data.checkboxs : [];
        this.state = {
            id: id,
            checkboxs: checkboxs.map((item, index) => {
                    return {
                        label: item.text,
                        value: item.code
                    };
                }),
            selected:[],
        };
    };

    onChange = (checkedValues) => {
        this.setState({
            selected: checkedValues,
        });
    };

    componentWillReceiveProps(newProps) {
        let condition = newProps.condition;
        let checkboxs = (condition && condition.data && condition.data.checkboxs && Object.prototype.toString.call(condition.data.checkboxs) == "[object Array]") ? condition.data.checkboxs : [];
        this.setState({
            checkboxs: checkboxs.map((item, index) => {
                return {
                    label: item.text,
                    value: item.code
                };
            }),
        });
        // if(isEmpty(newProps.querys) && newProps.showReport){
        //     this.setState({
        //         selected: [],
        //     });
        // }
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.props.showReport) {
            let colum = {};
            this.state.checkboxs.forEach((item, index) => {
                colum[item.value] = item.label;
            });
            this.state.selected.forEach((item, index) => {
                delete(colum[item]);
            });
            for(let id in this.props.tables){
                let columnt = this.props.tables[id].columnsOld.filter((item, index) => {
                    return !colum[item.dataIndex];
                });
                if(!compareObject(columnt, this.props.tables[id].columns)){
                    this.props.tables[id].columns = columnt;
                    this.props.actions.showReportSetTables({
                        id: id,
                        table: this.props.tables[id],
                    });
                }
            }
        }
    };

    render() {
        return <div className="query-checkbox">
            <span className="checkbox-title">{this.props.condition.data.text ? this.props.condition.data.text : ''}</span>
            <CheckboxGroup options={this.state.checkboxs} value={this.state.selected} onChange={this.onChange}/>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        querys: state.showReport.querys,
        tables: state.showReport.tables,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({showReportQuery, showReportSetTables}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(QueryCheckbox);