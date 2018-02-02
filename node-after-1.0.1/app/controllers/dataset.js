/**
 * Author：zhoushuanglong
 * Time：2017/6/16
 * Description：dataset controllers
 */

var Dataset = require('../models/dataset');
var PageModel = require('../common/pageModel');
var JAVAURL = require('../common/constants').JAVAURL;
var qs = require('qs');
var axios = require('axios');

exports.datasetGet = function (req, res) {
    Dataset.findOne({id: req.query.id}, function(err, data){
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

exports.datasetPut = function (req, res) {
    res.json({
        type: 'put'
    })
};

exports.datasetPost = function (req, res) {
    if(!req.body.id){
        Dataset.create(req.body, function(err, data){
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
        Dataset.update({id: req.body.id}, req.body, function(err, data){
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

exports.datasetDel = function (req, res) {
    Dataset.findOneAndRemove({id: req.body.id}, function(err, data){
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

exports.datasetSearch = function (req, res) {
    var pageModel = new PageModel(req.body.pageIndex, req.body.pageSize);
    Dataset.find({source: new RegExp(req.body.source)})
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
            Dataset.count({source: new RegExp(req.body.source)}, function(err, data){
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

exports.datasetExecute = function (req, res) {
    axios({
        method: "post",
        url: JAVAURL + '/t/testDate.do',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
            sql: req.body.sql
        })
    })
    .then(function(response){
        if(response.data.status == 'NULL'){
            res.json({
                status: 'S',
                msg: '操作成功',
                data: []
            });
        } else if(response.data.status == 'S'){
            res.json({
                status: 'S',
                msg: '操作成功',
                data: response.data.data
            });
        } else {
            res.json({
                status: 'F',
                msg: '操作失败',
                data: ''
            })
        }
    })
    .catch(function(error){
        console.log(error);
    });
};

exports.datasetTest = function (req, res) {
    axios({
        method: "post",
        url: JAVAURL + '/t/data.do',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        data: qs.stringify({
            param: JSON.stringify({
                sql: req.body.sql,
                query: req.body.query,
            })
        })
    })
    .then(function(response){
        if(response.data.status == 'NULL'){
            res.json({
                status: 'S',
                msg: '操作成功',
                data: []
            });
        } else if(response.data.status == 'S'){
            res.json({
                status: 'S',
                msg: '操作成功',
                data: response.data.data
            });
        } else {
            res.json({
                status: 'F',
                msg: '操作失败',
                data: ''
            })
        }
    })
    .catch(function(error){
        console.log(error);
    });
};

