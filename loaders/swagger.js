const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');
const fs = require("fs");
const yaml = require("js-yaml");

const swaggerDocument = yaml.load(fs.readFileSync(path.resolve(__dirname, "../swagger.yaml"), "utf-8"));

// old when I used jsdoc inside the routes off V1
// const swaggerOptions = {
//   swaggerDefinition: {
//     openapi: '3.0.0',
//     info: {
//       title: 'Ecommerce Pern APP',
//       version: '1.0.0',
//       description: 'Open documention to the backend off the app',
//       license: {
//         name: 'MIT',
//         url: 'https://choosealicense.com/licenses/mit/',
//       }
//     },
//     schema: [
//       'http',
//       'https'
//     ],
//     servers: [
//       {
//         url: 'http://localhost:5000'
//       }
//     ],
//   },
//   apis: [`${path.resolve(__dirname, '../routes')}/*.js`]
// }


module.exports = (app) => {
  // Serves Swagger API documentation to /api-docs url
  // const specs = swaggerJsDoc(swaggerOptions) // old when i used jsdoc

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}