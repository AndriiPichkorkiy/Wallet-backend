const { User } = require("../../models/user");
const { RequestError } = require("../../helpers");

const del = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndDelete({ email });
  if (!user) {
    throw RequestError(401, "Email is wrong");
  }

  res.json({ message: `${email} was deleted` });
};

module.exports = del;
