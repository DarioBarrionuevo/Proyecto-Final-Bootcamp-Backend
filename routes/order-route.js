const express = require('express');
const orderController = require('../controllers/order-controller');

const router = express.Router();

//POST DATA
router.post('/createOrder', orderController.createOrder);

// GET DATA
router.get('/getAllOrders', orderController.getAllOrders);
router.get('/getOneOrder/:id', orderController.getOneOrder);
router.get('/getOrdersByOrganization/:id', orderController.getOrdersByOrganization);
router.get('/getOrdersByUser/:id', orderController.getOrdersByUser);

// DELETE DATA admin
router.delete('/deleteOrder/:id', orderController.deleteOrder);

// PUT DATA
router.put('/updateOrder/:id', orderController.updateOrder);







module.exports = router;