const path = require("path");
const fsPromises = require("node:fs/promises");
const getFileExtension = require("../utils/getFileExtension");
const allowedMimeTypes = require("../validators/allowedMimeTypes/allowedMimeTypes");

const rootPath = path.join(__dirname, "..");
const uploadsPath = path.join(rootPath, "uploads");

const getFilesFromPath = async (path = uploadsPath) => {
  // Path must be a string
  // Path must be a valid path in local file system
  // How to create an array of files while using fsPromises.lstat(path[, options], callback)?
  const itemsFromPath = await fsPromises.readdir(uploadsPath);
  /* const files = [];

  for (const item of itemsFromPath) {
    const stat = await fsPromises.lstat(`${path}/${item}`);
    const isFile = stat.isFile();
    const ext = getFileExtension(item);
    const mimetype = allowedMimeTypes[ext];

    if (isFile && mimetype) {
      const filePath = `${path}/${item}`;
      const file = await createFile(item, filePath, mimetype);

      files.push(file);
    }
  } */

  /* const files = await asyncReduce(
    itemsFromPath,
    async (accumulator, currentFile) => {
      const asyncAccumulator = await Promise.resolve(accumulator);
      const stat = await fsPromises.lstat(`${path}/${currentFile}`);
      const isFile = stat.isFile();
      const ext = getFileExtension(currentFile);
      const mimetype = allowedMimeTypes[ext];

      if (isFile && mimetype) {
        console.log("currentFile:", currentFile);
        console.log("isFile:", isFile);
        console.log("ext:", ext);
        console.log("mimetype:", mimetype);
        const filePath = `${path}/${currentFile}`;
        const file = await createFile(currentFile, filePath, mimetype);
        return [...asyncAccumulator, file];
      }

      return [...asyncAccumulator];
    }
  ); */

  // Why or how does this work?
  // const files = await asyncReduce(itemsFromPath, asyncReduceCallback(path));

  // This also works
  /* const files = await itemsFromPath.reduce(asyncReduceCallback(path), []); */

  //This also works too
  /* const files = await (
    await fsPromises.readdir(uploadsPath)
  ).reduce(async (accumulator, currentFile) => {
    const asyncAccumulator = await accumulator;
    const stat = await fsPromises.lstat(`${path}/${currentFile}`);
    const isFile = stat.isFile();
    const ext = getFileExtension(currentFile);

    const mimetype = allowedMimeTypes[ext];

    if (isFile && mimetype) {
      const filePath = `${path}/${currentFile}`;
      const file = await createFile(currentFile, filePath, mimetype);
      return [...asyncAccumulator, file];
    }

    return [...asyncAccumulator];
  }, Promise.resolve([])); */

  // This also works as well
  const files = await fsPromises.readdir(uploadsPath).then((itemsFromPath) => {
    return itemsFromPath.reduce(asyncReduceCallback(path), []);
  });

  // Why or how does this not work?
  // Works if I wrap the entire Promise with a await Promise.resolve()
  /* const files = (await fsPromises.readdir(uploadsPath)).reduce(
    async (accumulator, currentFile) => {
      const asyncAccumulator = await accumulator;
      const stat = await fsPromises.lstat(`${path}/${currentFile}`);
      const isFile = stat.isFile();
      const ext = getFileExtension(currentFile);

      const mimetype = allowedMimeTypes[ext];

      if (isFile && mimetype) {
        const filePath = `${path}/${currentFile}`;
        const file = await createFile(currentFile, filePath, mimetype);
        return [...asyncAccumulator, file];
      }

      return [...asyncAccumulator];
    },
    Promise.resolve([])
  ); */

  console.log("files:", files);
  return files;
};

const createFile = async (filename, filePath, mimetype) => {
  const buffer = await fsPromises.readFile(filePath);
  const size = buffer.byteLength;

  const file = {
    originalname: filename,
    mimetype,
    buffer,
    size,
  };

  return file;
};

const asyncReduce = (arr, callback) => {
  const reducedArr = arr.reduce(callback, []);
  return reducedArr;
};

const asyncReduceCallback = (path) => {
  return async (accumulator, currentFile) => {
    const asyncAccumulator = await accumulator;
    const stat = await fsPromises.lstat(`${path}/${currentFile}`);
    const isFile = stat.isFile();
    const ext = getFileExtension(currentFile);

    const mimetype = allowedMimeTypes[ext];

    if (isFile && mimetype) {
      const filePath = `${path}/${currentFile}`;
      const file = await createFile(currentFile, filePath, mimetype);
      return [...asyncAccumulator, file];
    }

    return [...asyncAccumulator];
  };
};

module.exports = getFilesFromPath;
