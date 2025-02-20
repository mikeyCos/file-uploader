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

const validateFileMIMEType = (ext, mimetype) => {
  console.log("validateFileMIMEType running...");
  // const [ type ] = mimetype.split("/", 2);
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

/* Need to validate file signature (magic numbers)
 * https://dev.to/ayanabilothman/file-type-validation-in-multer-is-not-safe-3h8l#:~:text=Security%3A%20Malicious%20users%20can%20easily,ensuring%20file%20integrity%20is%20critical.
 */

const validateFile = (file) => {
  const { originalname, mimetype, size } = file;
  const filenameArr = originalname.split(".");
  const ext = filenameArr[filenameArr.length - 1];
  console.log("validateFile running...");
  console.log(file);
  validateFileSize(size);
  validateFileExtension(ext);
  validateFileMIMEType(ext, mimetype);
};

module.exports = validateFile;
