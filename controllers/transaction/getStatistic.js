const { RequestError } = require("../../helpers");
const { Transaction } = require('../../models/transaction');
const { User } = require('../../models/user');
const { getDates, round } = require('../../helpers');
const categories = require('../../data/categories');


const getStatistic = async (req, res) => {
    const { _id } = req.user;
    const { year, month } = req.query;
    const { startDate, endDate } = getDates(Number(year), Number(month));
    
    const data = await Transaction.aggregate([
    {
        $match: {
            owner: _id,
            // type: false,
            date: { $gte: startDate, $lt: endDate }
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
            quantity: "$quantity"
        },
    },
    ]);

    const sortData = data.sort((a, b) => a.categoryId - b.categoryId);

    const { balance: totalBalance } = await User.findById(_id);
    if (totalBalance === undefined) throw RequestError(500, "Server error");
    
    let stats = [];
    let expenses = 0;
    let income  = 0;
    
    for (const obj of sortData) {
        let { categoryId } = obj;
        quantity = round(obj.quantity);
        if (Number(categoryId) > 10500) { income = round(income + quantity) }
        else { expenses = round(expenses + obj.quantity); stats.push({id: categoryId, name: categories.expenses[categoryId], quantity })}
    }

    res.json({
        stats,
        totalStats: {
            expenses,
            income,
            totalBalance
        }
    })
}


module.exports = getStatistic;