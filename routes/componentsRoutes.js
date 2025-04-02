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
  getItemControls,
} = require("../controllers/componentsController");
const { validateParams, validateQuery } = require("../validators/validators");
const { fileSchema, folderSchema } = require("../validators/paramsValidator");
const { shareSchema } = require("../validators/queryValidator");

const componentsRoutes = (isAuth) => {
  const componentsRouter = new Router();

  // GET requests
  componentsRouter.get("/form/file/upload", isAuth, getUploadFileForm);
  componentsRouter.get("/form/folder/add", isAuth, getAddFolderForm);
  componentsRouter.get(
    "/form/file/edit/:fileID",
    isAuth,
    validateParams(fileSchema),
    getEditFileForm
  );
  componentsRouter.get(
    "/form/folder/edit/:folderID",
    isAuth,
    validateParams(folderSchema),
    getEditFolderForm
  );
  componentsRouter.get(
    "/form/file/delete/:fileID",
    isAuth,
    validateParams(fileSchema),
    getDeleteFileForm
  );
  componentsRouter.get(
    "/form/folder/delete/:folderID",
    isAuth,
    validateParams(folderSchema),
    getDeleteFolderForm
  );
  componentsRouter.get(
    "/form/folder/share/:folderID",
    isAuth,
    validateParams(folderSchema),
    getShareFolderForm
  );
  componentsRouter.get(
    "/file/details/:fileID",
    validateParams(fileSchema),
    getFileDetails
  );
  componentsRouter.get(
    "/file/:fileID/controls",
    validateParams(fileSchema),
    validateQuery(shareSchema),
    getItemControls
  );
  componentsRouter.get(
    "/folder/:folderID/controls",
    validateParams(folderSchema),
    getItemControls
  );

  return componentsRouter;
};

module.exports = componentsRoutes;
