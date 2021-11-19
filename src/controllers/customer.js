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

                //update customer id in car
                await Car.findByIdAndUpdate(car._id, { $set: { customerId: customer._id } }, { new: true, runValidators: true });

                return res.status(201).send({ success: true, message: customer });
            } catch (e) {

                return res.status(400).send({ success: false, message: e });
            }
        } catch (e) {
            if (e.name === 'MongoError' && e.code === 11000) {
                // Duplicate Car Registeration Number
                return res.status(422).send({ success: false, message: "Car Registeration Number already exists" });
            }
            return res.status(400).send({ success: false, message: e });
        }

    }

    static async addCarToCustomer(req, res) {
        const _id = req.params.id;

        try {

            const customer = await Customer.findById(_id);

            const car = new Car({
                carRegNo: req.body.carRegNo,
                carMake: req.body.carMake,
                carModel: req.body.carModel
            });

            await car.save();


            const carId = car._id;

            // find by document id and update and push item in array
            await Customer.findByIdAndUpdate(req.params.id, { $push: { cars_id: carId } }, { new: true, runValidators: true });
            await Car.findByIdAndUpdate(car._id, { $set: { customerId: customer._id } }, { new: true, runValidators: true });


            const newCustomer = await Customer.findById(_id);

            return res.send({ success: true, message: newCustomer });

        } catch (e) {

            return res.status(400).send({ success: false, message: e });
        }

    }

    static async viewCustomers(req, res) {
        let totalAmount = 0;
        let allCustomers = [];

        try {
            /// Find all customers
            const customers = await Customer.find({});

            // Perform an action for each customer in the customers list
            for (let i = 0; i < customers.length; i++) {
                let amountList = [];
                let serviceList = [];
                let services = [];
                let cars = [];
                let customerServices = [];

                // find each customer
                const customer = await Customer.findById(customers[i]._id);

                /// Get the list of cars that a customer has
                // const carList = await Car.find({ "customerId": customer._id });

                // console.log(carList);

                customer.cars_id.forEach(async (element) => {
                    const car = await Car.findById(element);
                    cars.push(car);
                });

                // console.log(`new ${cars}`);

                //Find all sales paid for by the customer found above
                const sale = await Sale.find({ "customer_id": customers[i]._id });
                sale.forEach(element => {
                    amountList.push(element.totalAmount);
                    serviceList.push(element.service_id);
                });

                //Find the services belonging to that sale
                for (let i = 0; i < serviceList.length; i++) {
                    const service = await Service.find({ "_id": serviceList[i] });
                    services.push(service);
                }

                // from the list of services get each service object
                for (let i = 0; i < services.length; i++) {
                    services[i].forEach(element => {
                        customerServices.push(element);
                    });
                }

                // calculate the total amount on each sale
                totalAmount = amountList.reduce((a, b) => a + b, 0);

                //calculate the number of transactions made by a customer
                let transactionCount = sale.length;

                // Count the number of cars that a xustomer has
                let carCount = customer.cars_id.length;

                // Create an object to house all require properties
                let eachCustomer = {
                    customer,
                    cars,
                    sale,
                    customerServices,
                    totalAmount,
                    transactionCount,
                    carCount
                };
                // Populate the customers array
                allCustomers.push(eachCustomer);
            }


            return res.send({ success: true, message: allCustomers });
        } catch (e) {
            return res.status(500).send({ success: false, message: e });
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

            return res.send({ success: true, message: customer, transactionCount, totalAmount, carCount });
        } catch (e) {
            return res.status(500).send({ success: false, message: "Customer does not exist" })
        }
    }

    static async updateCustomer(req, res) {
        const updates = Object.keys(req.body)
        const allowedUpdates = ['firstName', 'lastName', 'phoneNumber', 'cars'];
        const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

        if (!isValidOperation) {
            return res.status(400).send({ error: 'Invalid updates!' })
        }

        try {
            const customer = await Customer.findByIdAndUpdate(
                req.params.id, { firstName: req.body.firstName, lastName: req.body.lastName, phoneNumber: req.body.phoneNumber }, { new: true, runValidators: true }
            )

            for (let i = 0; i < req.body.cars.length; i++) {
                const car = await Car.findByIdAndUpdate(
                    req.body.cars[i].id, { carRegNo: req.body.cars[i].carRegNo, carMake: req.body.cars[i].carMake, carModel: req.body.cars[i].carModel }, { new: true, runValidators: true }
                )
            }


            if (!customer) {
                return res.status(404).send({ success: false, message: "Customer not found" })
            }

            return res.send({ success: true, message: customer })
        } catch (e) {
            return res.status(400).send({ success: false, message: e })
        }
    }

    static async deleteCustomer(req, res) {
        try {
            const customer = await Customer.findByIdAndDelete(req.params.id)

            if (!customer) {
                return res.status(404).send({ success: false, message: "Customer not found" })
            }

            return res.send({ success: true, message: customer })
        } catch (e) {
            return res.status(500).send({ success: false, message: e })
        }
    }
}

module.exports = CustomerController;