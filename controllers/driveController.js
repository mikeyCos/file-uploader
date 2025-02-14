const asyncHandler = require("express-async-handler");
const multer = require("multer");
const prisma = require("../db/prisma");

const validateFolder = require("../validators/createFolderValidator");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    // const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, file.fieldname + "-" + uniqueSuffix);
    console.log("file:", file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

const driveController = {
  postFolderCreate: [
    // validateFolder,
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
    upload.array("upload_file", 25),
    asyncHandler(async (req, res) => {
      console.log("postFile running...");
      res.redirect("/dashboard");
    }),
  ],
};

// upload.single("upload_file"),

module.exports = driveController;
