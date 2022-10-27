const express = require('express');
const loggers = require('./loggers');
const loaders = require('./loaders');
const app = express();
const PORT = process.env.PORT || 5000;
const allModels = require('./models');
const { HOST } = require("./config");
// Crypto we are using to generate the secret string to use for JWT
// const crypto = require('crypto').randomBytes(64).toString('hex');

module.exports = app;
async function startServer () {
// To send app as a prop to an entire directory we need a index.js to handle all the js files in the directory and send the prop to the others
    // app.use(express.static(__dirname + '/public'));

  // Just to generate the token_secret for JWT
  // console.log(crypto);
  allModels
  loaders(app, express);

  // this condition is here for testing purposes
  if (!module.parent) {
    if (process.env.NODE_ENV !== "production") {
      app.listen(PORT, () => {
        loggers.info(`Server is listening on port #${PORT} http://localhost:${PORT}/api-docs`);
      });//
    } else {
      app.listen(PORT, () => {
        loggers.info(`Server is listening on port ${HOST}#${PORT}`);
      });//
    }
  }
}
startServer();