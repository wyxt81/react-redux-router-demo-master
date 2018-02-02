/**
 * Author：zhoushuanglong
 * Time：2017/6/7
 * Description：drag target
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {DropTarget} from 'react-dnd';
import {message} from 'antd';

import {layoutAdd, currentType, layoutContent, currentId} from '../../../actions/layout';
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

import LayoutRender from '../LayoutRender';

const hoverCurrentLayout = (cx, cy) => {
    const $contentWraper = $('.content-wraper');
    const $chartLayout = $contentWraper.find('.chart-layout');

    let wTop = $contentWraper.offset().top,
        wWidth = parseInt($contentWraper.width()),
        wh = parseInt($contentWraper.height()) - 32,
        ex = cx - 390,
        ey = cy - 160;

    //鼠标在content-wraper元素上的y位置
    let my = 0;
    if (wTop <= 161 && wTop >= 0) {
        my = ey + (160 - wTop);
    } else if (wTop < 0) {
        my = ey + 160 + Math.abs(wTop);
    }

    //元素高度数组
    let itemHeightArr = [];
    $chartLayout.each(function (i, d) {
        let ih = parseInt($(d).height()) + 10;
        itemHeightArr.push(ih);
    });

    //当前哪个布局
    let cur = 0,
        num = 0;
    $.each(itemHeightArr, function (i, d) {
        num += d;
        if (my > num - d && my < num) {
            cur = i;
            num = 0;
            return false;
        }
    });

    //column列左右布局左边或右边
    let sec = 0;
    if (ex < wWidth / 2) {
        sec = 0;
    } else {
        sec = 1;
    }

    return {
        current: cur,
        section: sec
    };
};

const boxTarget = {//monitor，获取beginDrag传过来的数据
    drop(props, monitor, component) {
        const type = monitor.getItem().type;
        const clientOffset = monitor.getClientOffset();
        const hoverIndex = props.hoverCurrentLayout(clientOffset.x, clientOffset.y);

        if (type === LAYOUTROW || type === LAYOUTCOLUMN || type === LAYOUTTAB || type === CONTROLQUERY || type === CONTROLTEXT) {
            props.actions.currentType(type);
            props.actions.layoutAdd(type, hoverIndex.current);
        } else if (type === CHARTLINE || type === CHARTPIE || type === CHARTBAR || type === CHARTRBAR || type === CHARTTABLE || type === CHARTMAP || type === CHARTSCATTER || type === CHARTRADAR || type === CHARTFUNNEL) {
            if (props.layoutConArr.length === 0) {
                message.warning('请先选择布局');
            } else {
                let conHover = props.layoutConArr[hoverIndex.current];
                let curSection = 0;

                switch (conHover.layoutType) {
                    case LAYOUTROW:
                        curSection = 0;
                        break;
                    case LAYOUTTAB:
                        curSection = conHover.layoutSection;
                        break;
                    case LAYOUTCOLUMN:
                        curSection = hoverIndex.section;
                        break;
                }

                if (type.indexOf('chart') > -1 && (conHover.layoutType === CONTROLQUERY || conHover.layoutType === CONTROLTEXT)) {
                    message.warning('图表请选择通栏，列，TAB布局');
                } else {
                    props.actions.currentId(conHover.layoutId, curSection);
                    props.actions.layoutContent(conHover.layoutId, curSection, type);
                    props.actions.currentType(type);
                }
            }
        }
    },
    hover(props, monitor, component){
        return {}
    },
    canDrop(props, monitor){
        return {}
    }
};
@DropTarget(LAYOUT, boxTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    isOverCurrent: monitor.isOver({shallow: true}),
    canDrop: monitor.canDrop(),
    itemType: monitor.getItemType()
}))
class DropTargetCon extends Component {
    render() {
        const {canDrop, isOver, connectDropTarget} = this.props;
        return connectDropTarget(
            <div className="content-wraper"><LayoutRender/></div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        layoutConArr: state.layoutConfig.content
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({layoutAdd, currentType, layoutContent, currentId}, dispatch),
        hoverCurrentLayout
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DropTargetCon);