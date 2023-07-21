const cors = require('cors');
const morgan = require('morgan');
// const session = require('express-session');
// const { SESS } = require('../config');
const db = require('../db');
const { FRONTEND } = require("../config")
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
  
  if (process.env.NODE_ENV !== "production") {
    app.use(morgan('dev'));
  } else {
    app.use(morgan("tiny"));
  }
  
  app.use(expressWinston.logger(loggers));

  app.set('view engine', 'ejs');

  // app.use(morgan("dev"));

  const corsWhitelist = ["http://localhost:3000", "http://localhost:5000", FRONTEND];

  const corsOptions = {
    origin: (originNow, callback) => {
      loggers.info("INSIDE CORSOPTIONS!!!! originNow!YES!!!!!");
      loggers.info(originNow);
      // loggers.info("INSIDE CORSOPTIONS!!!! originNow.header!YES!!!!!");
      // loggers.info(originNow.header());
      // loggers.info('INSIDE CORSOPTIONS!!!! originNow.header("Origin")!YES!!!!!');
      // loggers.info(originNow.header("Origin"));
      // loggers.info("INSIDE CORSOPTION!!! IT IS DONE!?");

      if (corsWhitelist.indexOf(originNow) !== -1) {
        callback(null, true); // reflect (enable) the requested origin in the CORS response
      } else {
        callback(null, false); // disable CORS for this request
      }
    },
    // origin: ["http://localhost:3000", "http://localhost:5000", FRONTEND],
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
    allowHeaders: ["Content-Type", "Accept"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  };

  app.options("*", cors(corsOptions));
  // app.use(cors());
  app.use(cors(corsOptions));

  // app.all('*', cors(corsOptions));

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