const mongoose = require('mongoose');
const validator = require('validator');

const carSchema = new mongoose.Schema({
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
    },
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'customer'
    }
});

const Car = mongoose.model('Car', carSchema);

// carSchema.methods.toJSON = function () {
//     const car = this
//     const carObject = car.toObject()

//     delete carObject.customerId;

//     return carObject;
// }

module.exports = Car;