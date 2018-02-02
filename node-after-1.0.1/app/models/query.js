/**
 * Author：dengyu
 * Time：2017/7/11
 * Description：query
 */

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var QuerySchema = require('../schemas/query');

QuerySchema.plugin(autoIncrement.plugin, {
    model: 'Query',
    field: 'id'
});

var Query = mongoose.model('Query', QuerySchema);

module.exports = Query;