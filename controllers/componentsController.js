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
    console.log(req.params);
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
    console.log(req.params);
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
      fileID,
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
      folderID,
      msg: `Are you sure you want to delete folder, "${folder.name}"?`,
    });
  }),
};

module.exports = componentsController;
