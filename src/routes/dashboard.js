const express = require('express')
const DashboardController = require('../controllers/dashboard')
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router()

router.get('/dashboard', userAuth, DashboardController.dashboard);

module.exports = router
