const getAll = require('./getAll');
const addTransaction = require('./addTransaction');
const getCategories = require('./getCategories');
const getStatistic = require('./getStatistic');
const addTestTransactions = require('./addTestTransactions');
const deleteById = require("./deleteById");
const revision = require("./revision");

module.exports = {
    getAll,
    addTransaction,
    getCategories,
    getStatistic,
    addTestTransactions,
    deleteById,
    revision
}