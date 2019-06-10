const Fawn = require('fawn');
const mongoose = require('mongoose');


module.exports = function () {
  Fawn.init(mongoose);
  mongoose.set('useCreateIndex', true);
  mongoose.connect('mongodb://localhost/data', {
      useNewUrlParser: true
    })
    .then(() => console.log("Mongo database connected ..."))

};