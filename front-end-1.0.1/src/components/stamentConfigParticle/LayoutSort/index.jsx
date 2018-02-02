/**
 * Author：zhoushuanglong
 * Time：2017/6/6
 * Description：layout sort
 */

import React, {Component} from 'react';
import {findDOMNode} from 'react-dom';
import {DragSource, DropTarget} from 'react-dnd';

import {MOVELAYOUT} from '../../../constants/dragDropTypes';
import {
    LAYOUTROW,
    LAYOUTTAB,
    LAYOUTCOLUMN,
    CONTROLQUERY,
    CONTROLTEXT
} from '../../../constants/layoutBtnType';
import ChartLayoutRow from '../layoutType/ChartLayoutRow';
import ChartLayoutTab from '../layoutType/ChartLayoutTab';
import ChartLayoutColumn from '../layoutType/ChartLayoutColumn';
import ChartLayoutQuery from '../layoutType/ChartLayoutQuery';
import ChartLayoutText from '../layoutType/ChartLayoutText';

const moveSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        };
    }
};

const moveTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;
        if (dragIndex === hoverIndex) {
            return;
        }
        const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
        const clientOffset = monitor.getClientOffset();
        const hoverClientY = clientOffset.y - hoverBoundingRect.top;
        if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
            return;
        }
        if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
            return;
        }
        props.moveLayout(dragIndex, hoverIndex);
        monitor.getItem().index = hoverIndex;
    },
};

@DropTarget(MOVELAYOUT, moveTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(MOVELAYOUT, moveSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class LayoutSort extends Component {
    render() {
        const props = this.props;
        const {isDragging, connectDragSource, connectDropTarget} = this.props;
        const opacity = isDragging ? 0.4 : 1;

        let layout;
        switch (props.layoutType) {
            case LAYOUTROW:
                layout = <ChartLayoutRow {...props}/>;
                break;
            case LAYOUTCOLUMN:
                layout = <ChartLayoutColumn {...props}/>;
                break;
            case LAYOUTTAB:
                layout = <ChartLayoutTab {...props}/>;
                break;
            case CONTROLQUERY:
                layout = <ChartLayoutQuery {...props}/>;
                break;
            case CONTROLTEXT:
                layout = <ChartLayoutText {...props}/>;
                break;

        }

        return connectDragSource(connectDropTarget(
            <div style={{opacity: opacity}}>{layout}</div>
        ))
    }
}

export default LayoutSort;

