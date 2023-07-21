const userController = require("../controllers/usersController");
const router = require("express").Router();
const validInfo = require("../middleware/validInfo");
const { cookieJwtAuth, isAdmin } = require("../middleware/cookieJWTAuth");
const authorization = require("../middleware/authorization");


module.exports = (app) => {
    app.use("/api/v2/users", router);

    router.post("/register/guest", userController.addGuest);//

    router.post("/register/user", validInfo, userController.addUser); // sign up //
    router.post("/register/newadmin", validInfo, isAdmin, userController.addAdmin); // sign up an admin

    router.get("/email/:email", userController.findUserByEmail); // get a user // TODO SWAGGER

    router.get("/all-users-orders", isAdmin, userController.findAllUsersOrders); // TODO SWAGGER


    router.get("/", isAdmin, userController.findAll); // get all users
    router.get("/:id", cookieJwtAuth, userController.findAUser); // get a user
    router.put("/:id", validInfo, cookieJwtAuth, userController.updateUser); // update a user
    router.delete("/:id", cookieJwtAuth, userController.removeUser); // delete user


    return router;
}
    // do swagger and supertest for these
    // router.post("/login", validInfo, userController.loginUser);
    // // do swagger and supertest for these
    // router.get("/verify", authorization, (req, res, next) => {
    //     try {
    //         res.status(200).json(true);
    //     } catch (error) {
    //         // res.status(500).send("Server error");
    //         next(error);
    //     }
    // })
