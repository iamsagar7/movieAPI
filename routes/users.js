const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
_ = require('lodash');
const {
  User,
  validateUser
} = require('./../models/user');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const user = await User.find();
  res.send(user);
});

router.post('/', async (req, res) => {
  const {
    error
  } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email
  });
  if (user) return res.status(400).send('User already registered');

  user = await new User(_.pick(req.body, ['name', 'password', 'email']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt)
  await user.save();

  var token = await user.generateAuthToken();
  res.header('x-auth-token', token).send(_.pick(user, ["_id", 'name', 'email']));

});
router.put('/:id', async (req, res) => {
  const {
    error
  } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findById(req.params.id);
  if (!user) return res.status(400).send("User not found ..");
  try {
    const user = await User.findByIdAndUpdate(req.params.id,
      (_.pick(req.body, ['name', 'password', 'email'])), {
        new: true
      });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    res.send(_.pick(user, ['_id', 'name', 'email']));
  } catch (err) {
    return res.send('User not found');
  }



});
module.exports = router;