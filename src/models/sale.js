const mongoose = require("mongoose");
const validator = require("validator");

const saleSchema = new mongoose.Schema({

    carRegNo: {
        type: String,
        required: true,
    },
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
},  { timestamps: true}
);

const Sale = mongoose.model('Sale', saleSchema);

module.exports = Sale;