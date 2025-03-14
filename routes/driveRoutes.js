const { Router } = require("express");
const {
  getDrive,
  getDriveFolder,
  downloadFile,
  postFilesUpload,
  postFolderCreate,
  putFile,
  putFolder,
  deleteFolder,
  deleteFile,
} = require("../controllers/driveController");

const driverRoutes = (isAuth) => {
  const driveRouter = new Router();

  // GET requests
  driveRouter.get("/", getDrive);
  driveRouter.get("/folder/:folderID", getDriveFolder);
  driveRouter.get("/download/file/:fileID", downloadFile);

  // POST requests
  // Need a way to reference the folder
  // /drive/folder/4fb7c85a-25ab-46e5-9194-ccb78acab261
  // /drive
  // /drive/folder/:folderID/files/upload
  // /drive/files/upload
  driveRouter.post(
    ["/files/upload", "/folder/:folderID/files/upload"],
    postFilesUpload
  );

  driveRouter.post(
    ["/folder/create", "/folder/:folderID/folder/create"],
    postFolderCreate
  );

  // PUT requests
  driveRouter.put("/file/:fileID", putFile);
  driveRouter.put("/folder/:folderID", putFolder);

  // DELETE requests
  driveRouter.delete("/file/:fileID", deleteFile);
  driveRouter.delete("/folder/:folderID", deleteFolder);

  return driveRouter;
};

module.exports = driverRoutes;
