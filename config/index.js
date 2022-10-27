require('dotenv').config();
module.exports = {
  DB: {
    DIALECT: process.env.DB_DIALECT,
    USER: process.env.DB_USER,
    PASS: process.env.DB_PASS,
    HOST: process.env.DB_HOST,
    PORT: process.env.DB_PORT,
    DB: process.env.TEST === "test" ? process.env.DB_DB_TESTING : process.env.DB_DB,
    DB_URL: process.env.DB_URL_BIT
  },
  TOKEN: process.env.TOKEN_SECRET,
  PAYMENT: {
    STRIPE_SECRET: process.env.STRIPE_SKTEST,
    STRIPE_PUBLIC: process.env.STRIPE_PKTEST
  },
  HOST: process.env.HOST_URL
}