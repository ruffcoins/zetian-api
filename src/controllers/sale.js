const Sale = require('../models/sale');
const Customer = require('../models/customer');
const Service = require('../models/service');
const Employee = require('../models/employee');
const Car = require('../models/car');
const { query } = require('express');
const { findOne } = require('../models/sale');


class SaleController {
    static async addSale(req, res) {

        let serviceList = [];
        let serviceAmountList = [];
        let serviceIdList = [];
        let totalAmount = 0;

        try {

            // Get car reg no from the request and find the car
            const customerCarRegNo = req.body.carRegNo

            const car = await Car.findOne({ "carRegNo": customerCarRegNo });

            // if car is not found, display error message
            if (!car) {
                return res.status(404).send({ success: false, message: "Car not found" });
            }

            // Find get customer using the car id of the found car
            const customer = await Customer.findOne({ "cars_id": car._id });
            // const customerName = customer.firstName + " " + customer.lastName;

            // Get the list of services from the request
            const serviceRequest = req.body.services;

            // find the list object using the service name from the request and store it in an array
            for (let i = 0; i < serviceRequest.length; i++) {
                const service = await Service.findOne({ "name": serviceRequest[i].toLowerCase() });
                serviceList.push(service);
            }

            // Get each amount and id from the list of objects and store them in arrays
            serviceList.forEach(async (element) => {
                serviceAmountList.push(element.amount);
                serviceIdList.push(element._id);
            });

            //calculate total amount form the amount array
            totalAmount = serviceAmountList.reduce((a, b) => a + b, 0);

            const sale = new Sale({
                carRegNo: req.body.carRegNo,
                customer_id: customer._id,
                service_id: serviceIdList,
                employee_id: req.body.employee_id,
                date: req.body.date,
                totalAmount: totalAmount
            });

            await sale.save();
            return res.status(201).send({ success: true, message: sale });

        } catch (e) {
            return res.status(400).send({ success: false, message: e })
        }
    }

    static async viewSales(req, res) {

        let sales;
        let car;
        let customer;
        let service;
        try {
            let allSales = [];

            // Find all sales
            sales = await Sale.find({}).sort({ date: -1 });

            // sales = await Sale.find({});

            // Loop through all sales to get each customer, car and services associated with that sale
            for (let i = 0; i < sales.length; i++) {
                let sale = sales[i];

                car = await Car.findOne({ "carRegNo": sale.carRegNo });
                customer = await Customer.findOne({ "_id": sale.customer_id });

                service = await Service.find({ "_id": sales[i].service_id });

                // store results in an object
                let eachSale = { sale, car, customer, service };

                allSales.push(eachSale);

            }

            return res.send({ success: true, message: allSales })
        } catch (e) {
            return res.status(500).send({ success: false, message: e })
        }
    }

    static async viewSale(req, res) {
        const _id = req.params.id

        try {
            const sale = await Sale.findById(_id)

            if (!sale) {
                return res.status(404).send({ success: false, message: "Sale not found" });
            }

            return res.send({ success: true, message: sale })
        } catch (e) {
            return res.status(500).send({ success: false, message: "Sale does not exist" })
        }
    }

    static async recentTransactions(req, res) {

        let sales;
        let car;
        let customer;
        let service;
        try {
            let allSales = [];

            sales = await Sale.find({}).sort({ date: -1 }).limit(10);

            // Loop through all sales to get each customer, car and services associated with that sale
            for (let i = 0; i < sales.length; i++) {
                let sale = sales[i];

                car = await Car.findOne({ "carRegNo": sale.carRegNo });
                customer = await Customer.findOne({ "_id": sale.customer_id });

                service = await Service.find({ "_id": sales[i].service_id });

                // store results in an object
                let eachSale = { sale, car, customer, service };

                allSales.push(eachSale);

            }

            return res.send({ success: true, message: allSales })
        } catch (e) {
            return res.status(500).send({ success: false, message: e })
        }
    }
}

module.exports = SaleController;