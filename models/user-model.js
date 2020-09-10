const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required']
    },
    surname1: {
        type: String,
        required: [true, 'Surname1 required']
    },
    surname2: {
        type: String,
        required: [true, 'Surname2 required']
    },
    email: {
        type: String,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/, 'Please insert a valid email'],
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
    zip_code: {
        type: String,
        match: [/0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3}/, 'Please insert a valid zip code number'],
        required: [true, 'Zip code required']
    },
    permits: {
        type: String,
        default: 'user',
        enum: ['user', 'organization']
    }

});
module.exports = mongoose.model('User', userSchema);