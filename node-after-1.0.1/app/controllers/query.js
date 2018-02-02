/**
 * Author：dengyu
 * Time：2017/7/11
 * Description：query
 */

var Query = require('../models/query');
var PageModel = require('../common/pageModel');
var JAVAURL = require('../common/constants').JAVAURL;
var qs = require('qs');
var axios = require('axios');

exports.queryGet = function (req, res) {
    Query.findOne({id: req.query.id}, function(err, data){
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

exports.queryPut = function (req, res) {
    res.json({
        type: 'put'
    })
};

exports.queryPost = function (req, res) {
    if(!req.body.id){
        Query.create(req.body, function(err, data){
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
        Query.update({id: req.body.id}, req.body, function(err, data){
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

exports.queryDel = function (req, res) {
    Query.findOneAndRemove({id: req.body.id}, function(err, data){
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

exports.querySearch = function (req, res) {
    var pageModel = new PageModel(req.body.pageIndex, req.body.pageSize);
    Query.find({source: new RegExp(req.body.source)})
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
            pageModel.rows = data;
            Query.count({source: new RegExp(req.body.source)}, function(err, data){
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