const EmailService = require("../services/emailService");
const EmailServiceInstance = new EmailService();
const axios = require("axios");
const path = require("path");
const fs = require("fs");
const ejs = require("ejs");


exports.contactUs = async (req, res, next) => {
    try {
        let text;
        if (req.body.html) {
            text = req.body.html;
        } else {
            text = `
                From: ${req.body.user_name}\n
                Email: ${req.body.user_email}\n
                \n> ${req.body.message}
                \n
                Powered by Nodemailer
            `.replace(/ {2,}/g, "");
        }
        const message = {
            to: req.body.user_email,
            subject: req.body.subject,
        };

        if (req.body.html) {
            message.html = text;
        } else {
            message.text = text;
        }
        if (req.body.attachments) {
            message.attachments = req.body.attachments.map((attach, i) => ({
                filename: attach.filename,
                path: attach.path
            }));
        };
        const email = await EmailServiceInstance.sendMessage(message, "no-reply");
        res.status(201).send(email);
    } catch (error) {
        next(error);
    }
}

exports.orderConfirmed = async (req, res, next) => {
    try {

        const imgLocal = fs.promises.readFile(path.join(__dirname + "../../public/images/customLogo.png"));
        const imgBuffer = await Promise.resolve(imgLocal).then(function(buffer) {
            return buffer;
        });

        const attachments = await Promise.all(req.body.OrderLists.map(async (order) => {
            const buff = Buffer.from(order.Product.ProductBannerImage.banner_image_data, "base64");

            const bannerImgUrl = buff.toString("utf-8");

            const response = await axios.get(bannerImgUrl, { responseType: 'arraybuffer' });
            const imageBuffer = Buffer.from(response.data, 'binary');

            // const imageBuffer = Buffer.from(order.Product.ProductBannerImage.banner_image_data, "binary");
            return {
                content: imageBuffer,
                contentType: "image/jpg",
                contentDisposition: "inline",
                cid: order.Product.product_name.slice(0, 1).toLowerCase() + order.Product.product_name.slice(1,).replace(/ {1,}/g, "")
            }
        }));

        attachments.unshift({
            content: imgBuffer,
            contentType: "image/png",
            contentDisposition: "inline",
            cid: "customHavenLogo"
        });

        const pathString = path.join(__dirname, "../views/orderConfirmed.ejs");

        await ejs.renderFile(pathString, { 
            order: req.body, 
            orderId: req.body.id,
            orderList: req.body.OrderLists, 
            person: req.body.person,
            frontend: process.env.FRONTEND_HOST,
            bufferImages: attachments
        }, async (err, data) => {

                const message = {
                    to: req.body.user_email,
                    subject: "Order Confirmed",
                    html: data,
                    attachments: attachments
                };
                try {
                    const emailSent = await EmailServiceInstance.sendMessage(message, "Thanks for your order!");
                    return res.status(201).send(emailSent);
                } catch (error) {
                    next(error);
                }
        });
        

        // res.status(201).send(emailSent);
        // res.render("orderConfirmed", {
        //     order: obj, 
        //     orderId: obj.id, 
        //     orderList: obj.OrderLists, 
        //     person: obj.person,
        //     frontend: process.env.FRONTEND_HOST
        // });
    } catch (error) {
        next(error);
    }
}