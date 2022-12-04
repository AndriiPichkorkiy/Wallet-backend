// const { BASE_URL } = process.env;
const createTemplate = require("./emailTemplate");

const createVerifyEmail = (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "verification email",
    html: createTemplate(verificationToken),
  };
  return mail;
};

module.exports = createVerifyEmail;
