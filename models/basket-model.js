const mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;

const Schema = mongoose.Schema;


const basketSchema = new Schema({
    format: {
        type: String,
        enum: ['Big', 'Small', 'Others'],
        required: [true, 'Format required']
    },
    content: {
        type: String,
        required: [true, 'Content required']
    },
    active: {
        type: Boolean,
        default: true,
    },
    creation_date: {
        type: Date,
        required: [true, 'Date required']
    },
    stock: {
        type: Number,
        required: [true, 'Stock required']
    },
    organization: {
        type: ObjectId,
        ref: 'Organization'
    },
    price: {
        type: Number,
        required: [true, 'Price required']
    },

});
module.exports = mongoose.model('Basket', basketSchema);