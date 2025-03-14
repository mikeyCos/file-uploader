const asyncHandler = require("express-async-handler");
const { prisma } = require("../db/prisma");

const componentsController = {
  getFileDetails: asyncHandler(async (req, res) => {
    console.log("getFileDetails running...");
    const { fileID } = req.params;
    const file = await prisma.file.findFirst({
      where: {
        id: fileID,
      },
    });

    res.render("fileDetails", { file });
  }),
  getUploadFileForm: asyncHandler(async (req, res) => {
    console.log("getUploadFileForm running...");
    console.log("req.body:", req.body);
    res.render("uploadForm");
  }),
  getAddFolderForm: asyncHandler(async (req, res) => {
    // folderName_onInput
    console.log("getAddFolderForm running...");
    console.log("req.body:", req.body);
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
  getShareFolderForm: asyncHandler(async (req, res) => {
    console.log("getShareFolderForm running...");
    const { folderID } = req.params;

    res.render("shareFolderForm", { folderID });
  }),
};

module.exports = componentsController;
