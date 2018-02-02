/**
 * Author：zhoushuanglong
 * Time：2017/5/31
 * Description：config content edit
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';
import {layoutReset, productionInit} from '../../../actions/layout';//展示
import {showReportReset, showReportSql} from '../../../actions/showReport';//展示
import ColorPicker from '../../../components/ColorPicker'
import ButtonContent from '../../../components/stamentConfigParticle/ButtonContent';
import ButtonCondition from '../../../components/stamentConfigParticle/ButtonCondition';
import DropTarget from '../../../components/stamentConfigParticle/DropTarget';

import './index.scss';

@DragDropContext(HTML5Backend)
class ConfigContentEdit extends Component {
    componentWillMount() {//展示
        this.props.actions.showReportReset();
        if(this.props.params.id){
            this.props.actions.productionInit(this.props.params.id);
        } else {
            this.props.actions.layoutReset();
            this.props.actions.showReportSql([]);
        }
    };

    render() {
        return <div className="config-content-edit">
            <div className="edit-element">
                <div className="edit-element-content">
                    <div className="element-wraper">
                        <ButtonContent/>
                        <ButtonCondition/>
                    </div>
                </div>
            </div>
            <ColorPicker/>
            <div className="edit-content">
                <div className="edit-content-content">
                    <DropTarget/>
                </div>
            </div>
        </div>
    }
}

const mapStateToProps = (state) => {
    return {
        dataList: state.configData.dataList
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({ layoutReset, productionInit, showReportReset, showReportSql }, dispatch)
    }
};

export default  connect(mapStateToProps, mapDispatchToProps)(ConfigContentEdit);

