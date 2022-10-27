const cartController = require('../controllers/cartController');
const router = require('express').Router();
const { isAdmin } = require("../middleware/cookieJWTAuth");


module.exports = (app) => {
    app.use("/api/v2/carts", router);

    router.get("/", isAdmin, cartController.findAll);
    router.post("/cart/user_id", cartController.newCart);
    router.put("/user/:id", cartController.updateUserCart);
    router.put("/abandoned/:id", cartController.updateAbandonedCart);
    router.get("/:id", cartController.findACart);
    router.delete("/:id", cartController.removeCart);

}