/**
 * Author：zhoushuanglong
 * Time：2017/6/16
 * Description：dataset model
 */

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var DatasetSchema = require('../schemas/dataset');

DatasetSchema.plugin(autoIncrement.plugin, {
    model: 'Dataset',
    field: 'id'
});

var Dataset = mongoose.model('Dataset', DatasetSchema);

module.exports = Dataset;
