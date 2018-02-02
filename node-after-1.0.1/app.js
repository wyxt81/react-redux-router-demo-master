var express = require('express'),
    //path,fs
    path = require('path'),
    fs = require('fs'),
    //日志文件
    logger = require('morgan'),
    fileStreamRotator = require('file-stream-rotator'),
    //地址栏网页图标
    favicon = require('serve-favicon'),
    //cookie,session,body等请求处理
    cookieParser = require('cookie-parser'),
    expressSession = require('express-session'),
    bodyParser = require('body-parser'),
    //mongoose操作mongodb数据库
    mongoose = require('mongoose'),
    //把session存入mongodb数据库，用于较稳定的保存状态
    mongoStore = require('connect-mongo')(expressSession);


//连接数据库
mongoose.Promise = global.Promise;
var autoIncrement = require("mongoose-auto-increment");
var username = 'qbi';
var password = 'qbi1710!#&';
var dbUrl = 'mongodb://' + username + ':' + password + '@dds-2ze3d9d4492af4041.mongodb.rds.aliyuncs.com:3717/qbi';
/*var dbUrl = 'mongodb://192.168.50.253:27017/bi3',*/
    connection = mongoose.connect(dbUrl, {uri_decode_auth: true}, function (err) {
        if (err) {
            console.log(err.message);
        } else {
            console.log('wikidb connect successed');
        }
    });
autoIncrement.initialize(connection);


//引入主路由
var index = require('./routes/index');
var proxy = require('./routes/proxy');

//新建express主程序app
var app = express();

// 代理地址
app.use('/', proxy);

//日志文件
var logDir = '/data/weblogs/bi3.linekong.com';
fs.existsSync(logDir) || fs.mkdirSync(logDir);
var accessLogStream = fileStreamRotator.getStream({
    date_format: 'YYYYMMDD',
    filename: path.join(logDir, 'logs-%DATE%.log'),
    frequency: 'daily',
    verbose: true
});
app.use(logger('dev'));
app.use(logger('common', {stream: accessLogStream}));


//路由中间件
app.use(bodyParser.urlencoded({limit: '50mb', extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressSession({
    name: 'name',
    secret: 'wiki',
    resave: true,
    saveUninitialized: true,
    store: new mongoStore({
        url: dbUrl,
        collection: 'sessions'
    })
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.send(err.message + '+' + err.status + '+' + err.stack);
});

module.exports = app;
