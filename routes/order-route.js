const express = require('express');
const orderController = require('../controllers/order-controller');

const router = express.Router();

//POST DATA
router.post('/createOrder', orderController.createOrder);

// GET DATA
router.get('/getAllOrders', orderController.getAllOrders);
router.get('/getOneOrder/:id', orderController.getOneOrder);

// DELETE DATA admin
router.delete('/deleteOrder/:id', orderController.deleteOrder);

// PUT DATA







module.exports = router;