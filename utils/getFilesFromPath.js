const path = require("path");
const fsPromises = require("node:fs/promises");

const rootPath = path.join(__dirname, "..");
const uploadsPath = path.join(rootPath, "uploads");

const getFilesFromPath = async (path = uploadsPath) => {
  // Path must be a string
  // Path must be a valid path in local file system
  // How to filter files and use fsPromises.stat(path[, options], callback)?
  const files = await fsPromises.readdir(uploadsPath, { withFileTypes: true });
  return files.filter((file) => file.isFile());
};

module.exports = getFilesFromPath;
