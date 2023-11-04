const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const parentSchema = new Schema({
    parentName: {
        type: String,
        required: true
    },
    parentBackground: {
        type: String,
        required: true
    },
    parentTextColor: {
        type: String,
        required: true
    },
    children: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model('parent', parentSchema)