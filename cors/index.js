const cors = require("cors");
const loggers = require("../loggers");
const { FRONTEND } = require("../config");

const corsWhitelist = ["http://localhost:3000", "http://localhost:5000", FRONTEND];

const corsOptions = {
    origin: (originReq, callback) => { // Access-Control-Allow-Origin
        loggers.info("INSIDE CORSOPTIONS!!!! originReq!YES!!!!!");
        loggers.info(originReq); // the origin website name
        if (corsWhitelist.indexOf(originReq) !== -1) {
            // return callback(null, true); // reflect (enable) the requested origin in the CORS response
            return true;
        } else {
            return callback(null, false); // disable CORS for this request
        }
    },
    // origin: ["http://localhost:3000", "http://localhost:5000", FRONTEND],
    credentials: true, //Access-Control-Allow-Credentials: true
    optionSuccessStatus: 200,
    allowHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods", "X-Requested-With", "Content-Type", "Accept"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

module.exports = cors(corsOptions);
