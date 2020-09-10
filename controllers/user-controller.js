const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const UserModel = require('../models/user-model');

// Conection
mongoose.connect(`mongodb://localhost:27017/${process.env.DDBB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// MAIN
module.exports = {
    createUser: async function (req, res) {
        try {
            const userInfo = req.body;
            const user1 = new UserModel();

            user1.name = userInfo.name;
            user1.surname1 = userInfo.surname1;
            user1.surname2 = userInfo.surname2;
            user1.email = userInfo.email;
            user1.phone_number = userInfo.phone_number;
            user1.user_name = userInfo.user_name;
            user1.zip_code = userInfo.zip_code;

            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(userInfo.password, salt);
            user1.password = encryptedPassword;

            user1.save((err, savedInfo) => {
                if (err) throw new Error("User created error", err);
                // console.log('User created', savedInfo);
                res.status(200).json({
                    message: "User created",
                    userInfo: savedInfo,
                });
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("There has been an error");
        }
    },
    userLogin: async function (req, res) {
        try {
            const {
                user_name,
                password
            } = req.body;

            const userData = await UserModel.find({
                user_name
            });
            // console.log("userData", userData)
            if (!userData) {
                res.status(401).json({
                    message: "User name or password incorrect",
                });
                return;
            }
            const passwordIsCorrect = await bcrypt.compare(
                password,
                userData[0].password
            );

            if (!passwordIsCorrect) {
                res.status(401).json({
                    message: "User name or password incorrect",
                });
                return;
            }
            const token = jwt.sign({
                    user_name,
                },
                process.env.SECRET, {
                    expiresIn: 60 * 60 * 24,
                }
            );
            res.status(200).json({
                message: "Login correct",
                token,
                user_name,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("There has been an error");
        }
    },
    getAllUsers: async function (req, res) {
        try {
            const userList = await UserModel.find();
            // console.log("userList", userList);
            res.status(200).json({
                ...userList,
            });

        } catch (error) {
            console.log(error);
            res.send("There has been an error");
        }

    },
    getOneUser: async function (req, res) {
        try {
            const id = req.params.id;

            const userInfo = await UserModel.find({
                _id: `${id}`,
            });
            res.status(200).json({
                message: "User info",
                UserInfo: userInfo,
            });

        } catch (error) {
            console.log(error);
            res.send("There has been an error");
        }

    },
    deleteOneUser: async function (req, res) {
        try {
            const id = req.params.id;

            // Permits
            const userData = await UserModel.find({
                _id: req.body._id,
            }, {
                permits: 1,
            });

            if (
                !userData[0] ||
                (userData[0].permits !== "admin")
            ) {
                res.status(401).json({
                    message: "Only admins can do this",
                });
                return;
            }

            // Delete
            const userList = await UserModel.findByIdAndDelete(id);
            console.log("userList", userList)
            res.status(200).json({
                message: "User has been deleted",
                UserInfo: userList,
            });

        } catch (error) {
            console.log(error);
            res.send("There has been an error");
        }

    },
    updateUser: async function (req, res) {
        try {
            const {
                name,
                surname1,
                surname2,
                email,
                phone_number,
                zip_code
            } = req.body;
            const oneUser = await UserModel.findByIdAndUpdate( //FIXME No pilla las validaciones como cuando se crea un usuario
                req.params.id, {
                    name,
                    surname1,
                    surname2,
                    email,
                    phone_number,
                    zip_code
                }, {
                    runValidators: true
                }
            );
            // console.log(oneUser);
            res.status(200).json({
                message: "User updated",
                UserInfo: req.body,
            });
        } catch (error) {
            console.log(error);
            res.send("There has been an error, check that all fields are filled in correctly");
        }
    }
}