const authController = require('../controllers/authController');
const { cookieJwtAuth } = require("../middleware/cookieJWTAuth");
const validInfo = require("../middleware/validInfo");
const router = require('express').Router();

module.exports = (app) => {
    app.use("/api/v2/auth", router);

    router.post("/users", authController.practise);

    router.post("/login", validInfo, authController.loginRoute);//
    router.get("/logout", cookieJwtAuth, authController.logoutRoute);
    router.get("/protected", cookieJwtAuth, authController.protectedRoute); // make swagger for this
    router.post("/refresh", authController.refreshRoute);
}