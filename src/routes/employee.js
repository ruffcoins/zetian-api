const express = require('express')
const EmployeeController = require('../controllers/employee')
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router()

router.post('/employee', EmployeeController.addEmployee);

router.get('/employees', EmployeeController.viewEmployees);

router.get('/employees/:id', EmployeeController.viewEmployee);

router.patch('/employees/:id', EmployeeController.updateEmployee);

router.delete('/employees/:id', EmployeeController.deleteEmployee);

module.exports = router