const { Router } = require("express");
const prisma = require("../db/prisma");
const asyncHandler = require("express-async-handler");
const {
  getUploadFileForm,
  getAddFolderForm,
  getEditFileForm,
  getEditFolderForm,
  getDeleteFileForm,
  getDeleteFolderForm,
} = require("../controllers/componentsController");

const componentsRouter = new Router();

const tmp = asyncHandler(async (req, res, next) => {
  next();
});

// GET requests
componentsRouter.get("/form/file/upload", getUploadFileForm);
componentsRouter.get("/form/folder/add", getAddFolderForm);
componentsRouter.get("/form/file/edit/:fileID", getEditFileForm);
componentsRouter.get("/form/folder/edit/:folderID", getEditFolderForm);
componentsRouter.get("/form/file/delete/:fileID", getDeleteFileForm);
componentsRouter.get("/form/folder/delete/:folderID", getDeleteFolderForm);

// POST requests
// componentsRouter.post("/form/folder/create", postAddFolderForm);
// componentsRouter.post("/form/files/upload", postFilesUploadForm);
// componentsRouter.post("/form/file/edit/:fileID", postEditFileForm);
// componentsRouter.post("/form/folder/edit/:folderID", postEditFolderForm);

module.exports = componentsRouter;
