const nodemailer = require("nodemailer");
const createError = require("http-errors");
const { EMAIL } = require("../config");;

module.exports = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "hotmail",
            // host: EMAIL.EHOST,
            auth: {
                user: EMAIL.EUSER,
                pass: EMAIL.EPASSWORD
            },
        })
    }

    async sendMessage(mail) {

        try {
            const message = mail;
            message.from = EMAIL.EFROM.replace(/ADMIN/, "no-reply");

            return await this.transporter.sendMail(message)
                .then((info) => {
                    console.log("info inside then!", info);
                    return { success: "Success" };
                })
                .catch(err => {
                    console.log(err); 
                    throw createError(500, err.message.replace(EMAIL.EUSER, "theSecretAdminEmail"));
                });

        } catch (error) {
            throw error;
        }

    }

    // Make another method for HTML 1 the orders the customer makes!
};