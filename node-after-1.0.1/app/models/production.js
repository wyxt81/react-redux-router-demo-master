/**
 * Author：zhoushuanglong
 * Time：2017/6/16
 * Description：config model
 */

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var ProductionSchema = require('../schemas/production');

ProductionSchema.plugin(autoIncrement.plugin, {
    model: 'Production',
    field: 'id'
});

var Production = mongoose.model('Production', ProductionSchema);

module.exports = Production;
