const { User } = require("../../models/user");

const getBalance = async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id);
  res.json({
    balance: user.balance,
  });
};

module.exports = getBalance;
