const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const { TOKEN } = require("../config");

const jwtVerify = (cookie, res) => {
    const data = jwt.verify(cookie, TOKEN);

    res.locals.userIdRole = {
        id: data.id,
        role: data.role
    };
    res.locals.userId = data.id;
    res.locals.userRole = data.role;

    res.locals.Authorized = data.Authorized;

    return res;
}

const cookieJwtAuth = (req, res, next) => {
    try {
        const token = req.cookies.access_token;

        if (!token) {
            throw createError(403, "Forbidden");
        }

        jwtVerify(token, res);

        return next();
    } catch(error) {
        next(error);
    }
};

const isAdmin = (req, res, next) => {

    if (!req.cookies.access_token) {
        throw createError(401, "Unauthorized");
    }

    jwtVerify(req.cookies.access_token, res);

    try {
        if (res.locals.userRole === "Administrator") {
            return next();
        }
        throw createError(401, "Unauthorized");
    } catch (error) {
        next(error);
    }
}


module.exports = {
    cookieJwtAuth,
    isAdmin
}