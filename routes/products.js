const productController = require('../controllers/productController');
const router = require('express').Router();
const { isAdmin, ensureAdminToken } = require("../middleware/cookieJWTAuth");
//
module.exports = (app) => {
    app.use('/api/v2/products', router); 
    
    
    router.get('/', productController.findAll);
    router.post("/", ensureAdminToken, productController.newProduct);

    router.get("/all-products-with-all-images", productController.findAllProductsWithAllImages); // Swagger!
    router.get("/single-product-and-all-images/:id", productController.findSingleProductWithAllImages); // Swagger!
    router.post("/add-product-and-images-together", ensureAdminToken, productController.newProductWithAllImages); // Swagger!


    router.get("/all/products", productController.allProductsAndImages);
    router.post("/product-with-images", ensureAdminToken, productController.newProductsAndImages);

    router.get('/:id', productController.findAProduct);
    router.put('/:id', productController.updateProduct);
    router.delete('/:id', ensureAdminToken, productController.removeProduct);

    
    return router;
}