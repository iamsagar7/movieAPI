// process.env.NODE_CONFIG_DIR = './config/default';
const chalk = require('chalk');
const morgan = require('morgan');
const helmet = require('helmet');
const express = require('express');
const app = express();


require('./startup/logging');
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validate')();

app.get(express.static('public'));
app.get(helmet);

if (app.get('env') == 'development') {
  console.log('Morgan enabaled');
  app.get(morgan('tiny'));
}

// const port = process.env.PORT || 3000;
app.listen(5000, (err, done) => {
  if (err) console.log(chalk.red("Unable to connect to the port "));
  console.log(chalk.blue.bold("Sucessfully connected ..."));

});
module.exports = app;