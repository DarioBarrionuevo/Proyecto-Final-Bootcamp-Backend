const mongoose = require("mongoose");
const BasketModel = require("../models/basket-model");

// Conection
mongoose.connect(`mongodb://localhost:27017/${process.env.DDBB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// MAIN
module.exports = {
    createBasket: async function (req, res) {
        try {
            const basketInfo = req.body;

            const basket1 = new BasketModel();

            basket1.format = basketInfo.format;
            basket1.content = basketInfo.content;
            basket1.creation_date = new Date();
            basket1.stock = basketInfo.stock;

            basket1.save((err, savedInfo) => {
                if (err) throw new Error("Organization created error", err);
                // console.log('Basket created', savedInfo);
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
    }
}