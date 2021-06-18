const Employee = require('../models/employee')

class EmployeeController {
    static async addEmployee(req, res) {
        const employee = new Employee({
            firstName: req.body.firstName.toLowerCase(),
            lastName: req.body.lastName.toLowerCase(),
            phoneNumber: req.body.lastName,
            email: req.body.email,
            address: req.body.address,
            salary: req.body.salary,
            bankName: req.body.bankName,
            accountNumber: req.body.accountNumber,
            accountName: req.body.accountName,
            comments: req.body.comments
        })

        try {
            await employee.save()
            res.status(201).send({ success: true, message: employee })
        } catch (e) {
            if (e.name === 'MongoError' && e.code === 11000) {
                // Duplicate phone number
                return res.status(422).send({ success: false, message: "Phone number already exists" });
            }
            res.status(400).send(e)
        }
    }

    static async viewEmployees(req, res) {
        try {
            const employees = await Employee.find({})
            res.send({ success: true, message: employees })
        } catch (e) {
            res.status(500).send({ success: false, message: e })
        }
    }

    static async viewEmployee(req, res) {
        const _id = req.params.id

        try {
            const employee = await Employee.findById(_id)

            if (!employee) {
                return res.status(404).send({ success: false, message: "Employee not found" });
            }

            res.send({ success: true, message: employee })
        } catch (e) {
            res.status(500).send({ success: false, message: "Employee does not exist" })
        }
    }

    static async updateEmployee(req, res) {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['firstName', 'lastName', 'phoneNumber', 'email', 'address', 'salary', 'bankName', 'accountNumber', 'accountName', 'comments',]
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
            const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

            if (!employee) {
                return res.status(404).send({ success: false, message: "Employee not found" })
            }

            res.send({ success: true, message: employee })
        } catch (e) {
            res.status(400).send({ success: false, message: e })
        }
    }

    static async deleteEmployee(req, res) {
        try {
            const employee = await Employee.findByIdAndDelete(req.params.id)

            if (!employee) {
                return res.status(404).send({ success: false, message: "Employee not found" })
            }

            res.send({ success: true, message: employee })
        } catch (e) {
            res.status(500).send({ success: false, message: e })
        }
    }
}

module.exports = EmployeeController;