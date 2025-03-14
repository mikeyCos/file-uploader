const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const {
  getFileDetails,
  getUploadFileForm,
  getAddFolderForm,
  getEditFileForm,
  getEditFolderForm,
  getDeleteFileForm,
  getDeleteFolderForm,
  getShareFolderForm,
} = require("../controllers/componentsController");

const componentsRoutes = (isAuth) => {
  const componentsRouter = new Router();
  // GET requests
  componentsRouter.get("/form/file/upload", getUploadFileForm);
  componentsRouter.get("/form/folder/add", getAddFolderForm);
  componentsRouter.get("/form/file/edit/:fileID", getEditFileForm);
  componentsRouter.get("/form/folder/edit/:folderID", getEditFolderForm);
  componentsRouter.get("/form/file/delete/:fileID", getDeleteFileForm);
  componentsRouter.get("/form/folder/delete/:folderID", getDeleteFolderForm);
  componentsRouter.get("/form/folder/share/:folderID", getShareFolderForm);
  componentsRouter.get("/file/details/:fileID", getFileDetails);
  // POST requests
  // componentsRouter.post("/form/folder/create", postAddFolderForm);
  // componentsRouter.post("/form/files/upload", postFilesUploadForm);
  // componentsRouter.post("/form/file/edit/:fileID", postEditFileForm);
  // componentsRouter.post("/form/folder/edit/:folderID", postEditFolderForm);

  return componentsRouter;
};

module.exports = componentsRoutes;
