const generateStoragePath = (userID, filename, folderID) => {
  const storagePath = `/${userID}${folderID ? `/${folderID}` : ""}/${filename}`;
  return storagePath;
};

module.exports = generateStoragePath;
