const { RequestError } = require("../helpers");

const validateParams = (schema) => {
  const func = async (req, res, next) => {
    const { error } = schema.validate(req.query);
    if (error) {
      next(RequestError(400, error.message.replaceAll('"', "'")));
    }
    next();
  };
  return func;
};

module.exports = validateParams;