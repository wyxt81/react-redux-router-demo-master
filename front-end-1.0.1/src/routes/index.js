/**
 * Author：zhoushuanglong
 * Time：5/30/2017
 * Description：root route
 */

import React from 'react';
import {loginTimeOut} from '../public/index';
import {Route, IndexRoute} from 'react-router';

const authCheck = (nextState, replace) => {
    let link = JSON.parse(sessionStorage.getItem("link"));
    let author = false;
    if(Object.prototype.toString.call(link) == '[object Array]' && link.length > 0){
        for(let i = 0; i < link.length; i++){
            if(nextState.location.pathname.indexOf(link[i]) > -1){
                author = true;
                break;
            }
        }
    }
    if(!author){
        loginTimeOut();
    }
};

const rootRoutes = <div>
    {/*登录路由*/}
    <Route path="/" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/Login').default)
        }, 'Login')
    }}/>
    {/*报表展示路由*/}
    <Route path="/show" onEnter={authCheck} getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/StatementShow').default)
        }, 'StatementShow')
    }}>
        {/*展示路由*/}
        <Route path='/show-report/:id' onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementShowChildren/ShowReport').default)
            }, 'ShowReport')
        }}/>
    </Route>
    {/*报表配置路由*/}
    <Route path="/config" onEnter={authCheck} getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/StatementConfig').default)
        }, 'StatementConfig')
    }}>
        {/*默认主页路由*/}
        <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigIndex').default)
            }, 'ConfigIndex')
        }}/>
        {/*主页路由*/}
        <Route path="/config-index" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigIndex').default)
            }, 'ConfigIndex')
        }}/>
        {/*数据集路由*/}
        <Route path="/config-dataset" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigDataSet').default)
            }, 'ConfigDataSet')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementConfigChildren/ConfigDataSetList').default)
                }, 'ConfigDataSetList')
            }}/>
            <Route path='/config-dataset-list' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementConfigChildren/ConfigDataSetList').default)
                }, 'ConfigDataSetList')
            }}/>
            <Route path='/config-dataset/:type(/:id)' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementConfigChildren/ConfigDataSetEdit').default)
                }, 'ConfigDataSetEdit')
            }}/>
        </Route>
        {/*查询条件路由*/}
        <Route path="/config-query" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigQuery').default)
            }, 'ConfigQuery')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementConfigChildren/ConfigQueryList').default)
                }, 'ConfigQueryList')
            }}/>
            <Route path='/config-query-list' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementConfigChildren/ConfigQueryList').default)
                }, 'ConfigQueryList')
            }}/>
            <Route path='/config-query/:type(/:id)' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementConfigChildren/ConfigQueryEdit').default)
                }, 'ConfigQueryEdit')
            }}/>
        </Route>
        {/*配置路由*/}
        <Route path="/config-content(/:id)" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigContent').default)
            }, 'ConfigContent')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementConfigChildren/ConfigContentEdit').default)
                }, 'ConfigContentEdit')
            }}/>
            <Route path='/config-content-edit' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementConfigChildren/ConfigContentEdit').default)
                }, 'ConfigContentEdit')
            }}/>
            <Route path='/config-content-preview' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementConfigChildren/ConfigContentPreview').default)
                }, 'ConfigContentPreview')
            }}/>
        </Route>
        {/*作品路由*/}
        <Route path="/config-production" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigProduction').default)
            }, 'ConfigProduction')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementConfigChildren/ConfigProductionList').default)
                }, 'ConfigProductionList')
            }}/>
            <Route path='/config-production-list' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementConfigChildren/ConfigProductionList').default)
                }, 'ConfigProductionList')
            }}/>
        </Route>
    </Route>
    {/*后台管理路由*/}
    <Route path="/manage" onEnter={authCheck} getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/StatementManage').default)
        }, 'StatementManage')
    }}>
        {/*用户管理路由*/}
        <Route path="/manage-user" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementManageChildren/ManageUser').default)
            }, 'ManageUser')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageUserList').default)
                }, 'ManageUserList')
            }}/>
            <Route path='/manage-user-list' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageUserList').default)
                }, 'ManageUserList')
            }}/>
            <Route path='/manage-user/:type(/:id)' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageUserEdit').default)
                }, 'ManageUserEdit')
            }}/>
        </Route>
        {/*角色管理路由*/}
        <Route path="/manage-role" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementManageChildren/ManageRole').default)
            }, 'ManageRole')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageRoleList').default)
                }, 'ManageRoleList')
            }}/>
            <Route path='/manage-role-list' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageRoleList').default)
                }, 'ManageRoleList')
            }}/>
            <Route path='/manage-role/:type(/:id)' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageRoleEdit').default)
                }, 'ManageRoleEdit')
            }}/>
        </Route>
        {/*游戏管理路由*/}
        <Route path="/manage-game" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementManageChildren/ManageGame').default)
            }, 'ManageGame')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageGameList').default)
                }, 'ManageGameList')
            }}/>
            <Route path='/manage-game-list' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageGameList').default)
                }, 'ManageGameList')
            }}/>
            <Route path='/manage-game/:type(/:id)' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageGameEdit').default)
                }, 'ManageGameEdit')
            }}/>
        </Route>
        {/*渠道管理路由*/}
        <Route path="/manage-channel" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementManageChildren/ManageChannel').default)
            }, 'ManageChannel')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageChannelList').default)
                }, 'ManageChannelList')
            }}/>
            <Route path='/manage-channel-list' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageChannelList').default)
                }, 'ManageChannelList')
            }}/>
            <Route path='/manage-channel/:type(/:id)' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageChannelEdit').default)
                }, 'ManageChannelEdit')
            }}/>
        </Route>
        {/*功能管理路由*/}
        <Route path="/manage-func" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementManageChildren/ManageFunc').default)
            }, 'ManageFunc')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageFuncList').default)
                }, 'ManageFuncList')
            }}/>
            <Route path='/manage-func-list' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageFuncList').default)
                }, 'ManageFuncList')
            }}/>
            <Route path='/manage-func/:type(/:id)' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageFuncEdit').default)
                }, 'ManageFuncEdit')
            }}/>
        </Route>
        {/*操作管理路由*/}
        <Route path="/manage-log" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementManageChildren/ManageLog').default)
            }, 'ManageLog')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageLogList').default)
                }, 'ManageLogList')
            }}/>
            <Route path='/manage-log-list' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageLogList').default)
                }, 'ManageLogList')
            }}/>
        </Route>
        {/*模板管理路由*/}
        <Route path="/manage-templet" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementManageChildren/ManageTemplet').default)
            }, 'ManageTemplet')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageTempletList').default)
                }, 'ManageTempletList')
            }}/>
            <Route path='/manage-templet-list' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageTempletList').default)
                }, 'ManageTempletList')
            }}/>
            <Route path='/manage-templet/:type(/:id)' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageTempletEdit').default)
                }, 'ManageTempletEdit')
            }}/>
        </Route>
        {/*脚本管理路由*/}
        <Route path="/manage-script" onEnter={authCheck} getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementManageChildren/ManageScript').default)
            }, 'ManageScript')
        }}>
            <IndexRoute onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageScriptList').default)
                }, 'ManageScriptList')
            }}/>
            <Route path='/manage-script-list' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageScriptList').default)
                }, 'ManageScriptList')
            }}/>
            <Route path='/manage-script/add' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageScriptEdit').default)
                }, 'ManageScriptEdit')
            }}/>
            <Route path='/manage-script/eye/:id' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageScriptEye').default)
                }, 'ManageScriptEye')
            }}/>
            <Route path='/manage-script/edit/:id' onEnter={authCheck} getComponent={(nextState, callback) => {
                require.ensure([], (require) => {
                    callback(null, require('../containers/statementManageChildren/ManageScriptEdit').default)
                }, 'ManageScriptEdit')
            }}/>
        </Route>
    </Route>
</div>;

export default rootRoutes;