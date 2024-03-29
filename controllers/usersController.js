const bcrypt = require('bcryptjs');
const UserService = require('../services/userService');
const userService = new UserService();
const jwtGenerator = require('../utils/jwtGenerator');
const createError = require('http-errors');
const sameUserCheck = require("../utils/sameUserCheck"); // makes sures only same user can access the route

exports.findAll = async (req, res, next) => {
    try {
        const user = await userService.findAllUsers();

        res.status(200).send(user);
    } catch (error) {
        next(error)
    }
}

exports.findAUser = async (req, res, next) => {
    try {
        const user = await userService.findOneUser(req.params.id);
        sameUserCheck(res.locals.userIdRole, user.id);
        res.status(200).send(user);
    } catch (error) {
        next(error)
    }
}

exports.findUserByEmail = async (req, res, next) => {
    try {
        const user = await userService.findByEmail(req.params.email);
        res.status(200).send(user);
    } catch (error) {
        next(error);
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        // sameUserCheck(res.locals.userIdRole, req.params.id); // send to the service
        const user = await userService.updateUser(req.params.id, req.body);
        res.status(201).send(user);
    } catch (error) {
        next(error)
    }
}

exports.addGuest = async (req, res, next) => {
    try {
        // const { email } = req.body;
        // req.body.role = "customer";
        req.body.is_admin = false;
        req.body.is_guest = true;
        req.body.roles = ["customer"];
        const userQuery = await userService.addGuest(req.body);
        res.status(200).send(userQuery);
    } catch (error) {
        next(error);
    }
}

exports.addUser = async (req, res, next) => {// pushed over
    try {

        if (req.body.confirm_password) {
            if (req.body.password !== req.body.confirm_password) {
                throw createError(400, "Password does not match");
            }
        }

        req.body.is_admin = false;
        req.body.is_guest = false;
        // req.body.email_campaign = false;
        req.body.password = String(req.body.password);
        // if (!req.body.roles) {
            req.body.roles = ["customer"];
        // }
        const userQuery = await userService.addUser(req.body);

        if (res.locals.Authorized) {
            return res.status(201).json(userQuery);
        } else {
            // const user = {
            //     id: userQuery.id, role: userQuery.is_admin ? "Administrator" : "User", email: userQuery.email, Authorized: true
            // }
            // const token = jwtGenerator(user);
    
            // res.cookie("access_token", token, {
            //     httpOnly: true,
            //     secure: process.env.NODE_ENV === "production",
            // });
            // res.status(201).json({ message: "Logged in successfully 😊 👌", user,/* token */});
            res.status(201).json(userQuery)
        }

    } catch (error) {
        next(error)
    }
}

exports.removeUser = async (req, res, next) => {
    try {
        sameUserCheck(res.locals.userIdRole, req.params.id);
        await userService.deleteUser(req.params.id);
        res.sendStatus(204);
    } catch (error) {
        next(error)
    }
}


exports.addAdmin = async (req, res, next) => {
    try {
        req.body.is_admin = true;
        req.body.password = String(req.body.password);
        req.body.is_guest = false;
        req.body.email_campaign = false;
        req.body.roles = ["admin", "moderator"];
        const userQuery = await userService.addUser(req.body);

        // const user = {
        //     id: userQuery.id, role: userQuery.is_admin ? "Administrator" : "User", email: userQuery.email, Authorized: false
        // }

        res.status(201).json({ message: "New administrator created 😊 👌", user: userQuery });
    } catch (error) {
        next(error);
    }
}


exports.findAllUsersOrders = async (req, res, next) => {
    try {
        console.log("we are here")
        const allUserOrders = await userService.findEveryUsersOrders();

        res.status(200).send(allUserOrders);
    } catch (error) {
        next(error);
    }
}