const asyncHandler = require("express-async-handler");
const { validationResult, matchedData } = require("express-validator");
const validateFolder = require("../validators/createFolderValidator");
const validateUpload = require("../validators/uploadValidator");
const uploadFiles = require("../middlewares/uploadFiles");
const multer = require("multer");

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
    // uploadFiles,
    /*     (req, res, next) => {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          // A Multer error occurred when uploading.
          console.log("err instanceof multer.MulterError");
          console.log("err:", err);
          console.log("multer.MulterError:", multer.MulterError);
          console.log("err.message:", err.message);
          return res.status(422);
        } else if (err) {
          // An unknown error occurred when uploading.
          console.log("err:", err);
          console.log("req.files:", req.files);
          return res.status(422);
        }
        next();
      });
    }, */
    upload.array("upload_files", 25),
    validateUpload("uploadForm"),
    asyncHandler(async (req, res) => {
      console.log("postFilesUploadForm running...");
      console.log("req.body:", req.body);
      console.log("req.files:", req.files);
      /* const errors = validationResult(req);
      const inputs = matchedData(req, { onlyValidData: false });
      console.log("errors:", errors);
      console.log("inputs:", inputs);
      if (!errors.isEmpty()) {
        return res.status(422).render("uploadForm", {
          errors: errors.mapped(),
          inputs,
        });
      } */

      res.sendStatus(200);
    }),
  ],
};

module.exports = componentsController;
