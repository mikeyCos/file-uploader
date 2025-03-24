const path = require("path");

const rootPath = path.join(__dirname, "..");

const staticPath = path.join(rootPath, "public");
// const scriptsPath = path.join(rootPath, "scripts");

// Subdirectories in views directory
const viewsPagesPath = path.join(rootPath, "views/pages");
const viewsPartialsPath = path.join(rootPath, "views/partials");

const viewsPaths = [viewsPagesPath, viewsPartialsPath];

module.exports = {
  staticPath,
  viewsPaths,
};
