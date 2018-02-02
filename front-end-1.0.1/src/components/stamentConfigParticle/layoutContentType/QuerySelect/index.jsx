/**
 * Author：zhoushuanglong
 * Time：2017/6/26
 * Description：control select
 */

import React, {Component} from 'react';
import {Select} from 'antd';
import {generateUUID} from '../../../../public/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showReportQuery, showReportSelect} from '../../../../actions/showReport';
import {isEmpty} from '../../../../public/index';
import './index.scss';

const Option = Select.Option;
class QuerySelect extends Component {
    constructor(props) {
        super(props);
        let id = generateUUID();
        this.state = {
            id: id,
            children: this.props.selects[id] || [],
            selected:[],
        };
    };

    onChange = (value) => {
        if (this.props.showReport) {
            let select = "";
            if(Object.prototype.toString.call(value) == '[object Array]'){
                value.forEach((value, index) => {
                    select += "'" + value + "',";
                });
            } else {
                select += "'" + value + "',";
            }
            if (value.length > 0 && this.props.condition) {
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.props.condition.data.fieldName + ' in (' + select.substring(0, select.length - 1) + ') ');
            } else {
                this.props.actions.showReportQuery(this.state.id, '');
            }
        }
        this.setState({
            selected: value,
        });
    };

    componentWillMount() {
        if (this.props.condition.data.selectSql) {
            this.props.actions.showReportSelect(this.state.id, this.props.condition.data.selectSql);
        }
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            children: newProps.selects[this.state.id] || [],
        });
        if(isEmpty(newProps.querys) && !newProps.selects[this.state.id]){
            if (this.props.condition.data.selectSql) {
                this.props.actions.showReportSelect(this.state.id, this.props.condition.data.selectSql);
            }
            this.setState({
                selected: [],
            });
        }
    };

    render() {
        let children = [
            <Option key="1" value="选项一">选项一</Option>,
            <Option key="2" value="选项二">选项二</Option>,
            <Option key="3" value="选项三">选项三</Option>
        ];
        let This = this;
        if (this.state.children.length > 0) {
            children = this.state.children.map((value, index) => {
                return <Option key={index}
                               value={value[This.props.condition.data.colcode]}>{value[This.props.condition.data.coltext]}</Option>;
            });
        }
        let multiple = this.props.condition.data.single ? {} : {
            mode: "multiple",
        };
        return <div className="query-select">
            <span className="select-title">{this.props.condition.data.text ? this.props.condition.data.text : ''}</span>
            <Select
                {...multiple}
                filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                style={{minWidth: '100px'}}
                placeholder="请选择"
                size="large"
                value={this.state.selected}
                onChange={this.onChange}>
                {children}
            </Select>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        querys: state.showReport.querys,
        selects: state.showReport.selects,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({showReportQuery, showReportSelect}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(QuerySelect);

