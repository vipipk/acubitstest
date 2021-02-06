const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const passport = require('passport');
const routes = require('../api/routes/v1');
const strategies = require('./passport');
// const error = require('../api/middlewares/error');

/**
* Express instance
* @public
*/
const app = express();

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// secure apps by setting various HTTP headers
app.use(helmet());

app.use(cors());

// enable authentication
app.use(passport.initialize());
passport.use('jwt', strategies.jwt);

app.use('/docs', express.static('docs'));


// mount api v1 routes
app.use('/v1', routes);

// // if error is not an instanceOf APIError, convert it.
// app.use(error.converter);

// // catch 404 and forward to error handler
// app.use(error.notFound);

// // error handler, send stacktrace only during development
// app.use(error.handler);

module.exports = app;
