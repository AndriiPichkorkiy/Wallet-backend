const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_KEY, EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: EMAIL };

  const responseEmail = await sgMail.send(email);
  console.log("responseEmail", responseEmail);
  return true;
};

module.exports = sendEmail;
