const express = require('express');
const ServiceController = require('../controllers/service');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router();

router.post('/service', userAuth, ServiceController.addService);

router.get('/services', userAuth, ServiceController.viewServices);

router.get('/services/:id', userAuth, ServiceController.viewService);

router.patch('/services/:id', adminAuth, ServiceController.updateService);

router.delete('/services/:id', adminAuth, ServiceController.deleteService);

module.exports = router;