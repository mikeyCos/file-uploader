const asyncHandler = require("express-async-handler");
const { getFileById, getFolderById } = require("../db/prisma");

const componentsController = {
  getFileDetails: asyncHandler(async (req, res) => {
    const { fileID } = req.params;
    const file = await getFileById(fileID);

    res.render("fileDetails", { file });
  }),
  getUploadFileForm: asyncHandler(async (req, res) => {
    res.render("uploadForm");
  }),
  getAddFolderForm: asyncHandler(async (req, res) => {
    res.render("createFolderForm");
  }),
  getEditFileForm: asyncHandler(async (req, res) => {
    const { fileID } = req.params;
    const file = await getFileById(fileID);

    res.render("editFileForm", {
      file,
    });
  }),
  getEditFolderForm: asyncHandler(async (req, res) => {
    const { folderID } = req.params;
    const folder = await getFolderById(folderID);

    res.render("editFolderForm", {
      folder,
    });
  }),
  getDeleteFileForm: asyncHandler(async (req, res) => {
    const { fileID } = req.params;
    const file = await getFileById(fileID);

    res.render("deleteFileForm", {
      fileID,
      msg: `Are you sure you want to delete file, "${file.name}"?`,
    });
  }),
  getDeleteFolderForm: asyncHandler(async (req, res) => {
    const { folderID } = req.params;
    const folder = await getFolderById(folderID);

    res.render("deleteFolderForm", {
      folderID,
      msg: `Are you sure you want to delete folder, "${folder.name}"?`,
    });
  }),
  getShareFolderForm: asyncHandler(async (req, res) => {
    const { folderID } = req.params;

    res.render("shareFolderForm", { folderID });
  }),
};

module.exports = componentsController;
