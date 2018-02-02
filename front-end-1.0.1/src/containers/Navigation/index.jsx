/**
 * Author：zhoushuanglong
 * Time：2017/5/4
 * Description：navigation
 */

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {push} from 'react-router-redux';

import {Menu, Icon} from 'antd';

import './index.scss';

import {breadcrumbActive} from '../../actions/index';

const SubMenu = Menu.SubMenu,
    Item = Menu.Item;


class Nav extends Component {
    constructor(props) {
        super(props);
        let defaultSelect = {
            menus: [],
            key: '',
            breadcrumb: [],
            selectedKey: '',
        };
        let path = this.props.route.pathname.substring(this.props.route.pathname.indexOf('#/') + 1);
        if (Object.prototype.toString.call(props.menu) === '[object Array]') {
            for (let i = 0; i < props.menu.length; i++) {
                if (props.menu[i].link && path.indexOf(props.menu[i].link) > -1) {
                    defaultSelect.key = props.menu[i].id;
                    defaultSelect.breadcrumb.push({
                        id: props.menu[i].id,
                        title: props.menu[i].title,
                        link: props.menu[i].link
                    });
                    break;
                }
                if (Object.prototype.toString.call(props.menu[i].children) === '[object Array]') {
                    for (let j = 0; j < props.menu[i].children.length; j++) {
                        if (props.menu[i].children[j].link && path.indexOf(props.menu[i].children[j].link) > -1) {
                            defaultSelect.key = props.menu[i].children[j].id;
                            defaultSelect.menus.push(props.menu[i].id);
                            defaultSelect.breadcrumb.push({
                                id: props.menu[i].id,
                                title: props.menu[i].title,
                                link: props.menu[i].link
                            });
                            defaultSelect.breadcrumb.push({
                                id: props.menu[i].children[j].id,
                                title: props.menu[i].children[j].title,
                                link: props.menu[i].children[j].link
                            });
                            break;
                        }
                        if (Object.prototype.toString.call(props.menu[i].children[j].children) === '[object Array]') {
                            for (let k = 0; k < props.menu[i].children[j].children.length; k++) {
                                if (props.menu[i].children[j].children[k].link && path.indexOf(props.menu[i].children[j].children[k].link) > -1) {
                                    defaultSelect.key = props.menu[i].children[j].children[k].id;
                                    defaultSelect.menus.push(props.menu[i].id);
                                    defaultSelect.menus.push(props.menu[i].children[j].id);
                                    defaultSelect.breadcrumb.push({
                                        id: props.menu[i].id,
                                        title: props.menu[i].title,
                                        link: props.menu[i].link
                                    });
                                    defaultSelect.breadcrumb.push({
                                        id: props.menu[i].children[j].id,
                                        title: props.menu[i].children[j].title,
                                        link: props.menu[i].children[j].link
                                    });
                                    defaultSelect.breadcrumb.push({
                                        id: props.menu[i].children[j].children[k].id,
                                        title: props.menu[i].children[j].children[k].title,
                                        link: props.menu[i].children[j].children[k].link
                                    });
                                    break;
                                }
                            }
                        }
                    }
                }
            }
        }
        this.state = {
            key: defaultSelect.key.toString(),
            menus: defaultSelect.menus,
            selectedKey: defaultSelect.key.toString(),
        };
        this.breadcrumb(defaultSelect.breadcrumb);
    };

    componentWillReceiveProps(newProps){
        let path = newProps.route.pathname.substring(newProps.route.pathname.indexOf('#/') + 1);
        if(path.indexOf('config-content') > -1){
            let id = '';
            newProps.menu.forEach((item, index) => {
                if(item.link == '/config-content'){
                    id = item.id;
                }
            });
            this.setState({
                selectedKey: id
            });
        }
    };

    breadcrumb = (arr) => {
        let topData = {
            id: '-1',
            title: '',
            href: ''
        };

        const path = this.props.route.pathname;
        if (path.indexOf('/show') > -1) {
            topData.title = '报表展示';
        } else if (path.indexOf('/config') > -1) {
            topData.title = '报表配置';
        } else if (path.indexOf('/manage') > -1) {
            topData.title = '后台管理';
        }

        arr.unshift(topData);
        this.props.actions.breadcrumbActive(arr);
        return arr;
    };

    clickItem = (arr) => {
        arr = this.breadcrumb(arr);
        this.props.actions.push(arr[arr.length - 1].link);
        this.setState({
            selectedKey: arr[arr.length - 1].id
        });
    };

    render() {
        const This = this;
        const props = this.props;
        return (
            <div className="nav-section">
                <Menu
                    theme={props.theme}
                    mode={props.collapsed ? 'vertical' : 'inline'}
                    selectedKeys={[this.state.selectedKey]}
                    defaultSelectedKeys={[this.state.key]}
                    defaultOpenKeys={this.state.menus}>
                    {props.menu.map(function (d, i) {
                        if (d.children.length === 0) {
                            return <Item key={d.id}>
                                <span>
                                    <Icon type={d.icon}/>
                                    <span className="nav-text">{d.title}</span>
                                </span>
                                <div className="menu-mask" onClick={() => {
                                    This.clickItem([
                                        {
                                            id: d.id,
                                            title: d.title,
                                            link: d.link
                                        }
                                    ])
                                }}/>
                            </Item>
                        } else {
                            return <SubMenu
                                key={d.id}
                                title={<span>
                                    <Icon type={d.icon}/>
                                    <span className="nav-text">{d.title}</span>
                                </span>}>
                                {d.children.map(function (m, n) {
                                    if (m.children.length === 0) {
                                        return <Item key={m.id}>
                                            <span>
                                                <Icon type={m.icon}/>
                                                {m.title}
                                            </span>
                                            <div className="menu-mask" onClick={() => {
                                                This.clickItem([
                                                    {
                                                        id: d.id,
                                                        title: d.title,
                                                        link: d.link
                                                    }, {
                                                        id: m.id,
                                                        title: m.title,
                                                        link: m.link
                                                    }
                                                ])
                                            }}/>
                                        </Item>
                                    } else {
                                        return <SubMenu
                                            key={m.id}
                                            title={<span>
                                                <Icon type={m.icon}/>
                                                {m.title}
                                            </span>}>
                                            {m.children.map(function (x, y) {
                                                return <Item key={x.id}>
                                                    <span>
                                                        <Icon type={x.icon}/>
                                                        {x.title}
                                                    </span>
                                                    <div className="menu-mask" onClick={() => {
                                                        This.clickItem([
                                                            {
                                                                id: d.id,
                                                                title: d.title,
                                                                link: d.link
                                                            }, {
                                                                id: m.id,
                                                                title: m.title,
                                                                link: m.link
                                                            }, {
                                                                id: x.id,
                                                                title: x.title,
                                                                link: x.link
                                                            }
                                                        ])
                                                    }}/>
                                                </Item>
                                            })}
                                        </SubMenu>
                                    }
                                })}
                            </SubMenu>
                        }
                    })}
                </Menu>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        collapsed: state.menuCollapsed,
        theme: state.themeName,
        route: state.routing.locationBeforeTransitions
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        actions: bindActionCreators({push, breadcrumbActive}, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Nav)