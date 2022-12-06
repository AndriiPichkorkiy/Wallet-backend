const { RequestError } = require('../../helpers');
const categories = require('../../data/categories');

const getCategories = (_, res) => {
if (!categories) throw RequestError(500, "Server error");
    const data = [];
    for (const key in categories)
        for (const nameKey in categories[key])
            data.push({
                id:   nameKey,
                name: categories[key][nameKey]
            }); 


    res.json(data);
}

module.exports = getCategories