const register = require("./register");
const login = require("./login");
const verify = require("./verify");
const resendEmail = require("./resendEmail");
const getCurrent = require("./getCurrent");

module.exports = {
  register,
  verify,
  resendEmail,
  login,
  getCurrent,
};
