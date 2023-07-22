const cors = require("cors");
const loggers = require("../loggers");
const { FRONTEND } = require("../config");

const corsWhitelist = ["http://localhost:3000", "http://localhost:5000", FRONTEND];
// 
const corsOptions = {
    origin: (originNow, callback) => {
        loggers.info("INSIDE CORSOPTIONS!!!! originNow!YES!!!!!");
        loggers.info(originNow);
        // loggers.info("INSIDE CORSOPTIONS!!!! originNow!!!!!");
        // loggers.info(originNow.header());;
    // 
        if (corsWhitelist.indexOf(originNow) !== -1) {
            return callback(null, true); // reflect (enable) the requested origin in the CORS response
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
