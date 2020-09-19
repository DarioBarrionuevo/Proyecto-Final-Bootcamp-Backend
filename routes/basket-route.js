const express = require('express');
const basketController = require('../controllers/basket-controller');

const router = express.Router();

//POST DATA
router.post('/createBasket', basketController.createBasket);

// GET DATA
router.get('/getAllBaskets', basketController.getAllBaskets);
router.get('/getOneBasket/:id', basketController.getOneBasket);
router.get('/getBasketsByOrganization/:id', basketController.getBasketsByOrganization);
router.get('/getBasketsActiveByOrganization/:id', basketController.getBasketssActiveByOrganization);


// DELETE DATA only for admin
router.delete('/deleteOneBasket/:id', basketController.deleteOneBasket);


// PUT DATA only for admin
router.put('/updateBasket/:id', basketController.updateBasket);


module.exports = router;