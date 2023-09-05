const EmailService = require("../services/emailService");
const EmailServiceInstance = new EmailService();
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
        const email = await EmailServiceInstance.sendMessage(message);
        res.status(200).send(email);
    } catch (error) {
        next(error);
    }
}

exports.orderConfirmed = async (req, res, next) => {
    try {

        const imgLocal = fs.promises.readFile(path.join(__dirname + "../../public/images/customLogo.png"));
        const pathString = path.join(__dirname, "../views/orderConfirmed.ejs");

        const imgBuffer = await Promise.resolve(imgLocal).then(function(buffer) {
            return buffer;
        });

        await ejs.renderFile(pathString, { 
            order: req.body, 
            orderId: req.body.id, 
            orderList: req.body.OrderLists, 
            person: req.body.person,
            frontend: process.env.FRONTEND_HOST
        }, async (err, data) => {
            if (err) {
                console.log(err);
            } else {
                const message = {
                    to: "havendepot@gmail.com",
                    subject: "Order Confirmed",
                    html: data,
                    attachments: [
                        {
                            content: imgBuffer,
                            contentType: "image/png",
                            contentDisposition: "inline",
                            cid: "myImg"
                        },
                    ]
                    // attachments: [
                    //     {
                    //         filename: "customLogo.png",
                    //         path: __dirname + "../../public/images/customLogo.png",
                    //         cid: "myImg"
                    //     }
                    // ]
                };
                await EmailServiceInstance.sendMessage(message);
            }
        });
        res.status(201).send("Email was sent!");

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