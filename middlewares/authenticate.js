const { RequestError } = require("../helpers");
const jwt = require("jsonwebtoken");
const { User } = require("../models/user");
const { SECRET_KEY_JWT } = process.env;

const anthenticate = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) throw RequestError(401);
    const [bearer, token] = authorization.split(" ");
    
    if (bearer !== "Bearer") {
      throw RequestError(401);
    }
    if (!token) throw RequestError(401, "token invalid data");
    const { id } = jwt.verify(token, SECRET_KEY_JWT);
    const user = await User.findById(id);
    if (!user || user.token !== token) {
      throw RequestError(401);
    }
    req.user = user;
    next();
  } catch (error) {
    if (!error.status) {
      error.status = 401;
    }
    next(error);
  }
};

module.exports = anthenticate;