const express = require('express')
const ExpenseController = require('../controllers/expense')
const router = new express.Router()

router.post('/expense', ExpenseController.addExpense);

router.get('/expenses', ExpenseController.viewExpenses);

router.get('/expenses/:id', ExpenseController.viewExpense);

// router.patch('/expenses/:id', ExpenseController.updateExpense);

// router.delete('/expenses/:id', ExpenseController.deleteExpense);

module.exports = router