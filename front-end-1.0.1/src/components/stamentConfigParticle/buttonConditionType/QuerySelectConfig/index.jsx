/**
 * Author：dengyu
 * Time：2017/8/21
 * Description：query select config
 */

import React from 'react';
import {Tabs} from 'antd';

import PaneData from './PaneData';

const TabPane = Tabs.TabPane;
const QuerySelectConfig = (props) => <Tabs size="small">
    <TabPane tab="数据" key="1">
        <PaneData {...props}/>
    </TabPane>
</Tabs>;

export default QuerySelectConfig;