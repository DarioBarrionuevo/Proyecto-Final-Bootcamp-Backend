const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name required'] //FIXME no encuentro donde salen estos errores o por donde los podria sacar (console log no chuta)- en el update si que salen por consola
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
        type: String,
        match: [/^\(\+\d{2,3}\)\d{9}$/, 'Please insert a valid phone number'], //Format (+xx)xxxxxxxxx
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
        match: [/^\d{5}$/, 'Please insert a valid zip code number'],
        required: [true, 'Zip code required']
    },
    permits: {
        type: String,
        default: 'user',
        enum: ['user', 'organization']
    }

});
module.exports = mongoose.model('User', userSchema);