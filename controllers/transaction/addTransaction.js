const { RequestError, round } = require("../../helpers");
const { Transaction } = require("../../models/transaction");
const { User } = require("../../models/user");
const categories = require("../../data/categories");

const addTransaction = async (req, res) => {
  const { _id } = req.user;

  // Всякі перевірки
  const user = await User.findById(_id);
  const { balance } = user;
  if (balance === undefined) throw RequestError(500, "Server error");

  const { category: id, date, type } = req.body;
  let { amount } = req.body;
  if (typeof(amount) === "string") amount = Number(amount);

  const variety = type ? "income" : "expenses";
  const name = categories[variety][id];
  if (!name) throw RequestError(400, "No category with this type found");

  const dec = (amount * 10000) % 100;
  if (dec !== 0) throw RequestError(400, "More than 2 decimal places");
  
  const now = new Date();
  if (date > +now) throw RequestError(400, `'date' must be less than or equal to '${now.toISOString()}'`);

  //Якщо баланс більше 0, то є сенс знайти першу попередню картку від дати поточної транзакції і звідти витягти баланс
  let previousBalance = 0;
  if (balance || balance === 0) {
    const previousCard = await Transaction.findOne({ owner: _id, date: { $lte: date } }).sort({ date: -1 });
    previousBalance = previousCard ? previousCard.balance: 0;
  }
 // Витягуємо попередній баланс, додаємо amount, закидаємо в картку і записуємо її в БД
  const balanceDate = type ? previousBalance + amount : previousBalance - amount;
  const data = await Transaction.create({
    ...req.body,
    owner: _id,
    balance: round(balanceDate),
    category: { id, name },
  });
  if (!data) throw RequestError(500);

  // Змінити баланс в усіх наступних картках на значення amount з урахуванням type
  const amountUpd = type ? amount : amount * (-1);
  const params = [{ $set: { balance: {$round: [{ $add: ["$balance", amountUpd] }, 2]} } }];

  await Transaction.updateMany({owner: _id, date: { $gt: date }}, params);

  await User.findByIdAndUpdate(_id, params);

  res.status(201).json(data);
};

module.exports = addTransaction;