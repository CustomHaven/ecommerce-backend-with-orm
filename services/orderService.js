const db = require('../db');
const Models = require('../models');
const { Order, OrderList, Cart, CartList, Product, User, ContactDetail, ProductBannerImage } = Models;
const createError = require("http-errors");
const sameUserCheck = require("../utils/sameUserCheck");


module.exports = class OrderService {

    static async findUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw createError(404, "No user found");
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    static async findProduct(id) {
        try {
            const product = await Product.findByPk(id);
            if (!product) {
                throw createError(404, "No product found");
            }
            return product;
        } catch (error) {
            throw error;
        }
    }

    static async findCart(id) {
        try {
            const cart = await Cart.findOne({
                where: { id: id },
                include: { model: CartList }
            });
            if (!cart) {
                throw createError(404, "No cart found");
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }


    async findAllOrders() {
        
        try {
            const order = await Order.findAll({
                distinct: true,
                include: [
                    {
                        distinct: true,
                        model: User,
                        attributes: ["id", "email", "facebook_id", "google_id", "is_guest", "email_campaign"],
                        include: {
                            distinct: true,
                            model: ContactDetail,
                            attributes: ["first_name", "last_name"],
                        },
                    },
                    {
                        model: OrderList,
                        attributes: ["id", "order_id", "quantity", "price", "product_id"],
                        include: {
                            model: Product,
                            attributes: ["id", "product_name"],
                            include: {
                                model: ProductBannerImage,
                                attributes: ["id", "product_id", "banner_image_name", "banner_image_data"]
                            }
                        }
                    }
                ],
            });
            if (order) {
                return order;
            }
            throw createError(404, 'Invalid path');
        } catch (error) {
            throw error;
        }
    }

    async addOrder(body) {
        try {
            const order = await Order.create(body);
            if (!order) {
                throw createError(409, "Failed to save order");
            }
            return order;
        } catch (error) {
            throw error;
        }
    }

    async addOrderItem(body) {
        try {
            const order = await OrderList.create(body);
            if (!order) {
                throw createError(409, "Failed to save the item");
            }
            return order;
        } catch (error) {
            throw error;
        }
    }

    async findOrder(id, userIdRole) {
        try {
            const order = await Order.findOne({
                where: { id: id },
                attributes: { exclude: ["created_at", "updated_at"] },
                include: {
                    model: OrderList,
                    attributes: { exclude: ["created_at", "updated_at"] },
                    include: {
                        model: Product,
                        attributes: { exclude: ["created_at", "updated_at"] },
                        include: {
                            model: ProductBannerImage,
                            attributes: { exclude: ["created_at", "updated_at"] }
                        }
                    }
                }
            });
            sameUserCheck(userIdRole, order.user_id);
            if (!order) {
                throw createError(404, "No order found");
            }
            return order;
        } catch (error) {
            throw error;
        }
    }

    async fullOrder(userId, cartId, body, userIdRole) {
        try {
            // helper arrays to determine the full price, total items ie quantity and the productId
            const price = []; // will always be same length
            const quantity = []; // will always be same length
            const productIds = [];
            // calling the static methods to see if the user and cart id's are infact in the database
            const user = await OrderService.findUser(userId);
            sameUserCheck(userIdRole, user.id); // making sure only the user can only access their information ONLY

            const cart = await OrderService.findCart(cartId);
            // filling up the price and quantity array's at the same time looking into the static Product method to see if infact we have the product
            await Promise.all(cart.CartLists.map(async item => {
                const product = await OrderService.findProduct(item.product_id);
                price.push(parseFloat((product.price * item.quantity).toFixed(2)));
                quantity.push(item.quantity);
                productIds.push(product.id);
            }));

            // if all is good and no problem we populate the body to send to the addOrder method
            // body.final_price = parseFloat(price.reduce((acc, curr) => acc + curr)).toFixed(2);
            body.total_items = parseInt(quantity.reduce((acc, curr) => acc + curr));
            body.user_id = user.id;
            body.cart_id = cart.id;
            const order = await this.addOrder(body);

            // after all that we will populate the DB for all the individual order items for the OrderList table
            const orderItems = [];
            for (let i = 0; i < price.length; i++) {
                const items = {
                    price: price[i],
                    quantity: quantity[i],
                    order_id: order.id,
                    product_id: productIds[i]
                }
                const orderItem = await this.addOrderItem(items);
                orderItems.push(orderItem);
            }

            return await this.findOrder(order.id, userIdRole);
        } catch (error) {
            throw error;
        }
    }

    async findOnlyTheOrder(id) {
        try {
            const order = await Order.findByPk(id);
            if (!order) {
                throw createError(404, "No user found");
            }
            return order;
        } catch (error) {
            throw error;
        }
    }

    async updateOrder(id, body) {
        try {
            const order = await this.findOnlyTheOrder(id);
            return await order.update(body);
        } catch (error) {
            throw error;
        }
    }

    async deleteOrder(id) {
        try {
            const order = await this.findOnlyTheOrder(id);
            return order.destroy();
        } catch (error) {
            throw error;
        }
    }


    // -------------------------------------------------------- ORDER LIST (ORDER ITEMS) ------------------------------------------------------------

    async findAllItems() {
        try {
            const items = await OrderList.findAll();
            if (items) {
                return items
            }
            throw createError(404, 'Invalid path');
        } catch (error) {
            throw error;
        }
    }

    async findItem(id) {
        try {
            const item = await OrderList.findByPk(id);
            if (!item) {
                throw createError(404, "No item found");
            }
            return item;
        } catch (error) {
            throw error;
        }
    }

    async bestSellers() {
        try {
            const best = await OrderList.findAll({
                attributes: [[db.fn("sum", db.col("OrderList.quantity")), "Sales"]],
                group: ["Product.id"],
                include: {
                    model: Product,
                    attributes: [["product_name", "Name"]], // renames the column name!
                },
                raw: true
            });

            if (best) {
                return best.map(obj => ({
                    Product_Name: obj["Product.Name"],
                    Sales: obj.Sales
                })).sort((a,b) => Number(b.Sales) - Number(a.Sales));
            }
            throw createError(500, "WRONG!")
        } catch (error) {
            throw error;
        }
    }
}