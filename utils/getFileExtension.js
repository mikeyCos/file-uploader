const getFileExtension = (filename) => {
  // filename must be a string
  const filenameArr = filename.split(".");
  return filenameArr[filenameArr.length - 1];
};

module.exports = getFileExtension;
