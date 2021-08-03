const express = require('express')
const DashboardController = require('../controllers/dashboard')
const router = new express.Router()

router.get('/dashboard', DashboardController.dashboard);

module.exports = router
