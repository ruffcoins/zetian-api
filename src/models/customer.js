const mongoose = require('mongoose');
const validator = require('validator');

const Customer = mongoose.model('Customer', {
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true,
    },
    cars_id: [{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'car'
    }]
});

module.exports = Customer;