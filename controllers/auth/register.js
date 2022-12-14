const { User } = require("../../models/user");
const {
  RequestError,
  sendEmail,
  createVerifyEmail,
  avatar,
} = require("../../helpers");
const bcrypt = require("bcrypt");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw RequestError(409, "Email in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const userAvatar = avatar();

  const verificationToken = nanoid();
  const result = await User.create({
    name,
    email,
    password: hashPassword,
    verificationToken,
    avatar: userAvatar,
  });

  await sendEmail(createVerifyEmail(email, verificationToken));

  res
    .status(201)
    .json({ name: result.name, email: result.email, avatar: result.avatar });
};

module.exports = register;
