/**
 * Author：dengyu
 * Time：2017/7/31
 * Description：query radio
 */

import React, {Component} from 'react';
import {Radio} from 'antd';
import {generateUUID} from '../../../../public/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showReportQuery} from '../../../../actions/showReport';
import {isEmpty} from '../../../../public/index';
import './index.scss';

class QueryRadio extends Component {
    constructor(props) {
        super(props);
        let id = generateUUID();
        let condition = this.props.condition;
        let radios = (condition && condition.data && condition.data.radios && Object.prototype.toString.call(condition.data.radios) == "[object Array]") ? condition.data.radios : [];
        this.state = {
            id: id,
            selected: "",
            radios: radios,
        };
    };

    onChange = (e) => {
        if (this.props.showReport) {
            if (e.target.value != "-1" && this.props.condition) {
                this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.props.condition.data.fieldName + ' = \'' + e.target.value + '\' ');
            } else {
                this.props.actions.showReportQuery(this.state.id, '');
            }
        }
        this.setState({
            selected: e.target.value,
        });
    };

    componentWillReceiveProps(newProps) {
        let condition = newProps.condition;
        let radios = (condition && condition.data && condition.data.radios && Object.prototype.toString.call(condition.data.radios) == "[object Array]") ? condition.data.radios : [];
        this.setState({
            radios: radios,
        });
        if(isEmpty(newProps.querys) && newProps.showReport){
            this.setState({
                selected: "",
            });
        }
    };

    render() {
        return <div className="query-radio">
            <span className="radio-title">{this.props.condition.data.text ? this.props.condition.data.text : ''}</span>
            <Radio.Group value={this.state.selected} onChange={this.onChange}>
                {this.state.radios.map((item, index) => {
                    return <Radio.Button key={index} value={item.code}>{item.text}</Radio.Button>
                })}
            </Radio.Group>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        querys: state.showReport.querys,
        range: state.showReport.range,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({showReportQuery}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(QueryRadio);