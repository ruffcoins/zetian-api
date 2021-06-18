const mongoose = require('mongoose');
const validator = require('validator');

const Service = mongoose.model('Service', {
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    amount: {
        type: Number,
        required: true,
        trim: true
    }
});

module.exports = Service;