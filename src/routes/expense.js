const express = require('express')
const ExpenseController = require('../controllers/expense');
const userAuth = require('../middleware/userAuth');
const adminAuth = require('../middleware/adminAuth');
const router = new express.Router()

router.post('/expense', userAuth, ExpenseController.addExpense);

router.get('/expenses', userAuth, ExpenseController.viewExpenses);

router.get('/expenses/recent', userAuth, ExpenseController.viewRecentExpenses);

router.get('/expenses/:id', userAuth, ExpenseController.viewExpense);


module.exports = router