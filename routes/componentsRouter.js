const { Router } = require("express");
const {
  getUploadFileForm,
  getAddFolderForm,
} = require("../controllers/componentsController");

const componentRouter = new Router();

// GET requests
componentRouter.get("/file", getUploadFileForm);
componentRouter.get("/folder", getAddFolderForm);

module.exports = componentRouter;
