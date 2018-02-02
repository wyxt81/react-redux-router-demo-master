/**
 * Author：zhoushuanglong
 * Time：2017/6/16
 * Description：config schemas
 */

var mongoose = require('mongoose');

var ConfigSchema = new mongoose.Schema({
    id: {
        type: Number
    },
    config: {
        type: JSON,
    },
    createAt: {
        type: Date,
        default: Date.now()
    },
    updateAt: {
        type: Date,
        default: Date.now()
    }
});

ConfigSchema.pre('save', function (next) {
    if (this.isNew) {
        this.createAt = this.updateAt = Date.now()
    } else {
        this.updateAt = Date.now()
    }

    next();
});

module.exports = ConfigSchema;
