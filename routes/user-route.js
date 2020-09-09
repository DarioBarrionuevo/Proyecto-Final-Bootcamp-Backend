const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();

//POST DATA
router.post('/createUser', userController.createUser);
router.post('/login', userController.userLogin);

// GET DATA
router.get('/getAllUsers', userController.getAllUsers);
router.get('/getOneUser/:id', userController.getOneUser);

// DELETE DATA
router.delete('/deleteOneUser/:id', userController.deleteOneUser);

// PUT DATA
router.put('/updateUser/:id', userController.updateUser);








module.exports = router;