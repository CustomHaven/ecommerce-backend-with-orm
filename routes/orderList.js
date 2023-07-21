const orderListController = require('../controllers/orderListController.js');
const router = require('express').Router();
const { cookieJwtAuth, isAdmin } = require("../middleware/cookieJWTAuth.js");

module.exports = (app) => {
    app.use("/api/v2/order-list", router);

    router.get("/", isAdmin, orderListController.findAllOrderItems);
    router.get("/:id", cookieJwtAuth, orderListController.findAnItem);
}