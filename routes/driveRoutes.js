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
const { validateParams } = require("../validators/validators");
const { fileSchema, folderSchema } = require("../validators/paramsValidator");

const driverRoutes = (isAuth) => {
  const driveRouter = new Router();
  // Do I need to make sure the logged in user can only run CRUD methods on their files and folders?

  // GET requests
  driveRouter.get("/", getDrive);
  driveRouter.get(
    "/folder/:folderID",
    validateParams(folderSchema),
    getDriveFolder
  );
  // driveRouter.get("/download/file/:fileID", downloadFile);

  // POST requests
  driveRouter.post(
    ["/folder/:folderID/files/upload", "/folder/:folderID/folder/create"],
    validateParams(folderSchema)
  );

  driveRouter.post(
    ["/files/upload", "/folder/:folderID/files/upload"],
    postFilesUpload
  );

  driveRouter.post(
    ["/folder/create", "/folder/:folderID/folder/create"],
    postFolderCreate
  );

  // PUT requests
  driveRouter.put("/file/:fileID", validateParams(fileSchema), putFile);
  driveRouter.put("/folder/:folderID", validateParams(folderSchema), putFolder);

  // DELETE requests
  driveRouter.delete("/file/:fileID", validateParams(fileSchema), deleteFile);
  driveRouter.delete(
    "/folder/:folderID",
    validateParams(folderSchema),
    deleteFolder
  );

  return driveRouter;
};

module.exports = driverRoutes;
