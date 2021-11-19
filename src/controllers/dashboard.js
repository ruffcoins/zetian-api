const Customer = require('../models/customer');
const Car = require('../models/car');
const Sale = require('../models/sale');
const Service = require('../models/service');
const Employee = require('../models/employee');
const User = require('../models/user');

class DashboardController {
    static async dashboard(req, res) {

        try {
            // Services count
            const serviceCount = await Service.countDocuments({
            
            });

            // Sales Count
            const salesCount = await Sale.countDocuments({

            });

            // Customers Count
            const customersCount = await Customer.countDocuments({

            });

            // Employee Count
            const employeeCount = await Employee.countDocuments({

            });

            // User Count
            const userCount = await Car.countDocuments({

            });

            res.send({ success: true, message: { serviceCount, salesCount, customersCount, employeeCount, userCount } });
            
        } catch (e) {
            res.status(500).send({ success: false, message: e });
        }
    
    }
}

module.exports = DashboardController;