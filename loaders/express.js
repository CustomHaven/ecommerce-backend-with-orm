const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
// const session = require('express-session');
// const { SESS } = require('../config');
const db = require('../db');
// const pgSession = require('connect-pg-simple')(session); // will be using sequelize one
// const flash = require('connect-flash');
const expressWinston = require('express-winston');
const loggers = require('../loggers');
const cookieParser = require("cookie-parser");

// console.log(require('crypto').randomBytes(64).toString('hex'));
module.exports = (app, express) => {

  db.authenticate()
    .then(() => loggers.info('Database connection has been established...'))
    .catch(err => loggers.error('Error ' + err));
  
  app.use(morgan('dev'));
  
  app.use(expressWinston.logger(loggers));

  app.set('view engine', 'ejs');

  // app.use(morgan('dev'));

  app.use(cors());

  // app.use(bodyParser.json());
  // app.use(bodyParser.urlencoded({ extended: true }));


  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: true
  }

  app.use(cookieParser(cookieOptions));
  // app.use(cookieParser());

  return app;
}