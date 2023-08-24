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
        if (!req.query.abandonded || !/^true$|^false$/i.test(req.query.abandonded)) {
            const exception = new Error();
            exception.status = 400;
            exception.message = "Missing or invalid parameter values detected";
            throw exception;
        }
        const abandonded = req.query.abandonded.toUpperCase();

        const cart = await cartService.addCart(req.body, !req.query.user_id ? null : req.query.user_id, abandonded);
        res.status(201).send(cart);
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
        if (!req.body.hasOwnProperty("abandoned")) {
            const exception = new Error();
            exception.status = 400;
            exception.message = "Missing or invalid parameter values detected";
            throw exception;
        }
        console.log("we have passed the error bit", req.body.abandoned);
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