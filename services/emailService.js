const nodemailer = require("nodemailer");
const createError = require("http-errors");
const { EMAIL } = require("../config");;

module.exports = class EmailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            service: EMAIL.ESERVICE,
            // host: EMAIL.EHOST,
            auth: {
                user: EMAIL.EUSER,
                pass: EMAIL.EPASSWORD
            },
        })
    }

    async sendMessage(mail, messageType) {

        try {
            const message = mail;
            message.from = EMAIL.EFROM.replace(/ADMIN/, messageType);
            return await this.transporter.sendMail(message)
                .then((info) => {
                    console.log("info inside then!", info);
                    return { success: "Success" };
                })
                .catch(err => {
                    const msg = err.message.replace(EMAIL.EUSER, "theSecretAdminEmail");
                    throw createError(500, msg);
                });

        } catch (error) {
            throw error;
        }
    }
};