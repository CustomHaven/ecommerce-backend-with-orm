const Models = require('../models');
const { ContactDetail, User } = Models;
const createError = require("http-errors");
const sameUserCheck = require("../utils/sameUserCheck"); // makes sures only same user can access the route


module.exports = class ContactDetailService {

    static async findUser(id) {
        try {
            const user = await User.findByPk(id);
            if (!user) {
                throw createError(404, "User not found");
            }
            return user;
        } catch (error) {
            throw error;
        }
    }

    async findAllContacts() {
        try {
        const allContacts = await ContactDetail.findAll();
        if (allContacts) {
            return allContacts
        }
        // return null
        throw createError(404, 'No contacts stored!');
        } catch (err) {
            throw err;
        }
    }

    async findOneContact(id, userIdRole) {
        try {
            const contact = await ContactDetail.findByPk(id);
            const user = await ContactDetailService.findUser(contact.user_id);
            sameUserCheck(userIdRole, user.id);
            if (!contact) {
                throw createError(404, "No contact detail");
            }
            return contact;
        } catch (error) {
            throw error;
        }
    }

    async findBasedOnUserId(id, userIdRole) {
        try {
            const contact = await User.findOne({
                where: { id: id },
                include: {
                    model: ContactDetail,
                }
            });
            sameUserCheck(userIdRole, contact.id);
            if (!contact) {
                throw createError(404, "No user contact detail");
            }
            return contact;
        } catch (error) {
            throw error;
        }
    }

    async newDetail(id, body, userIdRole) {
        try {
            const user = await ContactDetailService.findUser(id);
            sameUserCheck(userIdRole, user.id);
            body.user_id = user.id;
            const contact = await ContactDetail.create(body);
            if (!contact) {
                throw createError(409, "Failed to save shipping details");
            }
            return contact;
        } catch (error) {
            throw error;
        }
    }

    async updateDetail(id, body, userIdRole) {
        try {
        const contact = await ContactDetail.findByPk(id);
        const user = await ContactDetailService.findUser(contact.user_id);
        sameUserCheck(userIdRole, user.id);
        if (!contact) {
            throw createError(404, "No contact detail");
        }
        const updatedContact = await contact.update(body);
        if (!updatedContact) { // works regardless even if we put a key that is not in the DB so probably will delete this if block!
            throw createError(409, "Failed to update contact");
        }
        return updatedContact;
        } catch (error) {
            throw error;
        }
    }

    async deleteContactDetail(id, userIdRole) {
        try {
            await this.findOneContact(id, userIdRole);
            const contact = await ContactDetail.destroy({ where: { id: id } });
            if (!contact) {
                // return null
                throw createError(404, 'Invalid ID no shipping detail found');
            }
            return { message: 'Successfully removed the shipping detail' } // no need as i return 204
        } catch (error) {
            throw error;
        }
    }
};