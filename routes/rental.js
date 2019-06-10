const Fawn = require('fawn');
const {
  Rental,
  rentalValidate
} = require('./../models/rental');
const {
  Movie
} = require('./../models/movie');
const {
  Customer
} = require('./../models/customer')
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  let rental = await Rental.find();
  res.send(rental);
});
router.post('/', async (req, res) => {
  const {
    error
  } = rentalValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  var customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send("Is your customer Id valid");

  var movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie Id');

  if (movie.numberInStock === 0) return res.status(400).send("we are out of stock");

  let rental = await new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone

    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }

  });
  new Fawn.Task()
    .save('rentals', rental)
    .update('movies', {
      _id: movie._id
    }, {
      $inc: {
        numberInStock: -1
      }
    })
    .run();

  res.send(rental);

});

module.exports = router;