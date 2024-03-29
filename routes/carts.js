const cartController = require('../controllers/cartController');
const router = require('express').Router();
const { isAdmin, ensureAdminToken } = require("../middleware/cookieJWTAuth");


module.exports = (app) => {
    app.use("/api/v2/carts", router);

    router.get("/", ensureAdminToken, cartController.findAll);
    router.post("/cart", cartController.newCart);
    router.put("/user/:id", cartController.updateUserCart);
    router.put("/abandoned/:id", cartController.updateAbandonedCart);
    router.get("/:id", cartController.findACart);
    router.delete("/:id", cartController.removeCart);

}