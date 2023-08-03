const contactController = require("../controllers/contactDetailController");
const router = require("express").Router();
const validInfo = require("../middleware/validInfo");
const { isAdmin, ensureAdminToken, ensureNormalToken, cookieJwtAuth } = require("../middleware/cookieJWTAuth");
const authorization = require("../middleware/authorization");

module.exports = (app) => {
    app.use("/api/v2/contact-details", router);

    router.get("/", ensureAdminToken, contactController.findAll);
    router.post("/:user_id", ensureNormalToken, contactController.newContactDetail); // sameUserCheck // done
    router.get("/:id", contactController.findAContactDetail); // sameUserCheck // done
    router.put("/:id", contactController.updateDetails); // sameUserCheck // done
    router.delete("/:id", contactController.removeShippingInfo); // sameUserCheck // done
    router.get("/user-contact-detail/:user_id", contactController.findUserContactDetail); // sameUserCheck // done
    
    return router;
}

