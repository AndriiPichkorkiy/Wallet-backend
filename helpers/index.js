const wrapper = require('./wrapper');
const handleSchemaErrors = require('./handleSchemaErrors');
const requestError = require('./requestError')

const RequestError = require("./RequestError");
const handleSaveErrors = require("./handleSaveErrors");
const ctrlWrapper = require("./ctrlWrapper");

module.exports = {
  RequestError,
  handleSaveErrors,
  ctrlWrapper,
};

module.exports = {
    wrapper,
    handleSchemaErrors,
    requestError
}