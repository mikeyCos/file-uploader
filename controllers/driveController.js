const asyncHandler = require("express-async-handler");
const upload = require("../config/upload");
const prisma = require("../db/prisma");
const validateUpload = require("../validators/uploadValidator");
const validateFilename = require("../validators/filenameValidator");
const validateFolder = require("../validators/folderValidator");

const driveController = {
  getDrive: asyncHandler(async (req, res) => {
    console.log("getDrive running...");
    console.log("req.baseUrl:", req.baseUrl);
    console.log("req.originalUrl:", req.originalUrl);

    const folders = await prisma.folder.findMany();
    const files = await prisma.file.findMany({
      where: {
        folderId: null,
      },
    });

    res.render("drive", {
      folders,
      files,
    });
  }),
  getDriveFolder: asyncHandler(async (req, res) => {
    console.log("getDriveFolder running...");
    console.log("req.params:", req.params);
    console.log("req.baseUrl:", req.baseUrl);
    console.log("req.originalUrl:", req.originalUrl);
    // Need to validate req.params.folderID
    const { folderID } = req.params;
    const folder = await prisma.folder.findFirst({
      where: {
        id: folderID,
      },
      include: {
        files: true,
      },
    });

    console.log("folder:", { folder });

    res.render("folder", {
      folder,
    });
    // res.render("folder");
    // res.sendStatus(200);
  }),
  postFolderCreate: [
    validateFolder("createFolderForm"),
    asyncHandler(async (req, res) => {
      console.log("postFolderCreate running...");
      console.log("req.user:", req.user);
      console.log("req.body:", req.body);
      console.log("res.locals", res.locals);
      const { folder_name } = res.locals.validData;
      // Could append or prepend
      await prisma.folder.create({
        data: {
          name: folder_name,
          account: {
            connect: { id: req.user.id },
          },
        },
      });

      // res.redirect("/drive");
      // Re-render folders?
      // Could append or prepend or replaceWith
      res.sendStatus(200);
    }),
  ],
  postFilesUpload: [
    upload,
    validateUpload("uploadForm"),
    asyncHandler(async (req, res) => {
      console.log("postFilesUpload running...");
      console.log("req.body:", req.body);
      console.log("req.files:", req.files);
      // How to upload files in a folder?
      //  Need folder's id
      // Re-render files?
      // Could append or prepend or replaceWith
      res.sendStatus(200);
    }),
  ],
  putFile: [
    validateFilename("editFileForm"),
    asyncHandler(async (req, res) => {
      console.log("putFile running...");
      console.log("req.params:", req.params);
      console.log("res.locals:", res.locals);
      // Need to validate req.params.folderID
      const { fileID } = req.params;
      const { file_name } = res.locals.validData;
      const file = await prisma.file.update({
        where: {
          id: fileID,
        },
        data: {
          name: file_name,
        },
      });

      res.status(200).render("itemFile", { file });
    }),
  ],
  putFolder: [
    validateFolder("editFolderForm"),
    asyncHandler(async (req, res) => {
      console.log("putFolder running...");
      console.log("req.params:", req.params);
      console.log("req.body:", req.body);
      console.log("res.locals:", res.locals);
      // Need to validate req.params.folderID
      const { folderID } = req.params;
      const { folder_name } = res.locals.validData;
      const folder = await prisma.folder.update({
        where: {
          id: folderID,
        },
        data: {
          name: folder_name,
        },
      });

      console.log("folder:", folder);
      // Is it bad practice to change the req.method?
      // req.method = "GET";
      // res.status(200).render("itemFolder", { folder });
      res.render("itemFolder", { folder });
    }),
  ],
  deleteFolder: asyncHandler(async (req, res) => {
    // Need to validate req.params.folderID
    const { folderID } = req.params;
    await prisma.folder.delete({
      where: {
        id: folderID,
      },
    });

    // This is fetched from the client and causes 2 GET requests
    // res.redirect("/drive");
    // res.render("drive")
    res.sendStatus(200);
  }),
  deleteFile: asyncHandler(async (req, res) => {
    console.log("deleteFile running...");

    // Need to validate req.params.fileID
    /* const { fileID } = req.params;
    await prisma.file.delete({
      where: {
        id: fileID,
      },
    }); */

    res.sendStatus(200);
  }),
};

// upload.single("upload_file"),

module.exports = driveController;
