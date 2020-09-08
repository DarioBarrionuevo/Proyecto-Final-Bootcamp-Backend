const express = require('express');
const userController = require('../controllers/user-controller');

const router = express.Router();

//POST DATA
router.post('/login', userController.userLogin);
router.post('/addUser', userController.addUser);










module.exports = router;