const productBannerImageController = require('../controllers/productBannerImageController.js');
const router = require('express').Router();
const { isAdmin } = require("../middleware/cookieJWTAuth");

module.exports = (app) => {
    app.use('/api/v2/product-banner-images', router); 

    router.get("/", productBannerImageController.getAllProductBannerImages);

    router.get("/image/:id", productBannerImageController.getSingleImg);
    router.put("/image/:id", isAdmin, productBannerImageController.updateBannerImg);
    router.delete("/image/:id", isAdmin, productBannerImageController.deleteBannerImg);

    router.get("/product/:product_id", productBannerImageController.getSingleProductBannerImage);
    router.post("/product/:product_id", isAdmin, productBannerImageController.newBannerImage);
    router.put("/product/:product_id", isAdmin, productBannerImageController.updateProductBannerImage);
    router.delete("/product/:product_id", isAdmin, productBannerImageController.deleteProductBannerImage);

    return router;
};