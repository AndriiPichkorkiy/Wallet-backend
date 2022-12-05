const { Transaction } = require('../../models/transaction')

const getAll = async (req, res) => {
    const owner = req.user ? req.user._id : "638a338f9a43639507e794e4";
    console.log('req.query', req.query)
    const { page = 1, limit = 5 } = req.query;
    const skip = (page - 1) * limit;
    const data = await Transaction.find({owner}, " -updatedAt -category._id", {skip, limit})
    res.json(data)
}

module.exports = getAll;