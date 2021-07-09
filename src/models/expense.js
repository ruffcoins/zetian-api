const mongoose = require('mongoose');
const validator = require('validator');

const Expense = mongoose.model('Expense', {
    expense: {
        type: String,
        trim: true
    },
    purpose: {
        type: String,
        trim: true
    },
    amount: {
        type: Number,
        trim: true,
        required: true,
    },
    employee_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    employee_name: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        required: true,
    },

});

module.exports = Expense;