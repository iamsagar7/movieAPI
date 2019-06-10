const {
  Movie,
  movieValidate
} = require('./../models/movie');
const {
  Genre
} = require('./../models/genre');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  const movie = await Movie.find().populate('genre');
  res.send(movie);


});

router.post('/', async (req, res) => {
  const {
    error
  } = movieValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId).populate('genre');
  if (!genre) return res.status(404).send("We got stucked at genra");

  let movie = await new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate

  });
  await movie.save();
  res.send(movie);

});
router.put('/:id', async (req, res) => {
  const {
    error
  } = movieValidate(req.body);
  if (error) return res.status(404).send(error.details[0].message);

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send('Invalid genre.');

  let movie = await Movie.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate
  }, {
    new: true
  });
  movie = await movie.save();
  res.send(movie);
});
router.delete("/:id", async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  res.send(movie);


})
module.exports = router;