const productImageController = require('../controllers/productImageController');
const router = require('express').Router();
const { isAdmin } = require("../middleware/cookieJWTAuth");

module.exports = (app) => {
    app.use('/api/v2/product-images', router); 

    router.get("/:product_id", productImageController.findAProductImages); // gets all images for a single product param search id
    router.post("/:product_id", isAdmin, productImageController.newImage); // makes a product image
    router.get("/", productImageController.allImages);
    router.get("/single/:id", productImageController.singleImage);
    router.put("/single/:id", isAdmin, productImageController.updateImage);
    router.delete("/single/:id", isAdmin, productImageController.deleteImage);

    return router;
}