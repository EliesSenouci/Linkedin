const mongoose = require('mongoose');

let establishmentSchema = mongoose.Schema({
    create_date: {
        type: Date,
        default: Date.now,
    },
    name: {
        type: String,
        required: true
    },
    sector: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    }
});

// Export model
let Establishment = module.exports = mongoose.model('establishment', establishmentSchema);
module.exports.get = function (callback, limit) {
    Establishment.find(callback).limit(limit);
};