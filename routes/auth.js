const authController = require('../controllers/authController');
const { cookieJwtAuth } = require("../middleware/cookieJWTAuth");
const validInfo = require("../middleware/validInfo.js");
const router = require('express').Router();
const corsMiddleware = require("../cors");

module.exports = (app) => {
    app.use("/api/v2/auth", router);

    router.all("*",corsMiddleware, (req, res, next) => next());
    router.post("/users", authController.practise);

    router.post("/login", validInfo, authController.loginRoute);
    router.get("/logout", cookieJwtAuth, authController.logoutRoute);
    router.get("/protected", cookieJwtAuth, authController.protectedRoute); // make swagger for this
    router.post("/refresh", authController.refreshRoute);
}//