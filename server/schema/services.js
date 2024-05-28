const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
    name: String,
    description: String,
    rating: Number,
    img: Buffer,
    price: Number,
    contact: String,
    location: {
        latitude: Number,
        longitude: Number
    },
    area: String
});

const Service = mongoose.model('Service', serviceSchema);

module.exports = Service;
