const { Router } = require("express");
const {
  getUploadFileForm,
  getAddFolderForm,
  getEditFileForm,
  getEditFolderForm,
  postAddFolderForm,
  postFilesUploadForm,
} = require("../controllers/componentsController");

const componentsRouter = new Router();

// GET requests
componentsRouter.get("/uploadFile", getUploadFileForm);
componentsRouter.get("/addFolder", getAddFolderForm);
componentsRouter.get("/editFile/:fileID", getEditFileForm);
componentsRouter.get("/editFolder/:folderID", getEditFolderForm);

// POST requests
componentsRouter.post("/folder/create", postAddFolderForm);
componentsRouter.post("/files/upload", postFilesUploadForm);

module.exports = componentsRouter;
