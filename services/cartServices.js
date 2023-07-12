const Models = require('../models');
const { Cart, CartList, Product, User } = Models;
const createError = require("http-errors");

module.exports = class CartService {

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


    async findAllCarts() {
        try {
        const carts = await Cart.findAll();
        if (carts) {
            return carts
        }
        throw createError(404, 'Invalid path');
        } catch (error) {
            throw error;
        }
    }
    
    async addCart(body, userId, abandonded) {
        try {
            let user;
            if (userId !== null) {
                user = await CartService.findUser(userId);
            }

            if (userId === null) {
                body.user_id = userId;
            } else {
                body.user_id = user.id
            }

            if (abandonded === "TRUE") {
                body.abandoned = true;
            } else {
                body.abandoned = false;
            }

            const cart = await Cart.create(body);
            if (!cart) {
                throw createError(409, "Failed to save cart");
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async findCart(id) {
        try {
            const cart = await Cart.findByPk(
                id, {
                    attributes: { exclude: ["created_at", "updated_at", "password"] },
                    include: {
                            model: CartList,
                            attributes: { exclude: ["created_at", "updated_at"] },
                        include: {
                            model: Product,
                            attributes: { exclude: ["created_at", "updated_at", "type", "source", "description", "quantity"] },
                        }
                    }
                }
            );

            if (!cart) {
                throw createError(404, "No cart found");
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }

    // make one update where we put the user_id into

    async userCart(id, userId) { // need swagger docs
        try {
            const cart = await this.findCart(id);
            const user = await CartService.findUser(userId);
            await cart.update({ user_id: user.id }); // maybe use query instead of body?
            return await this.findCart(cart.id);
        } catch (error) {
            throw error;
        }
    }

    async abandonedCart(id, update) { // need swagger docs
        try {
            console.log("ID!", id);
            console.log("update!", update);
            const cart = await this.findCart(id);

            let abandoned;
            if (update === "TRUE") {
                abandoned = true;
            } else {
                abandoned = false;
            }

            return await cart.update({ abandoned: abandoned }); // maybe DONT send anything in and put directly false instead?
        } catch (error) {
            throw error;
        }
    }

    async deleteCart(id) {
        try {
            const cart = await this.findCart(id);
            return await cart.destroy();
        } catch (error) {
            throw error;
        }
    }


    ///////////// ------------------------------- CART_LIST--------------------------------------------- //////////////////////////////

    async findAllCartList() {
        try {
        const cartList = await CartList.findAll();
        if (cartList) {
            return cartList
        }
        throw createError(404, 'Invalid path');
        } catch (error) {
            throw error;
        }
    }

    async findCartsCartList(id) {
        try {
            const cart = await Cart.findOne({
                where: { id: id },
                include: {
                    model: CartList
                }
            });
            if (!cart) {
                throw createError(404, "Cart does not exists");
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }

    async newCartItem(cartId, body) {
        try {
            const product = await CartService.findProduct(body.product_id);
            const cart = await this.findCart(cartId);
            body.cart_id = cart.id;
            body.product_id = product.id;
            const cartItem = CartList.create(body);
            if (!cartItem) {
                throw createError(409, "Failed to save cart or the cart item");
            }
            return cartItem;
        } catch (error) {
            throw error;
        }
    }


    async newCartList(body) {
        try {
            const product = await CartService.findProduct(body.product_id);
            const cart = await this.addCart({}, null);
            body.cart_id = cart.id;
            body.product_id = product.id;
            const cartList = await CartList.create(body);
            if (!cartList) {
                throw createError(409, "Failed to save cart or the cart item");
            }
            return await this.findCartsCartList(cartList.cart_id);
        } catch (error) {
            throw error;
        }
    }

    async addCartList(body, cartId) {
        try {
            const product = await CartService.findProduct(body.product_id);
            const cart = await this.findCart(cartId);
            body.cart_id = cart.id;
            body.product_id = product.id;
            const cartList = await CartList.create(body);
            if (!cartList) {
                throw createError(409, "Failed to save cart or the cart item");
            }
            return await this.findCartsCartList(cartList.cart_id);
        } catch (error) {
            throw error;
        }
    }

    async findCartItem(id) {
        try {
            const cartItem = await CartList.findByPk(id);
            if (!cartItem) {
                throw createError(404, "Cart item not found");
            }
            return cartItem;
        } catch (error) {
            throw error;
        }
    }

    async updateCartItem(id, body) {
        try {
            const cartItem = await this.findCartItem(id);
            body.id = Number(cartItem.id);
            return await cartItem.update(body);
        } catch (error) {
            throw error;
        }
    }

    async deleteCartItem(id) {
        try {
            const cartItem = await this.findCartItem(id);
            return cartItem.destroy();
        } catch (error) {
            throw error;
        }
    }
}