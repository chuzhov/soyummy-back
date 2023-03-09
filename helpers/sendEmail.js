const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

//* ** EMAIL OBJECT STRUCTURE:  ***/
//
// const msg = {
//     to: 'test@example.com', // Change to your recipient
//     from: 'test@example.com', // Change to your verified sender
//     subject: 'Sending with SendGrid is Fun',
//     text: 'and easy to do anywhere, even with Node.js',
//     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
//   }

const sendEmail = async (email) => {
  try {
    const answer = await sgMail.send(email);
    return answer[0].statusCode; // returns 202 statusCode if sent
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
