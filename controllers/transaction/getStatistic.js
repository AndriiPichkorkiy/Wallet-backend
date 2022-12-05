const { Transaction } = require('../../models/transaction')


const getStatistic= async (req, res) => {
    console.log('getDate');
    const data = await Transaction.aggregate([
        {
            $group: {
                _id: {
                    month: { $month: '$createdAt' },
                    year: { $year: '$createdAt' }
                },
                count: { $sum: 1 }
            }
        },
        { $sort: { count: -1, '_id.year': -1, '_id.month': -1 } }
    ]);

    res.json(data);
}

module.exports = getStatistic;