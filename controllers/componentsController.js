const asyncHandler = require("express-async-handler");
const { matchedData } = require("express-validator");
const { getFileById, getFolderById } = require("../db/prisma");

const componentsController = {
  getFileDetails: asyncHandler(async (req, res) => {
    const { fileID } = req.params;
    const { user } = req;
    const file = await getFileById(user.id, fileID);

    res.render("fileDetails", { file });
  }),
  getUploadFileForm: asyncHandler(async (req, res) => {
    res.render("uploadForm");
  }),
  getAddFolderForm: asyncHandler(async (req, res) => {
    res.render("createFolderForm");
  }),
  getEditFileForm: asyncHandler(async (req, res) => {
    const { user } = req;
    const { fileID } = req.params;
    const file = await getFileById(user.id, fileID);

    res.render("editFileForm", {
      file,
    });
  }),
  getEditFolderForm: asyncHandler(async (req, res) => {
    const { user } = req;
    const { folderID } = req.params;
    const folder = await getFolderById(user.id, folderID);

    res.render("editFolderForm", {
      folder,
    });
  }),
  getDeleteFileForm: asyncHandler(async (req, res) => {
    const { user } = req;
    const { fileID } = req.params;
    const file = await getFileById(user.id, fileID);

    res.render("deleteFileForm", {
      fileID,
      msg: `Are you sure you want to delete file, "${file.name}"?`,
    });
  }),
  getDeleteFolderForm: asyncHandler(async (req, res) => {
    const { user } = req;
    const { folderID } = req.params;
    const folder = await getFolderById(user.id, folderID);

    res.render("deleteFolderForm", {
      folderID,
      msg: `Are you sure you want to delete folder, "${folder.name}"?`,
    });
  }),
  getShareFolderForm: asyncHandler(async (req, res) => {
    const { folderID } = req.params;

    res.render("shareFolderForm", { folderID });
  }),
  getItemControls: asyncHandler(async (req, res) => {
    console.group("getItemControls running...");
    const { fileID, folderID } = matchedData(req, { onlyValidData: true });
    const item = await (fileID
      ? getFileById(null, fileID)
      : getFolderById(null, folderID));
    const type = fileID ? "file" : "folder";

    res.render("itemControls", { item, type });
  }),
};

module.exports = componentsController;
