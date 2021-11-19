const Employee = require('../models/employee');
const Expense = require('../models/expense')

class ExpenseController {
    static async addExpense(req, res) {


        try {
            const employeeId = req.body.employee_id;

            const employee = await Employee.findById(employeeId);

            const employeeName = employee.firstName + ' ' + employee.lastName;

            const expense = new Expense({
                expense: req.body.expense,
                purpose: req.body.purpose,
                amount: req.body.amount,
                date: req.body.date,
                employee_id: req.body.employee_id,
                employee_name: employeeName
            });
            await expense.save()
            return res.status(201).send({ success: true, message: expense })
        } catch (e) {
            if (e.name === 'MongoError' && e.code === 11000) {
                // Duplicate phone number
                return res.status(422).send({ success: false, message: "Expense already exists" });
            }
            return res.status(400).send(e)
        }
    }

    static async viewExpenses(req, res) {

        try {
            const expenses = await Expense.find({}).sort({ date: -1 });

            // const expenses = await Expense.find({}).sort({ created_at: 1 });

            return res.send({ success: true, message: expenses })
        } catch (e) {
            return res.status(500).send({ success: false, message: e })
        }
    }

    static async viewRecentExpenses(req, res) {

        try {
            const expenses = await Expense.find({}).sort({ created_at: -1 }).limit(10);

            res.send({ success: true, message: expenses })
        } catch (e) {
            res.status(500).send({ success: false, message: e })
        }
    }

    static async viewExpense(req, res) {
        const _id = req.params.id

        try {
            const expense = await Expense.findById(_id);
            const employee = await Employee.findById(expense.employee_id);
            const employeeName = employee.firstName + ' ' + employee.lastName;


            if (!expense) {
                return res.status(404).send({ success: false, message: "Expense not found" });
            }

            res.send({ success: true, message: expense, employeeName });
        } catch (e) {
            res.status(500).send({ success: false, message: "Expense does not exist" })
        }
    }



}

module.exports = ExpenseController;