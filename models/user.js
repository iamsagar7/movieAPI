const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,

  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  isAdmin: Boolean,
  // roles: [],
  // operations:[]
});
userSchema.methods.generateAuthToken = function () {
  return jwt.sign({
    _id: this._id,
    isAdmin: this.isAdmin
  }, congif.get('jwtPrivateKey'));
};
const User = mongoose.model('User', userSchema);

function validateUser(user) {
  var schema = {
    name: Joi.string().required().regex(/^@/),
    id: Joi.objectId(),
    password: Joi.string().required(),
    email: Joi.string().required().regex(/^[a-z0-9](\.?[a-z0-9]){5,}@g(oogle)?mail\.com$/)
  };
  return Joi.validate(user, schema);
}
exports.User = User;
exports.validateUser = validateUser;