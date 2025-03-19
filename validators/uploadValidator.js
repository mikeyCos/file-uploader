const asyncHandler = require("express-async-handler");
const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");
const allowedMimeTypes = require("./allowedMimeTypes/allowedMimeTypes");

const validateFileExtension = (ext) => {
  if (!allowedMimeTypes[ext])
    throw new Error(`File extension, "${ext}", is not supported.`);
};

const validateFileMIMEType = (ext, mimetype) => {
  const mimetypeRegex = new RegExp(`^${allowedMimeTypes[ext]}$`);
  const regexResult = mimetypeRegex.test(mimetype);
  if (!regexResult)
    throw new Error(`MIME Type, "${mimetype}", is not supported.`);
};

const validateFileSize = (filename, bytes) => {
  const fileSizeLimit = 5000000;
  if (bytes > fileSizeLimit)
    throw `The file, ${filename}, exceeds file size limit.`;
};

const validateFiles = async (values, { req }) => {
  const filesLimit = 2;
  const { files } = req;

  // Is this needed if submit button is disabled?
  if (files.length === 0) throw new Error("No files selected.");
  if (files.length > filesLimit)
    throw new Error("The number of files exceed limit.");

  for (const file of files) {
    const { originalname, mimetype, size } = file;
    const filenameArr = originalname.split(".");
    const ext = filenameArr[filenameArr.length - 1];

    validateFileExtension(ext);
    validateFileMIMEType(ext, mimetype);
    validateFileSize(originalname, size);
  }
};

const filesSchema = {
  upload_files: {
    trim: true,
    custom: {
      options: validateFiles,
    },
    escape: true,
  },
};

const validateUpload = (view) => {
  return asyncHandler(async (req, res, next) => {
    await checkSchema(filesSchema, ["body"]).run(req);
    const errors = validationResult(req);
    const inputs = matchedData(req, { onlyValidData: false });
    if (!errors.isEmpty()) {
      return res.status(422).render(view, {
        errors: errors.mapped(),
        inputs,
        formAction: req.originalUrl,
      });
    }

    next();
  });
};

module.exports = validateUpload;
