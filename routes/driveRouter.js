const { Router } = require("express");
const {
  postFilesUpload,
  postFolderCreate,
} = require("../controllers/driveController");

const driveRouter = new Router();

// GET requests

// POST requests
driveRouter.post("/upload/files", postFilesUpload);
driveRouter.post("/folder/create", postFolderCreate);

module.exports = driveRouter;
