/**
 * Author：zhoushuanglong
 * Time：2017/5/17
 * Description：breadcrumb navigation
 */

import React from 'react';
import {connect} from 'react-redux';

import {Breadcrumb} from 'antd';

import './index.scss';

const BreadcrumbNav = (props) => {
    return <Breadcrumb className="breadcrumb-nav" separator=">">
        {props.breadcrumb.map(function (d, i) {
            return <Breadcrumb.Item key={d.title}>{d.title}</Breadcrumb.Item>
        })}
    </Breadcrumb>
};

const mapStateToProps = (state) => {
    return {
        breadcrumb: state.breadcrumb
    }
};

export default connect(mapStateToProps)(BreadcrumbNav);

