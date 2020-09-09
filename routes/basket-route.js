const express = require('express');
const basketController = require('../controllers/basket-controller');

const router = express.Router();

//POST DATA
router.post('/createBasket', basketController.createBasket);

// GET DATA
router.get('/getAllBaskets', basketController.getAllBaskets);
router.get('/getOneBasket/:id', basketController.getOneBasket);

// DELETE DATA
// I dont want that this app would allow removing baskets, hence the active field

// PUT DATA
// I am not sure how I feel about updating baskets after the creation,for now I will not put this in the app


module.exports = router;