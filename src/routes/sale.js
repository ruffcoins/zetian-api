const express = require('express')
const SaleController = require('../controllers/sale');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router()

router.post('/sale', userAuth,  SaleController.addSale);

router.get('/sales', userAuth, SaleController.viewSales);

router.get('/sales/recent', userAuth, SaleController.recentTransactions);

router.get('/sales/:id', userAuth, SaleController.viewSale);

module.exports = router