const cors = require("cors");
const loggers = require("../loggers");
const { FRONTEND } = require("../config");

const corsWhitelist = ["http://localhost:3000", "http://localhost:5000", FRONTEND];

const corsOptions = {
    origin: (originReq, callback) => { // Access-Control-Allow-Origin
        loggers.info("INSIDE CORSOPTIONS!!!! originReq!YES!!!!!");
        loggers.info(originReq); // the origin website name
        if (corsWhitelist.indexOf(originReq) !== -1) {
            callback(null, true);
            // return callback(null, true); // reflect (enable) the requested origin in the CORS response
        } else {
            callback(null, false); // disable CORS for this request
        }
    },
    // origin: ["http://localhost:3000", FRONTEND],
    // origin: "https://custom-haven-ecommerce.vercel.app",
    credentials: true, //Access-Control-Allow-Credentials: true
    optionsSuccessStatus: 200,
    preflightContinue: true,
    allowHeaders: ["Access-Control-Allow-Origin", "Access-Control-Allow-Headers", "Access-Control-Allow-Methods", "X-Requested-With", "Content-Type", "Accept"],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
};

module.exports = cors(corsOptions);
