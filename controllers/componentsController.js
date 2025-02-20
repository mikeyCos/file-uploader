const asyncHandler = require("express-async-handler");
const { validationResult, matchedData } = require("express-validator");
const validateFolder = require("../validators/createFolderValidator");
const validateUpload = require("../validators/uploadValidator");
// const uploadFiles = require("../config/upload");
const upload = require("../config/upload");

const componentsController = {
  getUploadFileForm: asyncHandler(async (req, res) => {
    console.log("res.locals:", res.locals);
    res.render("uploadForm");
  }),
  getAddFolderForm: asyncHandler(async (req, res) => {
    // folderName_onInput
    res.render("createFolderForm");
  }),
  postAddFolderForm: [
    validateFolder("createFolderForm"),
    asyncHandler(async (req, res) => {
      console.log("postAddFolderForm running...");
      console.log("req.body:", req.body);
      res.sendStatus(200);
    }),
  ],
  postFilesUploadForm: [
    upload,
    validateUpload("uploadForm"),
    asyncHandler(async (req, res) => {
      console.log("postFilesUploadForm running...");
      console.log("req.body:", req.body);
      console.log("req.files:", req.files);

      res.sendStatus(200);
    }),
  ],
};

module.exports = componentsController;
