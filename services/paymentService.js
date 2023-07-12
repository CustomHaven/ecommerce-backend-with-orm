const Models = require('../models');
const { PaymentDetail, User, ContactDetail, Role } = Models;
const createError = require("http-errors");
const sameUserCheck = require("../utils/sameUserCheck");


module.exports = class PaymentService {

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
    /**
     * 
     * @param {req.param.id} id 
     * @param {res.locals.userIdRole} userIdRole 
     * @returns user || error (401||404)
     */
    static async findUserContactDetails(id, userIdRole) {
        try {
            console.log("user", id, userIdRole);
            const user = await User.findOne({
                where: {id: id},
                include: [
                    {
                        model: Role,
                        attributes: { exclude: ["id", "created_at", "updated_at"] },
                        through: { attributes: [] }
                    },
                    {
                        model: ContactDetail,
                        attributes: { exclude: ["created_at", "updated_at"] }
                    }
                ]
            });
            console.log("USER SERVICE", user);
            sameUserCheck(userIdRole, user.id);
            if (!user) {
                throw createError(404, "No user found");
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findAllPayment() {
        try {
            const payments = await PaymentDetail.findAll();
            if (!payments) {
                throw createError(404, 'Invalid path');
            }
            return payments
        } catch (error) {
            throw error;
        }
    }

    async newPayment(body) {
        try {
            const payment = await PaymentDetail.create(body);
            if (!payment) {
                throw createError(404, 'Invalid path');
            }
            return payment;
        } catch (error) {
            throw error;
        }
    }

    async findPayment(id, userIdRole) {
        try {
            const payment = await PaymentDetail.findByPk(id);
            sameUserCheck(userIdRole, payment.user_id);
            if (!payment) {
                throw createError(404, "No payment found");
            }
            return payment;
        } catch (error) {
            throw error;
        }
    }

    async updatePayment(id, body, userIdRole) {
        try {
            const payment = await this.findPayment(id, userIdRole);
            return await payment.update(body, {individualHooks: true});
        } catch (error) {
            throw error;
        }
    }

    async deletePaymentDetail(id, userIdRole) {
        try {
            const payment = await this.findPayment(id, userIdRole);
            return await payment.destroy();
        } catch (error) {
            throw error;
        }
    }
}