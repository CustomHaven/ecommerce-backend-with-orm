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

const isAdmin = (req, res, next) => {

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
    jwtVerify
}