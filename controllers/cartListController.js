const CartListService = require("../services/cartListService");
const cartListService = new CartListService();


exports.findAll = async (req, res, next) => {
    try {
        const allCart = await cartListService.findAllCartList();
        res.status(200).send(allCart);
    } catch (error) {
        next(error);
    }
}

exports.getCartAndCarList = async (req, res, next) => {
    try {
        const cart = await cartListService.findCartsCartList(req.params.cart_id);
        res.status(200).send(cart);
    } catch (error) {
        next(error);
    }
}

exports.brandNewCartList = async (req, res, next) => {
    try {
        const cart = await cartListService.newCartList(req.body);
        res.status(201).send(cart);
    } catch (error) {
        next(error);
    }
}

exports.makeNewCartItem = async (req, res, next) => {
    try {
        const cart = await cartListService.newCartItem(Number(req.params.cart_id), req.body);
        res.status(201).send(cart);
    } catch (error) {
        next(error);
    }
}

exports.addToCartList = async (req, res, next) => {
    try {
        const cart = await cartListService.addCartList(req.body, Number(req.params.cart_id));
        res.status(201).send(cart);
    } catch (error) {
        next(error);
    }
}

exports.findACartList = async (req, res, next) => {
    try {
        const cartItem = await cartListService.findCartItem(Number(req.params.id));
        res.status(200).send(cartItem);
    } catch (error) {
        next(error);
    }
}

exports.updateACartList = async (req, res, next) => { //
    try {
        const cartItem = await cartListService.updateCartItem(Number(req.params.id), req.body);
        res.status(201).send(cartItem);
    } catch (error) {
        next(error);
    }
}

exports.removeACartList = async (req, res, next) => {
    try {
        await cartListService.deleteCartItem(Number(req.params.id));
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}



