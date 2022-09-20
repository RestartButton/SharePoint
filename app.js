const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
var bodyParser = require('body-parser');
var serveStatic = require('serve-static');

require('dotenv').config();

app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const publicDirectory = path.join(__dirname, './client/assets');
app.use(serveStatic(publicDirectory));

var indexRouter = require('./routes/index-route');

app.use('/', indexRouter);

module.exports = app;