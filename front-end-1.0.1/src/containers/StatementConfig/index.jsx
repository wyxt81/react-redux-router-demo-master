/**
 * Author：zhoushuanglong
 * Time：2017/5/4
 * Description：statement config
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';

import {Layout} from 'antd';

import './index.scss';

import Navigation from '../Navigation';
import HeaderSection from '../HeaderSection';
import BreadcrumbNav from '../BreadcrumbNav'
import ThemeSwitch from '../../components/ThemeSwitch/index';
import Logo from '../../components/Logo';

const {Header, Sider, Content} = Layout;
class StatementConfig extends Component {
    render() {
        const props = this.props;
        return (
            <div className="app-main">
                <Layout className="app-main-header">
                    <Sider
                        style={{overflowY: props.collapsed ? 'visible' : 'auto'}}
                        className={props.theme === 'dark' ? '' : 'light'}
                        width="200"
                        trigger={null}
                        collapsible
                        collapsed={props.collapsed}>
                        <Logo/>
                    </Sider>
                    <Layout>
                        <Header className="header">
                            <HeaderSection/>
                        </Header>
                    </Layout>
                </Layout>
                <Layout>
                    <Sider
                        style={{overflowY: props.collapsed ? 'visible' : 'auto'}}
                        className={props.theme === 'dark' ? '' : 'light'}
                        width="200"
                        trigger={null}
                        collapsible
                        collapsed={props.collapsed}>
                        <div className="app-main-content">
                            <Navigation menu={JSON.parse(sessionStorage.getItem("configuration"))}/>
                            <ThemeSwitch/>
                        </div>
                    </Sider>
                    <Layout>
                        <div className="app-main-content">
                            <BreadcrumbNav/>
                            <Content className="content">
                                {props.children}
                            </Content>
                        </div>
                    </Layout>
                </Layout>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collapsed: state.menuCollapsed,
        menu: state.menuData,
        theme: state.themeName
    }
};

export default connect(mapStateToProps)(StatementConfig);