const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.Console({
      colorize: true,
      prettyPrint: true
    }),
    new winston.transports.File({
      filename: 'log/exceptions.log'
    }));
  process.on('unhandledRejection', (ex) => {
    throw ex;
  });


  winston.add(new winston.transports.File({
    filename: 'log/logFile.log',
    format: winston.format.json()
  }));
  winston.add(new winston.transports.MongoDB({
    db: 'mongodb://localhost/data',
    handleExceptions: true
  }));
};