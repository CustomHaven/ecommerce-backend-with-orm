const contactController = require("../controllers/contactDetailController.js");
const router = require("express").Router();
const validInfo = require("../middleware/validInfo.js");
const { isAdmin, cookieJwtAuth } = require("../middleware/cookieJWTAuth.js");
const authorization = require("../middleware/authorization.js");

module.exports = (app) => {
    app.use("/api/v2/contact-details", router);

    router.get("/", isAdmin, contactController.findAll);
    router.post("/:user_id", cookieJwtAuth, contactController.newContactDetail); // sameUserCheck // done
    router.get("/:id", contactController.findAContactDetail); // sameUserCheck // done
    router.put("/:id", contactController.updateDetails); // sameUserCheck // done
    router.delete("/:id", contactController.removeShippingInfo); // sameUserCheck // done
    router.get("/user-contact-detail/:user_id", contactController.findUserContactDetail); // sameUserCheck // done
    
    return router;
}

