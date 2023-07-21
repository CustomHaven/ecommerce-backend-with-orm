const fs = require('fs');
const path = require('path');
const { DataTypes, Sequelize, literal } = require('sequelize');
const db = require('../db');
const basename = path.basename(__filename);
const Models = {};

// db.query()
// select * from pg_sequences;
db.beforeSync(async () => {

  // Delete all tables for help with connecting correctly to the production DB address!
  // await db.query("DROP TABLE IF EXISTS users CASCADE");
  // await db.query("DROP TABLE IF EXISTS roles CASCADE");
  // await db.query("DROP TABLE IF EXISTS refresh_tokens CASCADE");
  // await db.query("DROP TABLE IF EXISTS user_roles CASCADE");
  // await db.query("DROP TABLE IF EXISTS contact_details CASCADE");
  // await db.query("DROP TABLE IF EXISTS products CASCADE");
  // await db.query("DROP TABLE IF EXISTS product_images CASCADE");
  // await db.query("DROP TABLE IF EXISTS orders CASCADE");
  // await db.query("DROP TABLE IF EXISTS order_list CASCADE");
  // await db.query("DROP TABLE IF EXISTS carts CASCADE");
  // await db.query("DROP TABLE IF EXISTS cart_list CASCADE");
  // await db.query("DROP TABLE IF EXISTS payment_details CASCADE");
  // await db.query("DROP TABLE IF EXISTS session CASCADE");
  // await db.query("DROP TABLE IF EXISTS product_banner_images CASCADE");

  // await db.query("DROP SEQUENCE IF EXISTS order_seq CASCADE");
  // await db.query("DROP SEQUENCE IF EXISTS user_seq CASCADE");
  // await db.query("DROP SEQUENCE IF EXISTS prod_seq CASCADE");

  await db.query('CREATE SEQUENCE IF NOT EXISTS user_seq INCREMENT 1');
  await db.query('CREATE SEQUENCE IF NOT EXISTS prod_seq INCREMENT 1');
  await db.query('CREATE SEQUENCE IF NOT EXISTS order_seq INCREMENT 1');
});

fs.readdirSync(__dirname)
  .filter(file => file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js')
  // .map(arra => arra.replace(/^\w|\-\w/g, text => text.toUpperCase()))
  // .map(a => a.replace(/[-]|model|\.js$/gi, ''))
  // .map(l => l.replace(/s$/, ''))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(db, DataTypes, literal);
    Models[model.name] = model;
});

Object.keys(Models).forEach(modelName => {
  if (Models[modelName].associate) {
    Models[modelName].associate(Models)
  }
});




Models.sequelize = db.sync({ alter: true });
Models.Sequelize = Sequelize;

module.exports = Models;