/**
 * Author：dengyu
 * Time：2017/7/28
 * Description：query range
 */

import React, {Component} from 'react';
import {Radio} from 'antd';
import {generateUUID} from '../../../../public/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showReportRange} from '../../../../actions/showReport';
import './index.scss';

class QueryRange extends Component {
    constructor(props) {
        super(props);
        let id = generateUUID();
        this.state = {
            id: id,
            selected: props.range,
            prop: this.props.condition ? this.props.condition.data.prop : {"day": "日","week": "周","month": "月","year": "年"},
        };
    };

    onChange = (e) => {
        this.setState({
            selected: e.target.value,
        });
        this.props.actions.showReportRange(e.target.value);
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            selected: newProps.range,
            prop: newProps.condition.data.prop,
        });
    };

    render() {
        let prop = this.state.prop;
        return <div className="query-range">
            <Radio.Group value={this.state.selected} onChange={this.onChange}>
                {prop["day"] ? <Radio.Button value="day">{prop["day"]}</Radio.Button> : ""}
                {prop["week"] ? <Radio.Button value="week">{prop["week"]}</Radio.Button> : ""}
                {prop["month"] ? <Radio.Button value="month">{prop["month"]}</Radio.Button> : ""}
                {prop["year"] ? <Radio.Button value="year">{prop["year"]}</Radio.Button> : ""}
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
        actions: bindActionCreators({showReportRange}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(QueryRange);