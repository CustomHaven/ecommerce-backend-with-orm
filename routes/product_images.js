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


{
  "image_name": "string4",
  "image_data": "https://i.ytimg.com/vi/u6m8lgWG_4M/maxresdefault.jpg"
}
*/