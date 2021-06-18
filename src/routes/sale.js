const express = require('express')
const SaleController = require('../controllers/sale')
const router = new express.Router()

router.post('/sale', SaleController.addSale);

router.get('/sales', SaleController.viewSales);

router.get('/sales/:id', SaleController.viewSale);

module.exports = router