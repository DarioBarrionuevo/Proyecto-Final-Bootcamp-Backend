const mongoose = require("mongoose");
const OrderModel = require("../models/order-model");
const UserModel = require("../models/user-model");
const OrganizationModel = require("../models/organization-model");
// var ObjectId = require("mongodb").ObjectID;

// Conection
mongoose.connect(`mongodb://localhost:27017/${process.env.DDBB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});

// MAIN
module.exports = {
    createOrder: async function (req, res) {
        try {
            const orderInfo = req.body;

            // Permits
            const userData = await UserModel.find({
                _id: orderInfo._id,
            }, {
                permits: 1,
            });
            // console.log("userData", userData);
            if (
                !userData[0] ||
                (userData[0].permits !== "user" && userData[0].permits !== "admin")
            ) {
                //entender y hacer en baskets
                res.status(401).json({
                    message: "Permits not enough",
                });
                return;
            }

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
                    orderInfo: savedInfo,
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
                })
                .populate("organization", "name email phone_number delivey_points")
                .populate("user", "name surname1 surname2 email phone_number zip_code")
                .populate("basket", "format content active stock");

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
                _id: orderReqInfo._id,
            }, {
                permits: 1,
            });

            // console.log("userData", userData);
            if (!userData[0] || userData[0].permits !== "admin") {
                res.status(401).json({
                    message: "Only admins can do this",
                });
                return;
            }

            // Update

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
    updateOrder: async function (req, res) {
        try {
            // const basketReqInfo = req.body;
            const {
                _id,
                user,
                paid,
                basket,
                organization
            } = req.body;

            // Permits
            const userData = await OrganizationModel.find({
                _id: _id,
            }, {
                permits: 1,
            });

            if (
                !userData[0] ||
                (userData[0].permits !== "organization" &&
                    userData[0].permits !== "admin")
            ) {
                res.status(401).json({
                    message: "Only admins and organizations can do this",
                });
                return;
            }

            // Update
            // FIXME Intentar que si se pone el campo vacio se rellene con lo que ya está actualmente, supongo que con un if/ lo puedo hacer desde el front 

            // const creation_date = new Date(); I am leaning towars not including this feature in the update,order date must be the same and original one
            const oneOrder = await OrderModel.findByIdAndUpdate(req.params.id, {
                user,
                paid,
                basket,
                organization,
            }, {
                runValidators: true
            })

            // tryng to respond with the actual order uptated
            const oneOrderUpdated = await OrderModel.findById(req.params.id, {}).populate("organization", "name email phone_number delivey_points")
                .populate("user", "name surname1 surname2 email phone_number zip_code")
                .populate("basket", "format content active stock");


            // console.log(oneOrder);
            res.status(200).json({
                message: "Order updated",
                orderInfo: oneOrderUpdated,
            });
        } catch (error) {
            console.log(error);
            res
                .status(500)
                .send(
                    "It has been an error, check that all fields are filled in correctly"
                );
        }
    },
};