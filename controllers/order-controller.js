const mongoose = require("mongoose");
const OrderModel = require("../models/order-model");
const UserModel = require("../models/user-model");
// var ObjectId = require("mongodb").ObjectID;


// Conection
mongoose.connect(`mongodb://localhost:27017/${process.env.DDBB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// MAIN
module.exports = {
    createOrder: async function (req, res) {
        try {
            const orderInfo = req.body;

            // Permits
            const userData = await UserModel.find({
                _id: orderInfo.user
            }, {
                permits: 1,
            });
            // console.log("userData", userData);
            if (!userData[0] || (userData[0].permits !== 'user' && userData[0].permits !== 'admin')) { //entender y hacer en baskets
                res.status(401).json({
                    message: 'Permits not enough'
                });
                return;
            };

            // Create and save in databse
            const order1 = new OrderModel();

            order1.user = orderInfo.user;
            order1.order_date = new Date();
            order1.basket = orderInfo.basket;
            order1.organization = orderInfo.organization;

            order1.save((err, savedInfo) => {
                if (err) throw new Error("Organization created error", err);
                // console.log('order created', savedInfo);
                res.status(200).json({
                    message: "order created",
                    orderInfo: savedInfo
                });
            });

        } catch (error) {
            console.log(error);
            res.status(500).send("It has been an error");
        }
    },
    getAllOrders: async function (req, res) {
        try {
            const orderList = await OrderModel.find();
            // console.log("orderList", orderList);
            res.status(200).json({
                ...orderList,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("It has been an error");
        }
    },
    getOneOrder: async function (req, res) {
        try {
            const id = req.params.id;
            const orderInfo = await OrderModel.find({
                    _id: `${id}`,
                }).populate('organization')
                .populate('user')
                .populate('basket');

            res.status(200).json({
                message: "Order info",
                orderInfo: orderInfo,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("It has been an error");
        }
    },
    deleteOrder: async function (req, res) {
        try {
            const orderReqInfo = req.body;

            // Permits

            const userData = await UserModel.find({
                _id: orderReqInfo._id
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



            const id = req.params.id;
            const orderInfo = await OrderModel.findByIdAndDelete({
                _id: `${id}`,
            });
            res.status(200).json({
                message: "Order removed",
                orderInfo: orderInfo,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("It has been an error");
        }
    },
}