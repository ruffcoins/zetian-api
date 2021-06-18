const mongoose = require('mongoose');
const validator = require('validator');

const Employee = mongoose.model('Employee', {
    firstName: {
        type: String,
        trim: true,
        required: true
    },
    lastName: {
        type: String,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid');
            }
        }
    },
    address: {
        type: String,
        trim: true,
    },
    salary: {
        type: Number,
        trim: true,
    },
    bankName: {
        type: String,
        trim: true,
    },
    accountNumber: {
        type: String,
        trim: true,
    },
    accountName: {
        type: String,
        trim: true,
    },
    comments: {
        type: String,
        trim: true,
    },

    
});

module.exports = Employee;