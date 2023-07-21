const OrderListService = require("../services/orderListService");
const orderListService = new OrderListService();


exports.findAllOrderItems = async (req, res, next) => {
    try {
        const allItems = await orderListService.findAllItems();
        res.status(200).send(allItems);
    } catch (error) {
        next(error);
    }
}

exports.findAnItem = async (req, res, next) => {
    try {
        const item = await orderListService.findItem(Number(req.params.id));
        res.status(200).send(item);
    } catch (error) {
        next(error);
    }
}