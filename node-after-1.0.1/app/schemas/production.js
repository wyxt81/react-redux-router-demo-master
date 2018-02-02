/**
 * Author：zhoushuanglong
 * Time：2017/6/16
 * Description：config schemas
 */

var mongoose = require('mongoose');

var ProductionSchema = new mongoose.Schema({
    id: Number,
    name: String,
    config: Array,
    link: String,
    createAt: {
        type: Date,
        default: new Date()
    },
    updateAt: {
        type: Date,
        default: new Date()
    }
});

ProductionSchema.pre('update', function (next) {
    this._update.$set.updateAt = new Date();
    next();
});

module.exports = ProductionSchema;
