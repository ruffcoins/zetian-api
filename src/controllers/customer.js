const Customer = require('../models/customer');
const Car = require('../models/car');
const Sale = require('../models/sale');
const Service = require('../models/service');

class CustomerController {
    static async addCustomer(req, res) {

        try {
            const car = new Car({
                carRegNo: req.body.carRegNo,
                carMake: req.body.carMake,
                carModel: req.body.carModel
            });

            await car.save();

            try {
                const customer = new Customer({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    phoneNumber: req.body.phoneNumber,
                    cars_id: car._id
                });

                await customer.save();

                res.status(201).send({ success: true, message: customer });
            } catch (e) {

                res.status(400).send({ success: false, message: e });
            }
        } catch (e) {
            if (e.name === 'MongoError' && e.code === 11000) {
                // Duplicate Car Registeration Number
                return res.status(422).send({ success: false, message: "Car Registeration Number already exists" });
            }
            res.status(400).send({ success: false, message: e });
        }

    }

    static async viewCustomers(req, res) {
        let totalAmount = 0;
        let allCustomers = [];

        try {
            const customers = await Customer.find({});

            for (let i = 0; i < customers.length; i++) {
                let amountList = [];
                let serviceList = [];
                let customerServices = [];

                const customer = await Customer.findById(customers[i]._id);

                const sale = await Sale.find({ "customer_id": customers[i]._id });
                sale.forEach(element => {
                    amountList.push(element.totalAmount);
                    serviceList.push(element.service_id);
                });

                for (let i = 0; i < serviceList.length; i++) {
                    const service = await Service.find({ "_id": serviceList[i] });
                    customerServices.push(service);
                }

                totalAmount = amountList.reduce((a, b) => a + b, 0);

                let transactionCount = sale.length;
                let carCount = customer.cars_id.length;

                let eachCustomer = {
                    customer,
                    sale,
                    customerServices,
                    totalAmount,
                    transactionCount,
                    carCount
                };
                allCustomers.push(eachCustomer);
            }


            res.send({ success: true, message: allCustomers });
        } catch (e) {
            res.status(500).send({ success: false, message: e });
        }
    }

    static async viewCustomer(req, res) {

        let totalAmount = 0;
        let amountList = [];

        const _id = req.params.id;

        try {
            const customer = await Customer.findById(_id);

            if (!customer) {
                return res.status(404).send({ success: false, message: "Customer not found" });
            }

            const sale = await Sale.find({ "customer_id": customer._id });

            // Get each amountfrom the sale list for the customer
            sale.forEach(async (element) => {
                amountList.push(element.totalAmount);
            });

            //calculate total amount form the amount array
            totalAmount = amountList.reduce((a, b) => a + b, 0);

            const transactionCount = sale.length;

            const carCount = customer.cars_id.length;

            res.send({ success: true, message: customer, transactionCount, totalAmount, carCount });
        } catch (e) {
            res.status(500).send({ success: false, message: "Customer does not exist" })
        }
    }

    static async updateCustomer(req, res) {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['firstName', 'lastName', 'phoneNumber']
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
            const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })

            if (!customer) {
                return res.status(404).send({ success: false, message: "Customer not found" })
            }

            res.send({ success: true, message: customer })
        } catch (e) {
            res.status(400).send({ success: false, message: e })
        }
    }

    static async deleteCustomer(req, res) {
        try {
            const customer = await Customer.findByIdAndDelete(req.params.id)

            if (!customer) {
                return res.status(404).send({ success: false, message: "Customer not found" })
            }

            res.send({ success: true, message: customer })
        } catch (e) {
            res.status(500).send({ success: false, message: e })
        }
    }
}

module.exports = CustomerController;