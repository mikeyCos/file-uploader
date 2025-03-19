const { PrismaClient } = require("@prisma/client");
const supabase = require("./supabase");

// I could assign the prisma object with the queries object properties
const prisma = new PrismaClient();

/* const createFile = async (data) => {
  await prisma.file.create({
    data: data,
  });
}; */

const createFile = async (accountID, folderID, file, url, storagePath) => {
  await prisma.file.create({
    data: {
      name: file.originalname,
      size: file.size,
      accountId: accountID,
      folderId: folderID,
      url,
      storagePath,
    },
  });
};

const createFolder = async (accountID, folderID, folderName) => {
  await prisma.folder.create({
    data: {
      name: folderName,
      account: {
        connect: { id: accountID },
      },
      ...(folderID && {
        parentFolder: {
          connect: {
            id: folderID,
          },
        },
      }),
    },
  });
};

const getAccount = async (username, id) => {
  const account = await prisma.account.findUnique({
    where: {
      OR: [
        {
          username: username,
        },
        {
          id: id,
        },
      ],
    },
  });

  return account;
};

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
    include: {
      files: true,
      subFolders: true,
    },
  });

  return folder;
};

const getFiles = async () => {
  const files = await prisma.file.findMany({
    where: {
      folderId: null,
    },
  });

  return files;
};

const getFolders = async () => {
  const folders = await prisma.folder.findMany({
    where: {
      parentFolderId: null,
      // folderId: null, // How to handle database errors in a response?
    },
  });

  return folders;
};

const updateFileName = async (fileID, newFileName, url, newStoragePath) => {
  const file = await prisma.file.update({
    where: {
      id: fileID,
    },
    data: {
      name: newFileName,
      storagePath: newStoragePath,
      url,
    },
  });

  return file;
};

const updateFolderName = async (folderID, newFolderName) => {
  const folder = await prisma.folder.update({
    where: {
      id: folderID,
    },
    data: {
      name: newFolderName,
    },
  });

  return folder;
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

const deleteFile = async (fileID) => {
  const file = await prisma.file.delete({
    where: {
      id: fileID,
    },
  });

  return file;
};

const deleteFolder = async (folderID) => {
  if (folderID === null) return;

  //  Delete current folder and store the folder
  const folder = await prisma.folder.delete({
    where: {
      id: folderID,
    },
    include: {
      files: true,
      subFolders: true,
    },
  });

  // If deleted folder has files
  // Remove files from supabase.storage
  // Files have the relation `onDelete: Cascade`
  if (folder.files.length > 0) {
    for (const file of folder.files) {
      await supabase.storage.from("drives").remove([file.storagePath]);
    }
  }

  for (const subfolder of folder.subFolders) {
    await deleteFolder(subfolder.id);
  }
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
  createFile,
  createFolder,
  getAccount,
  getFileById,
  getFolderById,
  getFiles,
  getFolders,
  updateFileName,
  updateFolderName,
  updateFolderExpiresAt,
  deleteFile,
  deleteFolder,
  traverseNestedFolders,
};
