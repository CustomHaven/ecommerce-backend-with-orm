const ProductBannerImageService = require("../services/ProductBannerImageService");
const productBannerImageService = new ProductBannerImageService();

exports.getAllProductBannerImages = async (req, res, next) => {
    try {
        const products = await productBannerImageService.allProductsAndBannerImg();
        res.status(200).send(products);
    } catch (error) {
        next(error);
    }
}

exports.getSingleImg = async (req, res, next) => {
    try {
        const bannerImg = await productBannerImageService.singleBannerImg(Number(req.params.id));
        res.status(200).json(bannerImg);
    } catch (error) {
        next(error);
    }
}

exports.updateBannerImg = async (req, res, next) => {
    try {
        const bannerImg = await productBannerImageService.updateBannerImage(Number(req.params.id), req.body);
        res.status(201).json(bannerImg);
    } catch (error) {
        next(error);
    }
}

exports.deleteBannerImg = async (req, res, next) => {
    try {
        await productBannerImageService.removeBannerImage(Number(req.params.id));
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

exports.getSingleProductBannerImage = async (req, res, next) => {
    try {
        const product = await productBannerImageService.findProductAndBannerImg(String(req.params.product_id));
        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
}

exports.newBannerImage = async (req, res, next) => {
    try {
        
        const bannerImage = await productBannerImageService.newImgBanner(String(req.params.product_id), req.body);
        res.status(201).json(bannerImage);
    } catch (error) {
        next(error);
    }
}

exports.updateProductBannerImage = async (req, res, next) => {
    try {
        const bannerImg = await productBannerImageService.updateProductBannerImg(String(req.params.product_id), req.body);
        res.status(201).json(bannerImg);
    } catch (error) {
        next(error);
    }
}

exports.deleteProductBannerImage = async (req, res, next) => {
    try {
        await productBannerImageService.deleteProductBannerImg(String(req.params.product_id));
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}