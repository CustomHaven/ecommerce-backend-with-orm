const fs = require('fs');
const path = require('path');
const { DataTypes, Sequelize, literal } = require('sequelize');
const db = require('../db');
const basename = path.basename(__filename);
const Models = {};

// db.query()
// select * from pg_sequences;
db.beforeSync(async () => {
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
Models.Sequelize = Sequelize

module.exports = Models;