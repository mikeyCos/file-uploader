const asyncHandler = require("express-async-handler");
const upload = require("../config/upload");
const prisma = require("../db/prisma");
const validateUpload = require("../validators/uploadValidator");

const validateFolder = require("../validators/createFolderValidator");

const driveController = {
  postFolderCreate: [
    validateFolder("dashboard"),
    asyncHandler(async (req, res) => {
      console.log("postFolderCreate running...");
      console.log("req.user:", req.user);
      console.log("req.body:", req.body);
      console.log("res.locals", res.locals);

      /* const folder = await prisma.folder.create({
        data: {
          name: req.body.folder_name,
          account: {
            connect: { id: req.user.id },
          },
        },
      });

      console.log("folder:", folder); */

      res.redirect("/dashboard");
    }),
  ],
  postFilesUpload: [
    upload,
    validateUpload("dashboard"),
    asyncHandler(async (req, res) => {
      console.log("postFilesUpload running...");
      console.log("req.body:", req.body);
      console.log("req.files:", req.files);
      // res.redirect("/dashboard");
    }),
  ],
};

// upload.single("upload_file"),

module.exports = driveController;
