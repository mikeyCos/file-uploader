const multer = require("multer");
const upload = multer().array("upload_files");
/* const validateFile = require("../validators/fileValidator");

// So dumb size property is not available with fileFilter
const fileFilter = (req, file, cb) => {
  console.log("fileFilter running...");
  console.log("file:", file);
  console.log("req.files:", req.files);
  if (req.files.length > 10) cb(new Error("Too many files"));

  try {
    validateFile(file);
    cb(null, true);
  } catch (err) {
    cb(err);
  }

  // The function should call `cb` with a boolean
  // to indicate if the file should be accepted

  // To reject this file pass `false`, like so:
  // cb(null, false);

  // To accept the file pass `true`, like so:
  // cb(null, true);

  // You can always pass an error if something goes wrong:
  // cb(new Error("I don't have a clue!"));
}; */

/* const uploadFiles = (req, res, next) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      // console.log("err instanceof multer.MulterError");
      // console.log("err:", err);
      // console.log("multer.MulterError:", multer.MulterError);
      console.log("err.message:", err.message);
      console.log("err.field:", err.field);
      console.log("err.name:", err.name);
      console.log("err.cause:", err.cause);
      console.log("req.file:", req.file);
      return res.status(422).render("uploadForm");
    } else if (err) {
      // An unknown error occurred when uploading.
      console.log("err NOT instanceof multer.MulterError");
      console.log("err:", err);
      console.log("req.files:", req.files);
      const errors = {
        upload_files: {
          msg: err,
        },
      };

      return res.status(422).render("uploadForm", {
        errors,
      });
    }
    // No errors
    next();
  });
}; */

module.exports = upload;
