/**
 * Author：zhoushuanglong
 * Time：2017/6/27
 * Description：config controllers
 */

var Production = require('../models/production');
var PageModel = require('../common/pageModel');
var NodeRSA = require('node-rsa');
var MD5 = require('md5');
var key = new NodeRSA("-----BEGIN RSA PRIVATE KEY-----\n" +
    "MIICXAIBAAKBgQCV7xnLqMHtBs0CyJiK8uTOxu8BJEOaDhO8Wt07cf/+7ICc6ryI\n" +
    "GTjPi9HK7E5giq6hr86WJnu49Rh7A5H2zOAc65GWQ2LMNhRhPYbDcNwJIkYP5L1a\n" +
    "xAjrPxCju/fis24Xhq1kNnCSG0YbTRlK+Q1ROx1khunoKsmObwvTNa83VQIDAQAB\n" +
    "AoGBAJTK2eCgswMUsrNGewu5jJQgG+QYJvZlbfSIf/CUa6aC8gfHdB3kWdquOR6W\n" +
    "cBmixzcyD2Q3AKVGpmq92kcAfo7u7Idl0bALHDuTwMTUM+jIX54t4czjdgzRgO4m\n" +
    "jMEfLHhU95AlnO6dJhc6QfFOtzdrboEonUShTxgve3SopChBAkEA0kY9+16SBIka\n" +
    "mZ0UIrbocB0ewn/M0huQs7wNGQUBl5tO8asWRr3pBIul+87/2b8S6Mq2cf0RQL1L\n" +
    "u7cR94TD6QJBALaJxWXvV7QnEweHHvxtbFkLLrB8STTyytg8cgQ7OCk9SkPYhYqx\n" +
    "F9AKPiWeKreb/3FbH+tBWhKdc6X5INwS0I0CQA9yFW93fOZUY93Qyf/ay6wgl3fW\n" +
    "B2ePmst5DsU9tuY6BEyAMryzioBI+cJLbEPEY1EyQsCQxEmrHfsF8Y3q9LECQD7B\n" +
    "QLcZwNozsMwevR1ldSFrwcJ1CCoG6ovKxBwGS/mJk7Wdg9O5rIkebF08ck0reXd8\n" +
    "L44OqqvJq8+8xXpDkaUCQFTU9JPtCHTevAD5mwpsw3095+i+Lq2fJYhfNfEdzHpE\n" +
    "1XtZ1Lery4Pi+f5FF48AAcvlw3leDgYt5UEVP7cF5MU=" +
    "-----END RSA PRIVATE KEY-----");
var public = "-----BEGIN PUBLIC KEY-----\n" +
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCV7xnLqMHtBs0CyJiK8uTOxu8B\n" +
    "JEOaDhO8Wt07cf/+7ICc6ryIGTjPi9HK7E5giq6hr86WJnu49Rh7A5H2zOAc65GW\n" +
    "Q2LMNhRhPYbDcNwJIkYP5L1axAjrPxCju/fis24Xhq1kNnCSG0YbTRlK+Q1ROx1k\n" +
    "hunoKsmObwvTNa83VQIDAQAB\n" +
    "-----END PUBLIC KEY-----";

exports.productionGet = function (req, res) {
    Production.findOne({id: key.decrypt(decodeURIComponent(req.query.id), 'utf8')}, function(err, data){
        if (err) {
            res.json({
                status: 'F',
                msg: '操作失败',
                data: ''
            });
            console.log(err.message);
        } else {
            res.json({
                status: 'S',
                msg: '操作成功',
                data: data
            })
        }
    });
};

exports.productionPut = function (req, res) {
    res.json({
        type: 'put'
    })
};

exports.productionPost = function (req, res) {
    if(!req.body.id){
        Production.create(req.body, function(err, data){
            if (err) {
                res.json({
                    status: 'F',
                    msg: '操作失败',
                    data: ''
                });
                console.log(err.message);
            } else {
                res.json({
                    status: 'S',
                    msg: '操作成功',
                    data: ''
                })
            }
        });
    } else {
        Production.update({id: req.body.id}, req.body, function(err, data){
            if (err) {
                res.json({
                    status: 'F',
                    msg: '操作失败',
                    data: ''
                });
                console.log(err.message);
            } else {
                res.json({
                    status: 'S',
                    msg: '操作成功',
                    data: ''
                })
            }
        });
    }

};

exports.productionDel = function (req, res) {
    Production.findOneAndRemove({id: key.decrypt(decodeURIComponent(req.body.id), 'utf8')}, function(err, data){
        if (err) {
            res.json({
                status: 'F',
                msg: '操作失败',
                data: ''
            });
            console.log(err.message);
        } else {
            res.json({
                status: 'S',
                msg: '操作成功',
                data: ''
            })
        }
    });
};

exports.productionSearch = function (req, res) {
    var pageModel = new PageModel(req.body.pageIndex, req.body.pageSize);
    Production.find({name: new RegExp(req.body.name)})
        .skip(pageModel.getIndex())
        .limit(req.body.pageSize)
        .sort({updateAt: -1})
        .exec(function(err, data) {
        if (err) {
            res.json({
                status: 'F',
                msg: '操作失败',
                data: ''
            });
            console.log(err.message);
        } else {
            pageModel.rows = data.map(function(item, index){
                var id = encodeURIComponent(key.encrypt(item.id, 'base64'));
                return {
                    link: '/show-report/' + id,
                    name: item.name,
                    id: id
                };
            });
            Production.count({name: new RegExp(req.body.name)}, function(err, data){
                pageModel.total = data;
                res.json({
                    status: 'S',
                    msg: '操作成功',
                    data: pageModel
                })
            });
        }
    });
};

exports.productionSearchGet = function (req, res) {
    var pageModel = new PageModel(parseInt(req.query.pageIndex), parseInt(req.query.pageSize));
    Production.find({name: new RegExp(req.query.name)})
        .skip(pageModel.getIndex())
        .limit(parseInt(req.query.pageSize))
        .exec(function(err, data){
        if (err) {
            res.json({
                status: 'F',
                msg: '操作失败',
                data: []
            });
            console.log(err.message);
        } else {
            pageModel.rows = data.map(function(item, index){
                return {
                    link: '/show-report/' + encodeURIComponent(key.encrypt(item.id, 'base64')),
                    name: item.name,
                    key: MD5(public + item.id)
                };
            });
            Production.count({name: new RegExp(req.body.name)}, function(err, data){
                pageModel.total = data;
                res.json({
                    status: 'S',
                    msg: '操作成功',
                    data: pageModel
                })
            });
        }
    });
};