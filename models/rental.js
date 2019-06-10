const mongoose = require('mongoose');
const Joi = require('joi');

const rentalSchema = new mongoose.Schema({
  customer: {
    type: new mongoose.Schema({
      name: {
        type: String,
        min: 5,
        max: 30,
        required: true,
      },
      isgold: {
        type: Boolean,
        default: false
      },
      phone: {
        type: Number,
        required: true,
        min: 7,

      }
    })
  },
  movie: {
    type: new mongoose.Schema({
      title: {
        type: String,
        min: 3,
        required: true
      },
      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255
      }
    })
  },
  dateOut: {
    type: Date,
    default: Date.now,
    required: true
  },
  dateReturned: {
    type: Date
  },
  rentalFee: {
    type: Number,
    min: 0
  }
});
const Rental = mongoose.model('Rental', rentalSchema);

function rentalValidate(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(rental, schema);
}
exports.Rental = Rental;
exports.rentalValidate = rentalValidate;