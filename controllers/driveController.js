const asyncHandler = require("express-async-handler");
const upload = require("../config/upload");
const prisma = require("../db/prisma");
const validateUpload = require("../validators/uploadValidator");

const validateFolder = require("../validators/createFolderValidator");

const driveController = {
  getDrive: asyncHandler(async (req, res) => {
    console.log("getDrive running...");
    res.render("drive");
  }),
  getDriveFolder: asyncHandler(async (req, res) => {
    console.log("getDriveFolder running...");
    console.log("req.params:", req.params);
  }),
  postFolderCreate: [
    validateFolder("createFolderForm"),
    asyncHandler(async (req, res) => {
      console.log("postFolderCreate running...");
      console.log("req.user:", req.user);
      console.log("req.body:", req.body);
      console.log("res.locals", res.locals);
      // Could append or prepend
      await prisma.folder.create({
        data: {
          name: req.body.folder_name,
          account: {
            connect: { id: req.user.id },
          },
        },
      });

      // res.redirect("/drive");
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
      // res.redirect("/drive");
      // Could append or prepend
      res.sendStatus(200);
    }),
  ],
  putFile: [
    asyncHandler(async (req, res) => {
      console.log("putFile running...");
      console.log("req.params:", req.params);
      console.log("req.body:", req.body);
      const { fileID } = req.params;
      const { file_name } = req.body;
      const file = await prisma.file.update({
        where: {
          id: fileID,
        },
        data: {
          name: file_name,
        },
      });

      // res.sendStatus(200);
      res.render("itemFile", { file });
    }),
  ],
  putFolder: [
    asyncHandler(async (req, res) => {
      console.log("putFolder running...");
      console.log("req.params:", req.params);
      console.log("req.body:", req.body);
      const { folderID } = req.params;
      const { folder_name } = req.body;
      const folder = await prisma.folder.update({
        where: {
          id: folderID,
        },
        data: {
          name: folder_name,
        },
      });

      // res.sendStatus(200);
      res.render("itemFolder", { folder });
    }),
  ],
  deleteFolder: asyncHandler(async (req, res) => {
    console.log("deleteFolder running...");
    console.log("req.params:", req.params);
    console.log("req.method:", req.method);
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
