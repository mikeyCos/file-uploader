const generateRandomIndex = require("./generateRandomIndex");
const generateStoragePath = require("./generateStoragePath");
const getFileExtension = require("./getFileExtension");
const getFilesFromPath = require("./getFilesFromPath");
const isExpired = require("./isExpired");
const logger = require("./logger");

module.exports = {
  generateRandomIndex,
  generateStoragePath,
  getFileExtension,
  getFilesFromPath,
  isExpired,
  logger,
};
