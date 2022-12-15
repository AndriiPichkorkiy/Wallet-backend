const { Transaction } = require("../../models/transaction");
const { getDates, round } = require("../../helpers");
const categories = require("../../data/categories");

const getStatistic = async (req, res) => {
  const { _id } = req.user;
  const { year, month } = req.query;

  const { startDate, endDate } = getDates(year, month);

  const data = await Transaction.aggregate([
    {
      $match: {
        owner: _id,
        // type: false,
        date: { $gte: startDate, $lt: endDate },
      },
    },
    {
      $group: {
        _id: "$category.id",
        quantity: { $sum: "$amount" },
      },
    },
    {
      $project: {
        _id: 0,
        categoryId: "$_id",
        quantity: "$quantity",
      },
    },
  ]).sort({ categoryId: 1 });

  const stats = [];
  let expenses = 0;
  let income = 0;

  for (const obj of data) {
    const { categoryId } = obj;
    const quantity = round(obj.quantity);
    if (Number(categoryId) > 10500) {
      income = round(income + quantity);
    } else {
      expenses = round(expenses + quantity);
      stats.push({
        id: categoryId,
        name: categories.expenses[categoryId],
        quantity,
      });
    }
  }
  res.json({
    stats,
    totalStats: {
      expenses,
      income
    },
  });
};

module.exports = getStatistic;