const orderListController = require('../controllers/orderListController');
const router = require('express').Router();
const { cookieJwtAuth, isAdmin, ensureAdminToken, ensureNormalToken } = require("../middleware/cookieJWTAuth");

module.exports = (app) => {
    app.use("/api/v2/order-list", router);

    router.get("/", ensureAdminToken, orderListController.findAllOrderItems);
    router.get("/:id", ensureNormalToken, orderListController.findAnItem);
}