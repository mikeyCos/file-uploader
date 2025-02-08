const asyncHandler = require("express-async-handler");

const path = require("path");
const rootPath = path.join(__dirname, "..");
const viewsPartialsPath = path.join(rootPath, "views/partials");

const componentsController = {
  getUploadFileForm: asyncHandler(async (req, res) => {
    res.render("uploadForm");
  }),
  getAddFolderForm: asyncHandler(async (req, res) => {
    res.render("addFolderForm");
  }),
};

module.exports = componentsController;
