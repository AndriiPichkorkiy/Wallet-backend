const { User } = require("../../models/user");
const { RequestError, sendEmail, createVerifyEmail } = require("../../helpers");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const verificationToken = nanoid();
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
  });

  // const mail = createVerifyEmail(email, verificationToken);

  await sendEmail(createVerifyEmail(email, verificationToken));

  res.status(201).json({ name: result.name, email: result.email });
};

module.exports = register;
