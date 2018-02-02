/**
 * Author：zhoushuanglong
 * Time：2017/6/14
 * Description：layout content
 */

import React, {Component} from 'react';

import {
    CHARTLINE,
    CHARTPIE,
    CHARTBAR,
    CHARTRBAR,
    CHARTTABLE,
    CHARTMAP,
    CHARTSCATTER,
    CHARTRADAR,
    CHARTFUNNEL,
    QUERYRANGE,
    QUERYDATE,
    QUERYCHECKBOX,
    QUERYSELECT,
    QUERYRADIO,
    QUERYDISTRICT,
    QUERYLABEL,
    QUERYCOMPARE,
    QUERYDATEONE,
    QUERYSELECTCONFIG,
    QUERYSELECTLINKAGE,
    CONTROLTEXT,
} from '../../../constants/layoutBtnType';
import ContentDefault from '../layoutContentType/ContentDefault';
import ChartLine from '../layoutContentType/ChartLine';
import ChartPie from '../layoutContentType/ChartPie';
import ChartBar from '../layoutContentType/ChartBar';
import ChartRbar from '../layoutContentType/ChartRbar';
import ChartTable from '../layoutContentType/ChartTable';
import ChartMap from '../layoutContentType/ChartMap';
import ChartScatter from '../layoutContentType/ChartScatter';
import ChartRadar from '../layoutContentType/ChartRadar';
import ChartFunnel from '../layoutContentType/ChartFunnel';
import QueryRange from '../layoutContentType/QueryRange';
import QueryDate from '../layoutContentType/QueryDate';
import QuerySelect from '../layoutContentType/QuerySelect';
import QueryCheckbox from '../layoutContentType/QueryCheckbox';
import QueryRadio from '../layoutContentType/QueryRadio';
import QueryDistrict from '../layoutContentType/QueryDistrict';
import QueryLabel from '../layoutContentType/QueryLabel';
import QueryCompare from '../layoutContentType/QueryCompare';
import QueryDateOne from '../layoutContentType/QueryDateOne';
import QuerySelectConfig from '../layoutContentType/QuerySelectConfig';
import QuerySelectLinkage from '../layoutContentType/QuerySelectLinkage';
import RichEditor from '../layoutContentType/RichEditor';

class LayoutContent extends Component {
    contentType = () => {
        switch (this.props.contentType) {
            case CHARTLINE:
                return <ChartLine {...this.props}/>;
                break;
            case CHARTPIE:
                return <ChartPie {...this.props}/>;
                break;
            case CHARTBAR:
                return <ChartBar {...this.props}/>;
                break;
            case CHARTRBAR:
                return <ChartRbar {...this.props}/>;
                break;
            case CHARTTABLE:
                return <ChartTable {...this.props}/>;
                break;
            case CHARTMAP:
                return <ChartMap {...this.props}/>;
                break;
            case CHARTSCATTER:
                return <ChartScatter {...this.props}/>;
                break;
            case CHARTRADAR:
                return <ChartRadar {...this.props}/>;
                break;
            case CHARTFUNNEL:
                return <ChartFunnel {...this.props}/>;
                break;
            case QUERYRANGE:
                return <QueryRange {...this.props}/>;
                break;
            case QUERYDATE:
                return <QueryDate {...this.props}/>;
                break;
            case QUERYCHECKBOX:
                return <QueryCheckbox {...this.props}/>;
                break;
            case QUERYSELECT:
                return <QuerySelect {...this.props}/>;
                break;
            case QUERYRADIO:
                return <QueryRadio {...this.props}/>;
                break;
            case QUERYDISTRICT:
                return <QueryDistrict {...this.props}/>;
                break;
            case QUERYLABEL:
                return <QueryLabel {...this.props}/>;
                break;
            case QUERYCOMPARE:
                return <QueryCompare {...this.props}/>;
                break;
            case QUERYDATEONE:
                return <QueryDateOne {...this.props}/>;
                break;
            case QUERYSELECTCONFIG:
                return <QuerySelectConfig {...this.props}/>;
                break;
            case QUERYSELECTLINKAGE:
                return <QuerySelectLinkage {...this.props}/>;
                break;
            case CONTROLTEXT:
                return <RichEditor {...this.props}/>;
                break;
            default:
                return <ContentDefault {...this.props}/>;
        }
    };

    render() {
        const props = this.props;
        const hasType = props.contentType && props.contentType !== '';
        return <div>
            {hasType ? <div className="layout-content" onClick={() => {
                if (!props.showReport) {
                    props.currentType(props.contentType);
                }
            }}>{this.contentType()}</div> : <div className="layout-content" onClick={() => {
                if (!props.showReport) {
                    props.currentType(props.layoutType);
                }
            }}>{this.contentType()}</div>}
        </div>
    }
}

export default LayoutContent;