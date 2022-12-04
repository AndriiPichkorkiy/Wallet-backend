const { User } = require("../../models/user");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");

const resendEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw RequestError(404, "User not found");
  }
  if (user.verify) {
    throw RequestError(400, "Email already verified");
  }

  const mail = createVerifyEmail(email, user.verificationToken);

  await sendEmail(mail);
  res.json({ message: "Verification success" });
};

module.exports = resendEmail;
