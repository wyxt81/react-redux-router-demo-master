/**
 * Author：zhoushuanglong
 * Time：2017/6/7
 * Description：drag source
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Tooltip, message} from 'antd';
import {DragSource} from 'react-dnd';

import {layoutAdd, currentType, layoutContent} from '../../../actions/layout';
import {LAYOUT} from '../../../constants/dragDropTypes';
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
    CONTROLTEXT
} from '../../../constants/layoutBtnType';

const boxSource = {
    beginDrag(props) {
        return {
            type: props.type
        }
    },
    endDrag(props, monitor, component){
        return {}
    },
    canDrag(props, monitor){
        return {}
    },
    isDragging(props, monitor){
        return {}
    }
};

@DragSource(LAYOUT, boxSource, (connect, monitor) => ({
    isDragging: monitor.isDragging(),
    connectDragSource: connect.dragSource()
}))
class DragSourceCon extends Component {
    render() {
        const This = this;
        const props = this.props;
        const {isDragging, connectDragSource} = props;
        return connectDragSource(
            <div onClick={() => {
                //props.actions.currentType(props.type)
            }} onDoubleClick={() => {

                const type = props.type;

                let curLayoutIndex = 0,
                    curLayoutType = '',
                    curSection = 0;
                props.layoutConArr.map(function (d, i) {
                    if (d.layoutId === props.currentLayId) {
                        curLayoutIndex = i;
                        curLayoutType = d.layoutType;
                        curSection = d.layoutSection;
                        return false;
                    } else {
                        curLayoutIndex = props.layoutConArr.length - 1;
                    }
                });

                if (type === LAYOUTROW || type === LAYOUTCOLUMN || type === LAYOUTTAB || type === CONTROLQUERY || type === CONTROLTEXT) {
                    props.actions.currentType(type);
                    props.actions.layoutAdd(type, curLayoutIndex);
                } else if (type === CHARTLINE || type === CHARTPIE || type === CHARTBAR || type === CHARTRBAR || type === CHARTTABLE || type === CHARTMAP || type === CHARTSCATTER || type === CHARTRADAR || type === CHARTFUNNEL) {
                    if (props.layoutConArr.length === 0) {
                        message.warning('请先选择布局');
                    } else {
                        if (type.indexOf('chart') > -1 && (curLayoutType === CONTROLQUERY || curLayoutType === CONTROLTEXT)) {
                            message.warning('图表请选择通栏，列，TAB布局');
                        } else {
                            props.actions.currentType(type);
                            props.actions.layoutContent(props.currentLayId, curSection, type);
                        }
                    }
                }
            }}>
                <Tooltip placement="top" title={props.title}>
                    <a className={props.type + ' ' + (props.currentSelectType === props.type ? 'active' : '')}/>
                </Tooltip>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        currentLayId: state.layoutConfig.currentId,
        layoutConArr: state.layoutConfig.content
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({layoutAdd, currentType, layoutContent}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DragSourceCon);