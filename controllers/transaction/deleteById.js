const { RequestError } = require("../../helpers");
const { Transaction } = require("../../models/transaction");
const { User } = require("../../models/user");

const deleteById = async (req, res) => {
    //Видаляємо транзакцію
    const data = await Transaction.findByIdAndRemove(req.params.id);
    if (!data) throw RequestError(404);

    //Визначаємо, будемо додавати чи віднімати amount. Якщо type === true, то віднімаємо
    const { owner, date, type, amount } = data;
    const amountUpd = !type ? amount : amount * (-1);

    //Параметер пошуку та заміни для наступних запитів
    const params = [{ $set: { balance: {$round: [{ $add: ["$balance", amountUpd] }, 2]} } }]

    // Змінити баланс в усіх наступних картках на значення amount з урахуванням type
    await Transaction.updateMany({ owner, date: { $gt: date } }, params);

    // Змінити значення балансу в User
    await User.findByIdAndUpdate(owner, params);

    res.status(201).json(data);
};

module.exports = deleteById;