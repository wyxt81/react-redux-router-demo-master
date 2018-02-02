/**
 * Author：zhoushuanglong
 * Time：2017/6/27
 * Description：config controllers
 */

var Config = require('../models/config');
var pagerFind = require('../common/pager');

exports.configGet = function (req, res) {
    if (req.query.id) {
        Config.findOne({pid: req.query.id}, function (err, data) {
            if (err) console.log(err.message);

            if (!data) {
                res.json({
                    status: 'F',
                    msg: '不存在此作品'
                })
            } else {
                res.json({
                    status: 'S',
                    msg: '查询成功',
                    data: data
                })
            }
        })
    } else {
        pagerFind(req, res, Config);
    }
};

exports.configPut = function (req, res) {
    Config.findOne({id: req.body.id}, function (err, data) {
        if (err) console.log(err.message);

        if (data) {
            res.json({
                status: 'F',
                msg: '此作品已存在'
            });
        } else {
            new Config(req.body)
                .save(function (err) {
                    if (err) console.log(err.message);
                    res.json({
                        status: 'S',
                        msg: '保存成功'
                    });
                })
        }
    });
};

exports.configPost = function (req, res) {
    Config.findOne({id: req.body.id}, function (err, data) {
        if (err) console.log(err.message);

        data.config = req.body.config;

        data.save(function (err) {
            if (err) console.log(err.message);
            res.json({
                status: 'S',
                msg: '修改成功'
            });
        });
    });
};

exports.configDel = function (req, res) {
    Config.remove({id: req.body.id}, function (err) {
        if (err) console.log(err.message);

        res.json({
            status: 'S',
            msg: '删除成功'
        });
    });
};