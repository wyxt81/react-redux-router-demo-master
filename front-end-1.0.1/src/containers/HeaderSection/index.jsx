/**
 * Author：zhoushuanglong
 * Time：2017/5/11
 * Description：header section
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Link} from 'react-router';
import {push} from 'react-router-redux';
import {loginTimeOut} from '../../public/index';
import {Icon} from 'antd';
import './index.scss';
import user from './img/user.jpg';
import {breadcrumbActive, loginout} from '../../actions/index';
import MenuToggleBtn from '../../components/MenuToggleBtn';

class HeaderSection extends Component {
    logout = () => {
        this.props.actions.loginout();
        loginTimeOut();
    };

    handleClick = (e, attr, title) => {
        const data = this.props.menu[attr];
        const breadcrumb = [
            {
                id: '-1',
                title: title,
                link: ''
            }
        ];
        if(data.length !== 0){
            const d = data[0];
            breadcrumb.push({
                id: d.id,
                title: d.title,
                link: d.link
            });
            if(d.children.length !== 0){
                const m = d.children[0];
                breadcrumb.push({
                    id: m.id,
                    title: m.title,
                    link: m.link
                });
                if(m.children.length !== 0){
                   const n = m.children[0];
                    breadcrumb.push({
                        id: n.id,
                        title: n.title,
                        link: n.link
                    });
                }
            }
        }
        this.props.actions.breadcrumbActive(breadcrumb);
    };

    render() {
        let pandect = '';
        let configuration = '';
        let management = '';
        if(Object.prototype.toString.call(JSON.parse(sessionStorage.getItem("pandect"))) == '[object Array]' && JSON.parse(sessionStorage.getItem("pandect")).length > 0){
            pandect = <Link onClick={(e) => {
                this.handleClick(e, 'pandect', '主页')
            }} to="/show" activeClassName="active" className="home" title="首页">
                <Icon className="btn-icon" type="home"/>
            </Link>;
        }
        if(Object.prototype.toString.call(JSON.parse(sessionStorage.getItem("configuration"))) == '[object Array]' && JSON.parse(sessionStorage.getItem("configuration")).length > 0){
            configuration = <Link onClick={(e) => {
                this.handleClick(e, 'configuration', '报表配置')
            }} to="/config" activeClassName="active" className="config" title="报表配置">
                <div className="config-icon-mask"><Icon className="btn-icon" type="edit"/></div>
            </Link>;
        }
        if(Object.prototype.toString.call(JSON.parse(sessionStorage.getItem("management"))) == '[object Array]' && JSON.parse(sessionStorage.getItem("management")).length > 0){
            management = <Link onClick={(e) => {
                this.handleClick(e, 'management', '后台管理')
            }} to="/manage" activeClassName="active" className="setting" title="后台管理">
                <Icon className="btn-icon" type="setting"/>
            </Link>;
        }
        return <div className="header-section">
            <MenuToggleBtn/>
            <div className="user-func">
                {pandect}
                {configuration}
                {management}
                <Icon className="logout" title="注销" type="logout" onClick={this.logout}/>
            </div>
            <div className="user-info">
                <span><img src={user}/></span>
                <em>{JSON.parse(sessionStorage.getItem("user")).name}</em>
            </div>
        </div>
    }
}


const mapStateToProps = (state) => {
    return {
        menu: state.menuData
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, breadcrumbActive, loginout}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSection)