const ProductImageService = require("../services/productImageService");
const productImageService = new ProductImageService();


exports.findAProductImages = async ( req, res, next) => {
    try {
        const productImages = await productImageService.findProductAndImages(req.params.product_id);
        res.status(200).send(productImages);
    } catch (error) {
        next(error);
    }
}

exports.newImage = async (req, res, next) => {
    try {
        const newImage = await productImageService.addImage(req.body, req.params.product_id);
        res.status(201).send(newImage);
    } catch (error) {
        next(error);
    }
}

exports.allImages = async (req, res, next) => {
    try {
        const images = await productImageService.findAllImages();
        res.status(200).send(images);
    } catch (error) {
        next(error);
    }
}

exports.singleImage = async (req, res, next) => {
    try {
        const image = await productImageService.findSingleImage(Number(req.params.id));
        res.status(200).send(image);
    } catch (error) {
        next(error);
    }
}

exports.updateImage = async (req, res, next) => {
    try {
        const image = await productImageService.updateSingleImage(Number(req.params.id), req.body);
        res.status(201).send(image);
    } catch (error) {
        next(error);
    }
}

exports.deleteImage = async (req, res, next) => {
    try {
        await productImageService.removeImage(Number(req.params.id));
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}