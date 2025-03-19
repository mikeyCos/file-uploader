const { prisma, deleteFolder } = require("../db/prisma");
const supabase = require("../db/supabase");

const deleteFolderFiles = async (folderID) => {
  if (folderID === null) return;

  // Get folder
  const folder = await deleteFolder(folderID);

  // If current folder has files
  // Delete files
  if (folder.files.length > 0) {
    for (const file of folder.files) {
      await supabase.storage.from("drives").remove([file.storagePath]);
    }
  }

  for (const subfolder of folder.subFolders) {
    await deleteFolderFiles(subfolder.id);
  }
};

module.exports = deleteFolderFiles;
