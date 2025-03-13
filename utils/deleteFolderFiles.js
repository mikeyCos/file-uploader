const prisma = require("../db/prisma");
const supabase = require("../db/supabase");

const deleteFolderFiles = async (folderID) => {
  console.log("------------------------");
  console.log("deleteFolderFiles running...");
  if (folderID === null) return;

  // Get folder
  const folder = await prisma.folder.delete({
    where: {
      id: folderID,
    },
    include: {
      files: true,
      subFolders: true,
    },
  });

  console.log("folder:", folder);
  // If current folder has files
  // Delete files
  if (folder.files.length > 0) {
    for (const file of folder.files) {
      console.log("file.storagePath:", file.storagePath);
      await supabase.storage.from("drives").remove([file.storagePath]);
    }
  }

  for (const subfolder of folder.subFolders) {
    console.log("subfolder:", subfolder);
    await deleteFolderFiles(subfolder.id);
  }
};

module.exports = deleteFolderFiles;
