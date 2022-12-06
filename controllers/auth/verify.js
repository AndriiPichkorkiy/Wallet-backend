const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const { SECRET_KEY_JWT } = process.env;

const verify = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw RequestError(404, "User not found");
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY_JWT, { expiresIn: "72h" });
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
    token,
  });

  res.json({ token, message: "Verification success" });
};

module.exports = verify;
