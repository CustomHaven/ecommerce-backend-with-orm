const buildDevLogger = require("./dev-logger.js");
const buildProdLogger = require("./prod-logger.js");

let logger = null;

if (process.env.NODE_ENV === 'production') {
    logger = buildProdLogger();
} else {
    logger = buildDevLogger();
}


module.exports = logger;