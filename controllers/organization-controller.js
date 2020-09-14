const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const OrganizationModel = require("../models/organization-model");

// Conection
mongoose.connect(`mongodb://localhost:27017/${process.env.DDBB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

// MAIN
module.exports = {
    createOrganization: async function (req, res) {
        try {
            const organizationInfo = req.body;
            // console.log("organizationInfo", organizationInfo)

            const organization1 = new OrganizationModel();

            organization1.name = organizationInfo.name;
            organization1.address = organizationInfo.address;
            organization1.nif = organizationInfo.nif;
            organization1.email = organizationInfo.email;
            organization1.phone_number = organizationInfo.phone_number;
            organization1.user_name = organizationInfo.user_name;
            organization1.delivery_points = organizationInfo.delivery_points;

            const salt = await bcrypt.genSalt(10);
            const encryptedPassword = await bcrypt.hash(organizationInfo.password, salt);
            organization1.password = encryptedPassword;

            organization1.save((err, savedInfo) => {
                if (err) throw new Error("Organization created error", err);
                // console.log('Organization created', savedInfo);
                res.status(200).json({
                    message: "Organization created",
                    OrganizationInfo: savedInfo
                });
            });

        } catch (error) {
            console.log(error);
            res.status(500).send("It has been an error");
        }
    },
    organizationLogin: async function (req, res) {
        try {
            const {
                user_name,
                password
            } = req.body;
            // console.log("req.body", req.body);

            const organizationData = await OrganizationModel.find({
                user_name
            });
            // console.log("organizationData", organizationData);
            if (!organizationData) {
                res.status(401).json({
                    message: "User name or password incorrect",
                });
                return;
            }
            const passwordIsCorrect = await bcrypt.compare(
                password,
                organizationData[0].password
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
            res.status(500).send("It has been an error");
        }
    },
    getAllOrganizations: async function (req, res) {
        try {
            const organizationList = await OrganizationModel.find();
            // console.log("organizationList", organizationList);
            res.status(200).json({
                ...organizationList,
            });

        } catch (error) {
            console.log(error);
            res.send("It has been an error");
        }

    },
    getOneOrganization: async function (req, res) {
        try {
            const id = req.params.id;

            const organizationInfo = await OrganizationModel.find({
                _id: `${id}`,
            });
            res.status(200).json({
                message: "Organization info",
                organizationInfo: organizationInfo,
            });

        } catch (error) {
            console.log(error);
            res.send("It has been an error");
        }

    },
    deleteOneOrganization: async function (req, res) {
        try {
            const id = req.params.id;
            // Permits
            const userData = await OrganizationModel.find({
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
            const organizationList = await OrganizationModel.findByIdAndDelete(id);
            // console.log("organizationList", organizationList)
            if (!organizationList) {
                res.send("This is not a valid organization"); //TODO poner lo mismo en los demas deletes, si se intenta borrar algo ya borrado que aparezca mensaje diciendo que no existe en vez de info vacía
            }
            res.status(200).json({
                message: "Organization has been deleted",
                organizationInfo: organizationList,
            });

        } catch (error) {
            console.log(error);
            res.send("It has been an error");
        }

    },
    updateOrganization: async function (req, res) {
        try {
            const {
                name,
                address,
                nif,
                email,
                phone_number,
                delivery_points
            } = req.body;
            const oneOrganization = await OrganizationModel.findByIdAndUpdate(
                req.params.id, {
                    name,
                    address,
                    nif,
                    email,
                    phone_number,
                    delivery_points
                }, {
                    runValidators: true
                }
            );
            // console.log(oneOrganization);
            res.status(200).json({
                message: "Organization updated",
                organizationInfo: req.body,
            });
        } catch (error) {
            console.log(error);
            res.send("It has been an error, check that all fields are filled in correctly");
        }
    }


















































    // organizationLogin: async function (req, res) {
    //     try {
    //         const {
    //             user_name,
    //             password
    //         } = req.body;

    //         const userData = await organizationModel.find({
    //             user_name
    //         });
    //         // console.log("userData", userData)
    //         if (!userData) {
    //             res.status(401).json({
    //                 message: "User name or password incorrect",
    //             });
    //             return;
    //         }
    //         const passwordIsCorrect = await bcrypt.compare(
    //             password,
    //             userData[0].password
    //         );

    //         if (!passwordIsCorrect) {
    //             res.status(401).json({
    //                 message: "User name or password incorrect",
    //             });
    //             return;
    //         }
    //         const token = jwt.sign({
    //                 user_name,
    //             },
    //             process.env.SECRET, {
    //                 expiresIn: 60 * 60 * 24,
    //             }
    //         );
    //         res.status(200).json({
    //             message: "Login correct",
    //             token,
    //             user_name,
    //         });
    //     } catch (error) {
    //         console.log(error);
    //         res.status(500).send("It has been an error");
    //     }
    // },


}