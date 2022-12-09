const { RequestError } = require('../../helpers');
const { Transaction } = require('../../models/transaction');
const { User } = require('../../models/user')
const categories = require('../../data/categories');

const addTransaction = async (req, res) => {
    const { _id } = req.user;
    
    const { balance } = await User.findById(_id);
    if (balance === undefined) throw RequestError(500, "Server error");
    
    const { category: id, date, type, amount } = req.body;

    const variety = type ? "income" : "expenses";
    const name = categories[variety][id];
    if (!name) throw RequestError(400, "No category with this type found"); 
    const dec = amount * 10000 % 100; 
    if (dec !== 0) throw RequestError(400, "More than 2 decimal places")

    let currentBalance = type ? balance + amount : balance - amount;
    
    currentBalance = Math.round(currentBalance * 100) / 100;

    // Перевіряємо, чи не перевищує значення дати поточного значення
    const now = new Date();
    if (date >= now) throw RequestError(400, "Invalid date");

    await User.findByIdAndUpdate(_id, {balance: currentBalance}, {new: true})
    
    const data = await Transaction.create({ ...req.body, owner: _id, balance: currentBalance, category: {id, name}});
    if (!data) throw RequestError(500, "Server error");

    res.status(201).json(data);
}

module.exports = addTransaction;