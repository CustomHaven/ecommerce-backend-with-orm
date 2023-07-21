const expressLoader = require('./express');
const routeLoaderV1 = require('../routes');
const expressWinston = require('express-winston');
const loggers = require('../loggers');
const swaggerLoader = require('./swagger');

module.exports = async (app, express) => {
  await expressLoader(app, express);
  // app.use('/api/v1', routeLoaderV1);

  await routeLoaderV1(app);


  // Load Swagger
  await swaggerLoader(app);



  // app.use(expressWinston.errorLogger(loggers))
  app.use((err, req, res, next) => {
    const { message, httpStatusCode, code, status, statusCode } = err;
    // console.log(err)
    loggers.http(status);
    loggers.error(message)
    loggers.http(err);
    return res.status(status === undefined ? 500 : status).send({ message });
  });
  return app
}