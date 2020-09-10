const mongoose = require("mongoose");
const BasketModel = require("../models/basket-model");
const UserModel = require("../models/user-model");
const OrganizationModel = require("../models/organization-model");

// Conection
mongoose.connect(`mongodb://localhost:27017/${process.env.DDBB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

// MAIN
module.exports = {
    createBasket: async function (req, res) {
        try {
            const basketInfo = req.body;

            // Permits

            const userData = await OrganizationModel.find({
                _id: basketInfo._id
            }, {
                permits: 1,
            });

            // console.log("userData", userData);
            if (!userData[0] || userData[0].permits !== 'organization' && userData[0].permits !== 'admin') {
                res.status(401).json({
                    message: 'Permits not enough'
                });
                return;
            }

            // Create and save in databse
            const basket1 = new BasketModel();

            basket1.format = basketInfo.format;
            basket1.content = basketInfo.content;
            basket1.creation_date = new Date();
            basket1.stock = basketInfo.stock;

            basket1.save((err, savedInfo) => {
                if (err) throw new Error("Organization created error", err);
                res.status(200).json({
                    message: "Basket created",
                    BasketInfo: savedInfo
                });
            });

        } catch (error) {
            console.log(error);
            res.status(500).send("It has been an error");
        }
    },
    getAllBaskets: async function (req, res) {
        try {
            const basketList = await BasketModel.find();
            // console.log("basketList", basketList);
            res.status(200).json({
                ...basketList,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("It has been an error");
        }
    },
    getOneBasket: async function (req, res) {
        try {
            const id = req.params.id;
            const basketInfo = await BasketModel.find({
                _id: `${id}`,
            });
            res.status(200).json({
                message: "Basket info",
                basketInfo: basketInfo,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("It has been an error");
        }
    },
    deleteOneBasket: async function (req, res) {
        try {
            const basketReqInfo = req.body;

            // Permits

            const userData = await UserModel.find({
                _id: basketReqInfo._id
            }, {
                permits: 1,
            });

            // console.log("userData", userData);
            if (!userData[0] || userData[0].permits !== 'admin') {
                res.status(401).json({
                    message: 'Only admins can do this'
                });
                return;
            };

            // Delete

            const id = req.params.id;
            const basketInfo = await BasketModel.findByIdAndDelete({
                _id: `${id}`,
            });
            res.status(200).json({
                message: "Basket removed",
                basketInfo: basketInfo,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("It has been an error");
        }
    },
    updateBasket: async function (req, res) {

        try {
            // const basketReqInfo = req.body;
            const {
                _id,
                format,
                content,
                active,
                stock,
            } = req.body;

            // Permits
            const userData = await OrganizationModel.find({
                _id: _id
            }, {
                permits: 1,
            });

            if (!userData[0] || userData[0].permits !== 'organization' && userData[0].permits !== 'admin') {
                res.status(401).json({
                    message: 'Only admins and Organizations can do this'
                });
                return;
            };

            // Update
            const creation_date = new Date();
            const oneBasket = await BasketModel.findByIdAndUpdate(
                req.params.id, {
                    format,
                    content,
                    active,
                    stock,
                    creation_date
                }
            );
            // console.log(oneBasket);
            res.status(200).json({
                message: "Basket updated",
                basketInfo: oneBasket,
            });


        } catch (error) {
            console.log(error);
            res.status(500).send('It has been an error, check that all fields are filled in correctly');
        }

    }
}