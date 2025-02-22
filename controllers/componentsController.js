const asyncHandler = require("express-async-handler");
const { validationResult, matchedData } = require("express-validator");
const validateFolder = require("../validators/createFolderValidator");
const validateUpload = require("../validators/uploadValidator");
// const uploadFiles = require("../config/upload");
const prisma = require("../db/prisma");
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
  getEditFileForm: asyncHandler(async (req, res) => {
    console.log("req.params:", req.params);
    const { fileID } = req.params;
    const file = await prisma.file.findFirst({
      where: {
        id: fileID,
      },
    });
    res.render("editFileForm", { file });
  }),
  getEditFolderForm: asyncHandler(async (req, res) => {
    console.log("req.params:", req.params);
    const { folderID } = req.params;
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderID,
      },
    });

    console.log(folder);
    res.render("editFolderForm", { folder });
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
