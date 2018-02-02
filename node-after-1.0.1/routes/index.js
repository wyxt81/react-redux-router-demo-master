/**
 * Author：zhoushuanglong
 * Time：2017/6/16
 * Description：routes
 */

var express = require('express');
var router = express.Router();

var dataset = require('../app/controllers/dataset');
var production = require('../app/controllers/production');
var query = require('../app/controllers/query');

//数据集
router.route('/datasetSearch')
    .post(dataset.datasetSearch);
router.route('/dataset')
    .get(dataset.datasetGet)
    .put(dataset.datasetPut)
    .post(dataset.datasetPost)
    .delete(dataset.datasetDel);
router.route('/datasetExecute')
    .post(dataset.datasetExecute);
router.route('/datasetTest')
    .post(dataset.datasetTest);

//页面配置
router.route('/productionSearch')
    .get(production.productionSearchGet)
    .post(production.productionSearch);
router.route('/production')
    .get(production.productionGet)
    .post(production.productionPost)
    .put(production.productionPut)
    .delete(production.productionDel);

//条件集
router.route('/querySearch')
    .post(query.querySearch);
router.route('/query')
    .get(query.queryGet)
    .put(query.queryPut)
    .post(query.queryPost)
    .delete(query.queryDel);

module.exports = router;
