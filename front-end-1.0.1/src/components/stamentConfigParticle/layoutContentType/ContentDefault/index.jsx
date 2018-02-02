/**
 * Author：zhoushuanglong
 * Time：2017/6/12
 * Description：content default
 */

import React, {Component} from 'react';
import {CONTROLQUERY} from '../../../../constants/layoutBtnType';

class ContentDefault extends Component {
    isQuery = () => {
        return this.props.layoutType === CONTROLQUERY
    };

    render() {
        const props = this.props;
        return <div
            style={{
                lineHeight: this.isQuery() ? '' : props.height + 'px',
                height: this.isQuery() ? '' : props.height + 'px'
            }}
            className={"layout-content-default " + (this.isQuery() ? 'layout-type-control' : '')}>
            {this.isQuery() ? '请选择查询查询字段' : '拖动或双击图表类型以选择'}
        </div>
    }
}

export default ContentDefault;
