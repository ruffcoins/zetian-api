const express = require('express')
const CustomerController = require('../controllers/customer')
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router()

router.post('/customer', userAuth, CustomerController.addCustomer);

router.get('/customers', userAuth, CustomerController.viewCustomers);

router.get('/customers/:id', userAuth, CustomerController.viewCustomer);

router.patch('/customers/:id', userAuth, CustomerController.updateCustomer);

router.patch('/customers/addCar/:id', userAuth, CustomerController.addCarToCustomer);

router.delete('/customers/:id', adminAuth, CustomerController.deleteCustomer);

module.exports = router