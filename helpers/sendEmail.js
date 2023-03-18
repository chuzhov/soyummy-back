const sgMail = require('@sendgrid/mail');
const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async email => {
  try {
    const answer = await sgMail.send(email);
    return answer[0].statusCode; // returns 202 statusCode if sent
  } catch (error) {
    return error;
  }
};

module.exports = sendEmail;
