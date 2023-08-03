const paymentController = require('../controllers/paymentController');
const router = require('express').Router();
const { cookieJwtAuth, isAdmin, ensureAdminToken, ensureNormalToken } = require("../middleware/cookieJWTAuth");

module.exports = (app) => {
    app.use("/api/v2/payment-details", router);

    router.get("/", ensureAdminToken, paymentController.findAllPayments);
    router.get("/publish-key", ensureNormalToken, paymentController.publishKey);
    router.post("/:user_id", ensureNormalToken, paymentController.masterPay); // sameUserCheck // done
    router.post("/accept_payment", paymentController.acceptPayment); // query ?
    router.get("/:id", ensureNormalToken, paymentController.findAPayment); // sameUserCheck // done
    router.put("/:id", ensureNormalToken, paymentController.updateAPayment); // sameUserCheck // done
    router.delete("/:id", ensureNormalToken, paymentController.removePaymentDetail); // sameUserCheck // done
}