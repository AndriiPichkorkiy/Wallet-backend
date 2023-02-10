const { RequestError } = require("../../helpers");
const { Transaction } = require("../../models/transaction");
// const { User } = require("../../models/user");

const deleteById = async (req, res) => {
    const data = await Transaction.findByIdAndRemove(req.params.id);
    if (!data) throw RequestError(404);

    res.status(201).json(data);
};

module.exports = deleteById;