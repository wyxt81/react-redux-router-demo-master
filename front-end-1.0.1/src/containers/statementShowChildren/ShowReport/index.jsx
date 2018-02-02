/**
 * Author：dengyu
 * Time：2017/6/30
 * Description：show report
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {
    LAYOUTROW,
    LAYOUTTAB,
    LAYOUTCOLUMN,
    CONTROLQUERY,
    CONTROLTEXT
} from '../../../constants/layoutBtnType';
import ChartLayoutRow from '../../../components/stamentConfigParticle/layoutType/ChartLayoutRow';
import ChartLayoutTab from '../../../components/stamentConfigParticle/layoutType/ChartLayoutTab';
import ChartLayoutColumn from '../../../components/stamentConfigParticle/layoutType/ChartLayoutColumn';
import ChartLayoutQuery from '../../../components/stamentConfigParticle/layoutType/ChartLayoutQuery';
import ChartLayoutText from '../../../components/stamentConfigParticle/layoutType/ChartLayoutText';
import {convertEchart, isEmpty} from '../../../public/index';
import LayoutContent from '../../../components/stamentConfigParticle/LayoutContent';
import {showReportInit, showReportSearch, showReportReset, showReportSql} from '../../../actions/showReport';

import './index.scss';

class ShowReport extends Component {
    constructor(props){
        super(props);
        this.state = {
            search: false,
        };
    };

    handleSearch = () => {
        let sqls = this.props.sqls;
        let querysOne = [];
        let querysTwo = [];
        if(!isEmpty(this.props.querys)){
            for(let id in this.props.querys){
                if(this.props.querys[id]){
                    if(!this.props.querys[id].startsWith("&")){
                        querysOne.push(this.props.querys[id]);
                    } else {
                        querysTwo.push(this.props.querys[id].substring(1));
                    }
                }
            }
        }
        this.props.actions.showReportSearch({sqls: sqls, querysOne: querysOne, querysTwo: querysTwo, dimensions: this.props.dimensions, measurements: this.props.measurements,});
        this.setState({
            search: !this.state.search,
        });
    };

    componentWillMount(){
        this.props.actions.showReportReset();
        this.props.actions.showReportSql([]);
        this.props.actions.showReportInit(this.props.params.id);
    };

    componentWillReceiveProps(newProps){
        if(newProps.params.id != this.props.params.id){
            this.props.actions.showReportReset();
            this.props.actions.showReportSql([]);
            this.props.actions.showReportInit(newProps.params.id);
        }
    };

    componentWillUpdate(nextProps, nextState){
        if(nextProps.config != this.props.config){
            this.setState({
                search: !this.state.search,
            });
        }
    };

    render() {
        const This = this;
        let echartIndex = 0;
        let config = Object.prototype.toString.call(this.props.config) == "[object Array]" ? this.props.config : [];
        let echarts = Object.prototype.toString.call(this.props.echarts) == "[object Array]" && this.props.echarts.length > 0 ? this.props.echarts : [[]];
        return <div className="show-report" >{config.map(function (d, i) {
            let title = [],
                children = [];
            d.children.map(function (data, index) {
                title.push(data.title);
                let legend = [];
                let ylegend = [];
                let xAxis = [];
                let yAxis = {};
                let series = [];
                if(d.layoutType != "control-query" && d.layoutType != "control-text" && data.condition){
                    ({legend, xAxis, series} = convertEchart({
                        legend,
                        ylegend,
                        xAxis,
                        yAxis,
                        series,
                        dimension: data.condition.data.dimension || [],
                        measurement: data.condition.data.measurement || [],
                        echartIndex,
                        echarts,
                    }));
                    echartIndex++;
                }
                if(data.group != 'two' || This.props.compare){
                    children.push(<LayoutContent currentType={This.currentType} layoutType={d.layoutType} height={d.height} showReport={true} legend={legend} xAxis={xAxis} series={series} search={This.state.search} readOnly={true} {...data}/>);
                }
            });
            let layout;
            switch (d.layoutType) {
                case LAYOUTROW:
                    layout = children.length > 0 ? <ChartLayoutRow title={title} children={children} layoutType={d.layoutType} id={d.layoutId} showReport={true} /> : '';
                    break;
                case LAYOUTCOLUMN:
                    layout = children.length > 0 ? <ChartLayoutColumn  title={title} children={children} layoutType={d.layoutType} id={d.layoutId} showReport={true} /> : '';
                    break;
                case LAYOUTTAB:
                    layout = children.length > 0 ? <ChartLayoutTab  title={title} children={children} layoutType={d.layoutType} id={d.layoutId} showReport={true} /> : '';
                    break;
                case CONTROLQUERY:
                    layout = <ChartLayoutQuery  title={title} children={children} layoutType={d.layoutType} id={d.layoutId} showReport={true} handleSearch={This.handleSearch} />;
                    break;
                case CONTROLTEXT:
                    layout = <ChartLayoutText  title={title} children={children} layoutType={d.layoutType} id={d.layoutId} showReport={true} />;
                    break;

            }
            return <div key={i} >{layout}</div>
        })}</div>
    }
}

const mapStateToProps = (state) => {
    return {
        config: state.showReport.config,
        echarts: state.showReport.echarts,
        sqls: state.showReport.sqls,
        querys: state.showReport.querys,
        compare: state.showReport.compare,
        dimensions: state.showReport.dimensions,
        measurements: state.showReport.measurements,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({showReportInit, showReportSearch, showReportReset, showReportSql}, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ShowReport);