const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const basketSchema = new Schema({
    format: {
        type: String,
        enum: ['Big', 'Small', 'Others'],
        required: [true, 'Format required']
    },
    content: {
        type: Array,
        required: [true, 'Content required']
    },
    active: {
        type: Boolean,
        default: false,
    },
    creation_date: {
        type: Date,
        required: [true, 'Date required']
    },
    stock: Number

});
module.exports = mongoose.model('Basket', basketSchema);