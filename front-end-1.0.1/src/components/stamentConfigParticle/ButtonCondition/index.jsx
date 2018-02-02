/**
 * Author：zhoushuanglong
 * Time：2017/6/14
 * Description：button type
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {layoutChange} from '../../../actions/layout';
import {searchConfigData} from '../../../actions/configData';
import {searchConfigQuery} from '../../../actions/configQuery';

import LayoutRow from '../buttonConditionType/LayoutRow';
import LayoutTab from '../buttonConditionType/LayoutTab';
import LayoutColumn from '../buttonConditionType/LayoutColumn';
import ChartLine from '../buttonConditionType/ChartLine';
import ChartPie from '../buttonConditionType/ChartPie';
import ChartBar from '../buttonConditionType/ChartBar';
import ChartRbar from '../buttonConditionType/ChartRbar';
import ChartTable from '../buttonConditionType/ChartTable';
import ChartMap from '../buttonConditionType/ChartMap';
import ChartScatter from '../buttonConditionType/ChartScatter';
import ChartRadar from '../buttonConditionType/ChartRadar';
import ChartFunnel from '../buttonConditionType/ChartFunnel';
import ControlQuery from '../buttonConditionType/ControlQuery';
import ControlText from '../buttonConditionType/ControlText';
import QueryRange from '../buttonConditionType/QueryRange';
import QueryDate from '../buttonConditionType/QueryDate';
import QueryDateOne from '../buttonConditionType/QueryDateOne';
import QuerySelect from '../buttonConditionType/QuerySelect';
import QuerySelectLinkage from '../buttonConditionType/QuerySelectLinkage';
import QuerySelectConfig from '../buttonConditionType/QuerySelectConfig';
import QueryRadio from '../buttonConditionType/QueryRadio';
import QueryCheckbox from '../buttonConditionType/QueryCheckbox';
import QueryDistrict from '../buttonConditionType/QueryDistrict';

import {
    LAYOUTROW,
    LAYOUTTAB,
    LAYOUTCOLUMN,
    CHARTLINE,
    CHARTPIE,
    CHARTBAR,
    CHARTRBAR,
    CHARTTABLE,
    CHARTMAP,
    CHARTSCATTER,
    CHARTRADAR,
    CHARTFUNNEL,
    CONTROLQUERY,
    CONTROLTEXT,
    QUERYRANGE,
    QUERYDATE,
    QUERYDATEONE,
    QUERYSELECT,
    QUERYSELECTLINKAGE,
    QUERYSELECTCONFIG,
    QUERYRADIO,
    QUERYCHECKBOX,
    QUERYDISTRICT,
} from '../../../constants/layoutBtnType';


class ButtonCondition extends Component {
    constructor(props) {
        super(props);
        this.childProps = {
            currentHeight: this.currentHeight,
            setStyle: this.setStyle,
            searchConfigData: props.actions.searchConfigData,
            searchConfigQuery: props.actions.searchConfigQuery,
            ...props
        };
        this.state = {
            currentSelectType: this.props.currentSelectType,
        }
    }

    currentHeight = (fn) => {
        const props = this.props;
        props.layoutConArr.map(function (d, i) {
            if (d.layoutId === props.currentCurId) {
                fn.call(window, d.height, d.title, d.children.length);
                return false;
            }
        });
    };

    setStyle = (height, title, tabsNumber) => {
        this.props.actions.layoutChange(this.props.currentCurId, height, title, tabsNumber);
    };

    btnType = (curType) => {
        switch (curType) {
            case LAYOUTROW:
                return <LayoutRow {...this.childProps}/>;
                break;
            case LAYOUTTAB:
                return <LayoutTab {...this.childProps}/>;
                break;
            case LAYOUTCOLUMN:
                return <LayoutColumn {...this.childProps}/>;
                break;
            case CHARTLINE:
                return <ChartLine {...this.childProps}/>;
                break;
            case CHARTPIE:
                return <ChartPie {...this.childProps}/>;
                break;
            case CHARTBAR:
                return <ChartBar {...this.childProps}/>;
                break;
            case CHARTRBAR:
                return <ChartRbar {...this.childProps}/>;
                break;
            case CHARTTABLE:
                return <ChartTable {...this.childProps}/>;
                break;
            case CHARTMAP:
                return <ChartMap {...this.childProps}/>;
                break;
            case CHARTSCATTER:
                return <ChartScatter {...this.childProps}/>;
                break;
            case CHARTFUNNEL:
                return <ChartFunnel {...this.childProps}/>;
                break;
            case CHARTRADAR:
                return <ChartRadar {...this.childProps}/>;
                break;
            case CONTROLQUERY:
                return <ControlQuery {...this.childProps}/>;
                break;
            case CONTROLTEXT:
                return <ControlText {...this.childProps}/>;
                break;
            case QUERYRANGE:
                return <QueryRange {...this.childProps}/>;
                break;
            case QUERYDATE:
                return <QueryDate {...this.childProps}/>;
                break;
            case QUERYDATEONE:
                return <QueryDateOne {...this.childProps}/>;
                break;
            case QUERYSELECT:
                return <QuerySelect {...this.childProps}/>;
                break;
            case QUERYSELECTLINKAGE:
                return <QuerySelectLinkage {...this.childProps}/>;
                break;
            case QUERYSELECTCONFIG:
                return <QuerySelectConfig {...this.childProps}/>;
                break;
            case QUERYRADIO:
                return <QueryRadio {...this.childProps}/>;
                break;
            case QUERYCHECKBOX:
                return <QueryCheckbox {...this.childProps}/>;
                break;
            case QUERYDISTRICT:
                return <QueryDistrict {...this.childProps}/>;
                break;
            default:
                return <div className="no-config-content">无对应类型配置项</div>;
        }
    };

    componentWillReceiveProps(newProps) {
        this.setState({
            currentSelectType: 'default',
        });
    };

    componentWillUpdate(nextProps, nextState) {
        if(nextState.currentSelectType == 'default'){
            this.setState({
                currentSelectType: nextProps.currentSelectType,
            });
        }
    };

    render() {
        return <div>{this.btnType(this.state.currentSelectType)}</div>
    }
}


const mapStateToProps = (state) => {
    return {
        currentSelectType: state.layoutConfig.currentType,
        currentSection: state.layoutConfig.currentSection,
        currentCurId: state.layoutConfig.currentId,
        layoutConArr: state.layoutConfig.content
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({layoutChange, searchConfigData, searchConfigQuery}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ButtonCondition);