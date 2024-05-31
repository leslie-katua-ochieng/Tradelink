const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Readable } = require('stream');
module.exports = router ;

const Service = require('../schema/services');
const Provider = require('../schema/providers');
const Order = require('../schema/orders');
const Invoice = require('../schema/invoice');
const Checkout = require('../schema/checkout');
const upload = multer()


// Create a service
router.post('/services', upload.single('img'), async (req, res) => {
  const { name, description, price, contact, latitude, longitude, area } = req.body;

  try {
      const service = new Service({
          name,
          description,
          price,
          img: req.file.buffer,
          contact,
          location: {
              latitude: parseFloat(latitude),
              longitude: parseFloat(longitude)
          }, 
          area
      });
      await service.save();
      res.send(service);
  } catch (error) {
      console.log(error);
      res.status(500).send(error);
  }
});


router.get('/services', async (req, res) => {
    try {
      const services = await Service.find({});
      res.send(services);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

// Update a service
router.put('/services/:id', async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
  
    try {
      const service = await Service.findByIdAndUpdate(id, { name, description, price }, { new: true });
      res.send(service);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });

// Delete a service
router.delete('/services/:id', async (req, res) => {
    const { id } = req.params;
  
    try {
      const service = await Service.findByIdAndDelete(id);
      res.send(service);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
  });


// Create a provider
router.post('/providers', upload.single('img'), async (req, res) => {
  const {businessname, shortdescription, description, address, orders, contact, rating, img} = req.body;

  try {
    const provider = new Provider({
      businessname, shortdescription, description, address, orders, contact, rating, img:req.file.buffer
    });
    await provider.save();
    res.send(provider);
  } catch (error) {
      console.log(error);
      resizeBy.status(500).send(error);
  }
})

// Get providers
router.get('/providers', async (req, res) => {
  try {
    const providers = await Provider.find({});
    res.send(providers);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});


router.post('/orders', async (req, res) => {
  const {  name, price } = req.body.orders;
  try {
      // Create a new order instance
      const order = new Order({  name, price });

      // Save the order to the database
      await order.save();
      res.send(order);
  } catch (error) {
    console.log(error);
    resizeBy.status(500).send(error);
  }
});


router.post('/checkout', async (req, res) => {
  try {
    const { firstName, lastName, email, phoneNumber, address, cart, totalPrice } = req.body;

    const newCheckout = new Checkout({
      firstName,
      lastName,
      email,
      phoneNumber,
      address,
      cart,
      totalPrice,
      status: 'pending' // Set default status to pending
    });

    await newCheckout.save();

    res.status(201).json({ message: 'Checkout successful', checkout: newCheckout });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

router.get('/checkout', async (req, res) => {
  try {
    const checkout = await Checkout.find({});
    res.send(checkout);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
});

router.put('/checkout/:id', async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedCheckout = await Checkout.findByIdAndUpdate(id, { status }, { new: true });
    res.json({ message: 'Checkout status updated successfully', checkout: updatedCheckout });
  } catch (error) {
    console.error('Error updating checkout status:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
