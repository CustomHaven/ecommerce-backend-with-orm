const ContactDetailService = require("../services/contactDetailService");
const contactService = new ContactDetailService();

exports.findAll = async (req, res, next) => {
    try {
        const contacts = await contactService.findAllContacts();
        res.status(200).send(contacts);
    } catch (error) {
        next(error)
    }
}

exports.newContactDetail = async (req, res, next) => {//
    try {
        const newDetails = await contactService.newDetail(req.params.user_id, req.body, res.locals.userIdRole);
        res.status(201).send(newDetails);
    } catch (error) {
        next(error);
    }
}

exports.findAContactDetail = async (req, res, next) => {
    try {
        const contactDetail = await contactService.findOneContact(req.params.id, res.locals.userIdRole);
        res.status(200).send(contactDetail)
    } catch (error) {
        next(error)
    }
}

exports.findUserContactDetail = async (req, res, next) => {
    try {
        const contactDetail = await contactService.findBasedOnUserId(req.params.user_id, res.locals.userIdRole);
        res.status(200).send(contactDetail);
    } catch (error) {
        next(error);
    }
}

exports.updateDetails = async (req, res, next) => {
    try {
        const user = await contactService.updateDetail(req.params.id, req.body, res.locals.userIdRole);
        res.status(201).send(user);
    } catch (error) {
        next(error)
    }
}


exports.removeShippingInfo = async (req, res, next) => {
    try {
        await contactService.deleteContactDetail(req.params.id, res.locals.userIdRole);
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}