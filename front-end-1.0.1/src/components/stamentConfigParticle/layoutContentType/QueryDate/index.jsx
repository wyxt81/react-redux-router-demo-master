/**
 * Author：zhoushuanglong
 * Time：2017/6/16
 * Description：query date
 */

import React, {Component} from 'react';
import Datetime from 'react-datetime';
import {generateUUID, compareObject} from '../../../../public/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showReportQuery} from '../../../../actions/showReport';
import {isEmpty} from '../../../../public/index';
import '../../../../../node_modules/react-datetime/css/react-datetime.css';
import './index.scss';

class QueryDate extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: generateUUID(),
            dateStart: null,
            dateEnd: null,
        };
    };

    valids = (current) => {
        return this.state.dateEnd ? current.isSameOrBefore(this.state.dateEnd) : true;
    };

    valide = (current) => {
        return this.state.dateStart ? current.isSameOrAfter(this.state.dateStart) : true;
    };

    onChangeStart = (date) => {
        if(typeof(date) == 'object'){
            if(this.props.range == "week"){
                date.startOf("week");
            }
            if(this.props.range == "month"){
                date.startOf("month");
            }
            if(this.props.range == "year"){
                date.startOf("year");
            }
            if(this.props.showReport){
                if(this.state.dateEnd && this.props.condition){
                    this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.props.condition.data.fieldName + " between '" + date.format('YYYY-MM-DD') + "' and '" + this.state.dateEnd.format('YYYY-MM-DD') + "' ");
                } else {
                    this.props.actions.showReportQuery(this.state.id, '');
                }
            }
            this.setState({
                dateStart: date,
            });
        } else {
            if(this.props.showReport){
                this.props.actions.showReportQuery(this.state.id, '');
            }
            this.setState({
                dateStart: null,
            });
        }
    };

    onChangeEnd = (date) => {
        if(typeof(date) == 'object'){
            if(this.props.range == "week"){
                date.endOf("week");
            }
            if(this.props.range == "month"){
                date.endOf("month");
            }
            if(this.props.range == "year"){
                date.endOf("year");
            }
            if(this.props.showReport){
                if(this.state.dateStart && this.props.condition){
                    this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.props.condition.data.fieldName + " between '" + this.state.dateStart.format('YYYY-MM-DD') + "' and '" + date.format('YYYY-MM-DD') + "' ");
                } else {
                    this.props.actions.showReportQuery(this.state.id, '');
                }
            }
            this.setState({
                dateEnd: date,
            });
        } else {
            if(this.props.showReport){
                this.props.actions.showReportQuery(this.state.id, '');
            }
            this.setState({
                dateEnd: null,
            });
        }
    };

    componentWillReceiveProps(newProps) {
        if((isEmpty(newProps.querys) || newProps.range != this.props.range) && newProps.showReport){
            this.setState({
                dateStart: null,
                dateEnd: null,
            });
        }
    };

    render() {
        let dateFormat = "YYYY-MM-DD";
        let viewMode = this.props.range + "s";
        if(this.props.range == "month"){
            dateFormat = "YYYY-MM";
        } else if(this.props.range == "year"){
            dateFormat = "YYYY";
        }
        if(this.props.range == "week"){
            viewMode = "days";
        }
        return <div className="query-date">
            <span>{this.props.condition.data.text ? this.props.condition.data.text : '时间'}</span>
            <Datetime closeOnSelect={true} value={this.state.dateStart} dateFormat={dateFormat} viewMode={viewMode} isValidDate={ this.valids } timeFormat={false} onChange={this.onChangeStart} inputProps={{placeholder: '开始时间'}} locale={window.navigator.language} />
            <span>~</span>
            <Datetime closeOnSelect={true} value={this.state.dateEnd} dateFormat={dateFormat} viewMode={viewMode} isValidDate={ this.valide } timeFormat={false} onChange={this.onChangeEnd} inputProps={{placeholder: '结束时间'}} locale={window.navigator.language} />
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

export default  connect(mapStateToProps, mapDispatchToProps)(QueryDate);