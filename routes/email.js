const emailController = require('../controllers/emailController');
const router = require('express').Router();

module.exports = (app) => {
    app.use("/api/v2/email", router);
    router.post("/contact_us", emailController.contactUs);
    router.post("/order_confirmed", emailController.orderConfirmed);
}