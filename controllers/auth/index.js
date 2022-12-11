const register = require("./register");
const login = require("./login");
const verify = require("./verify");
const resendEmail = require("./resendEmail");
const getCurrent = require("./getCurrent");
const logout = require("./logout");
const del = require("./delete");
const getBalance = require("./getBalance");

module.exports = {
  register,
  verify,
  resendEmail,
  login,
  getCurrent,
  logout,
  delete: del,
  getBalance,
};
