const { RequestError } = require("../../helpers");
const  recalculateTransaction  = require("../../helpers/recalculate");
const { Transaction } = require("../../models/transaction");

const deleteById = async (req, res) => {
    const data = await Transaction.findByIdAndRemove(req.query.id);
    if (!data) throw RequestError(404);

    const { owner, date, type, amount } = data;
    await recalculateTransaction(!type, amount, owner, date);
    res.status(200).json(data);
};

module.exports = deleteById;