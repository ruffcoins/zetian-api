const Expense = require('../models/expense')

class ExpenseController {
    static async addExpense(req, res) {
        const expense = new Expense(req.body)

        try {
            await expense.save()
            res.status(201).send({ success: true, message: expense })
        } catch (e) {
            if (e.name === 'MongoError' && e.code === 11000) {
                // Duplicate phone number
                return res.status(422).send({ success: false, message: "Expense already exists" });
            }
            res.status(400).send(e)
        }
    }

    static async viewExpenses(req, res) {
        try {
            const expenses = await Expense.find({})
            res.send({ success: true, message: expenses })
        } catch (e) {
            res.status(500).send({ success: false, message: e })
        }
    }

    static async viewExpense(req, res) {
        const _id = req.params.id

        try {
            const expense = await Expense.findById(_id)

            if (!expense) {
                return res.status(404).send({ success: false, message: "Expense not found" });
            }

            res.send({ success: true, message: expense })
        } catch (e) {
            res.status(500).send({ success: false, message: "Expense does not exist" })
        }
    }
}

module.exports = ExpenseController;