const nodemailer = require('nodemailer');
const ejs = require("ejs");

var mailer = async function(email, subject, template, options) {
    try {
        return new Promise((resolve, reject) => {
            try {
                var transporter = nodemailer.createTransport({
                    host: process.env.MAIL_HOST,
                    port: process.env.MAIL_PORT,
                    auth: {
                        user: process.env.MAIL_USER,
                        pass: process.env.MAIL_PASS
                    },
                    logger: false, // log to console
                    debug: true // include SMTP traffic in the logs
                });
                ejs.renderFile(template, options, function(error, result) {
                    if (error) {
                        reject(error);
                    } else {
                        transporter.sendMail({
                            to: email,
                            subject: subject,
                            from: `Fancy <${process.env.MAIL_SENDER}>`,
                            html: result
                        }).then((info) => {
                            console.log("message sent successfully ");
                            resolve(info);
                        }).catch((error) => {
                            reject(error);
                        });
                    }
                });
            } catch (error) {
                console.log("Error in main catch in mailer service", error);
            }
        });
    } catch (error) {
        console.log("Error in main catch in mailer service", error);
    }
}

module.exports = mailer;