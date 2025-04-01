const validateCreateAccount = require("./createAccountValidator");
const validateFilename = require("./filenameValidator");
const validateFolder = require("./folderValidator");
const validateLogin = require("./loginValidator");
const { validateParams } = require("./paramsValidator");
const { validateQuery } = require("./queryValidator");
const validateShareDuration = require("./shareDurationValidator");
const validateUpload = require("./uploadValidator");

module.exports = {
  validateCreateAccount,
  validateFilename,
  validateFolder,
  validateLogin,
  validateParams,
  validateQuery,
  validateShareDuration,
  validateUpload,
};
