const orderController = require('../controllers/orderController');
const router = require('express').Router();
const { cookieJwtAuth, isAdmin, ensureAdminToken, ensureNormalToken } = require("../middleware/cookieJWTAuth");

module.exports = (app) => {
    app.use("/api/v2/orders", router);
    router.get("/best-selling-products", orderController.bestSeller);
    router.post("/order-fulfilled", ensureNormalToken, orderController.newCompleteOrder); // sameUserCheck // done // query ?user=id&cart=id

    router.get("/", ensureAdminToken, orderController.findAllOrders);
    router.get("/:id", ensureNormalToken, orderController.findAnOrder); // sameUserCheck // done
    router.put("/:id", ensureAdminToken, orderController.updateAnOrder);

    // limit this to super admin //
    router.delete("/:id", ensureAdminToken, orderController.removeOrder);
}