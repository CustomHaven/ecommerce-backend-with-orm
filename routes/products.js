const productController = require('../controllers/productController');
const router = require('express').Router();
const { isAdmin } = require("../middleware/cookieJWTAuth");

module.exports = (app) => {
    app.use('/api/v2/products', router); 
    
    router.get('/', productController.findAll);
    router.post("/", isAdmin, productController.newProduct);
    router.get('/:id', productController.findAProduct);
    router.put('/:id', productController.updateProduct);
    router.delete('/:id', isAdmin, productController.removeProduct);

    router.get("/all/products", productController.allProductsAndImages);
    router.post("/product-with-images", isAdmin, productController.newProductsAndImages);
    
    return router;
}

/*
{
  "product": {
    "source": "string",
    "product_name": "string",
    "type": "string",
    "description": "string",
    "price": 50.40,
    "quantity": 3000
  },
  "product_images": [
    {
      "image_name": "string",
      "image_data": "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
    },
    {
      "image_name": "string2",
      "image_data": "https://www.metoffice.gov.uk/binaries/content/gallery/metofficegovuk/hero-images/advice/maps-satellite-images/satellite-image-of-globe.jpg"
    },
    {
      "image_name": "string3",
      "image_data": "https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
    }
  ]
}
*/