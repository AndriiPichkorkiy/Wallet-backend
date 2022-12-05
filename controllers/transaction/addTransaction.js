const { RequestError } = require('../../helpers');
const { Transaction } = require('../../models/transaction');
const categories = require('../../data/categories');

const addTransaction = async (req, res) => {
    // власника  беру з юзера. Поки що поставив перевірку та значення за замовчуванням для тестів
    const owner = req.user ? req.user._id : '638a338f9a43639507e794e4';
    console.log("req.user._id", req.user);
    // Баланс беру з юзера. Поки що поставив заглушку
    const balance = 3344.55;

    const { category: id, date } = req.body;
    
    const now = new Date();
    if (date >= now) throw RequestError(400, "Invalid date");
    
    const data = await Transaction.create({ ...req.body, owner, balance, category: {id, name: categories[id]} });
    if (!data) throw RequestError(500, "Server error");
    
    res.status(201).json(data);
}

module.exports = addTransaction;