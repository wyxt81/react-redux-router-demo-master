/**
 * Author：zhoushuanglong
 * Time：2017/6/14
 * Description：chart line
 */

import React from 'react';
import {Tabs} from 'antd';

import PaneData from './PaneData';

const TabPane = Tabs.TabPane;
const ControlQuery = (props) => <Tabs size="small">
    <TabPane tab="数据" key="1">
        <PaneData {...props}/>
    </TabPane>
</Tabs>;

export default ControlQuery;