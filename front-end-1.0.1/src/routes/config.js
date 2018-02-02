/**
 * Author：zhoushuanglong
 * Time：5/30/2017
 * Description：config routes
 */

import React from 'react';
import {Route, IndexRoute} from 'react-router';

const configRoute = <Route path="/config" getComponent={(nextState, callback) => {
    require.ensure([], (require) => {
        callback(null, require('../containers/StatementConfig').default)
    }, 'StatementConfig')
}}>
    {/*默认主页路由*/}
    <IndexRoute getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/statementConfigChildren/ConfigIndex').default)
        }, 'ConfigIndex')
    }}/>
    {/*主页路由*/}
    <Route path="/config-index" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/statementConfigChildren/ConfigIndex').default)
        }, 'ConfigIndex')
    }}/>
    {/*数据集路由*/}
    <Route path="/config-dataset" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/statementConfigChildren/ConfigDataSet').default)
        }, 'ConfigDataSet')
    }}>
        <IndexRoute getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigDataSetList').default)
            }, 'ConfigDataSetList')
        }}/>
        <Route path='/config-dataset-list' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigDataSetList').default)
            }, 'ConfigDataSetList')
        }}/>
        <Route path='/config-dataset/:type(/:id)' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigDataSetEdit').default)
            }, 'ConfigDataSetEdit')
        }}/>
    </Route>
    {/*查询条件路由*/}
    <Route path="/config-query" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/statementConfigChildren/ConfigQuery').default)
        }, 'ConfigQuery')
    }}>
        <IndexRoute getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigQueryList').default)
            }, 'ConfigQueryList')
        }}/>
        <Route path='/config-query-list' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigQueryList').default)
            }, 'ConfigQueryList')
        }}/>
        <Route path='/config-query/:type(/:id)' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigQueryEdit').default)
            }, 'ConfigQueryEdit')
        }}/>
    </Route>
    {/*报表配置路由*/}
    <Route path="/config-content(/:id)" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/statementConfigChildren/ConfigContent').default)
        }, 'ConfigContent')
    }}>
        <IndexRoute getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigContentEdit').default)
            }, 'ConfigContentEdit')
        }}/>
        <Route path='/config-content-edit' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigContentEdit').default)
            }, 'ConfigContentEdit')
        }}/>
        <Route path='/config-content-preview' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigContentPreview').default)
            }, 'ConfigContentPreview')
        }}/>
    </Route>
    {/*作品路由*/}
    <Route path="/config-production" getComponent={(nextState, callback) => {
        require.ensure([], (require) => {
            callback(null, require('../containers/statementConfigChildren/ConfigProduction').default)
        }, 'ConfigProduction')
    }}>
        <IndexRoute getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigProductionList').default)
            }, 'ConfigProductionList')
        }}/>
        <Route path='/config-dataset-list' getComponent={(nextState, callback) => {
            require.ensure([], (require) => {
                callback(null, require('../containers/statementConfigChildren/ConfigProductionList').default)
            }, 'ConfigProductionList')
        }}/>
    </Route>
</Route>;

export default configRoute;
