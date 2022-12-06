const { Transaction } = require('../../models/transaction')


const getStatistic= async (req, res) => {
    console.log('Run controller getStatistic')
    
    res.json({ "message": "Hello World!" })
}

module.exports = getStatistic;