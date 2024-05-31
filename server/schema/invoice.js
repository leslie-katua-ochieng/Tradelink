const mongoose = require('mongoose');

const invoiceSchema = new mongoose.Schema({
    name: String,
    status: String,
    rating: Number,
    price: Number
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = Invoice;