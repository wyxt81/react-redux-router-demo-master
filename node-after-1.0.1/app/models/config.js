/**
 * Author：zhoushuanglong
 * Time：2017/6/16
 * Description：config model
 */

var mongoose = require('mongoose'),
    autoIncrement = require('mongoose-auto-increment');

var ConfigSchema = require('../schemas/config');

ConfigSchema.plugin(autoIncrement.plugin, {
    model: 'Config',
    field: 'id'
});

var Config = mongoose.model('Config', ConfigSchema);

module.exports = Config;
