const { Router } = require("express");
const {
  getDrive,
  getDriveFolder,
  postFilesUpload,
  postFolderCreate,
  putFile,
  putFolder,
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
driveRouter.put("/file/:fileID");
driveRouter.put("/folder/:folder");

// DELETE requests
driveRouter.delete("/file/:fileID", deleteFile);
driveRouter.delete("/folder/:folderID", deleteFolder);

module.exports = driveRouter;
