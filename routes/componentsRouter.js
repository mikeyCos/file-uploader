const { Router } = require("express");
const {
  getUploadFileForm,
  getAddFolderForm,
  postAddFolderForm,
  postFilesUploadForm,
} = require("../controllers/componentsController");

const componentRouter = new Router();

// GET requests
componentRouter.get("/file", getUploadFileForm);
componentRouter.get("/folder", getAddFolderForm);

// POST requests
componentRouter.post("/folder/create", postAddFolderForm);
componentRouter.post("/files/upload", postFilesUploadForm);

module.exports = componentRouter;
