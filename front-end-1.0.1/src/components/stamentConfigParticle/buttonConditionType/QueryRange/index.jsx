/**
 * Author：dengyu
 * Time：2017/8/21
 * Description：query Range
 */

import React from 'react';
import {Tabs} from 'antd';

import PaneData from './PaneData';

const TabPane = Tabs.TabPane;
const QueryRange = (props) => <Tabs size="small">
    <TabPane tab="数据" key="1">
        <PaneData {...props}/>
    </TabPane>
</Tabs>;

export default QueryRange;