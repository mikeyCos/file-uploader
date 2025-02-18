const { Router } = require("express");
const {
  getUploadFileForm,
  getAddFolderForm,
  postAddFolderForm,
  postFilesUploadForm,
} = require("../controllers/componentsController");

const componentsRouter = new Router();

// GET requests
componentsRouter.get("/file", getUploadFileForm);
componentsRouter.get("/folder", getAddFolderForm);

// POST requests
componentsRouter.post("/folder/create", postAddFolderForm);
componentsRouter.post("/files/upload", postFilesUploadForm);

module.exports = componentsRouter;
