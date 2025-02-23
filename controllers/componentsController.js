const asyncHandler = require("express-async-handler");
const { validationResult, matchedData } = require("express-validator");
const validateFolder = require("../validators/createFolderValidator");
const validateUpload = require("../validators/uploadValidator");
// const uploadFiles = require("../config/upload");
const prisma = require("../db/prisma");
const upload = require("../config/upload");

const componentsController = {
  getUploadFileForm: asyncHandler(async (req, res) => {
    console.log("getUploadFileForm running...");
    res.render("uploadForm");
  }),
  getAddFolderForm: asyncHandler(async (req, res) => {
    // folderName_onInput
    console.log("getAddFolderForm running...");
    res.render("createFolderForm");
  }),
  getEditFileForm: asyncHandler(async (req, res) => {
    console.log("getEditFileForm");
    const { fileID } = req.params;
    const file = await prisma.file.findFirst({
      where: {
        id: fileID,
      },
    });

    res.render("editFileForm", {
      file,
    });
  }),
  getEditFolderForm: asyncHandler(async (req, res) => {
    console.log("getEditFolderForm");
    const { folderID } = req.params;
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderID,
      },
    });

    res.render("editFolderForm", {
      folder,
    });
  }),
  getDeleteFileForm: asyncHandler(async (req, res) => {
    console.log("getDeleteFileForm running...");
    const { fileID } = req.params;
    const file = await prisma.file.findFirst({
      where: {
        id: fileID,
      },
    });
    res.render("deleteFileForm", {
      msg: `Are you sure you want to delete file, "${file.name}"?`,
    });
  }),
  getDeleteFolderForm: asyncHandler(async (req, res) => {
    console.log("getDeleteFolderForm running...");
    const { folderID } = req.params;
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderID,
      },
    });
    res.render("deleteFolderForm", {
      msg: `Are you sure you want to delete folder, "${folder.name}"?`,
    });
  }),
  postAddFolderForm: [
    // validateFolder("createFolderForm"),
    asyncHandler(async (req, res) => {
      console.log("postAddFolderForm running...");
      console.log("req.body:", req.body);
      // res.sendStatus(200);
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
