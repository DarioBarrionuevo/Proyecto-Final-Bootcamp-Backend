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
    nif: { //nif, nie, cif
        type: String,
        match: [/^(X(-|\.)?0?\d{7}(-|\.)?[A-Z]|[A-Z](-|\.)?\d{7}(-|\.)?[0-9A-Z]|\d{8}(-|\.)?[A-Z])$/, 'Please insert a valid nif'],
        required: [true, 'nif required']
    },
    email: {
        type: String,
        match: [/.+\@.+\..+/, 'Please insert a valid email'],
        required: [true, 'Email required']
    },
    phone_number: {
        type: String,
        match: [/^\(\+\d{2,3}\)\d{9}$/, 'Please insert a valid phone number'], //Format (+xx)xxxxxxxxx
        required: [true, 'Phone number required']
    },
    user_name: { //FIXME en user no me deja repetir el nombre de usuario y en organization si, unique no es un validator per se En el controller hacer un find y si existe devuelvo q no se puede crear
        type: String,
        unique: [true, 'User name is duplicated'],
        required: [true, 'User name required']
    },
    password: { //FIXMECorreo de recuperacion de contraseña implica el update tanto en usuario como en organizacion?
        type: String,
        required: [true, 'Password required']
    },
    delivery_points: {
        type: Array,
    },
    permits: {
        type: String,
        default: 'organization',
        enum: ['user', 'organization']
    }
});

module.exports = mongoose.model('Organization', organizationSchema);