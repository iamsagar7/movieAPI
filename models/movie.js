const mongoose = require('mongoose');
const Joi = require('joi');
const {
  Genre
} = require('./genre');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    lowercase: true,

  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'

  },
  numberInStock: {
    type: Number,
    default: 0
  },
  dailyRentalRate: {
    type: Number,
    default: 0
  }
});
const Movie = mongoose.model("Movie", movieSchema);

function movieValidate(name) {
  const Schema = {
    title: Joi.string().min(5).required(),
    genreId: Joi.ObjectId().required(),
    numberInStock: Joi.number().default(0).required(),
    dailyRentalRate: Joi.number().default(0).required()
  };
  return Joi.validate(name, Schema);
}
exports.Movie = Movie;
exports.movieValidate = movieValidate;