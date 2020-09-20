const express = require('express');
const emailController = require('../controllers/email.controller');

const router = express.Router();

//POST DATA
router.post('/sendEmail', emailController.sendEmail);




module.exports = router;