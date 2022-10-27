// const UserService = require('../services/productService');
// const productService = new UserService();
const ProductService = require("../services/productService");
const productService = new ProductService();
const jwtGenerator = require('../utils/jwtGenerator');
const createError = require('http-errors');

exports.findAll = async (req, res, next) => {
    try {
        const contacts = await productService.findAllProducts();
        res.status(200).send(contacts);
    } catch (error) {
        next(error)
    }
}


// change
exports.findAProduct = async (req, res, next) => {
    try {
        const contactProduct = await productService.findOneProduct(req.params.id);
        res.status(200).send(contactProduct)
    } catch (error) {
        next(error)
    }
}

exports.findUserProduct = async (req, res, next) => {
    try {
        const contactProduct = await productService.findBasedOnUserId(req.params.user_id);
        res.status(200).send(contactProduct);
    } catch (error) {
        next(error);
    }
}

exports.newProduct = async (req, res, next) => {
    try {
        const newProducts = await productService.addProduct(req.body);
        res.status(201).send(newProducts);
    } catch (error) {
        next(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.status(201).send(product);
    } catch (error) {
        next(error)
    }
}


exports.removeProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}


exports.allProductsAndImages = async (req, res, next) => {
    try {
        const products = await productService.getAllProductsAndImages();
        res.status(200).send(products);
    } catch (error) {
        next(error);
    }
}

exports.newProductsAndImages = async (req, res, next) => {
    try {
        console.log("are we here?")
        // const fake = "prod-18";
        const product = await productService.addProductImages(req.body.product, req.body.product_images);

        res.status(201).send(product);
    } catch (error) {
        next(error);
    }
}







// ----------------------------
