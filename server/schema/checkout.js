const mongoose = require('mongoose');

const CartItemSchema = new mongoose.Schema({
    name: { type: String },
    price: { type: Number },
});

const CheckoutSchema = new mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    cart: [CartItemSchema],
    totalPrice: { type: Number },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' }, // Add status field
    createdAt: { type: Date, default: Date.now },
});

const Checkout = mongoose.model('Checkout', CheckoutSchema);

module.exports = Checkout;
