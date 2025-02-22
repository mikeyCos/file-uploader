const { Router } = require("express");
const {
  getDrive,
  getDriveFolder,
  postFilesUpload,
  postFolderCreate,
  deleteFolder,
  deleteFile,
} = require("../controllers/driveController");

const driveRouter = new Router();

// GET requests
driveRouter.get("/", getDrive);
driveRouter.get("/folder/:folderID", getDriveFolder);

// POST requests
driveRouter.post("/files/upload", postFilesUpload);
driveRouter.post("/folder/create", postFolderCreate);

// PUT requests

// DELETE requests
driveRouter.delete("/folders/:folderID/delete", deleteFolder);
driveRouter.delete("/files/:fileID/delete", deleteFile);

module.exports = driveRouter;
