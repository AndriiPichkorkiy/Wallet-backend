const { RequestError } = require('../../helpers');
const categories = require('../../data/categories');

const getCategories = (_, res) => {
if (!categories) throw RequestError(500, "Server error");
    const data = [];
    for (const key in categories) data.push({ id: key, name: categories[key] });
    res.json(data);
}

module.exports = getCategories