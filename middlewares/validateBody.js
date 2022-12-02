const { requestError} = require('../helpers')

const validateBody = schema => {
    const func = async (req, res, next) => {
        const {error} = schema.validate(req.body);
        if (error) next(requestError(400, error.message.replaceAll('"', "'")));
        next();
    }
    return func;
};

module.exports = validateBody;