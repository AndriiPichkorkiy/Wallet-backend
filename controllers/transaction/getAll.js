const { Transaction } = require('../../models/transaction')

const getAll = async (req, res) => {
    const owner = req.user._id;
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const transactions = await Transaction.find({ owner }, "-category._id").sort({ date: -1 }).skip(skip).limit(limit);

    const quantity = await Transaction.count({ owner });

    const data = {
        quantity, 
        transactions
    }
    res.json(data);
}

module.exports = getAll;