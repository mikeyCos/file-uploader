const { Router } = require("express");
const prisma = require("../db/prisma");
const asyncHandler = require("express-async-handler");
const {
  getUploadFileForm,
  getAddFolderForm,
  getEditFileForm,
  getEditFolderForm,
  getDeleteForm,
  postAddFolderForm,
  postFilesUploadForm,
} = require("../controllers/componentsController");

const componentsRouter = new Router();

const foo = asyncHandler(async (req, res, next) => {
  const { fileID, folderID } = req.params;
  // If filedID
  //  "Are you sure you want to delete file, "filename"?"
  // If folderID
  //  "Are you sure you want to delete folder, "foldername"?"
  if (fileID) {
    const file = await prisma.file.findFirst({
      where: {
        id: fileID,
      },
    });
    res.locals.content = {
      msg: `Are you sure you want to delete file, "${file.name}"?`,
    };
  }

  if (folderID) {
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderID,
      },
    });
    res.locals.content = {
      msg: `Are you sure you want to delete folder, "${folder.name}"?`,
    };
  }

  if (!fileID && !folderID) {
  }

  next();
});

// GET requests
componentsRouter.get("/form/file/upload", getUploadFileForm);
componentsRouter.get("/form/folder/add", getAddFolderForm);
componentsRouter.get("/form/file/edit/:fileID", getEditFileForm);
componentsRouter.get("/form/folder/edit/:folderID", getEditFolderForm);
componentsRouter.get(
  ["/form/file/delete/:fileID", "/form/folder/delete/:folderID"],
  [foo, getDeleteForm]
);

// POST requests
componentsRouter.post("/form/folder/create", postAddFolderForm);
componentsRouter.post("/form/files/upload", postFilesUploadForm);

module.exports = componentsRouter;
