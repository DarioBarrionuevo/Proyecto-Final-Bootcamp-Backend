const mongoose = require('mongoose');
var ObjectId = require("mongodb").ObjectID;
const Schema = mongoose.Schema;



const orderSchema = new Schema({
    user_id: {
        type: ObjectId,
        ref: 'User'
        //traigo todo y dejo nombre apellidos telefono y correo, cambiar el nombre  a usuario o algo asi
    },
    order_date: {
        type: Date,
        required: [true, 'Date required']
    },
    paid: {
        type: Boolean,
        default: false,
    },

    basket_id: {
        type: ObjectId,
        ref: 'Basket'
    },
    organization_id: {
        type: ObjectId,
        ref: 'Organization'
    }

});
module.exports = mongoose.model('Order', orderSchema);