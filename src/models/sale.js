const mongoose = require("mongoose");
const validator = require("validator");

const Sale = mongoose.model('Sale', {

    customer_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    },
    service_id: [{
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'service'
    }],
    employee_id: {
        required: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee'
    },
    date: {
        type: Date,
        required: true
    },
    totalAmount: {
        type: Number,
        required: true
    }

});

module.exports = Sale;