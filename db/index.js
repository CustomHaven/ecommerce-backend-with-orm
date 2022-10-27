const { Sequelize } = require('sequelize');
const logger = require('../loggers');
const { DB } = require('../config');
const process = require("process");

// // Override timezone formatting /// OR USE HOOKS INSIDE THE INDIVIDUAL MODELS
// Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
//   date = this._applyTimezone(date, options);

//   // Z here means current timezone, _not_ UTC
//   // return date.format('YYYY-MM-DD HH:mm:ss.SSS Z');
//   return date.format('YYYY-MM-DD HH:mm:ss Z');
// };

let db;
if (process.env.NODE_ENV === "production") {
  db = new Sequelize(DB.DB_URL, {
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  });
} else {
  db = new Sequelize(`${DB.DIALECT}://${DB.USER}:${DB.PASS}@${DB.HOST}:${DB.PORT}/${DB.DB}`, {
    // logging: msg => logger.debug(msg)
    logging: false
  }) // Example for postgres
}

module.exports = db;