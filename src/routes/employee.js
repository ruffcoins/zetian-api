const express = require('express')
const EmployeeController = require('../controllers/employee')
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router()

router.post('/employee', userAuth, EmployeeController.addEmployee);

router.get('/employees', userAuth, EmployeeController.viewEmployees);

router.get('/employees/:id', userAuth, EmployeeController.viewEmployee);

router.patch('/employees/:id', userAuth, EmployeeController.updateEmployee);

router.delete('/employees/:id', adminAuth, EmployeeController.deleteEmployee);

module.exports = router