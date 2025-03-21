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

const createFolder = async (
  accountID,
  folderName,
  parentFolderID,
  expiresAt
) => {
  await prisma.folder.create({
    data: {
      name: folderName,
      account: {
        connect: { id: accountID },
      },
      ...(parentFolderID && {
        expiresAt,
        parentFolder: {
          connect: {
            id: parentFolderID,
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

const getFileById = async (accountID, fileID) => {
  const file = await prisma.file.findUnique({
    where: {
      accountId: accountID,
      id: fileID,
    },
  });

  return file;
};

const getFolderById = async (accountID, folderID) => {
  const folder = await prisma.folder.findUnique({
    where: {
      ...(accountID && { accountId: accountID }),
      id: folderID,
    },
    include: {
      files: true,
      subFolders: true,
    },
  });

  return folder;
};

const getFiles = async (accountID) => {
  const files = await prisma.file.findMany({
    where: {
      accountId: accountID,
      folderId: null,
    },
  });

  return files;
};

const getFolders = async (accountID) => {
  const folders = await prisma.folder.findMany({
    where: {
      accountId: accountID,
      parentFolderId: null,
      // folderId: null, // How to handle database errors in a response?
    },
  });

  console.log(folders);

  return folders;
};

const updateFileName = async (
  accountID,
  fileID,
  newFileName,
  url,
  newStoragePath
) => {
  const file = await prisma.file.update({
    where: {
      accountId: accountID,
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

const updateFolderName = async (accountID, folderID, newFolderName) => {
  const folder = await prisma.folder.update({
    where: {
      accountId: accountID,
      id: folderID,
    },
    data: {
      name: newFolderName,
    },
  });

  return folder;
};

const updateFolderExpiresAt = (expiresAt) => {
  return async (folder) => {
    const { id, accountId } = folder;
    await prisma.folder.update({
      where: {
        ...(accountId && { accountId }),
        id,
      },
      data: {
        expiresAt: expiresAt,
      },
    });
  };
};

const deleteFile = async (accountID, fileID) => {
  const file = await prisma.file.delete({
    where: {
      accountId: accountID,
      id: fileID,
    },
  });

  return file;
};

const deleteFolder = async (accountID, folderID) => {
  if (folderID === null) return;

  //  Delete current folder and store the folder
  const folder = await prisma.folder.delete({
    where: {
      accountId: accountID,
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
    await deleteFolder(subfolder.accountId, subfolder.id);
  }
};

// This only traverses in one direction
// getAllSubfolders
const getAllSubfolders = async (accountID, folderID, cb) => {
  console.log("--------------------");
  console.log("traverseDownNestedFolders running...");
  const currentFolder = await prisma.folder.findUnique({
    where: {
      accountId: accountID,
      id: folderID,
    },
    include: {
      subFolders: true,
    },
  });

  // Do something with cb and currentFolder
  cb(currentFolder);

  const subFolders = currentFolder.subFolders;
  if (subFolders.length > 0) {
    for (const subFolder of subFolders) {
      await getAllSubfolders(subFolder.accountId, subFolder.id, cb);
    }
  }

  console.log("currentFolder:", currentFolder);
};

// getAllParentFolders
const getAllParentFolders = async (accountID, folderID, arr = [], cb) => {
  if (!accountID || !folderID) return arr;
  const currentFolder = await prisma.folder.findUnique({
    where: {
      accountId: accountID,
      id: folderID,
    },
    include: {
      subFolders: true,
    },
  });

  if (cb) cb(currentFolder);

  const parentFolder =
    currentFolder?.parentFolderId &&
    (await prisma.folder.findUnique({
      where: {
        accountId: accountID,
        id: currentFolder.parentFolderId,
      },
      include: {
        subFolders: true,
      },
    }));

  await getAllParentFolders(accountID, parentFolder?.id, arr, cb);
  arr.push(currentFolder);
  // Do something with cb and currentFolder
  return arr;
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
  getAllParentFolders,
  updateFileName,
  updateFolderName,
  updateFolderExpiresAt,
  deleteFile,
  deleteFolder,
  traverseDownNestedFolders,
};
