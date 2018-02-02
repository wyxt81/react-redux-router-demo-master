/**
 * Author：dengyu
 * Time：2017/8/2
 * Description：queryLabel
 */

import React, {Component} from 'react';
import {Menu} from 'antd';
import {generateUUID} from '../../../../public/index';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {showReportQuery} from '../../../../actions/showReport';
import {isEmpty} from '../../../../public/index';
import './index.scss';

class QueryLabel extends Component {
    constructor(props) {
        super(props);
        let id = generateUUID();
        let condition = this.props.condition;
        let radios = (condition && condition.data && condition.data.radios && Object.prototype.toString.call(condition.data.radios) == "[object Array]") ? condition.data.radios : [];
        this.state = {
            id: id,
            selected: radios.length > 0 ? radios[0].code : "",
            radios: radios,
        };
    };

    onChange = (e) => {
        if (this.props.showReport) {
            // if (e.target.value != "-1" && this.props.condition) {
            //     this.props.actions.showReportQuery(this.state.id, this.props.condition.data.fieldName + ' = \'' + e.target.value + '\' ');
            // } else {
            //     this.props.actions.showReportQuery(this.state.id, '');
            // }
        }
        this.setState({
            selected: e.key,
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
                selected: radios.length > 0 ? radios[0].code : "",
            });
        }
    };

    render() {
        return <div className="query-label">
            <Menu onClick={this.onChange} selectedKeys={[this.state.selected]} mode="horizontal">
                {this.state.radios.map((item, index) => {
                    return <Menu.Item key={item.code}>{item.text}</Menu.Item>
                })}
            </Menu>
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

export default  connect(mapStateToProps, mapDispatchToProps)(QueryLabel);