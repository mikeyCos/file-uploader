const multer = require("multer");
const upload = multer().array("upload_files");

module.exports = upload;
