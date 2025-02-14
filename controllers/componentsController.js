const asyncHandler = require("express-async-handler");
const multer = require("multer");
const { validationResult, matchedData } = require("express-validator");
const validateFolder = require("../validators/createFolderValidator");
const validateFiles = require("../validators/uploadFilesValidator");

/* const path = require("path");
const rootPath = path.join(__dirname, "..");
const viewsPartialsPath = path.join(rootPath, "views/partials"); */

const upload = multer();

const componentsController = {
  getUploadFileForm: asyncHandler(async (req, res) => {
    console.log("res.locals:", res.locals);
    res.render("uploadForm");
  }),
  getAddFolderForm: asyncHandler(async (req, res) => {
    // folderName_onInput
    res.render("createFolderForm");
  }),
  postAddFolderForm: [
    validateFolder,
    asyncHandler(async (req, res) => {
      console.log("postAddFolderForm running...");
      console.log("req.body:", req.body);
      const errors = validationResult(req);
      const inputs = matchedData(req, { onlyValidData: false });

      if (!errors.isEmpty()) {
        return res.status(422).render("createFolderForm", {
          errors: errors.mapped(),
          inputs,
        });
      }

      console.log("---------------no errors---------------");
      // res.send({ url: "test" });
      res.sendStatus(200);
    }),
  ],
  postFilesUploadForm: [
    // validateFiles,
    upload.array("upload_files", 25),
    asyncHandler(async (req, res) => {
      console.log("postFileUploadForm running...");
      console.log(req.body);
    }),
  ],
};

module.exports = componentsController;
