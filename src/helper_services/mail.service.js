const nodemailer = require('nodemailer');
const ejs = require('ejs');

const mailer = async function (email, subject, template, options) {
  try {
    return new Promise((resolve, reject) => {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
          },
          logger: true, // log to console
          debug: true, // include SMTP traffic in the logs
        });

        ejs.renderFile(template, options, (error, result) => {
          if (error) {
            console.log(error);
            reject(error);
          } else {
            transporter
              .sendMail({ to: email, subject: subject, from: process.env.SMTP_EMAIL, html: result })
              .then((info) => {
                console.log('message sent successfully');
                resolve('Password Reset Link Sent To Your Email');
              })
              .catch((error) => {
                console.log(error);
                reject(error);
              });
          }
        });
      } catch (error) {
        console.log('Error in main catch in mailer service', error);
      }
    });
  } catch (error) {
    console.log('Error in main catch in mailer service', error);
  }
};

module.exports = mailer;
