const { PrismaClient } = require("@prisma/client");

// I could assign the prisma object with the queries object properties
const prisma = new PrismaClient();

const getFileById = async (fileID) => {
  const file = await prisma.file.findUnique({
    where: {
      id: fileID,
    },
  });

  return file;
};

const getFolderById = async (folderID) => {
  const folder = await prisma.folder.findUnique({
    where: {
      id: folderID,
    },
  });

  return folder;
};

const deleteFolder = async (folderID) => {
  return await prisma.folder.delete({
    where: {
      id: folderID,
    },
    include: {
      files: true,
      subFolders: true,
    },
  });
};

const updateFolderExpiresAt = (expiresAt) => {
  return async (folderID) => {
    await prisma.folder.update({
      where: {
        id: folderID,
      },
      data: {
        expiresAt: expiresAt,
      },
    });
  };
};

const traverseNestedFolders = async (folderID, cb) => {
  console.log("--------------------");
  console.log("traverseNestedFolders running...");
  const currentFolder = await prisma.folder.findUnique({
    where: {
      id: folderID,
    },
    include: {
      subFolders: true,
    },
  });

  // Do something with cb and currentFolder
  cb(currentFolder.id);

  const subFolders = currentFolder.subFolders;
  if (subFolders.length > 0) {
    for (const subFolder of subFolders) {
      await traverseNestedFolders(subFolder.id, cb);
    }
  }

  console.log("currentFolder:", currentFolder);
};

module.exports = {
  prisma,
  getFileById,
  getFolderById,
  deleteFolder,
  updateFolderExpiresAt,
  traverseNestedFolders,
};
