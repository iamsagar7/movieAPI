const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const {
  User
} = require('./../models/user');
const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
  const {
    error
  } = validateLogin(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) return res.status(400).send('We got an invalid username or password')


  const password = await bcrypt.compare(req.body.password, user.password);
  if (!password) return res.status(400).send('We got an invalid username or password');
  var token = await user.generateAuthToken();
  res.send(token);
});

function validateLogin(auth) {
  var schema = {
    password: Joi.string().required(),
    email: Joi.string().required().regex(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/)
  };
  return Joi.validate(auth, schema);
}
module.exports = router;