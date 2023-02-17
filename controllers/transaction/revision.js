const { RequestError } = require("../../helpers");
const { Transaction } = require("../../models/transaction");
const { User } = require("../../models/user");

const revision = async (_, res) => {
    // Отримуємо список всіх транзакцій в колекції Transactions - поля _id та owner
    const transactions = await Transaction.find({}, "owner")
    const users = await User.find({}, "_id");

    // Перебираємо транзакції та шукаємо, у яких з них немає власника
    const withOutOwner = [];
    transactions.forEach(t => {
        const include = users.find(user => `${user._id}` === `${t.owner}`);
        if (!include) withOutOwner.push(t.owner);
    });

    if(!withOutOwner.length) throw RequestError(404, "No transactions found without an owner.");
    
    // Залишаємо унікальні значення
    const unicueWithOutOwner = withOutOwner.filter(
        (id, index, array) => array.indexOf(id) === index);
    
    // Видаляємо транзакції, у яких немає власника з БД
    unicueWithOutOwner.forEach(async (owner) => await Transaction.deleteMany({ owner }));
    res.status(200).json(`Success! Deleted ${withOutOwner.length} transactions without owner.`);
};

module.exports = revision;