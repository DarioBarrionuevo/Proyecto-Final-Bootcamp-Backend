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
            // console.log("orderInfo", orderInfo)
            const order1 = new OrderModel();

            // const yoquese = await UserModel.find({
            //         _id: orderInfo.user_id
            //     })
            //     .populate('User')
            //     .exec((err, posts) => {
            //         res.send(posts.user_name);
            //     });


            order1.user_id = async function () {
                await UserModel.find({
                    _id: orderInfo.user_id
                }, {
                    user_name: 1,
                    _id: 0
                });

            };


            // order1.user_id = orderInfo.user_id;
            order1.order_date = new Date();
            order1.basket_id = orderInfo.basket_id;
            order1.organization_id = orderInfo.organization_id;

            // console.log("order1", order1)

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
            });
            res.status(200).json({
                message: "Order info",
                orderInfo: orderInfo,
            });
        } catch (error) {
            console.log(error);
            res.status(500).send("It has been an error");
        }
    }
}