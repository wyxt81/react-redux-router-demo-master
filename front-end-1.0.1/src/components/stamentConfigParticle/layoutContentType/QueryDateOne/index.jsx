/**
 * Author：dengyu
 * Time：2017/8/8
 * Description：query dateone
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

class QueryDateOne extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: generateUUID(),
            date: null,
        };
    };

    onChange = (date) => {
        if(typeof(date) == 'object'){
            if(this.props.showReport){
                if(this.props.condition){
                    this.props.actions.showReportQuery(this.state.id, (this.props.group == 'two' ? '&' : '') + this.props.condition.data.fieldName + " = \'" + date.format('YYYY-MM-DD') + "\' ");
                } else {
                    this.props.actions.showReportQuery(this.state.id, '');
                }
            }
            this.setState({
                date: date,
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
        if(isEmpty(newProps.querys) && newProps.showReport){
            this.setState({
                date: null,
            });
        }
    };

    render() {
        return <div className="query-date-one">
            <span>{this.props.condition.data.text ? this.props.condition.data.text : '时间'}</span>
            <Datetime closeOnSelect={true} value={this.state.date} dateFormat={"YYYY-MM-DD"} viewMode={"days"} timeFormat={false} onChange={this.onChange} inputProps={{placeholder: '时间'}} locale={window.navigator.language} />
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

export default  connect(mapStateToProps, mapDispatchToProps)(QueryDateOne);