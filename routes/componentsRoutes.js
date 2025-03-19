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
  componentsRouter.get(
    "/form/file/edit/:fileID",
    validateParams(fileSchema),
    getEditFileForm
  );
  componentsRouter.get(
    "/form/folder/edit/:folderID",
    validateParams(folderSchema),
    getEditFolderForm
  );
  componentsRouter.get(
    "/form/file/delete/:fileID",
    validateParams(fileSchema),
    getDeleteFileForm
  );
  componentsRouter.get(
    "/form/folder/delete/:folderID",
    validateParams(folderSchema),
    getDeleteFolderForm
  );
  componentsRouter.get(
    "/form/folder/share/:folderID",
    validateParams(folderSchema),
    getShareFolderForm
  );
  componentsRouter.get(
    "/file/details/:fileID",
    validateParams(fileSchema),
    getFileDetails
  );

  return componentsRouter;
};

module.exports = componentsRoutes;
