var ObjectId = require("mongodb").ObjectID;
const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
const UserModel = require('../models/user-model');

// Conection
mongoose.connect(`mongodb://localhost:27017/${process.env.DDBB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// MAIN
module.exports = {
    addUser: async function (req, res) {
        try {} catch (error) {
            console.log(error);
            res.status(500).send("Se ha producido un error");
        }
    },
    userLogin: async function (req, res) {
        try {} catch (error) {
            console.log(error);
            res.status(500).send("Se ha producido un error");
        }
    }

}