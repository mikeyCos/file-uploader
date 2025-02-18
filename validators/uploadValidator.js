const {
  checkSchema,
  validationResult,
  matchedData,
} = require("express-validator");
const asyncHandler = require("express-async-handler");

// What file extensions to prohibit?
// /(\.|\/)(bat|exe|cmd|sh|php([0-9])?|pl|cgi|386|dll|com|torrent|js|app|jar|pif|vb|vbscript|wsf|asp|cer|csr|jsp|drv|sys|ade|adp|bas|chm|cpl|crt|csh|fxp|hlp|hta|inf|ins|isp|jse|htaccess|htpasswd|ksh|lnk|mdb|mde|mdt|mdw|msc|msi|msp|mst|ops|pcd|prg|reg|scr|sct|shb|shs|url|vbe|vbs|wsc|wsf|wsh)$/i
// What mimetype to prohibit?
/* Permitted extensions | MIME Types
 * .doc             | application/msword
 * .json            | application/json
 * .ogx	            | application/ogg
 * .pdf	            | application/pdf
 * .odp	            | application/vnd.oasis.opendocument.presentation
 * .ods	            | application/vnd.oasis.opendocument.spreadsheet
 * .odt	            | application/vnd.oasis.opendocument.text
 * .xls	            | application/vnd.ms-excel
 * .ppt	            | application/vnd.ms-powerpoint
 * .pptx            | application/vnd.openxmlformats-officedocument.presentationml.presentation
 * .docx            | application/vnd.openxmlformats-officedocument.wordprocessingml.document
 * .xlsx	          | application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
 *
 * .aac	            | audio/aac
 * .mid 	          | audio/midi
 * .midi            | audio/x-midi
 * .mp3	            | audio/mpeg
 * .oga, .opus	    | audio/ogg
 * .wav	            | audio/wav
 *
 * .bmp	            | image/bmp
 * .gif	            | image/gif
 * .jpeg, .jpg	    | image/jpeg
 * .png	            | image/png
 * .svg	            | image/svg+xml
 *
 * .css	            | text/css
 * .csv	            | text/csv
 * .htm, .html	    | text/html
 * .txt	            | text/plain
 *
 * .avi	            | video/x-msvideo
 * .mp4	            | video/mp4
 * .mpeg	          | video/mpeg
 * .ogv	            | video/ogg
 */

const regexes = {
  doc: /^application\/msword$/,
  ogx: /^application\/ogg$/,
  pdf: /^application\/pdf$/,
  odp: /^application\/vnd.oasis.opendocument.presentation$/,
  ods: /^application\/vnd.oasis.opendocument.spreadsheet$/,
  odt: /^application\/vnd.oasis.opendocument.text$/,
  xls: /^application\/vnd.ms-excel$/,
  ppt: /^application\/vnd.ms-powerpoint$/,
  pptx: /^application\/vnd.openxmlformats-officedocument.presentationml.presentation$/,
  docx: /^application\/vnd.openxmlformats-officedocument.wordprocessingml.document$/,
  xlsx: /^application\/vnd.openxmlformats-officedocument.spreadsheetml.sheet$/,
  aac: /^audio\/aac$/,
  mid: /^audio\/midi$/,
  midi: /^audio\/x-midi$/,
  mp3: /^audio\/mpeg$/,
  oga: /^audio\/ogg$/,
  opus: /^audio\/ogg$/,
  wav: /^audio\/wav$/,
  bmp: /^image\/bmp$/,
  gif: /^image\/gif$/,
  jpeg: /^image\/jpeg$/,
  jpg: /^image\/jpeg$/,
  png: /^image\/png$/,
  svg: /^image\/svg\+xml$/,
  css: /^text\/css$/,
  csv: /^text\/csv$/,
  htm: /^text\/html$/,
  htl: /^text\/html$/,
  txt: /^text\/plain$/,
  avi: /^video\/x-msvideo$/,
  mp4: /^video\/mp4$/,
  mpeg: /^video\/mpeg$/,
  ogv: /^video\/ogg$/,
};

const validateFileExtension = (ext) => {
  console.log("validateFileExtension running...");
  console.log("ext:", ext);
  if (!regexes[ext])
    throw new Error(`File extension, "${ext}", is not supported`);
};

// (text\/(css|plain|html|javascript))|(application\/(msword|vnd.openxmlformats-officedocument.wordprocessingml.document|vnd.oasis.opendocument.text|pdf))|(image\/(gif|png|svg\+xml))
const validateFileMIMEType = (ext, mimetype) => {
  console.log("validateFileMIMEType running...");
  // const type = mimetype.split("/", 2);
  const regexResult = regexes[ext].test(mimetype);
  if (!regexResult)
    throw new Error(`MIME Type, "${mimetype}", is not supported`);
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

const validateFileSize = (bytes) => {
  console.log("validateFileSize running...");
};

const validateFiles = async (values, { req }) => {
  console.log("validateFiles running...");
  // console.log("files:", files);
  console.log("req.files:", req.files);
  const { files } = req;

  if (files.length === 0) throw new Error("No files selected.");

  files.every((file) => {
    const { originalname, mimetype, size } = file;
    const filenameArr = originalname.split(".");
    const ext = filenameArr[filenameArr.length - 1];

    validateFileExtension(ext);
    validateFileMIMEType(ext, mimetype);
  });
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

// const validateUpload = checkSchema(filesSchema, ["body"]);
// const validateUpload = checkSchema(filesSchema);

const validateUpload = (view) => {
  console.log("validateUpload running...");
  return asyncHandler(async (req, res, next) => {
    // checkSchema(filesSchema, ["body"]);
    console.log("testing...");
    console.log("filesSchema:", filesSchema);
    await checkSchema(filesSchema, ["body"]).run(req);
    const errors = validationResult(req);
    const inputs = matchedData(req, { onlyValidData: false });
    console.log("errors:", errors);
    if (!errors.isEmpty()) {
      // Need a way to render the dashboard with the dialog open with createFolderForm partial
      return res.status(422).render(view, {
        errors: errors.mapped(),
        inputs,
      });
    }

    next();
  });
};

module.exports = validateUpload;
