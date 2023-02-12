const { isValidObjectId } = require('mongoose');
const { RequestError } = require("../helpers");

const isValidId = (req, _, next) => {
    const { id } = req.query;
    const result = isValidObjectId(id)
    if (!result) { next(RequestError(400, "Invalid id format")) };
    next()
}

module.exports = isValidId;