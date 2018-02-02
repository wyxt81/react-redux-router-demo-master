/**
 * Author：zhoushuanglong
 * Time：2017/6/16
 * Description：dataset schemas
 */

var mongoose = require('mongoose');

var DatasetSchema = new mongoose.Schema({
    id: Number,
    source: String,
    dimension: Array,
    measurement: Array,
    key: String,
    keyName: String,
    datasetType: String,
    sql: String,
    createAt: {
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
        default: new Date()
    }
});

DatasetSchema.pre('update', function (next) {
    this._update.$set.updateAt = new Date();
    next();
});

module.exports = DatasetSchema;
