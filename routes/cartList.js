const cartListController = require('../controllers/cartListController');
const router = require('express').Router();
const { isAdmin } = require("../middleware/cookieJWTAuth");


module.exports = (app) => {
    app.use("/api/v2/cart-list", router);

    router.get("/", isAdmin, cartListController.findAll);
    router.post("/cart/brand-new", cartListController.brandNewCartList); // need swagger doc path
    router.get("/cart/:cart_id", cartListController.getCartAndCarList);
    router.post("/cart/:cart_id", cartListController.addToCartList);
    router.get("/:id", cartListController.findACartList);
    router.put("/:id", cartListController.updateACartList);
    router.delete("/:id", cartListController.removeACartList);

}