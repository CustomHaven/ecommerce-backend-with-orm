const paymentController = require('../controllers/paymentController');
const router = require('express').Router();
const { cookieJwtAuth, isAdmin } = require("../middleware/cookieJWTAuth");

module.exports = (app) => {
    app.use("/api/v2/payment-details", router);

    router.get("/", isAdmin, paymentController.findAllPayments);
    router.get("/publish-key", cookieJwtAuth, paymentController.publishKey);
    router.post("/:user_id", cookieJwtAuth, paymentController.masterPay); // sameUserCheck // done
    router.get("/:id", cookieJwtAuth, paymentController.findAPayment); // sameUserCheck // done
    router.put("/:id", cookieJwtAuth, paymentController.updateAPayment); // sameUserCheck // done
    router.delete("/:id", cookieJwtAuth, paymentController.removePaymentDetail); // sameUserCheck // done
}