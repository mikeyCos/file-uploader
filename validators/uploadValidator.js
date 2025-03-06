const asyncHandler = require("express-async-handler");
const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");
const fileRegexes = require("./regexes/fileRegexes");
const { folder } = require("../db/prisma");

const validateFileExtension = (ext) => {
  console.log("validateFileExtension running...");
  console.log("ext:", ext);
  if (!fileRegexes[ext])
    throw new Error(`File extension, "${ext}", is not supported.`);
};

const validateFileMIMEType = (ext, mimetype) => {
  console.log("validateFileMIMEType running...");
  // const type = mimetype.split("/", 2);
  const regexResult = fileRegexes[ext].test(mimetype);
  if (!regexResult)
    throw new Error(`MIME Type, "${mimetype}", is not supported.`);
  /*  switch (type) {
    case "application":
      // ^((msword|ogg|pdf)$)|(vnd.((oasis|openxmlformats-officedocument)(.(opendocument|presentationml|wordprocessingml|spreadsheetml).(presentation|spreadsheet|text|document|sheet))|(ms-(excel|powerpoint))))$
      break;
    case "audio":
      // ^(audio\/(aac|midi|x-midi|mpeg|ogg|wav))$
      break;
    case "image":
      // ^(image\/(bmp|gif|jpeg|png|svg\+xml))$
      break;
    case "text":
      // ^(text\/(css|csv|html|plain))$
      break;
    case "video":
      // ^(video\/(x-msvideo|mp4|mpeg|ogg))$
      break;
    default:
  } */
};

const validateFileSize = (filename, bytes) => {
  console.log("validateFileSize running...");
  // const fileSizeLimit = 1;
  const fileSizeLimit = 5000000;
  if (bytes > fileSizeLimit)
    throw `The file, ${filename}, exceeds file size limit.`;
};

const validateFiles = async (values, { req }) => {
  console.log("validateFiles running...");
  console.log("req.files:", req.files);
  const filesLimit = 2;
  const { files } = req;
  console.log("files:", files);

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
    console.log("validateUpload...");
    console.log("req.originalUrl:", req.originalUrl);
    await checkSchema(filesSchema, ["body"]).run(req);
    const errors = validationResult(req);
    const inputs = matchedData(req, { onlyValidData: false });
    console.log("errors:", errors);
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
