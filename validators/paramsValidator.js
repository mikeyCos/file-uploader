const asyncHandler = require("express-async-handler");
const { checkSchema, validationResult } = require("express-validator");
const { getFileById, getFolderById } = require("../db/prisma");

const isfileIDValid = async (fileID) => {
  console.log("isfileIDValid running...");
  console.log("fileID:", fileID);
  const fileExists = !!(await getFileById(null, fileID));
  if (!fileExists) return Promise.reject("Invalid FileID parameter.");
  return Promise.resolve();
};

const isFolderIDValid = async (folderID) => {
  console.log("isFolderIDValid running...");
  const folderExists = !!(await getFolderById(null, folderID));
  if (!folderExists) return Promise.reject("Invalid folderID parameter.");
  return Promise.resolve();
};

const fileSchema = {
  fileID: {
    trim: true,
    custom: {
      options: isfileIDValid,
    },
    escape: true,
  },
};

const folderSchema = {
  folderID: {
    trim: true,
    custom: {
      options: isFolderIDValid,
    },
    escape: true,
  },
};

// How to get this to work when handling forms with invalid fileID/folderIDs?
const validateParams = (schema) => {
  return asyncHandler(async (req, res, next) => {
    console.log("validateParams running...");
    await checkSchema(schema, ["params"]).run(req);
    const errors = validationResult(req);
    console.log("errors:", errors);
    if (!errors.isEmpty()) {
      next({ message: "Resource not found", status: 404 });
    }

    next();
  });
};

module.exports = { validateParams, fileSchema, folderSchema };
