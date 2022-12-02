const { requestError } = require('../../helpers');
const { Transaction } = require('../../models/transaction');

const addTransaction = async (req, res) => {
    // власника  беру з юзера. Поки що поставив перевірку та значення за замовчуванням для тестів
    const owner = req.user ? req.user._id : '6387ccde7972c012989f7fd6';
    // Баланс беру з юзера. Поки що поставив заглушку
    const balance = 3344.55;
    const data = await Transaction.create({ ...req.body, owner, balance });
    if (!data) throw requestError(500, "Server error");
    
    res.status(201).json(data);
}

module.exports = addTransaction;