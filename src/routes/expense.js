const express = require('express')
const ExpenseController = require('../controllers/expense');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router()

router.post('/expense', ExpenseController.addExpense);

router.get('/expenses', ExpenseController.viewExpenses);

router.get('/expenses/recent', ExpenseController.viewRecentExpenses);

router.get('/expenses/:id', ExpenseController.viewExpense);


module.exports = router