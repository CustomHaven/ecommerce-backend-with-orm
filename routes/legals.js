const legalController = require('../controllers/legalController');
const router = require('express').Router();

module.exports = (app) => {
    app.use("/api/v2/legalities", router);
    router.get("/", legalController.getLegality);
}