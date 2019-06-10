const express = require('express');
const error = require('../middleware/error');
const movie = require('../routes/movies');
const genre = require('../routes/genres');
const customer = require('../routes/customers');
const auth = require('../routes/auth');
const user = require('../routes/users');
const rental = require('../routes/rental');

module.exports = function (app) {
  app.use(express.json());
  app.use('/api/customers', customer);
  app.use('/api/genre', genre);
  app.use('/api/movies', movie);
  app.use('/api/rentals', rental);
  app.use('/api/users', user);
  app.use('/api/login', auth);
  app.use(error);
};