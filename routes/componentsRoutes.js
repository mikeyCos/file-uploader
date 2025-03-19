const { Router } = require("express");
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
const { validateParams } = require("../validators/validators");
const { fileSchema, folderSchema } = require("../validators/paramsValidator");

const componentsRoutes = (isAuth) => {
  const componentsRouter = new Router();
  // GET requests
  componentsRouter.get("/form/file/upload", getUploadFileForm);
  componentsRouter.get("/form/folder/add", getAddFolderForm);
  componentsRouter.get("/form/file/edit/:fileID", getEditFileForm);
  componentsRouter.get(
    "/form/folder/edit/:folderID",
    validateParams(folderSchema),
    getEditFolderForm
  );
  componentsRouter.get("/form/file/delete/:fileID", getDeleteFileForm);
  componentsRouter.get("/form/folder/delete/:folderID", getDeleteFolderForm);
  componentsRouter.get("/form/folder/share/:folderID", getShareFolderForm);
  componentsRouter.get("/file/details/:fileID", getFileDetails);

  return componentsRouter;
};

module.exports = componentsRoutes;
