const cloudinary = require("cloudinary");
require('dotenv').config();
module.exports = {
  DB: {
    DIALECT: process.env.DB_DIALECT,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    DB: process.env.TEST === "test" ? process.env.DB_DB_TESTING : process.env.DB_DB,
    DB_URL: process.env.DB_SUP_URL
  },
  TOKEN: {
    ACCESS_TOKEN: process.env.ACCESS_TOKEN_SECRET,
    REFRESH_TOKEN: process.env.REFRESH_TOKEN_SECRET
  },
  PAYMENT: {
    STRIPE_SECRET: process.env.STRIPE_SKTEST,
    STRIPE_PUBLIC: process.env.STRIPE_PKTEST
  },
  HOST: process.env.HOST_URL,
  REMOVE_BG: process.env.REMOVE_BG_KEY,
  cloudinary: cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
    secure: true
  })
}