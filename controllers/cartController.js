const CartService = require("../services/cartServices");
const cartService = new CartService();


exports.findAll = async (req, res, next) => {
    try {
        const allCart = await cartService.findAllCarts();
        res.status(200).send(allCart);
    } catch (error) {
        next(error);
    }
}

exports.newCart = async (req, res, next) => {
    try {
        const cart = await cartService.addCart(req.body, !req.query.user_id ? null : req.query.user_id);
        res.status(201).send(cart)
    } catch (error) {
        next(error);
    }
}

exports.findACart = async (req, res, next) => {
    try {
        const cart = await cartService.findCart(Number(req.params.id));
        res.status(200).send(cart);
    } catch (error) {
        next(error);
    }
}

exports.updateAbandonedCart = async (req, res, next) => {
    try {
        const cart = await cartService.abandonedCart(Number(req.params.id), req.body.abandoned);
        res.status(201).send(cart);
    } catch (error) {
        next(error);
    }
}

exports.updateUserCart = async (req, res, next) => {
    try {
        const cart = await cartService.userCart(Number(req.params.id), req.body.user_id);
        res.status(201).send(cart);
    } catch (error) {
        next(error);
    }
}

exports.removeCart = async (req, res, next) => {
    try {
        await cartService.deleteCart(Number(req.params.id));
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}