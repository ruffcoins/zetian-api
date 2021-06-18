const express = require('express');
const ServiceController = require('../controllers/service');
const router = new express.Router();

router.post('/service', ServiceController.addService);

router.get('/services', ServiceController.viewServices);

router.get('/services/:id', ServiceController.viewService);

router.patch('/services/:id', ServiceController.updateService);

router.delete('/services/:id', ServiceController.deleteService);

module.exports = router;