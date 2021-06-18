const mongoose = require('mongoose');
const validator = require('validator');

const Car = mongoose.model('Car', {
    carRegNo: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    carMake: {
        type: String,
        trim: true
    },
    carModel: {
        type: String,
        trim: true
    }
});

module.exports = Car;