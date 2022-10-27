const orderController = require('../controllers/orderController');
const router = require('express').Router();
const { cookieJwtAuth, isAdmin } = require("../middleware/cookieJWTAuth");

module.exports = (app) => {
    app.use("/api/v2/orders", router);

    router.get("/", isAdmin, orderController.findAllOrders);
    router.post("/:user_id/:cart_id", orderController.newCompleteOrder); // sameUserCheck // done
    router.get("/:id", cookieJwtAuth, orderController.findAnOrder); // sameUserCheck // done
    router.put("/:id", isAdmin, orderController.updateAnOrder);

    // limit this to super admin
    router.delete("/:id", isAdmin, orderController.removeOrder);
}