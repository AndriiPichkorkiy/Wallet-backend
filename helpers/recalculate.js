const { User } = require("../models/user");
const { Transaction } = require("../models/transaction");

const recalculateTransaction = async(type, amount, owner, date) => {
    const amountUpd = type ? amount : amount * (-1);
    const params = [{ $set: { balance: {$round: [{ $add: ["$balance", amountUpd] }, 2]} } }]

    await Transaction.updateMany({ owner, date: { $gt: date } }, params);
    await User.findByIdAndUpdate(owner, params);
};

module.exports = recalculateTransaction;