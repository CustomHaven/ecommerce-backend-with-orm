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
    loggers.info("STATUS ERROR CHECK onn loggers.http!!!!!!");
    loggers.http(status);
    loggers.info("MESSAGE ERROR CHECK onn loggers.error!!!!!");
    loggers.error(message)
    loggers.info("err OF the START CHECKING ERROR CHECK onn loggers.info!!!!!!");
    // loggers.info(err);
    loggers.info("ALL ERRORS FULLY CHECKED!!!!!!!");
    return res.status(status === undefined ? 500 : status).send({ message });
  });
  return app
}