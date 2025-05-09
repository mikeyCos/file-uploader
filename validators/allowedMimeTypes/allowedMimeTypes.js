// What file extensions to prohibit?
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

const allowedMimeTypes = {
  doc: "application/msword",
  ogx: "application/ogg",
  pdf: "application/pdf",
  odp: "application/vnd.oasis.opendocument.presentation",
  ods: "application/vnd.oasis.opendocument.spreadsheet",
  odt: "application/vnd.oasis.opendocument.text",
  xls: "application/vnd.ms-excel",
  ppt: "application/vnd.ms-powerpoint",
  pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  aac: "audio/aac",
  mid: "audio/midi",
  midi: "audio/x-midi",
  mp3: "audio/mpeg",
  oga: "audio/ogg",
  opus: "audio/wav",
  wav: "audio/wav",
  bmp: "image/bmp",
  gif: "image/gif",
  jpeg: "image/jpeg",
  jpg: "image/jpeg",
  png: "image/png",
  svg: "image/svg+xml",
  css: "text/css",
  csv: "text/csv",
  htm: "text/html",
  html: "text/html",
  txt: "text/plain",
  avi: "video/x-msvideo",
  mp4: "video/mp4",
  mpeg: "video/mpeg",
  ogv: "video/ogg",
};

/* const fileRegexes = {
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
  html: /^text\/html$/,
  txt: /^text\/plain$/,
  avi: /^video\/x-msvideo$/,
  mp4: /^video\/mp4$/,
  mpeg: /^video\/mpeg$/,
  ogv: /^video\/ogg$/,
}; */

module.exports = allowedMimeTypes;
