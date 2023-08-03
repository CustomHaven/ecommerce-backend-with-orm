const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { TOKEN } = require("../config");

const jwtVerify = (cookie, res, tokenType) => {
    let data; 
    
    if (tokenType === "refresh") {
        data = jwt.verify(cookie, TOKEN.REFRESH_TOKEN); 
    } else {
        data = jwt.verify(cookie, TOKEN.ACCESS_TOKEN); 
    }

    // console.log(data);

    res.locals.userIdRole = {
        id: data.id,
        role: data.roles.map(role => role)
    };
    res.locals.userId = data.id;
    res.locals.userRole = data.role;

    res.locals.Authorized = data.Authorized;

    return res;
}

const ensureNormalToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader.split(" ")[1] !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            req.token = token;

            console.log('req.headers["Login-Stage"]', req.headers["login-stage"]);

            if (req.headers["login-stage"] === "refresh") {
                // jwtVerify(tokenRefresh, res, "refresh");
                console.log("refresh side TOKEN", req.token);
                jwtVerify(req.token, res, "refresh");
            } else {
                // jwtVerify(tokenAccess, res, "access");
                console.log("access side TOKEN", req.token);
                jwtVerify(req.token, res, "access");
            }
            next();
        } else {
            throw createError(403, "Forbidden");
        }
    } catch (error) {
        next(error);
    }
}

const cookieJwtAuth = (req, res, next) => {
    try {
        // console.log("refresh_token??", req.cookies.refreshed_token);
        // console.log("req.token in cookie jwtauth full object of cookies", req.cookies);
        // console.log("req.token in cookie jwtauth access_token?", req.cookies.access_token);
        // console.log("req.token in cookie jwtauth access_token?", req.cookies.access_token);

        const tokenAccess = req.cookies.access_token ? req.cookies.access_token : null;
        const tokenRefresh = req.cookies.refreshed_token ? req.cookies.refreshed_token : null;

        if (tokenAccess === null && tokenRefresh === null) {
            throw createError(403, "Forbidden");
        }

        if (tokenAccess !== null) {
            jwtVerify(tokenAccess, res, "access");
        }

        if (tokenRefresh !== null) {
            jwtVerify(tokenRefresh, res, "refresh");
        }

        return next();
    } catch(error) {
        next(error);
    }
};

const ensureAdminToken = (req, res, next) => {
    try {
        const bearerHeader = req.headers["authorization"];
        if (bearerHeader.split(" ")[1] !== "undefined") {
            const bearer = bearerHeader.split(" ");
            const token = bearer[1];
            req.token = token;

            jwtVerify(req.token, res, "refresh");

            if (res.locals.userRole === "Administrator") {
                return next();
            }
            throw createError(401, "Unauthorized");
        } else {
            console.log("req.header was undefined");
            console.log(typeof bearerHeader);
            throw createError(401, "Unauthorized");
        }
    } catch (error) {
        next(error);
    }
}

const isAdmin = (req, res, next) => {
    console.log("THE ADMIN!?");
    console.log(req);
    console.log("REQ?W");

    console.log("LOOK AT COOKIES!");
    console.log(req.cookies);
    console.log("OEKKKKKKKKKK");
    console.log("look at headers");
    console.log(req.headers);
    console.log("look at headers DONE!");

    // console.log("isADMIN!");
    // const tokenAccess = req.cookies.access_token ? req.cookies.access_token : null;
    // const tokenRefresh = req.cookies.refreshed_token ? req.cookies.refreshed_token : null;

    if (!req.cookies.refreshed_token) {
        throw createError(401, "Unauthorized");
    }

    jwtVerify(req.cookies.refreshed_token, res, "refresh");
    // console.log("what", what);
    try {
        if (res.locals.userRole === "Administrator") {
            return next();
        }
        throw createError(401, "Unauthorized");
    } catch (error) {
        next(error);
    }
}

const accessGranted = (req, res, next) => {
    try {
        
    } catch (error) {
        
    }
}


module.exports = {
    cookieJwtAuth,
    isAdmin,
    jwtVerify,
    ensureAdminToken, // using these on cross-site where credential: "include" is not working
    ensureNormalToken // using these on cross-site where credential: "include" is not working
}