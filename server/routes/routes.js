const express = require("express");
const router = express.Router();
const multer = require("multer");
const { Readable } = require('stream');
module.exports = router ;

const Service = require('../schema/services');
const Provider = require('../schema/providers');

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



