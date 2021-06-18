const express = require('express')
const CustomerController = require('../controllers/customer')
const router = new express.Router()

router.post('/customer', CustomerController.addCustomer);

router.get('/customers', CustomerController.viewCustomers);

router.get('/customers/:id', CustomerController.viewCustomer);

router.patch('/customers/:id', CustomerController.updateCustomer);

router.delete('/customers/:id', CustomerController.deleteCustomer);

module.exports = router