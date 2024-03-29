const bcrypt = require('bcryptjs');
const AuthService = require("../services/authService");
const authService = new AuthService(); 
const jwtGenerator = require('../utils/jwtGenerator');
const createError = require("http-errors");
const loggers = require("../loggers");
const { FRONTEND, HOST } = require("../config");


module.exports = {
    practise: async (req, res, next) => {
        try {
            if (!req.body.password || !req.body.email) {
                res.sendStatus(400);
                return
            }
        
            // const userQuery = await authService.addUser(req.body.email);
            return res.status(200).send({userId: userQuery.id})   
        } catch (error) {
            next(error);
        }
    },

    loginRoute: async (req, res, next) => {
        try {
            loggers.info("WE ARE IN THE LOGGING ROUTE!!");
            req.body.password = String(req.body.password);

            const userQuery = await authService.loginByEmail(req.body.email, req.body.password);

            const user = {
                id: userQuery.id, role: userQuery.is_admin ? "Administrator" : "User", email: userQuery.email, Authorized: true,
                roles: userQuery.Roles.map(role => role.name)
            }

            const refreshToken = await AuthService.createRefreshToken(userQuery);
            // const user = {};
            // // if (userQuery.guest === true) {
            // user.id = userQuery.id; 
            // user.role = userQuery.is_admin ? "Administrator" : "User";
            // user.email = userQuery.email; 
            // user.Authorized = true;
            // // }
            if (userQuery.guest === false) {
                const compare = await bcrypt.compare(req.body.password, userQuery.password);

                if (!compare) { throw createError(401, "Incorrect password."); }
            }

            const token = jwtGenerator(user, "access", "10s"); // access_token
            // const refreshToken = jwtGenerator(user, "refresh", "7d");

            loggers.info("LOGIN LOOK!!!!!!!!!!!!!!!!!!!!!!!!!");
            loggers.info(FRONTEND);
            loggers.info("LOGIN FINSIHED!!!!!!!!!!!!!!!!!!!!!");
            // __cf_bm

            if (req.body.frontend) {
                return res
                    .cookie("token_id", refreshToken, { origin: true, httpOnly: true, maxAge: 10000, sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", secure: process.env.NODE_ENV === "production" ? true : false })
                    .cookie("access_token", token, { origin: true, httpOnly: true, maxAge: 10000, sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", secure: process.env.NODE_ENV === "production" ? true : false })
                    .status(200)
                    .json({
                        user: user, access_token: token, refresh_token: refreshToken,
                        expiration: 10
                    });
            } else {
                return res
                // .cookie("__cf_bm", "", { origin: true, httpOnly: true, domain: ".api-custom-ecommerce-pern.onrender.com", maxAge: 1000, sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", secure: process.env.NODE_ENV === "production" ? true : false })
                .cookie("token_id", refreshToken, { origin: true, httpOnly: true, maxAge: 10000, sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", secure: process.env.NODE_ENV === "production" ? true : false })
                .cookie("access_token", token, { origin: true, httpOnly: true, maxAge: 10000, sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", secure: process.env.NODE_ENV === "production" ? true : false })
                .status(200)
                .json({ message: "Logged in successfully 😊 👌", user, token, refresh_token: refreshToken });
            }

        } catch (error) {
            next(error);
            // throw error
        }
    },

    logoutRoute: async (req, res, next) => {
        try {
            loggers.info("NODEJS!! LOGOUT!! BEGIN!!!");
            loggers.info("req.cookies.token_id START! req.cookies.token_id START! req.cookies.token_id START!!!");
            loggers.info(req.cookies.token_id);
            loggers.info("req.cookies.token_id DONE! req.cookies.token_id DONE! req.cookies.token_id DONE!!!");

            loggers.info("req.cookies.refreshed_token START! req.cookies.refreshed_token START! req.cookies.refreshed_token START!!!");
            loggers.info(req.cookies.refreshed_token);
            loggers.info("req.cookies.refreshed_token END! req.cookies.refreshed_token END! req.cookies.refreshed_token END!!!");


            loggers.info("req.cookies.access_token START! req.cookies.access_token START! req.cookies.access_token START!!!");
            loggers.info(req.cookies.access_token);
            loggers.info("req.cookies.access_token END! req.cookies.access_token END! req.cookies.access_token END!!!");

            loggers.info("LOGOUT!! FINSH!!!");

            loggers.info("checking if req.headers[\"Cookie\") is with us");
            loggers.info(req.headers["cookie"]);
            loggers.info("checking if req.headers[\"Cookie\") is with us AND THE VALUE WE FOUND!");

            if (req.cookies.access_token) {
                res.clearCookie("access_token");
            }
            if (req.headers["cookie"]) {
                await AuthService.removeRefreshToken(req.headers["cookie"]);
            }
            if (req.cookies.refreshed_token) {
                res.clearCookie("refreshed_token");
            }
            if (req.cookies.token_id) {
                await AuthService.removeRefreshToken(req.cookies.token_id);
                res.clearCookie("token_id");
            }
            return res.status(200).json({ message: "Successfully logged out 😏 🍀" });
            // return res.sendStatus(204);
        } catch (error) {
            next(error);
        }
    },

    protectedRoute: async (req, res, next) => {
        try {
            res.status(200).send({ user: { id: req.userId, role: req.userRole, token: req.cookies.access_token } });
        } catch (error) {
            next(error);
        }
    },

    refreshRoute: async (req, res, next) => {
        try {
            console.log("INSIDE THE REFRESHROUTE");
            res.clearCookie("access_token");
            const tokenId = req.body.refresh_token;

            const getToken = await AuthService.findToken(tokenId);
            const user = await authService.findOneUser(getToken.user_id);

            await AuthService.tokenExpiration(getToken.token);

            const userDone = {
                id: user.id, role: user.is_admin ? "Administrator" : "User", email: user.email, Authorized: true,
                roles: user.Roles.map(role => role.name), token: tokenId
            }

            const expirationTime = Math.floor(Math.abs(new Date() - getToken.expiry_date) / 1000);

            loggers.info("expirationTime START!!!!!!!!!!");
            loggers.info(expirationTime);
            loggers.info("expirationTime DONE!!!!!!!!!!!");

            const token = jwtGenerator(userDone, "refresh", expirationTime); 

            loggers.info("REFRESH LOOK!!!!!!!!!!!!!!!!!!!!!!!!!");
            loggers.info(FRONTEND);

            loggers.info("process.env.NODE_ENV!! LOOK");
            loggers.info(process.env.NODE_ENV);
            loggers.info("REFRESH FINSIHED!!!!!!!!!!!!!!!!!!!!!");

            loggers.info("expirationTime START!!!!!!!!!!");
            loggers.info(expirationTime);
            loggers.info("expirationTime DONE!!!!!!!!!!!");


            if (req.body.frontend) {
                res
                    .cookie("token_id", tokenId, { httpOnly: true, maxAge: expirationTime * 1000, sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", secure: process.env.NODE_ENV === "production" ? true : false })
                    .cookie("refreshed_token", token, { httpOnly: true, maxAge: expirationTime * 1000, sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", secure: process.env.NODE_ENV === "production" ? true : false })
                    .status(200).json({
                        user: userDone, token: getToken.token, refresh_token: token,
                        expiration: expirationTime
                    });
            } else {
                return res
                // .cookie("__cf_bm", "", { origin: true, httpOnly: true, domain: ".api-custom-ecommerce-pern.onrender.com", maxAge: 1000, sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", secure: process.env.NODE_ENV === "production" ? true : false })
                .cookie("token_id", tokenId, { httpOnly: true, maxAge: expirationTime * 1000, sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", secure: process.env.NODE_ENV === "production" ? true : false })
                .cookie("refreshed_token", token, { httpOnly: true, maxAge: expirationTime * 1000, sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", secure: process.env.NODE_ENV === "production" ? true : false })
                .status(200).json({ user: userDone, token: getToken.token, refresh_token: tokenId });
            }


            // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        } catch (error) {
            next(error);
        }
    }
}