const productBannerImageController = require('../controllers/productBannerImageController');
const router = require('express').Router();
const { isAdmin, ensureAdminToken } = require("../middleware/cookieJWTAuth");

module.exports = (app) => {
    app.use('/api/v2/product-banner-images', router); 

    router.get("/", productBannerImageController.getAllProductBannerImages);

    router.get("/image/:id", productBannerImageController.getSingleImg);
    router.put("/image/:id", ensureAdminToken, productBannerImageController.updateBannerImg);
    router.delete("/image/:id", ensureAdminToken, productBannerImageController.deleteBannerImg);

    router.get("/product/:product_id", productBannerImageController.getSingleProductBannerImage);
    router.post("/product/:product_id", ensureAdminToken, productBannerImageController.newBannerImage);
    router.put("/product/:product_id", ensureAdminToken, productBannerImageController.updateProductBannerImage);
    router.delete("/product/:product_id", ensureAdminToken, productBannerImageController.deleteProductBannerImage);

    return router;
};