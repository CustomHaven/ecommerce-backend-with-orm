const OrderService = require("../services/orderService");
const orderService = new OrderService();


exports.findAllOrders = async (req, res, next) => {
    try {
        console.log("WAG1?");
        console.log(req.cookie);
        console.log("REQ!")
        const allOrders = await orderService.findAllOrders();
        res.status(200).send(allOrders);
    } catch (error) {
        next(error);
    }
}

exports.newCompleteOrder = async (req, res, next) => {
    try {
        const { final_price, shipping_price, shipping_method, cart_price, payment_provider_id } = req.body;
        const { user_id, cart_id } = req.query; // might do this as a query param
        const data = {
            shipping_status: "pending", // Maybe we send in from the req.body just these two
            tracking_id: "not available", // Maybe we send in from the req.body just these two
            payment_provider_id,
            final_price,
            cart_price,
            shipping_method,
            shipping_price
            // payment_accepted: true
        };

        const completeOrder = await orderService.fullOrder(user_id, cart_id, data, res.locals.userIdRole);
        res.status(201).send(completeOrder);
    } catch (error) {
        next(error);
    }
}

exports.findAnOrder = async (req, res, next) => {
    try {
        const order = await orderService.findOrder(req.params.id, res.locals.userIdRole);
        res.status(200).send(order);
    } catch (error) {
        next(error);
    }
}

exports.updateAnOrder = async (req, res, next) => {
    try {// only send it shipping_status and tracking_id!
        const order = await orderService.updateOrder(req.params.id, req.body);
        res.status(201).send(order);
    } catch (error) {
        next(error);
    }
}

exports.removeOrder = async (req, res, next) => {
    try {
        await orderService.deleteOrder(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        next(error);
    }
}

exports.bestSeller = async (req, res, next) => {
    try {
        const bestSellers = await orderService.bestSellers();
        res.status(200).send(bestSellers);
    } catch (error) {
        next(error);
    }
}