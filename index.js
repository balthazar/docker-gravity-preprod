'use strict';

require('dotenv').load();

var express = require('express');
var chalk = require('chalk');
var config = require('../config/environment');
var mongoose = require('mongoose');

console.log('DEBUG', config.mongo.uri, config.env);
mongoose.connect(config.mongo.uri, config.mongo.options);

var app = express();
var server = require('http').createServer(app);

require('../config/express')(app);
require('./routes')(app);

server.listen(config.port, config.ip, function () {

  console.log(
    chalk.red('Express server listening on port ')
    + chalk.yellow('%d')
    + chalk.red(', in ')
    + chalk.yellow('%s')
    + chalk.red(' mode.\n'),
    config.port,
    app.get('env')
  );

});

module.exports = server;
