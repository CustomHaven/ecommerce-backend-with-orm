const cors = require("cors");
const morgan = require("morgan");
// const session = require("express-session");
// const { SESS } = require("../config");
const db = require("../db");
const { FRONTEND, HOST } = require("../config");
// const pgSession = require("connect-pg-simple")(session); // will be using sequelize one
// const flash = require("connect-flash");
const expressWinston = require("express-winston");
const loggers = require("../loggers");
const cookieParser = require("cookie-parser");

// console.log(require("crypto").randomBytes(64).toString("hex"));
module.exports = (app, express) => {

  db.authenticate()
    .then(() => loggers.info("Database connection has been established..."))
    .catch(err => loggers.error("Error " + err));
  
  app.use(morgan("dev"));
  
  app.use(expressWinston.logger(loggers));

  app.use(express.static("public"));
  app.set("view engine", "ejs");

  const corsWhitelist = ["http://localhost:3000", "http://localhost:5000", FRONTEND];
  const corsOptions = {
    origin: (originReq, callback) => { // Access-Control-Allow-Origin
      if (corsWhitelist.indexOf(originReq) !== -1) {
        return callback(null, true);
      } else {
        return callback(null, false); // disable CORS for this request
      }
    },
    credentials: true, //Access-Control-Allow-Credentials: true
    optionsSuccessStatus: 200,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"],
    allowedHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Access-Control-Allow-Credentials", "Access-Control-Allow-Methods", "X-Requested-With", "Content-Type", "Accept", "Authorization", "Login-Stage", "Cookie"],
  };

  app.use(cors(corsOptions));

  app.use(express.json());

  app.use(express.urlencoded({ extended: true }));

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production" ? true : false,
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    // domain: FRONTEND
  }

  app.use(cookieParser(cookieOptions));
  // app.use(cookieParser());

  return app;
}