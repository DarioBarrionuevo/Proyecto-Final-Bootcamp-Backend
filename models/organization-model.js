const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    address: {
        type: String,
        required: [true, 'Address required']
    },
    cif: {
        type: String,
        match: [/^[a-zA-Z]{1}\d{7}[a-zA-Z0-9]{1}$/, 'Please insert a valid CIF'],
        required: [true, 'CIF required']
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'Please insert a valid email'],
        required: [true, 'Email required']
    },
    phone_number: {
        type: Number,
        match: [/(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/, 'Please insert a valid phone number'],
        required: [true, 'Phone number required']
    },
    user_name: {
        type: String,
        unique: [true, 'User name is duplicated'],
        required: [true, 'User name required']
    },
    password: {
        type: String,
        required: [true, 'Password required']
    },
    delivery_points: {
        type: Array,
        required: [true, 'Delivery points required']
    },
    permits: {
        type: String,
        default: 'organization',
        enum: ['user', 'organization']
    }
});

module.exports = mongoose.model('Organization', organizationSchema);