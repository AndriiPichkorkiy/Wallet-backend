const { Transaction } = require('../../models/transaction')

const getAll = async (req, res) => {
    const owner = req.user._id;
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const data = await Transaction.find({ owner }, "-category._id", { skip, limit })
    res.json(data)
}

module.exports = getAll;