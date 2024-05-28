const mongoose = require('mongoose');

const providerSchema = new mongoose.Schema({
    businessname: String,
    img: Buffer,
    shortdescription: String,
    description: String,
    address: String,
    orders: Number,
    contact: String,
    rating: Number,
    password: String,
    email: String
});

const Provider = mongoose.model('Provider', providerSchema);

module.exports = Provider;