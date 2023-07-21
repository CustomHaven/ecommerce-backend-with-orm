const bcrypt = require('bcryptjs');
const AuthService = require("../services/authService");
const authService = new AuthService(); 
const jwtGenerator = require('../utils/jwtGenerator');
const createError = require("http-errors");
const loggers = require("../loggers");


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

            return res
                .cookie("token_id", refreshToken, { origin: true, httpOnly: true, secure: process.env.NODE_ENV === "production" })
                .cookie("access_token", token, { origin: true, httpOnly: true, secure: process.env.NODE_ENV === "production" })
                .status(200)
                .json({ message: "Logged in successfully 😊 👌", user, token, refresh_token: refreshToken });

        } catch (error) {
            next(error);
            // throw error
        }
    },

    logoutRoute: async (req, res, next) => {
        try {
            res.clearCookie("access_token");
            await AuthService.removeRefreshToken(req.cookies.token_id);
            res.clearCookie("refreshed_token");
            res.clearCookie("token_id");
            // return res.status(200).json({ message: "Successfully logged out 😏 🍀" });
            return res.sendStatus(204);
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

            const token = jwtGenerator(userDone, "refresh", expirationTime); 

            return res
                .cookie("token_id", tokenId, { origin: true, httpOnly: true, secure: process.env.NODE_ENV === "production" })
                .cookie("refreshed_token", token, { origin: true, httpOnly: true, secure: process.env.NODE_ENV === "production" })
                .status(200).json({ user: userDone, token: getToken.token, refresh_token: tokenId });

            // res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
        } catch (error) {
            next(error);
        }
    }
}