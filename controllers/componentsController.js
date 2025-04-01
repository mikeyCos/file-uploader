const asyncHandler = require("express-async-handler");
const { matchedData } = require("express-validator");
const { getFileById, getFolder } = require("../db/prisma");

const componentsController = {
  getFileDetails: asyncHandler(async (req, res) => {
    const { fileID } = req.params;
    const { user } = req;
    const file = await getFileById(null, fileID);

    res.render("fileDetails", { file });
  }),
  getUploadFileForm: asyncHandler(async (req, res) => {
    res.render("./forms/uploadForm");
  }),
  getAddFolderForm: asyncHandler(async (req, res) => {
    res.render("./forms/createFolderForm");
  }),
  getEditFileForm: asyncHandler(async (req, res) => {
    const { user } = req;
    const { fileID } = req.params;
    const file = await getFileById(user.id, fileID);

    res.render("./forms/editFileForm", {
      file,
    });
  }),
  getEditFolderForm: asyncHandler(async (req, res) => {
    const { user } = req;
    const { folderID } = req.params;
    const folder = await getFolder(folderID, user.id);

    res.render("./forms/editFolderForm", {
      folder,
    });
  }),
  getDeleteFileForm: asyncHandler(async (req, res) => {
    const { user } = req;
    const { fileID } = req.params;
    const file = await getFileById(user.id, fileID);

    res.render("./forms/deleteFileForm", {
      fileID,
      msg: `Are you sure you want to delete file, "${file.name}"?`,
    });
  }),
  getDeleteFolderForm: asyncHandler(async (req, res) => {
    const { user } = req;
    const { folderID } = req.params;
    const folder = await getFolder(folderID, user.id);

    res.render("./forms/deleteFolderForm", {
      folderID,
      msg: `Are you sure you want to delete folder, "${folder.name}"?`,
    });
  }),
  getShareFolderForm: asyncHandler(async (req, res) => {
    const { folderID } = req.params;

    res.render("./forms/shareFolderForm", { folderID });
  }),
  getItemControls: asyncHandler(async (req, res) => {
    console.group("getItemControls running...");
    console.log("req.query:", req.query);
    console.log("matchedData:", matchedData(req, { onlyValidData: true }));
    const { share } = req.query;
    const { fileID, folderID } = matchedData(req, { onlyValidData: true });
    const item = await (fileID
      ? getFileById(null, fileID)
      : getFolder(folderID, null));
    const type = fileID ? "file" : "folder";

    console.log("!!(share && true):", !!(share && true));

    res.render("itemControls", {
      item,
      type,
      public: !!(share && true),
    });
  }),
};

module.exports = componentsController;
