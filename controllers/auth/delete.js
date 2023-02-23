const { User } = require("../../models/user");
const { Transaction } = require("../../models/transaction");
const { RequestError } = require("../../helpers");

const del = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOneAndDelete({ email });
  if (!user) {
    throw RequestError(401, "Email is wrong");
  }

  await Transaction.deleteMany({ owner: user._id })
  res.json({ message: `${email} was deleted` });
};

module.exports = del;
