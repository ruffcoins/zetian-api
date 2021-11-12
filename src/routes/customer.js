const express = require('express')
const CustomerController = require('../controllers/customer')
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router()

router.post('/customer', CustomerController.addCustomer);

router.get('/customers', CustomerController.viewCustomers);

router.get('/customers/:id', CustomerController.viewCustomer);

router.patch('/customers/:id', CustomerController.updateCustomer);

router.patch('/customers/addCar/:id', CustomerController.addCarToCustomer);

router.delete('/customers/:id', CustomerController.deleteCustomer);

module.exports = router