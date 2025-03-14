const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// I could assign the prisma object with the queries object properties
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

module.exports = { prisma, updateFolderExpiresAt, traverseNestedFolders };
