/**
 * Author：dengyu
 * Time：2017/8/14
 * Description：chart rbar
 */

import React from 'react';
import {Tabs} from 'antd';

import PaneData from './PaneData';
import PaneStyle from './PaneStyle';

const TabPane = Tabs.TabPane;
const ChartRbar = (props) => <Tabs size="small">
    <TabPane tab="数据" key="1">
        <PaneData {...props}/>
    </TabPane>
    <TabPane tab="样式" key="2">
        <PaneStyle {...props}/>
    </TabPane>
</Tabs>;

export default ChartRbar;