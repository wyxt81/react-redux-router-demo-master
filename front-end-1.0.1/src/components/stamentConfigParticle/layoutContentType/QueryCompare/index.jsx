/**
 * Author：dengyu
 * Time：2017/8/7
 * Description：queryCompare
 */

import React, {Component} from 'react';
import {Switch} from 'antd';
import {generateUUID} from '../../../../public/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showReportCompare} from '../../../../actions/showReport';
import './index.scss';

class QueryCompare extends Component {
    constructor(props) {
        super(props);
        let id = generateUUID();
        this.state = {
            id: id,
        };
    };

    onChange = (checked) => {
        this.props.actions.showReportCompare(checked);
    };

    render() {
        return <div className="query-compare">
            <span>对比</span>
            <Switch checkedChildren="开" unCheckedChildren="关" checked={this.props.compare} onChange={this.onChange} />
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        querys: state.showReport.querys,
        compare: state.showReport.compare,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({showReportCompare}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(QueryCompare);