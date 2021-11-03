const nodemailer = require('nodemailer');

const ejs = require('ejs');

const mailer = async function (email, subject, template, options) {
  try {
    return new Promise((resolve, reject) => {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          pool: true,
          host: process.env.SMTP_HOST,
          port: process.env.SMTP_PORT,
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD,
          },
          tls: {
            // do not fail on invalid certs
            rejectUnauthorized: true,
          },
          secure: false,
          logger: true, // log to console
          debug: true, // include SMTP traffic in the logs
        });

        ejs.renderFile(template, options, (error, result) => {
          if (error) {
            console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', error);
            reject(error);
          } else {
            transporter
              .sendMail({
                to: email,
                subject: subject,
                from: process.env.SMTP_EMAIL,
                html: result,
              })
              .then((info) => {
                console.log('message sent successfully');
                resolve('Password Reset Link Sent To Your Email');
              })
              .catch((error) => {
                console.log('errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr', error);
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
