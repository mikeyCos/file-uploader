const { Router } = require("express");
const {
  postFileUpload,
  postFolderCreate,
} = require("../controllers/driveController");

const driveRouter = new Router();

// GET requests

// POST requests
driveRouter.post("/upload/file", postFileUpload);
driveRouter.post("/folder/create", postFolderCreate);

module.exports = driveRouter;
