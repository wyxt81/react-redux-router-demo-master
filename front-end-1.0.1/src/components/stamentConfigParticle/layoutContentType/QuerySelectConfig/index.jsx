/**
 * Author：dengyu
 * Time：2017/8/9
 * Description：query select config
 */

import React, {Component} from 'react';
import {Select} from 'antd';
import {generateUUID} from '../../../../public/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showReportQuery, showReportSelect} from '../../../../actions/showReport';
import {isEmpty} from '../../../../public/index';

const Option = Select.Option;
class QuerySelectConfig extends Component {
    constructor(props) {
        super(props);
        let id = generateUUID();
        let condition = this.props.condition;
        let selects = (condition && condition.data && condition.data.selects && Object.prototype.toString.call(condition.data.selects) == "[object Array]") ? condition.data.selects : [];
        this.state = {
            id: id,
            selects: selects,
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

    componentWillReceiveProps(newProps) {
        let condition = newProps.condition;
        let selects = (condition && condition.data && condition.data.selects && Object.prototype.toString.call(condition.data.selects) == "[object Array]") ? condition.data.selects : [];
        this.setState({
            selects: selects,
        });
        if(isEmpty(newProps.querys) && newProps.showReport){
            this.setState({
                selected: [],
            });
        }
    };

    render() {
        let children = [];
        if(this.state.selects.length > 0){
            children = this.state.selects.map((item, index) => {
                return <Option key={index} value={item.code}>{item.text}</Option>
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

export default  connect(mapStateToProps, mapDispatchToProps)(QuerySelectConfig);
