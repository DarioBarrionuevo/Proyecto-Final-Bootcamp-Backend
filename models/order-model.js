const mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;
const Schema = mongoose.Schema;



const orderSchema = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    order_date: {
        type: Date,
        required: [true, 'Date required']
    },
    paid: {
        type: Boolean,
        default: false,
    },

    basket: {
        type: ObjectId,
        ref: 'Basket'
    },
    organization: {
        type: ObjectId,
        ref: 'Organization'
    }

});
module.exports = mongoose.model('Order', orderSchema);