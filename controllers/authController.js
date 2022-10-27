const bcrypt = require('bcryptjs');
const AuthService = require("../services/authService");
const authService = new AuthService(); 
const jwtGenerator = require('../utils/jwtGenerator');
const createError = require("http-errors");


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

            req.body.password = String(req.body.password);
            console.log(req.body.password);

            // db query trying to force a sinon.stub to resolve a fake value. But code wont pass here hence 500 error
            const userQuery = await authService.findByEmail(req.body.email);
            console.log(userQuery);
            console.log(userQuery.password);
            console.log(req.body.password);

            const compare = await bcrypt.compare(req.body.password, userQuery.password);
            console.log("compare");
            console.log(compare);
            console.log("compare");

            if (!compare) { throw createError(401, 'Incorrect password.'); }

            const user = {
                id: userQuery.id, role: userQuery.is_admin ? "Administrator" : "User", email: userQuery.email, Authorized: true
            }

            const token = jwtGenerator(user);

            return res
                .cookie("access_token", token, { httpOnly: true, secure: process.env.NODE_ENV === "production", })
                .status(200)
                .json({ message: "Logged in successfully 😊 👌", user, token });

        } catch (error) {
            next(error);
            // throw error
        }
    },

    logoutRoute: async (req, res, next) => {
        try {
            return res.clearCookie("access_token").status(200).json({ message: "Successfully logged out 😏 🍀" });
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
    }

}