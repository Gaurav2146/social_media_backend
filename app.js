const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');

require('dotenv').config({ path: path.join(__dirname, '.env') });

const { cors, errorHandler } = require('./middleware');

// eslint-disable-next-line node/no-unpublished-require
require('./src/db/connection');

const indexRouter = require('./src/index');

const app = express();

// some middlewares for security concerns
app.use(helmet());

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

cors(app);
// if (process.env.NODE_ENV !== 'dev') {
//   csrf(app);
// }

// set static path
app.use(express.static(path.join(__dirname, 'public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// routes files define

app.use('/', indexRouter);

errorHandler(app);

module.exports = app;
