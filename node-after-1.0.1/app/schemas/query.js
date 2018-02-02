/**
 * Author：dengyu
 * Time：2017/7/11
 * Description：query
 */

var mongoose = require('mongoose');

var QuerySchema = new mongoose.Schema({
    id: Number,
    source: String,
    code: String,
    text: String,
    colcode: String,
    coltext: String,
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

QuerySchema.pre('update', function (next) {
    this._update.$set.updateAt = new Date();
    next();
});

module.exports = QuerySchema;