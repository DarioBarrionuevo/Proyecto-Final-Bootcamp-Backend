const express = require('express');
const organizationController = require('../controllers/organization-controller');

const router = express.Router();

//POST DATA
router.post('/createOrganization', organizationController.createOrganization);
router.post('/login', organizationController.organizationLogin);
router.post('/addDeliveryPoint/:id', organizationController.addDeliveryPointToOrganization);


// GET DATA
router.get('/getAllOrganizations', organizationController.getAllOrganizations);
router.get('/getOneOrganization/:id', organizationController.getOneOrganization);

// DELETE DATA
router.delete('/deleteOneOrganization/:id', organizationController.deleteOneOrganization);
router.delete('/deleteDeliveryPoint/:id', organizationController.deleteDeliveryPointToOrganization);

// PUT DATA
router.put('/updateOrganization/:id', organizationController.updateOrganization);








module.exports = router;