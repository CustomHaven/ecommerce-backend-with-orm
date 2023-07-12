const orderController = require('../controllers/orderController');
const router = require('express').Router();
const { cookieJwtAuth, isAdmin } = require("../middleware/cookieJWTAuth");

module.exports = (app) => {
    app.use("/api/v2/orders", router);
    router.get("/best-selling-products", orderController.bestSeller);
    router.post("/order-fulfilled", cookieJwtAuth, orderController.newCompleteOrder); // sameUserCheck // done // query ?user=id&cart=id

    router.get("/", isAdmin, orderController.findAllOrders);
    router.get("/:id", cookieJwtAuth, orderController.findAnOrder); // sameUserCheck // done
    router.put("/:id", isAdmin, orderController.updateAnOrder);

    // limit this to super admin //
    router.delete("/:id", isAdmin, orderController.removeOrder);
}